---
title: "我的2020"
date: 2020-12-18
draft: false
tags: ["年度总结"]
keywords: "2020年度总结"
description: "我的2020年度个人总结"
isCJKLanguage: true
---

我是一个终身学习与长期主义者，这意味着我做事的流程是通过持续学习某领域知识最终达到长期获益。如果把这个流程拆解为输入与输出两个阶段，那就是通过大量阅读学习新的知识，通过写作与各种实践完成知识的转化。

![](https://img.bmpi.dev/a85bdb5e-2b93-3834-f8dd-d452c60de01d.png)

2020年我从阅读、写作、个人项目、关注领域与影响力五个维度总结，记录下这不平常的一年。

## 阅读

阅读的书籍主要是纸质书，一些书籍也是通过上下班开车时通过微信读书听的，偶尔也会听一些 Podcast 频道。以下是今年读过的书单：

```
技术：
    Google SEO指南
    SEO艺术
    Thinking in Java
    深入理解Java虚拟机
    Java并发编程实战
    Effective Java
    设计模式
    Spring实战
    Spring Boot实战
    重构
    代码整洁之道（程序员的职业素养）
    敏捷软件开发（原则、模式与实践）
    修改代码的艺术
    Java测试驱动开发（TDD）
    咨询的奥秘（寻求和提出建议的智慧）
    咨询的奥秘（咨询师的百宝箱）
    人件
    持续交付：发布可靠软件的系统方法
    微服务设计
    Spring微服务实战
    领域驱动设计
    实现领域驱动设计
    高性能Mysql
投资：
    一个投资家的20年
    ETF全球投资指南
    指数基金投资从入门到精通
```

今年读的技术书偏多，主要是想系统性的提升下编程技术，包括Java编程能力、软件工程实践、系统架构能力、算法应用、Serverless应用、SEO优化及机器学习应用等方面，目前只读完了Java编程能力及软件工程实践方面的书。

在投资方面只读了三本书，是因为之前也曾系统性读了十几本投资方面的书，具体书单见[投资理财书籍推荐](/money/passive-income-protfolio/202007/)。

如果要选出一本对我影响最大的书，我会选择《一个投资家的20年》这本书，正是这本书促使我计划公开且长期运营[被动收入投资组合](/categories/被动收入投资组合/)。

如果要从中选择推荐的书，我会选择：

- 《SEO艺术》：如果要学习 [SEO](/tags/seo/) 相关的技术，只需要看这本书。
- 《修改代码的艺术》：我们总是在工作项目、开源项目中遇到遗留系统。在遗留系统中开发新的功能而不影响旧有的功能，尤其是很多遗留系统并没有足够的测试，这难度堪比在万米高空的飞机中替换发动机，一不小心就会坠入万丈深渊，而这本书就是你的降落伞。
- 《重构》：[Martin Fowler](https://martinfowler.com/) 的这本书让我意识到好的代码不是一次就能写好的，就像好的文章需要千锤百炼，好的代码需要不断的重构，通过重构逐渐提高代码的可维护性。
- 《深入理解Java虚拟机》：读完这本书让我对JVM这个平台有了更深的认识，[周志明](https://github.com/fenixsoft)老师的另外一本书[《软件架构探索：​The Fenix Project》](https://icyfenix.cn/)也不错，目前正在看。

## 写作

![](https://img.bmpi.dev/a551a272-8763-da53-4144-b91c043240ea.png)

综合[知乎专栏](https://zhuanlan.zhihu.com/improve365)、微信公众号（id: improve365）及[构建我的被动收入](https://www.bmpi.dev/)博客的文章阅读量，2020年Top10的文章是：

1. [我的笔记系统](/self/note-system/)
2. [什么是互联网广告](/dev/what-is-internet-advertising/)
3. [我的财务管理方案](/money/my-accounting-tool/)
4. [零成本搭建现代博客之SEO优化篇](/dev/guide-to-setup-blog-site-with-zero-cost-2/)
5. [零成本搭建现代博客之搭建篇](/dev/guide-to-setup-blog-site-with-zero-cost-1/)
6. [用Markdown可以做什么](/dev/what-markdown-can-do/)
7. [什么是SEO](/dev/what-is-seo/)
8. [Serverless应用开发小记](/dev/guide-to-serverless/)
9. [使用AWS Lambda提高网站图片加载速度1X倍](/dev/aws-lambda-edge-img-to-webp/)
10. [我常用的浏览器插件](/self/my-favorite-browser-plugin/)

看起来热门的文章主要是一些个人经验介绍类或知识科普类的。

## 个人项目

![](https://img.bmpi.dev/d24193a3-e0ea-2867-7e67-d827b63aba0b.png)

今年做的几个开源项目：

- [vscode-todo-plus-plus](https://github.com/bmpi-dev/vscode-todo-plus-plus): 我修改的一个 vscode [Todo++](https://marketplace.visualstudio.com/items?itemName=mdw.vscode-todo-plus-plus) 插件，具体见这篇[《VSCode插件开发小记》](/dev/vscode-plugin-development-notes/)。
- [todo_parser_lib](https://github.com/bmpi-dev/todo_parser_lib): 解析 TODO 格式的 Parser 库。这个库帮助我将本地的 TODO 事项转换成每日邮件定时提醒，具体详见[《Parser黑魔法》](/dev/parser_black_magic/)这篇文章。
- [tg2web](https://github.com/bmpi-dev/tg2web): 这是我为自己做的一个小工具，可以把电报群组的消息自动发布成网页，具体效果可以见本博客[思考](https://tg.bmpi.dev/)。这个网站内所有的内容都来源自我的几个[电报群组](/about/)，每次执行这个工具会拉取电报群组内的消息并渲染成静态网页，然后发布至AWS S3桶，此桶绑定一个域名，之后就可以在网站看到最新的电报消息。
- [scrape_google_keyword](https://github.com/bmpi-dev/scrape_google_keyword): 爬取 Google 关键词搜索结果页的试验库，用于 SEOer 分析 Google SREP。
- [invest-alchemy](https://github.com/bmpi-dev/invest-alchemy): 基于 AWS 的每日提醒 ETF 双均线交易策略信号的 Serverless 程序。具体详见[《Serverless应用开发小记》](/dev/guide-to-serverless/)。
- [invest-assistant](https://github.com/bmpi-dev/invest-assistant): 投资组合助手。IaC 基于 pulumi 与 ansible ，数据库为 Postgresql ，后端服务为 elixir/phoenix 。目前已经把基础设施 IaC 化：目前可做到一键发布应用系统至 AWS EC2 服务器，包括服务器创建、VPC 安全组、域名、证书、性能调优、Nginx、安全、应用打包部署、CI/CD、数据库用户/库及权限的设置。通过一些 DevOps 的最佳实践，我只需要专注业务开发即可。替换一套新的环境成本很低，无需手工部署服务器及中间件。

## 我长期关注的领域

- 技术的低成本、高效率、规模化、结合SEO在Web开发上的应用
  - 这需要选择合适的Web开发技术栈，我选择了Elixir/Phoenix、Python、JavaScript等；
  - 这需要使用自动化（DevOps）的技术，如IaC、CI/CD、日志监控等；
  - 这需要使用云原生（Cloud Native）的一些技术，如Serverless、AWS等；
  - 这需要了解一定的SEO技术，包括爬虫、Niche研究、数据分析、规模化低成本的存储与展示等。
- ETF指数投资
  - 投资组合长期实盘运作；
  - 投资策略交易信号的自动化提醒；
  - 交易系统评测；
  - 指数择时（估值）研究；
  - 市场热度研究。  

### SEO

今年做的和 [SEO](/tags/seo/) 相关的网站/流量站：

#### [bmpi.dev](https://www.bmpi.dev/)

我的个人博客，虽然做过一些技术性的[站内 SEO 优化](/dev/guide-to-setup-blog-site-with-zero-cost-2/)，但是 SEO 最主要的是有足够多的优质内容。而个人博客由于文章数量少，覆盖的关键词及这些关键词的月搜索量可能都不多，需要很长的时间积累链接权重，逐渐提高搜索流量。

![](https://img.bmpi.dev/ee4067aa-35e9-22f4-388e-4307465e2dc6.png)

![](https://img.bmpi.dev/1a9a1c1b-3d72-d52b-b516-83f26e4ce8d6.png)

从 [Google Search Console](/dev/what-is-seo/) 上看总展示次数和搜索点击次数在逐渐提高。

#### [webtg.org](https://www.webtg.org/)

![](https://img.bmpi.dev/cec58801-95d8-c104-a2f5-35060c4af724.png)

![](https://img.bmpi.dev/68551641-cb61-8c80-d003-353b8a38a410.png)

长尾流量增长势头不错，由于技术原因，目前内容生成遇到一些问题，希望能在21年解决这个问题。

#### [gitopx.com](https://www.gitopx.com/)

![](https://img.bmpi.dev/fdf199d8-409b-51db-6f0a-9d4a6edc6a71.png)

![](https://img.bmpi.dev/2a30f520-44a0-903c-837c-578a074934a6.png)

这个相比之下数据比较差，可能还是内容更新停滞导致的问题。

### 投资

目前实盘运营的[被动收入投资组合](/categories/被动收入投资组合/)今年的表现不错：

![](https://img.bmpi.dev/c5ed4217-de4a-97cd-1c92-a6244bbe1a6d.png)

> 组合自2018年09月开启截止到2020年11月底：
> 
> 沪深300自3310.13点到 4960.25点，涨幅 49.85%；
> 
> 香港恒指自26435.67点到 26341.49点，涨幅 -0.36%；
> 
> 标普指数自2930.75点到  3621.63点，涨幅 23.57 %；
> 
> **本投资组合净值从1到 1.532，涨幅 53.2%。**

这个投资组合全部投资于 ETF 指数基金，大概几个月调仓一次，指数基金的管理费也很低，总运营成本非常的低。年平均符合增长率（CAGR）能超过 15% 达到 19% 以上，这个成绩更多的得益于今年 A 股市场整体处于上涨趋势中。

被动收入投资组合的主要特点：

- **长期投资：唯有长期投资才能消除短期预测市场带来的赌博效果；**
- **分散持仓：黑天鹅的存在让持有单一投资标的获得成功成为一种小概率事件；**
- **简单策略：简单的策略操作成本低，更适合上班族，这也是组合名`被动收入`的来源。**

![](https://img.bmpi.dev/688f89b3-e05d-fd60-5521-90f4b7132ff3.png)

今年各大指数中涨幅最高的是创业板，涨幅达46.37%；最少的是恒生指数，涨幅为-6.56%。

![](https://img.bmpi.dev/9d5cb30c-0ddb-ebda-4b41-31d0e8a5e62f.png)

今年被动收入投资组合的净值只涨了10%多，与各大指数相比排名倒数第二，分析原因应该是年初的回撤控制没有做好，导致产生了超过14%的回撤。本组合的夏普比率为0.22，这个只能说控制风险做的一般，好的主动基金夏普率可以达0.7以上。

**好的投资组合在牛市可以跟上宽基指数的涨幅，在熊市可以规避大的回撤，希望在未来的市场行情里本组合能做到这一点。**

## 影响力

我的一个[愿景](/goal/)是`分享个人经验积极影响他人`，通过分享与他人建立有效的连接，创造新的机会。我不以关注人数的多少为指标，我更看重的是因为我的分享能够对他人产生积极的影响。但是从量化的指标看，目前也只能以关注人数作为一个维度来衡量影响力。

- [个人博客](https://www.bmpi.dev)：今年博客的新用户是20073人。
- [知乎](https://www.zhihu.com/people/improve365)：8235人。
- 微信公众号：id: `improve365`, 关注人数2256人。
- [微信群（学习&技术&投资）](https://img.bmpi.dev/755b406f-43ae-e382-e13c-547116d3e7d5.png)：240人。
- [Twitter](https://twitter.com/madawei2699): 194人。
- [Telegram](https://t.me/s/bmpi365): 291人。
- [Youtube](https://www.youtube.com/channel/UCbg-Y24Z1H0nONW-bxgzv6w): 14人。
- [Bilibili](https://space.bilibili.com/13457583): 27人。
- [雪球](https://xueqiu.com/6876999160/column): 219人。

我的主要发布平台是个人博客、知乎、微信公众号、Twitter 及 Telegram:

- 个人博客的自由度是最高的，可能国内访问速度比较慢，这是因为网站部署在国外，无需备案，所以博客也算一个备份的平台；
- 知乎算是一个内容发布平台，因为其更容易被 Google 收录，它域名的链接权重也高，知乎的流量也大；
- 微信公众号和知乎差不多，也是因其流量高，很多人喜欢在上面看内容；
- Twitter上我一般会发一些碎片化的思考或者信息，其内容发布也更自由；
- Telegram上我也一般会发一些碎片化的思考，或者收集文章的分享。
