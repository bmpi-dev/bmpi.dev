---
title: "我的人生管理系统"
date: 2021-03-14
draft: false
tags: ["自我管理", "自我提升", "目标管理", "时间管理", "笔记管理", "财务管理", "纯文本", "OKR"]
keywords: ""
description: "本文分享我使用纯文本管理我的目标(OKR)、时间(GTD)、笔记(Logseq)与财务(Beancount)的人生管理经验。"
isCJKLanguage: true
series: ["自我提升", "人生管理系统"]
og_image: "https://img.bmpi.dev/cf3a1023-57ae-b3ce-4110-9624c26f860b.png"
categories: [
    "个人成长"
]
---

我在 [我的时间管理工具](/self/gtd-tools-i-used/) 与 [我的笔记系统](/self/note-system/) 中分享过我不断演进的时间管理工具与笔记系统。在使用这些系统多年后，始终有个困惑萦绕在我耳边，那就是：

**单纯的记录时间、笔记和资金是一种碎片化的行为，容易导致过于追求细节而忘掉全局，让自己成为一个忙碌的战略懒人。**

时间管理、记账、记笔记、学习、写作、阅读、交流这些行为都不是最终目的，它们只是一种实现个人长期目标的辅助方法，如果做这些事对长期目标毫无帮助，那没必要浪费时间去做。

虽然我做了大量的时间与资金开销记录，但我也很难评估这些开销对实现长期目标有何影响。这种困扰可以看作`个人时间管理的哥德巴赫猜想`：

**我知道我的时间有一半都被浪费掉，但就是不知道哪一半**。

想解决这个问题，就得简化问题的复杂度，这个问题其实等价于以下两个问题：

1. 今天我做了啥？
2. 做这些事对我的长期目标有什么帮助？

经过一段时间的思考，我有了以下的简单模型去解决这个问题。让我们先对问题进行建模。

## 问题建模

如果把人看作一个 Machine，这个 Machine 有输入有输出。最初这个 Machine 只拥有时间维度，逐渐它拥有了技能维度，同时积累了金钱维度。如果把时间、技能与金钱看作它的输入端，那它输出端就是金钱、技能与影响力维度。其中金钱和技能在输入与输出间自循环，一般是正向的。我们的金钱和技能都会随着输入与输出的循环而提升，而影响力其实就是知识的变体，我们通过知识去影响别人，通过知识去建立权威与信誉度，最终发展出个人品牌。这个流程看起来非常像是一场 [打怪升级的游戏](/self/road_to_life_games/)。这些抽象的维度落地后就变为 [时间管理系统（目标、任务与时间）](/self/gtd-tools-i-used/)、[财务管理系统（记账、投资与保险）](/self/note-system/) 与 [知识体系（写作、笔记与个人品牌）](/self/build-personal-knowledge-system/)。

想象这个场景：通过设定个人 `OKR`，把一个个 `Key Result` 拆解为一个个 `TODO Task`，用时间管理工具去追踪这些 Task 的时间开销，用财务管理去追踪这些 Task 的金钱开销，用知识管理去追踪这些 Task 的笔记，那我们是可以知道每个 Objective 的时间与资金开销，同时也能知道这个 Objective 的输出笔记产物有哪些，最终输出的影响力程度。通过不断优化输入与输出端，我们可以形成高效的学习能力，更好的适应外界的变化。如何优化？就需要记录输入与输出端各个维度的数据。通过记录底层维度数据来把控高层目标的实现。从时间与财务性价比的角度看一个个最终执行的任务，如果某个任务能更好的推动 OKR 目标的实现，那这个任务的投入就有价值。

理想的情况是，每个人拥有自己的输入与输出各维度的 Dashboard，这样就能从宏观视角看到自己每天做的事情的价值。我们可以量化每件事情的投入产出比，去优化自己的处理流程。

[![life manage with input and output](https://img.bmpi.dev/cf3a1023-57ae-b3ce-4110-9624c26f860b.png)](https://excalidraw.com/#json=6321236086882304,R-CH9RKPBFZ4P2gFuBtbqA)

## 系统设计

在对问题建模后，我现在的业务需求是：

1. 全局的 Tag 系统。该 Tag 系统可以从个人愿景中设定年度 OKR 目标，之后可以对 OKR 的 `Key Result` 进行细粒度的 Task 拆分。
2. 任务时间开销追踪。可以对 OKR 目标的某个 Key Result 统计相关的 Task 的总耗费时间。
3. 任务资金开销追踪。可以对 OKR 目标的某个 Key Result 统计相关的 Task 的总资金成本。
4. 任务相关笔记关联。可以对 OKR 目标的某个 Key Result 关联相关的 Task 的笔记。
5. Dashboard 原始数据生成。可以自动或手动生成个人 OKR 完成度表现报告与财务健康度报告。

下图是一个从个人愿景到 OKR ，之后从 OKR 生成每日待办任务，追踪任务相关时间、资金与笔记的流程图。

[![Life Tag System](https://img.bmpi.dev/4928b4de-db94-968e-115b-767d2e2f007a.png)](https://excalidraw.com/#json=5444087800922112,qRjYlbq5jrsI0rdrPHxtVQ)

## 系统实现

我的系统实现原则是尽可能用开源的工具组合实现我的需求。所以基本原则有以下几条：

- 工具需必须要开源。不考虑商业版的原因是未知不可控的商业风险，这些工具都是要长期使用的，选择开源方案是性价比最高的。
- 工具需要具备可扩展的能力。只有可扩展的系统才具备组合的能力，这样方便后期定制化的使用。
- 工具要有一个好的社区。一个好的社区非常重要，可以让我们解决问题的成本下降很多。也可以使用别人提供的现成解决方案。
- [本地优先](https://www.inkandswitch.com/local-first/)。数据必须要存放到自己控制的存储（本地和网络都可以）中，隐私第一原则。
- 数据尽可能是纯文本。纯文本更简单，就算工具不可用，也可以直接对文本进行读取或修改。长期来看，这点很重要。
- 门槛低。最好一天上手，三天精通，我不想花费数周时间去学习一个复杂的工具。

### 现有解决方案

#### Emacs

如果直接选现成的方案，一定有人会提到这篇 [Organize Your Life In Plain Text!](http://doc.norang.ca/org-mode.html)。这篇超过 10 年历史的文章看起来如 Emacs 一样强大而久远。用 Emacs 做的确符合以上所有基本原则，问题在于我不是一个 Emacs 专家，我不想学数年 Emacs 后再开始解决这个问题。我的思路是花最多不过一周时间去用开源工具组合出一套解决我需求的方案出来。一周时间，我可能连 Emacs 快捷键都记不住。

#### 自己动手做

当我看到这篇 [Blog graph](https://beepb00p.xyz/blog-graph.html) 和 [Map of my personal data infrastructure](https://beepb00p.xyz/myinfra.html) 时整个人都震惊了。作者全部自己动手做了一套类似的系统去管理他的人生。如果我有时间的话我一定会这么尝试去做，但是我没时间。

### 工具选择

这套系统实现的关键在于需要有 `Tag`、`TODO`、`笔记管理`、`记账`等功能，记账可以用 `Beancount` 去做，只需要结合它的 Tag 功能就可以追逐相关 Tag 的开销。那么只需要选择一个具备 `Tag` 和 `TODO` 功能的开源笔记工具就行了。这么看来我们可选择的很有限了。

以最近大热的 `Roam Research` 为例，它开启了不少笔记工具的新特性：反向链接、右边栏、每日笔记及图数据库。最重要的其实是它的图数据库特性，因为当一个工具具备了数据库的查询能力时，结合插件特性我们可以做出非常多的应用场景。可惜的是它是一个商业软件且不开源（ `Notion` 也因为这个原因被排除），所以我找到了一个具备它很多特性的开源软件 [Logseq](https://github.com/logseq/logseq)，Logseq 本身受很多笔记工具的启发，如 `Roam Research`、`Tiddlywiki`、`Workflowy` 与 `Org Mode` 。

在把玩了几天 Logseq 后我发现最强的就是它底层的 DataScript 内存图数据库，可以通过高级查询做很多自定义界面。这样就可以满足我们的很多需求了，比如生成每日待办任务，根据 OKR 生成的 Tag 来过滤和 OKR 相关的任务，统计相关任务的花费时间等。

~~目前 Logseq 还在开发插件系统，等插件系统上线后，很多难以实现的功能都可以通过插件来完成~~目前 Logseq 已经实现了 [插件系统](https://logseq.github.io/plugins/)，可以有更高级的玩法。当然我的需求还不需要插件系统的支持，光高级查询就可以满足。

### 我的方案

当确定了笔记工具和记账工具后，我最终的方案如下：

![my life manage system](https://img.bmpi.dev/e48e4ba1-5c08-23b5-9292-f92e3187e5db.png)

各工具的职责如下：

- **Logseq**。负责制定 OKR 、设定相关 Tag 、拆分 OKR 相关任务并追踪任务耗费时间（时间管理）及管理这些任务相关的笔记（笔记系统）。
- **Beancount**。负责记录相关 Tag 的资金开销，当然也是我的记账工具，最终帮助我生成家庭财务健康度的评估报告。
- **Tiddlywiki**。负责公开笔记的输出。和 Logseq 的区别在于，我会将 Logseq 的一些笔记整理成可供分享的知识后发布到 Tiddlywiki 上。虽然 Logseq 支持公开某个页面，但是为了更好的区分私人笔记和公开笔记，我还是做了这个区分。
- **Amazon AWS**。我的个人云平台。目前主要是用 S3 + CloudFront 做博客的图床。[博客的页面访问数据](/dev/pulumi-aws-serverless-hugo-site-vists/) 也是用 [AWS Serverless](/dev/guide-to-serverless/) 开发实现的。
- **Wayback Machine**。类似 OneNote 和 Evernote 的 Web 剪藏工具。它可以永久保存网页的所有变更版本，所以一般无需自己把网页内容下载到笔记工具里，这样会导致笔记工具同步缓慢。我当时用 OneNote 剪藏了很多网页导致其存储达几 GB ，每次换设备同步都很头疼。实际上只需要保存网页链接即可，最多加几句总结的话助记。有 Wayback Machine 再也无需担心网页突然不见了。
- **GitHub**。项目托管与云存储平台。博客、记账与时间管理的所有数据包括文件（某些文件会放到 Google Drive 里）都存放到 GitHub 公开或私有仓库中。
- **Vercel**。博客与Wiki托管平台。可直接关联 GitHub 后一键发布网站并自带 CDN 且 [国内访问速度不错](/dev/guide-to-setup-blog-site-with-zero-cost-5/)。
- **VSCode**。文本编辑工具。一般我会用它完成博客写作、笔记写作（也可用浏览器）、绘图（也可用浏览器）、记账及代码开发。
- **Google/Twitter/YouTube**。主要的信息获取平台。主动搜索用 Google，被动获取用 Twitter 及 YouTube。中文高质量的信息获取平台越来越少了，很多时候需要用英文才能搜索到我想要的信息。所以**搜索技能**和**英文能力**已经算基本能力了。

最右侧有颜色的三个框就是我的愿景最关注的三个领域了，我的所有输出都会和这三个领域相关。

## 实现效果

使用 Logseq 完成的最终效果如下图：

![logseq](https://img.bmpi.dev/47a2eb46-1a9e-602c-fbac-f2046b9d271a.png)

每天我都可以在 Logseq 系统首页看到以`时间四象限`划分法而划分的待办任务。具体如下：

- `📅 在做计划事项`。标记为`重要`的或者和任何 `OKR` 相关的**在做**任务。
- `🌞 待做计划事项`。标记为`重要`的或者和任何 `OKR` 相关的**待做**任务。
- `⏰ 在做其他事项`。任何不`重要`的或者和 `OKR` 不相关的**在做**任务。
- `🚮 待做其他事项`。任何不`重要`的或者和 `OKR` 不相关的**待做**任务。

底部的区块是和 `OKR` 相关的信息，让我可以快速了解到目前最重要的 Objective 有哪些。

具体的实现见 [如何用 Logseq 实现 OKR + GTD + Note](/self/okr-gtd-note-logseq/) 与 [使用 Beancount 管理家庭财务](/self/beancount-my-accounting-tool-v2/)。

> 本文配图皆用 Excalidraw 绘制，更多我常用的绘图工具见 [我的绘图工具箱](/self/my-drawing-toolbox/) 这篇文章介绍。
