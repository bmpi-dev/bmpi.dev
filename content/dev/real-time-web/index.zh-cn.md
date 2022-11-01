---
title: "Real-time Web应用开发新体验"
date: 2022-10-31
draft: false
tags: ["Real-time Web", "Elixir", "Erlang/OTP", "分布式系统"]
keywords: ""
description: "本文介绍Real-time Web用户体验的演进、相关开发技术的迭代及存在的分布式技术难题，最后介绍Elixir是如何解决这些难题带来新的开发体验。"
isCJKLanguage: true
categories: [
    "分布式技术"
]
---

- [Real-time Web是什么](#real-time-web是什么)
- [Real-time带来的技术难题](#real-time带来的技术难题)
  - [单机长连接管理](#单机长连接管理)
  - [分布式集群扩容](#分布式集群扩容)
    - [数据状态的难题](#数据状态的难题)
    - [IM集群的例子](#im集群的例子)
- [Elixir的解决之道](#elixir的解决之道)
  - [让一切Live起来](#让一切live起来)
  - [让分布式变得简单起来](#让分布式变得简单起来)
  - [Elixir版IM集群的例子](#elixir版im集群的例子)
- [总结](#总结)

## Real-time Web是什么

Web正变的实时可交互(Real-time Interactive)起来，从早期的内容发布通知类应用，再到移动时代社交媒体的分享类应用，现在逐渐涌现出很多实时协作类的应用。

{{< figure src="https://img.bmpi.dev/181e8496-78dc-b7c6-079d-ca5c4ef73d11.png" caption="The evolving online user experience." link="https://ably.com/blog/the-realtime-web-evolution-of-the-user-experience">}}

这在变迁的驱动是由底层技术发展而带来了的，进而提升了Web类应用的用户交互体验。比如Web应用前后端通信协议从单向的HTTP REST到双向的WebSockets的发展，带来了Web用户体验更快的更新速度与更强的交互能力。

按照更新与交互的差异，Real-time Web又可以分为如下两个类型。

实时更新类：

- 信息流(Feed)：资讯类网站实时更新突发新闻，社交媒体Feed流；
- 通知消息：社区通知，如知乎的问题回答更新通知功能；
- 金融证券：实时更新股票价格数据；

实时交互类：

- 直播活动：观众可对直播内容实时发送评论、弹幕等；
- 位置共享应用：多个用户可在同一房间实时共享自己的地理位置；
- [IM](https://en.wikipedia.org/wiki/Instant_messaging)群聊应用：多个用户可在同一房间使用文本、语音或视频来聊天，如WeChat或Whatsapp，也有开源的实现如[Tinode](https://github.com/tinode/chat)；
- 虚拟空间：多个用户可在虚拟空间里办公或游戏，如在[gather](https://www.gather.town/)里可以创建一个虚拟团队，成员能在虚拟空间里远程办公（如视频会议与白板协作），甚至可以拥有个人的虚拟办公室；
- 实时协作：多个用户可在同一房间实时协作，如在线白板类应用[excalidraw](https://excalidraw.com/)或原型设计工具[figma](https://www.figma.com/)；
- 在线游戏：多个用户可在同一房间玩实时对战游戏；

## Real-time带来的技术难题

Real-time相比之前的HTTP推拉机制(GET/POST)，对服务端来说，挑战从如何管理大量的短连接，变成了管理大量的长连接。

在多种[并发模型](/dev/deep-in-program-language/how-to-implement-concurrency/concurrency-model/)的支持下，虽然可能需要做一些特殊的[内核调优(kernel tuning)](https://github.com/bmpi-dev/invest-assistant/blob/master/IaC/aws/backend/ansible/playbooks/templates/kernel-tuning)，但现在的后端服务可以用HTTP协议在单机里并发服务上百万的短连接请求，更多详见这篇文章：

- [Extreme HTTP Performance Tuning: 1.2M API req/s on a 4 vCPU EC2 Instance | talawah.io](https://talawah.io/blog/extreme-http-performance-tuning-one-point-two-million/)

### 单机长连接管理

虽然在短连接上，单机并发上百万不是非常复杂的事情，但在长连接的管理上，单机上百万还是存在一定的难度，尤其是不同编程语言在实现方面还存在较大的差异：

- [Websocket Performance Comparison](https://matttomasetti.medium.com/websocket-performance-comparison-10dc89367055)

Real-time相比传统Web来说，除了连接从短变成了长，每个用户的交互时间也变得更长。如果一个用户至少用一个长连接，那单机的架构很快就成为了瓶颈，唯一的办法就是通过集群扩容解决单机资源瓶颈的问题。

但分布式架构的引入却带来了更复杂的问题，比如集群的扩容、数据状态的管理等。

### 分布式集群扩容

在分布式架构中，无状态的服务，可以很容易通过水平扩容(Horizontal Scaling)来提高服务吞吐量(Throughput)。如果是有状态的话，优先采用垂直扩容(Vertical Scaling)，比如提升单机的硬件性能的方式，如果还是无法达到系统要求，则通过数据分区(Partitioning)的方式将数据分散存储在多个节点中。

#### 数据状态的难题

由于数据分区很容易产生更复杂的分布式难题，比如节点添加删除导致的数据分区再平衡问题、数据一致性问题、分布式事务与共识问题等。所以尽可能把运行时的服务与数据拆分开，把服务做成无状态的，数据通过流处理系统如一些中间件去处理。但引入中间件又会带来额外的维护开销，也会让架构变的更为复杂。

而且Real-time类型的应用架构一般是基于异步事件驱动，而非实时数据同步的方式去实现的。异步事件驱动的架构在可观测性(Observability)上更困难一些，比如要在系统运行时去查看某事件流引发的系统行为，很难通过有限的日志去观测系统所有组件的运行时状态。

#### IM集群的例子

以IM聊天应用Tinode为例，它的集群是这么设计的：

假设集群有S1、S2与S3三个节点，假设有A、B与C三个用户，A加入了聊天室(T1, T3)，B加入了(T2, T4)，C加入了(T3, T6)。S1服务处理聊天室(T1, T2)，S2处理(T3, T4)，S3处理(T5, T6)。用户的客户端可以接入集群任意一个节点的API Endpoint。此时的数据处理链路如下：

```text
A(T1, T3) -> S1(T1, T2) .(forward). T3 -> S2
B(T2, T4) -> S2(T3, T4) .(forward). T2 -> S1
C(T3, T6) -> S3(T5, T6) .(forward). T3 -> S2
```

> 这里的`.(forward).`指节点无法处理此请求，将请求转发到合适(通过一个全局的路由映射表查找)的节点去处理。

假设此刻S2下线，S2处理的T3与T4需要分区再平衡到S1与S3节点上，在这里可以用一致性哈希算法([Consistent hashing](https://en.wikipedia.org/wiki/Consistent_hashing))处理集群节点数据(这里指的是聊天室状态)再平衡的问题。节点一致性可以通过诸如[Raft](https://raft.github.io/)的共识算法达成共识。此时的数据处理链路如下：

```text
A(T1, T3) -> S1(T1, T2, T4) .(forward). T3 -> S3
B(T2, T4) -x-> S2()
C(T3, T6) -> S3(T5, T6, T3)
```

当S2下线后，B的客户端检测连接断开后重新接入其他节点比如S1或S3，也可以在服务端部署HAProxy或Nginx去自动处理。由于A和C的T3聊天室再平衡到S3节点了，A和C的客户端需要重新加入到S3节点的T3聊天室。当S2节点重新上线时，需要再平衡至之前的状态，相应的客户端也需要重新接入。

> 这里的聊天室在实现时一般是在WebSocket上订阅的Channel名。

## Elixir的解决之道

Real-time叠加分布式带来的难题让可交互的实时Web应用开发变的复杂起来。但基于[Erlang/OTP](https://www.erlang.org/doc/system_architecture_intro/sys_arch_intro.html)的[Elixir](https://elixir-lang.org/)语言让这类应用的开发变的简单起来。

Elixir继承了Erlang/OTP的很多特性：天然分布式、容错、低延迟等。关于Elixir的进一步介绍可以参考我之前写的一个Slide：[Elixir介绍](https://talk.bmpi.dev/2019/elixir/)。

Elixir是如何解决Real-time Web应用开发的痛点？下面从两个方面来介绍。

### 让一切Live起来

得益于Erlang/OTP出色的[用户线程模型](/dev/deep-in-program-language/how-to-implement-concurrency/os-scheduling/#用户线程user-level-thread)，Elixir的Web框架[Phoenix](https://www.phoenixframework.org/)可以轻松在单机处理上百万的长连接：

- [The Road to 2 Million Websocket Connections in Phoenix - Phoenix Blog](https://www.phoenixframework.org/blog/the-road-to-2-million-websocket-connections)

为了发挥如此出色的长连接管理能力，Phoenix框架更是将[Server-driven UI](https://www.thoughtworks.com/radar/techniques/server-driven-ui)发挥到了极致：

{{< figure src="https://img.bmpi.dev/dc9e4a5d-873c-66f3-f312-383ccbfec58a.png" caption="JS driven UI vs LiveView driven UI" link="https://teamgenik.com/docs/tech">}}

如图所示，左侧是常规的Web页面渲染机制，数据通过网络从服务端拉取，前端通过数据控制页面组件的渲染。而Phoenix的[LiveView](https://hexdocs.pm/phoenix_live_view/Phoenix.LiveView.html)可以让后端开发者摆脱写Javascript的困扰，所有的逻辑都在服务端完成，页面的渲染也是通过服务端计算页面更新的差异，将小部分差异通过WebSocket推送给浏览器。

Elixir让一切Live起来！

### 让分布式变得简单起来

除了优异的长连接管理能力，得益于Erlang/OTP天然分布式的能力，Elixir服务组建集群更是非常的简单。简单到不需要过多赘述，发布一个多节点的集群只需要几分钟的时间，具体可参考这篇简短的配置说明：

- [Clustering Your Application · Fly Docs](https://fly.io/docs/elixir/getting-started/clustering/)

Elixir的集群可以做到非常细粒度的控制，比如创建一组Process（此进程并非操作系统级别的进程，而是Erlang VM管理的轻量级用户线程），可以将其通过一致性哈希分布到其他节点的Erlang VM上，目前这种操作在其他语言上是无法实现的。具体可参考这些项目的介绍：

- [derekkraan/horde: Horde is a distributed Supervisor and Registry backed by DeltaCrdt](https://github.com/derekkraan/horde)
- [NetComposer/nkdist: Erlang distributed registration and load balancing](https://github.com/NetComposer/nkdist)

Elixir另外一个让分布式集群管理变得简单的能力是其强大的可观测能力。如下是一个集群的Phoenix LiveDashboard：

![](https://img.bmpi.dev/59f2f0f0-2a81-911e-92df-74749d94ec0b.png)

LiveDashboard可以查看集群的很多信息，比如我们可以查看应用启动后的监督树(Supervisor tree)，这是Elixir强大的容错能力来源，如果某个Process出现了Crash的情况，监督树会自动恢复该Process，这也是Erlang/OTP的`Let It Crash`思想。

![](https://img.bmpi.dev/f746dc54-890b-1ace-5144-45812a0b39ff.png)

进一步我们可以查看某个Process的状态，比如此Process的PID为`<0.2243.0>`，第一位0表示这是一个本地进程，如果是非0，则是一个远程节点的Process。

![](https://img.bmpi.dev/e54665f7-b21d-ebab-381f-2869e02e5f56.png)

当然目前这些还不算啥惊人的部分。惊人的地方在于我们可以与这些Process在线实时交互，比如获取它们当前的状态，给它们发消息获取处理后的状态，这些在排查运行时问题时非常有帮助。比如我远程接入到集群某个节点中：

![](https://img.bmpi.dev/868d9ff5-586c-4351-afd5-65471b9f63bc.png)

如上图，我在接入此节点后，可以与此Process通信并修改它的状态，甚至能找到某个负责与Web端通信的WebSocket的Process，通过此Process可以直接给Web端推送数据。

你可能注意到了上面两个图中Process的PID并不相同，第一个是`<42700.16451.14>`，第二个是`<0.16451.14>`，这是因为前者是我在另外一个节点上查看此节点的Process，当然就是一个remote的Process了，第二个是我接入了当前这个节点截的图，一旦组建好集群，集群内的节点都能很容易获取其他节点的运行时数据。

### Elixir版IM集群的例子

上面介绍了Tinode的集群设计，因为Tinode是用Go开发的，它的集群是自己实现的。但用Elixir就不需要这么复杂了，[free4chat](https://github.com/madawei2699/free4chat)是我开发的一个开源的基于WebRTC的语音聊天室Web应用，它是基于Elixir开发的，目前服务端是两个节点的集群，上面的截图就是来自它的Elixir后端集群。

free4chat的集群实现非常简单，利用Elixir的强大的集群管理能力，当某个用户通过某个节点接入到某个房间后，该节点从集群全局注册表中查找是否存在该房间的Process，如果不存在就创建，存在就获取该房间的Process，无论该Process是否在本地，用户都可以在该房间与其他人聊天，不同节点Process间的通信由Erlang/OTP自动实现。

## 总结

Real-time Web开发本身不复杂，复杂的是Real-time叠加分布式带来的难题，当然难题永远是在同一维度间对比带来的感受，当脱离该纬度进入更高维度时，这些难题也许就被轻松化解了。

分布式领域有非常复杂的经典问题，Erlang/OTP在该领域深耕了很多年，已经有了工业级的解决方案，站在Erlang/OTP巨人肩膀上的Elixir不仅继承了其强大的分布式解决方案，还在多个领域开辟了新的开发体验，比如Phoenix LiveView另辟蹊径带来了新的Web开发体验。

本文没有提到的是，上述的例子并没有考虑数据库的问题，如果再引入传统的数据库，会让问题变得更为复杂。数据库如何给Realtime Web带来新的开发体验？也许Rethinkdb这篇[Advancing the realtime web](https://rethinkdb.com/blog/realtime-web)能给我们更多启发。
