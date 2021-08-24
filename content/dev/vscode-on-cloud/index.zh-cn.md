---
title: "云端 IDE"
date: 2021-08-23
draft: false
tags: ["AWS", "Pulumi", "VSCode", "AWS Cloud9", "GitHub Codespaces", "IDE"]
keywords: ""
description: "本文分享笔者基于AWS与Pulumi搭建类GitHub Codespaces的云端VSCode的经验。"
isCJKLanguage: true
og_image: "https://img.bmpi.dev/dafdc38a-8e97-7daa-d860-4ad78c4d182b.png"
---

- [云端 IDE](#云端-ide)
- [为什么是 VSCode](#为什么是-vscode)
  - [良好的设计](#良好的设计)
  - [跨平台](#跨平台)
  - [开源](#开源)
- [基于 AWS 与 Pulumi 搭建个人云 IDE](#基于-aws-与-pulumi-搭建个人云-ide)
- [关于费用](#关于费用)
- [云 IDE 研发模式](#云-ide-研发模式)
- [参考文章](#参考文章)

前不久 GitHub 官方 Twitter 发了一个如下的 Tweet：

![](https://img.bmpi.dev/0dd20034-d46f-8910-a6dc-cf71802979f4.png)

只要你在任何 GitHub Repo 页面上按下`.`键会自动跳转到`github.dev`的网站，此网站是一个网页版的 VSCode 并且会自动克隆下这个 Repo 的代码。在这个网页版的 VSCode 里你甚至可以安装一些特定的插件（无法安装需要外部依赖的插件），能更方便的阅读代码。因为这个网站是官方出品，这个 VSCode 已自动绑定了你的 GitHub 账户，开发者可以在里面阅读、编辑及提交代码，整个过程行云流水，甚至全程不需要打开本地的 IDE。此举直接干掉了 [github1s](https://github.com/conwnet/github1s) 这个具备类似功能的开源项目。

在浏览器写代码还能拥有桌面 IDE 的开发体验，是 IT 行业一直在追求的。VSCode 的团队负责人 Erich Gamma（JUnit 作者之一，《设计模式》作者之一，Eclipse 架构师） 在 2011 年入职微软后的工作内容就是：

> Envision new paradigms for online developer tooling that will be as successful as the IDE has been for the desktop.

之后才有了 VSCode 的诞生。可以说 VSCode 从诞生之处就朝着云端 IDE 的方向去设计。

为什么要使用云端 IDE？这源于本地开发环境的一些问题，比如：

- 环境差异问题：如 Mac 与 Linux 就有一些差异，尤其是在 Mac 上使用基于 Linux 内核的流行技术如 Docker，会让整个体验变差。
- 性能问题：本地的开发机器一般需要运行很多软件，如一些办公和通讯软件啥的，让本来就不高的性能捉襟见肘。
- 稳定性问题：本地的开发机器启动时间长了就需要重启，每次重启后需要花费很多时间去设置相关的开发环境，浪费了大量时间。
- 依赖问题：如果开发环境依赖一些特定的云基础设施，网络通信就会很麻烦。而在云主机上，天然与其他云基础设施在一个网络环境中，环境设置简单。
- 网络问题：现代软件开发都是站在巨人的肩膀上，很多软件都依赖大量的库、框架和运行时，这些依赖下载需要快的网络速度。一般云主机的网络性能要好于家庭或办公网络。
- 安全问题：代码或者密钥放在本地开发环境有泄漏的风险，比如开发人员的开发机器被盗后丢失了代码或者密钥。
- 存储问题：本地开发机器的磁盘存储有限，扩展性也不好。而云主机的磁盘很容易扩容。

而解决这些问题的终极办法就是把开发环境搬到云端，而在云端开发最重要的就是需要一个好的 IDE 支持，这也导致了行业对云端 IDE 强烈的需求。

## 云端 IDE

在说云端 IDE 前我们先了解下 IDE 的一些主要功能点，如下图所示：

![](https://img.bmpi.dev/b203c603-cc39-3ee0-3ce4-9ed3d7022777.png)

一个优秀的 IDE 当然要让程序员写代码写的爽，看代码看的溜。而要达到这个目的，必不可少的要支持以下功能点：

- 优秀的文本编辑功能，支持键盘自定义布局；
- 代码提示功能，如语法高亮，代码跳转，错误提示等；
- 调试功能；
- 多编程语言支持；
- 代码补全功能；
- 代码重构功能；
- 扩展能力，支持用户自定义或提供插件；
- 好的生态。

在桌面级 IDE 里，这些功能都不是事，有很多 IDE 支持这些功能，比如 Visual Studio、Eclipse、IntelliJ IDEA、NetBeans 及 Xcode 等。但以支持在线使用的维度看，这些老牌 IDE 都不行。

早期行业里对云端 IDE 的要求也不高，所以有了大约三个大的类别的云端 IDE，如下图：

![](https://img.bmpi.dev/6743ed9b-5ffa-3032-1e3e-12aa383e5ec6.png)

- 在线编辑器。以 CodePen 与 JSFiddle 为主的 Web 在线编辑器，可以方便的对前端页面做在线开发。但这距离桌面 IDE 的体验相差甚远。
- 类 REPL。以 Repl.it 和 Jupyter 为主的在线 [REPL](https://en.wikipedia.org/wiki/Read-eval-print_loop)。REPL 最多算桌面 IDE 支持众多功能中的一个点，它的使用场景适合一些编写一些验证类型的代码片段，距离工程化的代码开发体验还有很多路需要走。
- 功能受限的云 IDE。以 AWS Cloud9 为主的云 IDE，这类云 IDE 已经能给予很好的代码开发体验了，甚至可以无缝使用云基础设施，很适合规模化的代码开发协作。但这类云 IDE 一般不具备扩展能力，比如无法安装一些插件。

在上述功能受限的云 IDE 类别里面有一些基于 VSCode 而实现的云 IDE，比如 Github Codespaces 使用了 VSCode 结合 Azure 云服务器可以给予开发者桌面 IDE 的体验，也可以安装插件。同时在最受欢迎的开发者社区 StackOverflow 的一份 [2021 Developer Survey](https://insights.stackoverflow.com/survey/2021) 调查问卷里的 `Integrated development environment(IDE)` 部分中（共八万多个开发者调查反馈），VSCode 以 71% 的高票（2019 年这个占比已经到了 50%）当选最受欢迎的 IDE：

![](https://img.bmpi.dev/ef162e34-50e9-e7bd-e1aa-1de4b80a27b8.png)

看起来 VSCode 达到了云 IDE 想要实现的终极目标：**与桌面级 IDE 一样的开发体验**。这里的问题是为什么是 VSCode 呢？

## 为什么是 VSCode

### 良好的设计

VSCode 远程开发模式如下图所示：

![](https://img.bmpi.dev/4c5f0a02-139f-1bb5-5dbd-46c1af97f60a.png)

通过 CS 架构设计让 VSCode 具备使用远程服务器或容器的能力，本地的 VSCode 只负责 UI 界面与主题的显示，其他的如插件、程序运行、终端进程与调试器都运行在远程服务器上。界面显示与计算分离的设计，这也是实现云 IDE 很重要的一点。

CS 架构设计也体现在代码提示上，通过制定`Language Server Protocol`标准协议，VSCode 核心无需解析多种编程语言的 AST 或实现多个编程语言 Parser，而将这些功能委托给各语言的插件来实现，保证了核心非常小巧且稳定。

同样的设计也体现在了调试器（Debugger）与`Debug Adaptor Protocol`标准协议上。

更多的架构设计分析可以看我的这篇 [VSCode插件开发小记](/dev/vscode-plugin-development-notes/)。

### 跨平台

VSCode 的前身是 [monaco-editor](https://github.com/Microsoft/monaco-editor) 在线编辑器。作为一个 Web 软件，想要实现跨平台功能，就需要使用`Electron`技术。所以桌面级的 VSCode 和服务器端 Web 版的 VSCode 其实是一个代码库。

正因为其是一个 Web 软件，才有了 [code-server](https://github.com/cdr/code-server) 这个第三方 Repo 的出现，也才有了运行在浏览器里的 VSCode。这才导致了众多基于 VSCode 的云 IDE 的出现。

### 开源

[VSCode](https://github.com/microsoft/vscode) 如果没有开源，结局可能大不相同。正是有了微软华丽的转身，对开源的热情拥抱，才打开了 VSCode 走向世界的大门，否则结局可能是沦落为微软众多内部项目的一员。

## 基于 AWS 与 Pulumi 搭建个人云 IDE

由于 VSCode 的开源和 Web 特性，让我们可以快速搭建一个基于 VSCode 的个人云 IDE，功能对标 [Github Codespaces](https://github.com/features/codespaces)，但比其便宜很多。

我的实现见这个 [Repo](https://github.com/bmpi-dev/code.bmpi.dev/tree/master/server)。架构如下：

![](https://img.bmpi.dev/dafdc38a-8e97-7daa-d860-4ad78c4d182b.png)

前置条件：

1. 需要一个 AWS 账号且安装 AWS CLI，本地配置好 AWS Credentials。 AWS 账号需具备对 EC2 的一些操作权限；
2. 需要一个 [Pulumi](https://www.pulumi.com/) 账号，并创建一个工程；(如果你对 Pulumi 不熟悉，可参考我这篇 [基于Serverless实现静态博客访问统计功能](/dev/pulumi-aws-serverless-hugo-site-vists/) 文章里的介绍)

使用非常简单（得益于 Pulumi 和 AWS CLI 的强大功能）：

```bash
git clone https://github.com/bmpi-dev/code.bmpi.dev.git
cd code.bmpi.dev/server
pulumi up # 使用 Pulumi 设置 AWS EC2
./run work # 打开远程 VSCode
./run rest # 关闭远程 VSCode
```

如果`./run open_tunnel`因为服务器还在启动时通道无法连接，可在服务器启动后再次执行即可建立通道连接。

首次访问需要输入 VSCode 的登录密码，通过执行`sh connect-server.sh`登录服务器后执行`cat ~/.config/code-server/config.yaml | grep password:`获取登陆密码。

通过浏览器访问`http://localhost:8888/`后即可开始使用远端 VSCode：

![](https://img.bmpi.dev/db6642d4-1224-d743-c881-314dd043e318.png)

如果暂时不需要这个环境了记得通过`./run rest`休眠这台云服务器，服务器在关闭后 AWS 就不对该 EC2 实例计费了，只对存储卷收取很便宜的费用。

如果你彻底不需要这个环境，想销毁所有资源免得 AWS 继续收费，只需要执行`pulumi destroy`即可删除所有 AWS 资源。

## 关于费用

以AWS EC2 T2.Medium 实例（2 核 4GB 内存 + 50GB 存储）为例。每天开发 5 小时，每月 20 天共100小时，总成本为 $0.0464 * 100 + $0.1 * 50 = $9.64。相同的服务器配置 Github Codespaces 需要 21.5 美元，相差近 2.23 倍。

## 云 IDE 研发模式

云 IDE 代表了一种研发模式的发展方向。这种研发模式可能的发展趋势有：

- 标准化的开发环境：一套云 IDE 开发环境可以标准化批量配置，开箱即用，大幅度降低开发者在配置开发环境上的时间消耗。
- 定制化的开发环境：可以对开发环境做定制，满足不同类型项目的开发环境需求。
- 弹性的开发环境：开发环境的配置依托于云服务的自动弹性扩容，可动态调整配置，满足开发环境对资源配置的动态需求。
- 智能的开发环境：依托云服务器对特定代码仓库的机器学习分析，能够更好的做到智能提示，辅助开发，类似于 [GitHub Copilot](https://copilot.github.com/)。
- 安全的开发环境：代码和基础设施配置都在云服务器上存储，可以极大的降低因开发人员疏忽而造成的代码或者环境密钥泄露的风险。只要做好云服务器的系统安全配置，就可以降低研发环境的安全风险。
- 随时可用的开发环境：无需特定开发机器，只需要一个具备浏览器的电脑即可访问云 IDE 开始开发。

一句话总结就是：

```
Cloud IDE, Coding Anytime Anywhere.
```

## 参考文章

1. [从 VSCode 看大型 IDE 技术架构](https://zhuanlan.zhihu.com/p/145981067)
2. [Implementing VSCode-based (Code-Server) on Cloud with AWS CDK](https://holisticsecurity.io/2020/09/06/implementing-vscode-based-on-cloud-with-aws-cdk/)
