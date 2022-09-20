---
title: "Google软件工程之工具篇"
date: 2022-09-16
draft: false
tags: ["软件工程", "分支管理", "构建系统", "代码搜索", "静态分析", "依赖管理", "持续集成", "持续交付"]
keywords: ""
description: "本文是《Software Engineering at Google》的读书笔记，同时会穿插分享我对软件工程的理解。本文主要介绍软件工程的相关工具，主要包括版本控制、分支管理、代码搜索、构建系统、代码静态化分析、依赖管理与CI/CD等。"
isCJKLanguage: true
og_image: ""
categories: [
    "软件工程"
]
markmap:
  enabled: true
  id: "software-engineering-at-google-tool"
---

- [软件工程还是软件设计](#软件工程还是软件设计)
- [Google软件工程中的工具](#google软件工程中的工具)
  - [版本控制(Version control)](#版本控制version-control)
    - [CVCS vs DVCS](#cvcs-vs-dvcs)
      - [单一代码仓(Monorepo)](#单一代码仓monorepo)
    - [分支管理(Branch management)](#分支管理branch-management)
  - [代码搜索、构建与静态分析(Code search && Build system && Static analysis)](#代码搜索构建与静态分析code-search--build-system--static-analysis)
  - [依赖管理(Dependency management)](#依赖管理dependency-management)
  - [持续集成与持续交付(Continuous Integration && Continuous Delivery)](#持续集成与持续交付continuous-integration--continuous-delivery)
- [写在最后](#写在最后)

这是[Google软件工程系列](/categories/软件工程/)的最后一篇，这篇主要是分享软件工程中常用的工具，这些工具支撑了软件工程中的流程。但在开始之前，我们先思考一个问题：软件的研发到底是工程还是设计？

## 软件工程还是软件设计

传统工程的流程比如土木工程是设计师先设计好图纸，然后工程队按照设计图纸去施工建造，所以这里的工程既包含设计又包含建造，但负责设计的人员明显与建造的人员不是同一类人，甚至有着非常大的差异。

那软件的生产流程是什么呢？以敏捷开发流程为例，组建一个软件开发队伍，先进行Inception确定好开发的需求及范围，之后根据需求拆分故事卡，开发人员根据故事卡实现产品需求。在实现故事卡的过程中，开发人员每天会写一部分代码并在本地做自测，之后会对代码做[Code Diff](/dev/software-engineering-at-google/process/#code-review-vs-code-diff)，在这个过程中又可能重新修改设计与实现。不断重复这个过程，直到最终这部分代码进入集成环境被测试人员验收，最终会上线到生产环境。那么这个过程中既包含了设计又包含了实现（或者说建造），或者说这实际上是个不断设计的过程。

以下两篇文章推荐阅读，可能会让你对这个问题有更好的理解：

- [Are We Really Engineers?](https://www.hillelwayne.com/post/are-we-really-engineers/)
- [What Is Software Design?](https://www.developerdotstar.com/mag/articles/reeves_design.html#:~:text=The%20final%20goal,source%20code%20listings.)

## Google软件工程中的工具

> 以下是《Software Engineering at Google》一书第四部分工具篇的思维导图，由于此部分占全书近40%，所以本文不会详细地介绍其中的概念，想详细了解的读者建议阅读原书。本文会结合此书这部分内容分享作者的个人理解及相关经验。

```markmap
# Google软件工程
## 文化(Culture)
## 过程(Process)
## 工具(Tool)
- 版本控制
  - 分类
    - 集中式(Centralized VCS)
    - 分布式(Distributed VCS)
  - 存储类型
    - Monorepo
    - Polyrepo
  - 分支管理
    - Git Flow
    - GitHub Flow
    - Trunk-Based Development
    - Scaled Trunk-Based Development
- 代码搜索
- 构建系统
  - 基于任务的构建系统
    - Ant
    - Make
  - 基于制品的构建系统
    - Bazel
    - Gradle
    - Nx
- 静态分析
- 依赖管理
  - 问题
    - 钻石依赖
    - 兼容性
    - 安全性
    - 许可证
    - 运营
  - 管理方式
    - 静态依赖模型
    - 语义化版本
    - 绑定分发模式
    - Live at Head
- 持续集成
- 持续交付
```

### 版本控制(Version control)

在众多软件工程所用的工具中，最重要的我觉得就是版本控制系统了（Version Control System）。版本控制系统从字面意思就可以看出来是控制源代码的版本的，VCS就像时间宝石一样让开发人员在源代码历史中穿梭，为什么这种能力很重要？

其实这和本文开头那个问题相关，如果说软件开发是一个设计的过程，那这个设计可能需要不断修改，能最低成本地在不同版本间切换非常重要，更重要的是这种能力可以让多人协作完成软件的设计与开发。

> Development is inherently a branch-and-merge process, both when coordinating between multiple developers or a single developer at different points in time. (Software Engineering at Google)

版本控制也让软件开发过程中产生了Code Diff或Code Review的过程进而促进团队知识共享，而这又是软件工程中文化的一部分。版本控制也影响了软件的部署过程，比如结合Pipeline与Artifact Repository，可以构建出不同环境不同版本的软件制品。

#### CVCS vs DVCS

早期的版本控制系统是集中式(CVCS)的，比如Subversion，现在更流行的是分布式的（DVCS），比如Git。这两者的区别可以看这篇文章：

- [GitSvnComparison](https://git.wiki.kernel.org/index.php/GitSvnComparison)

CVCS与DVCS仅仅是适用的场景不同，并不意味着后者是前者更好的替代。比如很多大的公司或组织，如Google、Microsoft与FreeBSD都在用CVCS。一般来说大的公司更偏向于用CVCS，与CVCS密切相关的就是单一代码仓(Monorepo)了。

> 分布式版本控制系统如Git，其实是没有中央存储库的。我们在GitHub克隆某个仓库到本地，其中的`origin`其实是刻意约定设置成中央仓库的，但我们可以在本地仓库中添加多个远端中央仓库，也可以`rebase`多个远端仓库的代码到本地仓库。

##### 单一代码仓(Monorepo)

Monorepo简单理解就是把整个组织的所有项目的代码都放入一个仓库中。初看不可思议，但Monorepo并不仅仅是把代码放一块就行了，它需要一整套的流程与工具链支撑，比如不同团队协作模式、代码库之间的依赖管理、目录的权限配置、构建与发布等。

与以Git为主的Polyrepo（一个项目一个代码存储库）存储库模型相比，Monorepo有如下的好处：

- 代码共享：所有人都可以看到其他人的代码，能降低重复代码；
- 统一依赖：不会出现多个项目依赖相同三方包的不同版本导致的冲突问题；
- 跨项目修改简单：大规模跨项目的重构更简单了，能一次修改多个项目的代码；
- 共享构建发布流程：能共享同一套构建发布流程，简化基础设施的复杂性；

> Developers within an organization must not have a choice where to commit, or which version of an existing component to depend upon.  (Software Engineering at Google)

进一步了解，强烈推荐阅读这篇文档：

- [Monorepo Explained](https://monorepo.tools/)

#### 分支管理(Branch management)

版本控制系统不仅可以让开发人员具备<q>时间穿梭</q>的能力，还具备开辟<q>多重宇宙</q>的能力，这就是分支(Branch)的功能。分支不仅仅是代码的不同版本，它还深刻的影响了开发部署的流程。

早期流行复杂的[Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)分支模型，但这种模型带来了很复杂的维护成本，包括分支的管理、冲突的解决等问题。最终逐渐演变出更简单的主干分支开发([Truck Based Development](https://trunkbaseddevelopment.com/))模型。

> 主干开发分支在实践中可能存在的问题是，主干分支与流水线（Pipeline）的集成，一般会有不同环境，如CI、INT、UAT、PROD等。当开发人员要在集成环境测试时，如果有紧急的Hotfix代码要推送到生产环境，这时候主干分支中还包含着集成环境的开发代码，就算有特性开关(feature toggle)的支持，也不敢直接把这些代码推入到生产环境。此时能做到就是回滚(git revert)这部分代码回去。这个问题本质还是因为测试环境有限，无法做到一个代码变更部署到一个临时创建的测试环境中，这时候主干开发分支可能需要做一定的调整，比如用Release分支来发布，主干分支做开发代码的Single Source of Truth。

不同分支模型的介绍，推荐这篇文章：

- [Git(Hub) Flow, Trunk Based Development, and Code reviews](https://reviewpad.com/blog/github-flow-trunk-based-development-and-code-reviews/)

### 代码搜索、构建与静态分析(Code search && Build system && Static analysis)

代码搜索可以用最简单的`grep -r`命令或者IDE的搜索功能来实现，但要在多个代码仓库间高效地对某些代码进行跨仓库搜索，那这些工具可能很难满足需求。

Google自研了一套代码搜索的工具，这个代码搜索工具甚至可以和其他系统如日志查看系统集成。

[Sourcegraph](https://sourcegraph.com/search)是一个开源免费的代码搜索云服务，可以与GitHub集成，提供良好的代码阅读体验。

Google同样实现了自己的基于制品的构建工具[Bazel](https://bazel.build/)，Bazel也是支持Monorepo很好的构建工具，同样的还有[Nx](https://nx.dev/)与[Gradle](https://gradle.org/)。

代码静态分析就像自动化的Code Review一样，能帮助发现代码中的质量与安全问题，减少不必要的Review时间，提升代码质量。流行的代码静态分析工具中，[SonarQube](https://www.sonarqube.org/)是推荐的。

### 依赖管理(Dependency management)

依赖管理可能是软件工程中最复杂的问题之一（短期编程代码无需考虑此问题）。现代软件是建立在大量的依赖库或框架之上的，这些外部代码很多并不受开发人员的控制，当软件变得越来越庞大时，大量的依赖可能会形成复杂的依赖树（如在Gradle项目中，`gradle dependencies`命令可以打印出应用的依赖树）。

依赖问题最多的可能是钻石依赖问题，简单说就是同一个包的不同版本共存的问题，这在某些编程语言如Java中影响并不大，因为多个版本可以共存，除非在某些特殊的场景下，不同的包可能会造成一些很诡异的Bug。

在[Black Duck](https://github.com/blackducksoftware)中又把依赖的问题分为三大类：

- 许可证(License Risk)：商业应用对依赖包的License有限制，比如无法使用GPL类的License。
- 安全(Security Risk)：依赖包经常会被爆出重大的安全[CVE](https://nvd.nist.gov/vuln/search/results?form_type=Basic&results_type=overview&search_type=all&isCpeNameSearch=false)问题，有时候因兼容性的问题很难去通过版本升级来修复。
- 运营(Operational Risk)：一些小众的编程语言如Clojure的很多包，经常无人维护或者缺乏更新，导致存在潜在的运营风险。

另外一个主要的问题就是兼容性的问题，比如API出现破坏性的更新，或者ABI无法兼容。

> 编程语言ABI(Application binary interface)兼容性：与API(Application programming interface)类似，是描述二进制文件的兼容性。比如Java有ABI兼容性的保证，意味着基于新版本JDK的代码可以安全地调用老版本JDK的Jar包。

在解决API变化导致的依赖问题上，业界一个流行的方案是语义化版本：[SemVer](https://semver.org/lang/zh-CN/)。通过将版本拆分为三部分，如`x.y.z`，x是破坏性更新版本号，y是特性版本号，z是Bug修复的版本号。我们可以在依赖配置文件如`package.json`中通过`^`或`~`符号来指定依赖的最大版本号范围。

依赖管理的问题也可能和代码设计有关。比如应用对某个外部服务有依赖，如何降低外部API变化对应用代码的影响？这个问题可以从设计模式的角度去解决，比如创建一个适配层（如[Gateway](https://martinfowler.com/articles/gateway-pattern.html)模式），通过定义一个抽象的接口层去实现，而非依赖具体的外部API去实现。

### 持续集成与持续交付(Continuous Integration && Continuous Delivery)

CI是一种团队开发软件的实践，在代码变更集成到主代码分支前尽早的捕捉变更带来的问题，流程主要有[自动化的测试](/dev/software-engineering-at-google/process/#测试testing)与构建，CI工具可以帮助开发人员快速获得代码变更是否正确的反馈。

常用的CI工具有：[GitHub Actions](https://github.com/features/actions)，[GoCD](https://www.gocd.org/)与[Jekins](https://www.jenkins.io/)。这些工具也称为流水线（Pipeline)，不仅支持UI的操作，还支持[Pipeline as Code](https://www.thoughtworks.com/radar/techniques/pipelines-as-code)。

> 实际的CI工具一般受制于服务器资源的限制，很难做到一个代码变更(Code Commit)自动部署一个测试验证环境（这也被称为[无限环境CI](https://insights.thoughtworks.cn/real-agile-workflow-github-flow/#:~:text=都被执行。-,无限环境)）。目前只有少数的云服务可以支持前端项目的无限环境CI，比如[Cloudflare Pages](https://pages.cloudflare.com/)，[Vercel](https://vercel.com/)与[Netlify](https://www.netlify.com/)等。

CD发生在代码集成后，包括从代码集成后到发布变更的软件给用户的过程，良好的CD实践既可以快速进行价值交付，又可以快速获得用户反馈。持续交付的原则和[敏捷的方法论](/dev/software-engineering-at-google/culture/#:~:text=这里以-,敏捷,-过程为例)有一些重合的部分：

- 敏捷：小而频繁地发布过程，快速获取反馈。
- 自动化：通过自动化的手段降低发布的时间成本。
- 隔离：采用模块化的架构设计使需求变更和故障排除更简单。
- 可靠：通过技术监控提高系统的可靠性。
- 数据驱动：使用埋点或A/B测试获取用户反馈的数据，通过数据做决策。
- 分步发布：产品特性先灰度发布，确保无误后再全量推送给用户。

## 写在最后

软件工程或者说软件设计是个复杂的活动，其中既涉及文化相关的东西，又有很复杂的流程及一系列的工具集。如果把这些过程与相关工具结合到一起看，就会出现这么一幅复杂的全景图：

[![](https://img.bmpi.dev/50335ea3-4e20-5811-dc55-6ff1e7148001.png)](https://casberw.medium.com/evolution-of-the-software-development-life-cycle-sdlc-the-future-of-devops-38d1f68c6812)

从这个角度看，《Google软件工程》这本书只是从大纲的角度去介绍这些知识，真正的问题还需要我们在研发软件的实践中去体会。这系列文章也只是结合作者自己的知识经验去理解这本书，如有错误，欢迎指正。
