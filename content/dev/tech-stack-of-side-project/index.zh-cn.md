---
title: "我的个人项目技术栈"
date: 2021-04-17
draft: false
tags: ["编程语言", "基础设施", "SaaS", "监控分析", "技术栈", "Infrastructure as code"]
keywords: ""
description: "本文分享我的个人项目技术栈，包括编程语言、框架与库、数据库、基础设施、CI/CD、监控分析、设计及常用的SaaS服务。"
isCJKLanguage: true
---

---
- [编程语言](#编程语言)
- [框架与库](#框架与库)
- [技术架构](#技术架构)
- [数据管理](#数据管理)
- [基础设施](#基础设施)
  - [云平台](#云平台)
  - [负载均衡](#负载均衡)
  - [DevOps相关](#devops相关)
  - [监控分析](#监控分析)
- [工具](#工具)
  - [编辑器](#编辑器)
  - [浏览器](#浏览器)
  - [CLI](#cli)
  - [设计](#设计)
- [SaaS服务](#saas服务)
  - [开发相关](#开发相关)
  - [邮箱服务](#邮箱服务)
  - [知识管理](#知识管理)
  - [与人协作](#与人协作)
  - [安全认证](#安全认证)
  - [广告平台](#广告平台)
  - [Affiliate平台](#affiliate平台)
  - [收款平台](#收款平台)
- [其他](#其他)
- [如何调研产品的技术栈](#如何调研产品的技术栈)
- [合规问题](#合规问题)
  - [公司规定](#公司规定)
  - [知识产权](#知识产权)
  - [法律法规](#法律法规)
- [进阶阅读](#进阶阅读)

---

作为一名软件工程师，我很喜欢去研究某个产品或公司背后的技术栈，从产品外在的蛛丝马迹去窥探背后所用的技术栈是一件很有趣的事情。了解不同产品所用的技术栈不仅有助于我开阔眼界，也能提高我个人产品或项目的产出效率，比如发现新的有趣的技术或工具我都会尝试将其融入到我的个人技术栈中。

个人项目追求的是短平快，所选的技术栈和公司项目差异很大。比如很多公司项目的主力编程语言为 Java，Java 属于很适合大规模协作的工业级语言，优秀的工程化能力使其很适合团队协作。不过它并不适合个人项目使用，有些刻板的语法和笨重的 JVM 导致其很难运行在低内存的服务器上。

回顾我的一些 [个人产品或项目](/project/)，所用的技术栈本身也在不断的演进，我始终追求的是使用更高效的工具完成高质量的技术设计与实现。当然技术只是工具，我只是在选择适合的工具去实现我的产品或项目目标。

在看到这篇 [The Tech Stack of a One-Man SaaS](https://panelbear.com/blog/tech-stack/) 文章时，我产生了写作这篇文章的想法。在接下来的内容中我会将自己所用的技术或工具分享并做简短的点评，这些点评只是我个人的主观感受，某些观点可能存在片面的认知，如果你有不同的想法，欢迎留言与我沟通讨论。

## 编程语言

```text
编程语言的选择不只反应了一个程序员的品味和追求，同时也会影响他/她的个人思维模式和产出效率。
```

编程语言的选择可不只是换一种语法，不同的语言具备不同的特点。比如你用 PHP 开发了一个不错的产品，突然流量大爆发，并发问题很快就出现了。如果大量的添加服务器不仅会在产品收益不明确的情况下增加投资风险，同时也增加了维护成本。个人项目本身就是利用业余时间做的，资金和时间是很有限的，如何在有限的时间内产生最大的收益，编程语言的选择是个重要的影响因素。

除了并发这种一般产品不会遇到的问题，另外一个对开发效率产生重大影响的莫过于语言的表达力，同样的功能，强表达力的语言可以用很少的代码完成，代码量越少出现 Bug 的机会也越少。比如这篇 [如何阅读一份代码](https://zhuanlan.zhihu.com/p/26222486) 文章中分析 Rails (Ruby)、Django (Python) 与 Phoenix (Elixir) 框架的总代码规模，Phoenix 比前两个小了整整一个数量级，可见 Elixir 的表达力有多强。

表达力另外一个重要的影响在于会影响阅读代码。比如 Clojure 的 [Liberator](https://github.com/clojure-liberator/liberator) 是一个实现 [HTTP/1.1](https://tools.ietf.org/html/rfc2616) 协议的 RESTful 库，总代码行数只有 1.2K 行，如果要研究 HTTP 协议的话读这个库的源码是个很好的途径。如果换成 Java 库的话，估计上万行只是一个开始。因为 Elixir 强大的表达力，其很多库总规模都在几千行之下，这种规模不会让人望而却步。使用这类语言会在不知不觉中，让你被动的阅读了很多优秀的源码，也逐渐提高了使用者的编码与设计能力。

- [Elixir](https://github.com/elixir-lang/elixir) — 我的主力后端语言。继承 Erlang 分布式、高并发与容错的能力，有着如 Ruby 般简洁而强大的表达力，还能 [以 REPL 驱动开发](https://blog.cleancoder.com/uncle-bob/2020/05/27/ReplDrivenDesign.html)，这是一门非常适合个人项目的编程语言。我曾用它花费一周业余时间开发出一个峰值日 PV 达 3 万的 [网站](https://github.com/bmpi-dev/instaghub)，考虑到网站的爬虫请求，日请求达 10 万，仅仅需要一台内存 1GB 单核 CPU 的月收费仅 5 美元的 VPS 服务器。
- [Python](https://github.com/python/cpython) — 万能的胶水语言。我曾用它开发过很多自动化或提升效率的小工具，也用它开发过爬虫、流量站、 App 和小程序的后台系统，还用它分析过股票交易的一些数据，可以说我的生活离不开 Python。
- [Clojure](https://github.com/clojure/clojure) — 可能是 JVM 生态里最适合个人项目的编程语言了。无论是 Java/Kotlin/Scala 都不小巧。Clojure 是一种 Lisp 方言，拥有很多 Lisp 的优点，内核小巧但具备极强的扩展能力。同时能利用 Java 生态丰富的轮子，不用重复造轮子就是高生产力的体现。Clojure 也是全栈，既可以做后端也可以做前端（[ClojureScript](https://clojurescript.org/)，开源的类 [Roam Research](https://roamresearch.com/) 的笔记工具 [Logseq](https://github.com/logseq/logseq) 就是使用它开发的）。我在个人项目中还没有使用过它，不过准备尝试在一些个人项目中使用。
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) — Web 开发离不开 JavaScript，无论你爱不爱它，都离不开它。我的前端技术仅限于开发简单的网站。不过 JavaScript 的应用范围是越来越大了，除了在网页端的应用，很多跨平台的桌面端程序都通过 [Electron](https://www.electronjs.org/) 技术将 JavaScript 程序封装打包出的。随着 [Serverless](/dev/guide-to-serverless/) 技术的普及，JavaScript 也成为 Serverless 开发第一支持的编程语言，不只可以做 Function，也可以实现 [IaC](/tags/infrastructure-as-code/) 构建基础设施（如 [Pulumi](https://www.pulumi.com/) 中支持用 JavaScript 描述云服务基础设施）。
- [Swift](https://github.com/apple/swift) — 想在 Apple 生态赚钱离不开的编程语言。早先做 iOS 开发的时候，我用 Swift 开发上架过两个 App。Swift 当时 ABI 还没稳定，经常从入门到重新入门，语法很不稳定，不过其语言的表达力相比它的老大哥 Objective-C 还是强不少（曾经用 Swift 重构过一个 App，同样的功能其比 Objective-C 要少 4/5 的代码）。如果未来还要在 iOS 上开发 App，我还是会选择 Swift。

## 框架与库

```text
好的框架，事半功倍。
```

- [Phoenix](https://github.com/phoenixframework/phoenix) — Phoenix 是我用过很好的 Web MVC 框架。其有着 Rails 的工程设计，同时具备 Erlang 平台的高并发容错能力。得益于 Erlang 的进程管理能力，Phoenix 很擅长处理长链接，比如实时聊天或者游戏的应用场景。这篇 [The Road to 2 Million Websocket Connections in Phoenix](https://www.phoenixframework.org/blog/the-road-to-2-million-websocket-con`nections) 文章分享了在 Phoenix 单机支持 200 万 Websocket 长链接的测试。
- [Django](https://github.com/django/django) — Django 是很适合做 CMS 管理系统的框架。我用它来做一些 App 或者 小程序的后台管理系统，其可以直接从数据库生成 CRUD 代码，甚至包括管理界面。
- [~~Laravel~~](https://github.com/laravel/laravel) — PHP 语言里最流行的 MVC 框架。很早的时候简单用过，不过考虑到性能始终是它的达摩克利斯之剑，我最终用 Phoenix 替代了它。
- [Pure CSS](https://github.com/pure-css/pure) — 非常轻量级的响应式 CSS 库。我用它替代庞大的 Bootstrap 库，越轻量的库对加载速度的影响越小，而这会潜在的影响网站的用户体验和 [SEO](/dev/what-is-seo/)。
- [Vue.js](https://github.com/vuejs/vue) — 用 Vue 写过一些简单的页面，个人感觉入门很快。适合后端开发者写前端应用。
- [NextJS](https://github.com/vercel/next.js/) — React 框架很复杂，这框架是为了让使用 React 变得简单。我没有用过这个框架，不过这个[框架很火](https://trends.google.com/trends/explore?date=today%205-y&q=nextjs,vuejs)，未来的 Web 应用我会尝试使用这个框架去开发。
- [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) — 写 CSS 一直让我很头疼，大概原因是 CSS 和正常的编程语言完全不同（并不是图灵完备），有很多难以预料的情况埋藏在冰山之下。这框架是让写 CSS 像写后端一样简单。听说 [Tailwind + NextJS](https://github.com/shfshanyue/next-app) 配合起来效果更棒。未来我也会尝试用它来替代直接写 CSS。
- [Tushare](https://github.com/waditu/tushare) — 量化交易 A 股必备库。可以很方便的获取各种 A 股股票和基金行情数据。不过数据质量 [Pro](https://tushare.pro/) 版本的更高，需要一定的积分才能调用相关 API。我的 [双均线交易策略提醒策略模块](https://github.com/bmpi-dev/invest-alchemy/blob/master/core/src/main.py) 就是用此库开发的。
- [Scrapy](https://github.com/scrapy/scrapy) — Python 第一爬虫库。大多时候我都用 [Requests](https://pypi.org/project/requests/) 库解决刮取（Scrape）数据的问题，Scrapy 更适合大规模的爬取网站场景。谨记 **爬虫玩得好，牢饭吃到饱**。

## 技术架构

- 单体应用 — 单体应用很适合个人项目，和流行微服务架构相反，个人项目追求用简单的架构去快速完成 MVP 版本。如果架构太复杂了，会导致开发与维护成本达到难以接受的程度。
- ~~微服务~~ — 我的个人项目没有微服务架构的，倒是公司项目用微服务架构的很多。因为微服务架构更容易将大的功能拆分成不同的微服务模块供不同团队协作开发，同时扩容做起来更容易一些。
- [Serverless](/dev/guide-to-serverless/) — 随着 Serverless 的逐步成熟，我在最近的一些项目逐渐开始应用。比如本 [博客的文章阅读统计](/dev/pulumi-aws-serverless-hugo-site-vists/) 就是使用 Serverless 架构开发实现的。这种架构很适合流量比较低的应用，成本相比直接租用单台服务器便宜，哪怕流量起来了服务也很容易弹性扩容。因为个人项目的用户数量一般都比较低，尤其是刚开始流量可以忽略不计，该架构就很适合这种场景，同时可以利用很多云平台的服务完成复杂的功能开发。公司的项目可以配置全功能团队包括 DevOps ，但个人项目的 DevOps 工作可以通过 Serverless 架构转移给云平台。

## 数据管理

```text
核心是数据。
```

- [SQLite](https://github.com/sqlite/sqlite) — SQLite是个 [严肃的数据库](https://antonz.org/sqlite-is-not-a-toy-database/)，还是 [真正的 Serverless 数据库](https://www.sqlite.org/serverless.html)，比如这个 [datasette](https://github.com/simonw/datasette) 库可以将 SQLite 数据库的数据直接发布成在线数据。甚至可以将 [SQLite 托管至 Github Pages](https://phiresky.github.io/blog/2021/hosting-sqlite-databases-on-github-pages/)。我的一些小工具甚至静态化渲染的网站背后的数据库就是它。其还可以用作强大的数据分析平台。要说缺点的话，它的数据库不支持并发写入，这也是我在个人项目中不得不使用重量级的关系数据库。
- [MySQL](https://github.com/mysql/mysql-server) — 公司项目和个人项目都会用的数据库。MySQL 除了有点重量级外，对于个人项目来说没有啥缺点。
- [PostgreSQL](https://github.com/postgres/postgres) — 相比 MySQL 来说，PostgreSQL 支持很多高级特性。比如这个 [postgrest](https://github.com/PostgREST/postgrest) 库可直接将 PostgreSQL 数据库发布成 REST API，甚至有基于此库的 SaaS 服务如 [supabase](https://github.com/supabase/supabase) 可提供类 [Google Firebase](https://firebase.google.com/) 的功能。
- [Redis](https://github.com/redis/redis) — Redis 本身的功能很丰富（缓存、计数、分布式锁与排行榜等），不过我在个人项目中主要用来做缓存。
- [AWS DynamoDB](https://aws.amazon.com/dynamodb/) — AWS 的 NoSQL 数据库。它的优势在于可以作为以 AWS 众多服务构建 Serverless 架构的数据库，比如本博客的阅读量数据就是存放在此服务上的。
- [AWS S3](https://aws.amazon.com/s3/) — 价格便宜的无限存储服务。S3 的玩法很多：
  - 爬虫爬取的数据可以存放上去，比如 [GH Archive](https://www.gharchive.org/) 定时爬取 GitHub 各类事件然后存储至 S3 以供进一步做大数据分析；
  - 定时生成的静态页面存放上去，我有一个网站就是通过定时程序生成几十万静态页面托管上去的；
  - 将日志存放上去做进一步的分析，比如网站的请求日志存放上去通过 [AWS Athena](https://aws.amazon.com/athena/) 以SQL形式查询做数据分析。
- [Google Sheets](https://www.google.com/sheets/about/) — Google Sheets 不只是个具备实时协作的电子表格。它还可以：
  - 可作为数据库。比如 [Sheety](https://sheety.co/) 这个服务可将电子表格作为数据库并发布成 API 以供应用去消费数据；
  - 可作为 TMS 系统。这个 [Tweet](https://twitter.com/THlNGSWORK/status/1391641654403256323) 显示如何用 Google Sheets 做多国语言的翻译；
  - 可作为 CMS 系统。比如结合 AWS Lambda 可做出一个 [博客后台管理系统](https://andreaskeller.name/blog/nextjs-google-sheets-cms)。比如我的 [社交数据监控 Dashboard](https://datastudio.google.com/u/0/reporting/6c3c6d3d-cd2f-4f8c-85e6-c06d672c445b) 后台就是 Google Sheets，结合 [Apps Script](https://script.google.com/) 可以做到自动获取最新社交数据。

## 基础设施

```text
个人项目的关键在自动化，自动化的重点在基础设施。
```

### 云平台

- [AWS](https://aws.amazon.com/) — 除了有点贵，其他都很好的云平台。AWS 的一些服务很便宜但某些非常贵，在全面应用个人项目时最好先踩坑测试了解下。对于个人开发者来说加入 [AWS Community Builders](https://aws.amazon.com/developer/community/community-builders/) 是个学习 AWS 不错的途径，有啥问题可以直接在社区请求支持。我在学习测试了小半年后将个人项目全面转向了 AWS 平台。
  - S3 — 无限存储。适合部署静态网站，费用便宜。还可以存放日志等各种文件。
  - CloudFront - 访问速度并不快的CDN，结合 S3 服务可以直接部署静态网站。
  - SQS — 标准队列 + FIFO 消息队列，如果个人项目中需要 MQ 的话可以考虑使用这个。
  - SNS — 推送服务，支持邮件、短信及 App 推送。我在 [双均线交易策略提醒模块](https://github.com/bmpi-dev/invest-alchemy/blob/master/api/sns.js) 就是使用此服务实现的。
  - EC2 — 弹性计算服务器。个人项目对实时性要求不高的服务或者一些后台任务可以选择 Spot 实例，比如我的一个开源项目中使用 Spot 实例购买的单核 1GB 内存的服务器一个月的花费只有不到 3 美刀。这比很多 VPS 服务商的价格都便宜。
  - Lambda — 按需收费的 Serverless 计算服务。比如本博客的 [图片优化功能](/dev/aws-lambda-edge-img-to-webp/) 就是使用此服务运行的。
  - Dynamodb — 见 [数据管理](#数据管理) 里的介绍。
  - CloudWatch — 可查看各服务的日志，调试 Lambda 必备。还可以做定时任务，最小分钟级别。
  - ECS — 运行 Docker 的服务。
  - ECR — 存放自定义 Docker 镜像的私有仓库。
  - Fargate — 适合任务型服务，冷启动时间超过一分钟，按秒计费，需结合 ECS/EKS 运行。比如我在 [双均线交易策略任务模块](https://github.com/bmpi-dev/invest-alchemy/tree/master/core/Infrastructure/tf-fargate) 中使用此服务定时生成交易信号。
  - CloudFormation — AWS 的 IaC，基础设施代码化。比如我用这个 [aws-ethereum-miner](https://github.com/bmpi-dev/aws-ethereum-miner/blob/master/template.yml) 模版去启动 EC2 集群挖矿。
  - Certificate Manager — HTTPS 证书管理服务，我所有的域名 TLS 证书都用它免费申请的。
  - API Gateway — API 网关，我一般用它做 Serverless 架构的 REST API 网关。
  - Billing — 时刻关注账单变化，可以设置某个阈值，超过立即发邮件告警。
  - 其他服务 — 这里面有一些非常隐蔽收费很贵的服务，我就曾掉过坑里，比如 Aurora Serverless、VPC 等服务，具体可看我的这个 [AWS各服务解释](https://wiki.bmpi.dev/#AWS各服务解释) 的详细介绍。
- [Vercel](https://vercel.com/) — 非常好的静态网站部署服务，[Vercel 的 CDN 在国内访问速度很快](/dev/guide-to-setup-blog-site-with-zero-cost-5/)。本博客与 [我常用的工具](/tool/) 网站都是用其一键部署的。
- ~~Netlify~~ — 静态网站部署服务，已被 Vercel 替代，因为其 CDN 在国内访问很慢。
- ~~Vultr~~ — VPS 服务，已被 AWS 替代，AWS EC2 Spot 实例很便宜。

### 负载均衡

- [Nginx](https://github.com/nginx/nginx) — HTTP 应用与反向代理服务，也可做 TCP/UDP 代理服务。早年我搭建个人博客或静态网站都需要使用 Nginx，不过现在静态网站我都使用 Vercel 或者 AWS S3 + CloudFront 的组合。当然很多复杂的系统还是得用 Nginx 或 [OpenResty](https://github.com/openresty/openresty)，OpenResty 可以直接使用 Lua 脚本编写复杂的逻辑运行在 Nginx 之上，可以做很多好玩的应用，快速构造出足以胜任 10K 乃至 1000K 以上单机并发连接的高性能 Web 应用系统。如果对 Lua 脚本不熟悉，还可以使用 [Nginx-Clojure](https://nginx-clojure.github.io/)，一个在 Nginx 进程上运行 JVM 虚拟机的框架，可以使用 Clojure/Java/Groovy 编程语言开发基于 Nginx 的高并发应用。

### DevOps相关

- [GitHub Actions](https://github.com/features/actions) — GitHub 提供的 CI/CD 服务。我在 [我的时间管理工具](/self/gtd-tools-i-used/) 这篇文章分享过利用 GitHub Actions 实现定时邮件提醒每日待办事项的功能。也使用它实现了 [Elixir 程序集成测试](https://github.com/bmpi-dev/invest-api/blob/master/.github/workflows/elixir.yml) 的功能。
- [Pulumi](https://github.com/pulumi/pulumi) — 可编程的 [IaC](/tags/infrastructure-as-code/) 工具。我很喜欢这个工具，因为可以使用非常少的代码就实现了自动创建 AWS EC2 服务器、配置域名、创建 Serverless API、创建 VPC 安全组、申请 HTTPS 证书等复杂的手工工作，这么复杂繁琐的工作代码只需 [几十行](https://github.com/bmpi-dev/invest-assistant/blob/master/IaC/aws/backend/pulumi/index.ts) 就能搞定。由于完全的代码化，可以很方便的修改出一套新的基础设施架构，甚至可以对基础设施进行代码测试。
- ~~[Terraform](https://github.com/hashicorp/terraform)~~ — 基于 Yaml 的 [IaC](/tags/infrastructure-as-code/) 工具，由于其使用 Yaml 这种配置文件去做 IaC，对个人项目来说有点复杂了，比如我在 [双均线交易策略任务模块基础设施](https://github.com/bmpi-dev/invest-alchemy/tree/master/core/Infrastructure/tf-fargate) 中就是用 Terraform 实现定时任务所需的基础设施资源。相比之下我还是更喜欢 Pulumi 这种编程的方式去实现 IaC，所以我用 Pulumi 代替了它。
- ~~[Serverless](https://github.com/serverless/serverless)~~ — Serverless 框架，可以很方便的定义 Serverless API，我在 [Invest Alchemy](https://github.com/bmpi-dev/invest-alchemy/tree/master/api) 中的 API 就是用此框架实现的。不过 Pulumi 也可以很简单实现它的功能，所以我用 Pulumi 代替了它。
- [Docker](https://github.com/docker) — 容器工具。一般个人项目涉及的服务少，服务器配置也低，所以我在个人项目中使用 Docker 比较少。比如在 [双均线交易策略任务模块服务器环境](https://github.com/bmpi-dev/invest-alchemy/blob/master/core/Dockerfile) 就是用 Docker 定义的。
- [Ansible](https://github.com/ansible/ansible) — IT 自动化平台。一般应用场景是利用 Pulumi 创建了基础设施中的服务器，需要对服务器做一些配置，比如安装软件及对软件做一些配置，服务器少的话人工登陆服务器去做配置就可以，但是如果服务器很多或经常需要需要创建一套新的服务器环境，那人工配置还是很麻烦的。我在 [Invest Assistant](https://github.com/bmpi-dev/invest-assistant/tree/master/IaC/aws/backend/ansible) 项目中利用 Ansible 完成了：
  -  自动登陆服务器安装 Elixir 应用所需要的依赖包；
  -  对应用程序依赖的环境变量做配置；
  -  使用 Let's Encrypt 设置 HTTPS 证书；
  -  配置 Nginx；
  -  对系统进行性能调优，使其能满足应用高并发的系统配置需要。

### 监控分析

- [Logz](https://logz.io/) — 在线 [ELK](https://www.elastic.co/what-is/elk-stack) 服务。如果自己搭建 ELK 的成本会非常高，因其对服务器的配置要求高。Logz 提供的免费版足够个人项目做日志分析。我一般对流量站项目会做日志分析，比如查看页面的 404/429 占比、爬虫请求占比及爬虫请求量趋势等。
- [Google Analytics](https://analytics.google.com/) - 网站流量监控分析服务。一般网站都会使用 GA 进行流量监控。我一般用 GA + [Search Console](https://search.google.com/search-console) 综合分析网站 [SEO](/tags/seo/) 的效果。
- [Sentry](https://sentry.io/) - 应用运行日志收集服务。我主要在 App 开发中会使用此服务做 App 的崩溃日志收集。

## 工具

```text
好工匠需要好工具。
```

### 编辑器

- VSCode — 早年尝试了不少编辑器，现在写代码与写文章只用 VSCode，丰富的插件生态能够满足我的大部分需求，甚至我还修改发布过一个 [TODO++](/dev/vscode-plugin-development-notes/) 的插件。

### 浏览器

- Chrome — 我一般用 Chrome 自带的控制台调试 Web 网页。也会安装很多插件提高我的开发效率，比如这篇 [我常用的浏览器插件](/self/my-favorite-browser-plugin/) 分享我常用的 Chrome 插件。

### CLI

- curl — curl 很适合调试 HTTP 应用。使用 curl 可以完整看到 HTTP 交互的很多细节包括 TLS 握手过程、HTTP 请求与响应的详情等。
- lsof — 我一般用 lsof 查看端口占用的进程、进程打开文件及进程的网络链接。
- netstat — 我一般用 netstat 查看当前端口占用、当前网络链接及 TCP 协议的某个端口监听进程。

具体详见我的 Wiki 笔记 [网络调试](https://wiki.bmpi.dev/#网络调试)。

### 设计

- Sketch — 我曾用它做过 App 的原型设计，当然也可以用它设计文章配图。
- Photoshop — 主要用它来修个图。
- [Figma](https://www.figma.com/) — 目前很火的在线协作 UI 设计平台。可以用它来替代 Sketch。
- [iconfont](https://www.iconfont.cn/) — 矢量图标库。我用它来代替 [Font Awesome](https://fontawesome.com/)。
- 常用绘图工具 — 这篇 [我的绘图工具箱](/self/my-drawing-toolbox/) 分享了我常用的绘图工具。

## SaaS服务

```text
Time is money. 用钱买 SaaS 服务是提高个人效率最直接的方式。
```

### 开发相关

- [GitHub](https://github.com/) — 源码托管平台。我一般用 GitHub 私有库存储个人重要的数据，公开库托管个人开源项目。当然 GitHub 也是一个社交平台，我会 Follow 一些我关注技术的专家，从他们的 Timeline/Feeds 中找到一些我没了解过的技术。
- [Namecheap](https://www.namecheap.com/) — 便宜的域名供应商，我的所有域名都是在这上面购买的。
- [Airtable](https://airtable.com/) — 类 Google Sheets 的 Low Code 平台。可以使用表格存储数据，快速完成应用原型开发。
- [Google Data Studio](https://datastudio.google.com/) — 简单上手的数据可视化平台。我用 Google Sheets + Google Data Studio 完成了我的 [社交平台数据监控 Dashboard](https://datastudio.google.com/u/0/reporting/6c3c6d3d-cd2f-4f8c-85e6-c06d672c445b/page/MnJzB)。

### 邮箱服务

- [TinyLetter](https://tinyletter.com/) — 免费的邮件订阅平台。我用它实现博客的 [邮件订阅](https://tinyletter.com/i365) 功能。

### 知识管理

- [Notion](https://www.notion.so/) — Notion 很适合团队协作。我用它管理一些公开的笔记或者家庭的笔记。我还建了一个 [Notion好站列表](https://github.com/madawei2699/notion-sites) 的 Repo 来收集不错的 Notion 公开笔记。
- [Logseq](https://logseq.com/) — Logseq 是一款开源的笔记工具（甚至可以理解为一个基于数据库的应用）。我在 [我的人生管理系统](/self/life-in-plain-text/) 分享如何基于 Logseq 去制定一套从个人愿景到具体阶段任务的人生管理系统。
- ~~OneNote~~ — 我最早使用的一款笔记工具。我还专门写过一篇 [用OneNote管理你的知识](/self/onenote-intro/) 的文章分享我的 OneNote 使用经验。但是 OneNote 是商业工具，同时不支持很多我想要的特性，最终我用 Logseq 替代了它。

### 与人协作

- [Zoom](https://zoom.us/) — 我一般用 Zoom 来与人协作，Zoom 的视频会议稳定性不错。如果国内没法访问的话，可以用腾讯会议来代替。

### 安全认证

- [1Password](https://1password.com/) — 密码管理工具。早期我也是几个密码走天下，但是这种风险很高，一旦主要密码被泄露（比如网站被脱库导致你的密码被黑客知道）就完蛋了。用密码管理工具的好处在于每个网站用一个安全的随机密码，登陆的时候用密码管理工具自动填充密码登陆。
- [Microsoft Authenticator](https://www.microsoft.com/en-us/account/authenticator) — 微软的两步验证 App。我用来代替 Google Authenticator（这个很久不更新了，担心某天突然找不到这个 App）。

### 广告平台

- [Google AdSense](https://www.google.com/adsense) — CPC 计价的广告平台。本博客对接的广告平台就是 Google AdSense。中文的广告收入特别低，可以忽略不计。如果是英文内容站，内容质量还不错的话，那接入 AdSense 是个不错的选择。互联网在线广告是互联网流量变现的主要方式，也是个人项目盈利的一个很重要的途径。如果对广告不了解，可以看我这篇 [什么是互联网广告](/dev/what-is-internet-advertising/)。
- [Adsterra](https://publishers.adsterra.com/referral/9iPfM8f1w4) — CPM 计价的广告平台。和 AdSense 的差异在于计价模型的不同。如果你的网站流量特别大，但是页面价值很低（通俗的话就是垃圾站）的话，可以考虑对接这个平台。

### Affiliate平台

个人项目盈利的几个重要途径有：

- [互联网在线广告](/dev/what-is-internet-advertising/)，适合内容综合的流量大站；
- [Affiliate](/tags/affiliate/)，适合内容垂直的中小站。这种方式的关键是有精准的流量，转化率比较高；
- 一次性销售费，适合工具类产品；
- 会员订阅费，适合内容类产品。

Affiliate 在国内很常见，比如国内的淘宝客。简单的理解就是自己有流量渠道，可以帮助广告主销售产品或服务，中间抽取佣金。我们个人项目有流量的话就可以考虑通过这种方式变现，如何找广告主接他们的推广任务？那就是通过 Affiliate 平台。国际上知名的 Affiliate 平台有以下两个：

- [ShareASale](https://www.shareasale.com/)
- [CJ Affiliate](https://www.cj.com/)

### 收款平台

赚了钱如何低成本收款也是一个麻烦的问题，尤其是你赚了不少美刀。这里提到的都是国外的收款平台。

- [PayPal](https://www.paypal.com/) — 国外收款很方便的方式。缺点就是收款和转账手续费都很贵，转美元至国内结汇还得支付 4.4% + 35 美刀的手续费。PayPal 的坑非常多，如果真决定要此渠道收款，建议先了解下具体的操作流程和收费规则。
- [Payoneer](http://share.payoneer.com/nav/9PC2wDs2_1F1d0cHhlauGKSzSXvOUKONId9bEyadNAHDo3QkyVzkE7eZCluYVx7BRDVS1e3kxiiX9D66AVcxgw2) — 这个和 PayPal 的区别在于它的手续费很低，不过我接入的一些广告平台并不支持此收款方式，以至于我并不了解它有什么大坑。
- [Bitcoin](https://bitcoin.org/) — 比特币收款是很上头的，因为价格波动剧烈，你永远不知道收到的钱是多了还少了，而且比特币转回国内也是个麻烦的操作。
- [Stripe](https://stripe.com/) — 这个收款平台适合你直接从用户手中收款，它支持信用卡等多种支付方式，比如你有个独立的产品卖许可证，用户通过信用卡支付给你钱这种场景。

## 其他

- [Storm Proxies](https://stormproxies.com/) — 老牌的 IP 代理服务。特点就是老牌、便宜，稳定性还可以，延时比较高，无法满足对实时要求高的爬取需求。
- [Surge](https://nssurge.com/) — Mac 上的高级网络调试工具。
- Quantumult — iOS 上的高级网络调试工具。
- Google Voice — 一般用它来接受国外网站的注册验证码。
- YouTube Premium — 学习娱乐两不误的视频网站。
- Netflix — 一般在电视上用它刷剧。

## 如何调研产品的技术栈

```text
学习别人的技术栈，查缺补漏。
```

- [Wappalyzer](https://www.wappalyzer.com/) — 浏览器插件，可以看到某个网站使用的技术栈。虽然结果不全面和准确，但是足以了解到很多新技术栈。
- [stackshare](https://stackshare.io/) — 这网站上可以看到不少知名网站使用的技术栈。
- 官方博客 — 一般官方技术博客会分享其应用所用的技术栈，通过这种途径可以了解到他们为何会选择这种技术栈及他们技术栈演进的过程，这方法虽然费时但是效果非常好。

## 合规问题

```text
遵守规则才能走的更长远。
```

### 公司规定

一般公司都会有关于员工在业余时间的产出归属问题的规定。在做个人项目时需提前了解下公司的规定或态度，这样才不会在后期出现难以预料的问题。

### 知识产权

很多开源软件有 License 的选择问题。也有不少工具对非盈利项目提供免费 License， 但对商业项目需购买收费 License。这些问题都需要在做个人项目时时刻注意。

### 法律法规

在做个人项目时，可能会不小心游走在法律的边缘，比如爬虫很容易引发法律的问题。某些产品做出海的业务也会遇到跨国法律的问题。提前了解下相关法律是规避这类问题的好办法。

## 进阶阅读

- [个人项目技术栈](https://github.com/madawei2699/tech-stack-of-side-project) — 这个 Repo 会收集一些适合个人开发者的技术栈或者研究个人项目盈利方法论。
- [一人公司方法论](https://github.com/easychen/one-person-businesses-methodology)
