---
title: "零成本搭建现代博客之SEO优化篇"
date: 2020-03-13
draft: false
tags: ["SEO", "独立博客", "个人博客", "技术博客", "SEO流量研究", "关键词挖掘", "博客SEO"]
keywords: "SEO、独立博客、SEO流量研究、关键词挖掘、博客SEO"
description: "如何能让搜索引擎给我们带来免费而源源不断的SEO流量？如何给新建的站做基本的SEO？如何分析老站的流量现状通过一些优化方法来提高SEO流量？如何做关键词研究？如何做网站竞品研究？如何做面向SEO搜索意图的内容创作？本文告诉你答案"
series: ["零成本搭建现代博客指南", "SEO实践日志"]
aliases: [
    "/dev/guide-to-setup-blog-site-with-zero-cost-2/"
]
isCJKLanguage: true
---

> 本文属于[零成本搭建现代博客指南](/series/零成本搭建现代博客指南/)系列第二篇【SEO优化篇】。
> ![](https://img.bmpi.dev/adc30b81-2169-a595-ece1-174b05630393.png)

> 如果你对`SEO`并不了解，请先看这篇[《什么是SEO》](/money/what-is-seo/)。

在搭建好我们的博客后，一顿优化猛如虎，一看访客还为零。

如何能让搜索引擎给我们带来免费而源源不断的SEO流量？如何给新建的站做基本的SEO？如何分析老站的流量现状通过一些优化方法来提高SEO流量？如何做关键词研究？如何做网站竞品研究？如何做面向SEO搜索意图的内容创作？本文分享我对本站的SEO优化过程，如果你也心存这些疑问，就让我们开始这段SEO之旅吧。

## 现状研究

**在对一个站做SEO优化之前，一定要分析网站的现状。比如流量的来源分类，网页的关键词排名，索引是否完全，竞品的情况分析，网站的反向链接有多少等。对现状有了清晰的认识后才能对症下药做针对性的优化。**

### 域名研究

1. 通过反向链接查询域名是否有黑历史。这个对新站尤其需要注意检查。
2. 如果网站存在一个或多个老域名，一定要做301跳转，将老域名的权重传递给新域名。

### 流量来源研究

网站的流量从大头来看分为三大类：

![](https://img.bmpi.dev/220141fa-00e9-7462-95d4-363d274e1e9a.png)

- 直接流量：就是用户直接访问你的网站而来的流量。直流一般是因为网站的知名度，用户收藏网址或者看到有展示网址的地方而导流进来。
- 搜索流量：通过搜索引擎而来的流量。搜索流量是因为网站的页面在相关的关键词上有排名，用户搜索该关键词看到该页面后点击而来的流量。
- 引荐流量：通过其他网站外链而来的流量。网站的网页因为内容质量不错而被其他网站引用或者在社交媒体上被分享，用户从其他网站页面点击该外链而来的流量。

直接流量是我们无法控制的，SEO研究的是搜索流量，而引荐流量和外链有关系，外链又可以帮助提高搜索流量。在开始优化SEO流量之前，我们先需要了解搜索引擎的网页排名机制，正是因为我们的网页有排名，然后才有了SEO流量。

#### 网页排名机制

任何新站（权重低）文章一开始肯定没有排名，没有SEO流量，那Google只能从外链的角度去看它的质量了，如果外链多Google才会提升排名，而外链之所以会有，那肯定是内容全面高质量（内容全面、关键词密度适中、文章关键词搜索量不错、文章类型符合搜索意图），和这个关键词契合度高，所以这样Google才能把好的内容推给搜索的用户，这样才能说明高质量的内容才是长久SEO之道。

真正能做到这些要求的网站排名肯定能上去。很多文章内容质量都不好，内容好的不一定会按照这个符合SEO要求的方面去写。很多独立博客的站长，写作完全看个人心情，虽然文章质量也许很高，但是文章内容并没有潜在的搜索潜力，那这种内容的流量肯定很难爆发，而面向SEO而写的博客如ahrefs、backlinko的SEO流量都很高。

如何进行面向SEO的内容写作？这个问题留待以后分享。

### 关键词研究

SEO流量是由很多关键词带来的流量汇聚而成。一篇文章可能包含多个核心关键词和长尾关键词，以[《VSCode插件开发小记》](/dev/vscode-plugin-development-notes/)为例，这篇文章标题包含了`VSCode插件开发`这个长尾词，我们在`Google Search Console`中可以看出这个词为博客带来了13次的展示，但是由于排名在17名，并没有带来SEO流量，如下图：

![](https://img.bmpi.dev/cbaae00b-5256-2a3c-1b49-5617ef50c962.png)

我们可以使用`Google Keyword plan`工具查看这个词的搜索量：

![](https://img.bmpi.dev/51de4cf2-82a5-0228-5b08-534d4d9f9805.png)

可能以本站为例不太适合，因为SEO流量的研究至少适合一年以上的站，关键词的数量才会多一些，数据分析也更好做，我们以`instaghub`为例分析下它的搜索流量来源：

![](https://img.bmpi.dev/9845b26c-5e75-96b2-d293-01a9f17307f5.png)

如上，以`julia0042`为例，这个词为我们带来了321个搜索流量，排名到第5的位置了。再查看下这个词的月搜索量：

![](https://img.bmpi.dev/268246fe-dd4a-fffd-a080-326343032bb9.png)

这个词的搜索量介入1k-10k之间，搜索量还可以，如果我们把排名做到第三名，应该可以拿到更多的搜索流量。

### 索引研究

使用`Google Site`命令查询本站索引数量：

![](https://img.bmpi.dev/4b8f9076-8120-f54f-88bc-79956d8684ae.png)

实际我们的总页面可以在`sitemap.xml`中得知，和索引的数目差距不大，说明索引是正常的。另外一个查看索引的地方在`Google Search Console`：

![](https://img.bmpi.dev/49d307ba-5b72-3e1e-77fe-9d65b46f947d.png)

### 竞品研究

SEO是一场马拉松赛跑，我们的目标就是获得搜索第一页的Top10排名位置。而这场赛跑是由一个个关键词组成的。以`博客搭建`这个词为例，搜索第一页中：

![](https://img.bmpi.dev/f7b78bc0-8e05-c890-9a3c-fc2ae1ec9e39.png)

排在前四名的网站都是`知乎`、`GitHub`、`掘金`与`简书`，都是月流量上千万的大站，反向链接也都上百万了。我们个人网站是很难与这些大站竞争的，人家都是VIP玩家。继续往下看：

![](https://img.bmpi.dev/7a9c0028-3b3e-9a35-9c0b-2f817306d33d.png)

![](https://img.bmpi.dev/10c508d6-7019-cfab-f3ae-62e1780888ed.png)

终于看到一个博客站了，而且是个小博客，虽然已经有三年多的历史了，站点总的反向链接只有不到三百个，而且这篇排名第5的文章没有任何反向链接，这对我们有一些启示：

- 小博客站在马拉松赛跑中也有春天，也是可以超越不少大站的。
- 反向链接不是必须的，哪怕页面没有任何反向链接，只要你的关键词合适，也是可以获取头部排名的。
- 如果竞争不过大站，那文章可以首发博客，然后同步到各大社区，保留原文链接可以帮助博客获取更多高质量的外链。

### 内容研究

Google花费了数十亿的资金在研究用户的搜索意图。什么是搜索意图？搜索意图可以简单理解为用户真正想要什么样的信息。比如当用户在搜索`SEO`这个词的时候，大概率用户期望获取到`SEO是什么`类型的文章，这个词排名高的页面肯定是科普介绍类的文章，就算有篇介绍SEO服务或产品非常好的文章，那这个文章页很难排到前面的位置。而用户在搜索`电饭锅`这个词，大概率期望获取的是`电饭锅购买`页面，而非`电饭锅是什么`的介绍类型文章，那排到前面的肯定是个电商的产品介绍购买页面。

了解用户的搜索意图很重要，这为我们获取排名提供了一些机会。如果你不了解用户的搜索意图，哪怕你文章写的再好，排名也很难上去。所以我们面向SEO的写作流程是：

1. 寻找有搜索潜力的主题。
2. 分析该主题的搜索意图。
3. 编写大纲。
4. 编写吸引人的内容。
5. 编写引人注目的Meta信息。

这里面最重要的是前两步，在写作之前先确定一个具备搜索潜力的主题，这让我们必须了解我们写的主题的关键词以及这些关键词的月搜索量，之后再确定这些词的搜索意图从而确定我们所写文章的类型（博客/落地页/论坛社区/产品页/导航页）以及内容格式（教程类/问答类/观点类/资讯类）。

### 反向链接研究

反向链接的重要性毋庸置疑，这是搜索引擎对网页排名的基石，所以外链建设一直是SEO研究的重头戏。对我们SEO优化来说，了解自己的外链质量和数量很重要。我们可以通过Chrome的[SEOquake](https://chrome.google.com/webstore/detail/seoquake/akdgnmcogleenhbclghghlkkdndkjdjc/)插件来了解：

![](https://img.bmpi.dev/02cfe04a-f58c-6486-e807-d7e6f62f248f.png)

也可以通过`Google Search Console`来查阅更详细的外链信息：

![](https://img.bmpi.dev/1d5740f2-6a93-2b68-e1ed-9f2bda990aa1.png)

![](https://img.bmpi.dev/a0b801a3-a598-dc11-3d8d-d8f3aebf09e0.png)

## 优化

**期望通过以下的优化逐步提高网站的权威度、核心关键词的排名与外链的质量和数量，最终提高网站的自然搜索流量。**

### 博客搭建框架SEO优化对比

搭建博客最多的工具就是大名鼎鼎的`wordpress`了，不过本站是`hugo`搭建的，之前我也使用`hexo`搭建过博客，后面这两个都是静态网站生成工具。

这三个工具在SEO优化的差异体现在：

- `wordpress`具备了大量的SEO优化插件，而且本身在站内优化就做的很好。
- `hugo`和`hexo`在SEO优化上并没有什么好的插件，很多优化都需要自己开发定制才可以，对技术的要求高一些。
- 静态化生成工具生成的都是HTML网页，部署到CDN即可，所以在性能上具备极高的优势。这也是`hugo`与`hexo`比`wordpress`在技术性优化上具备的优势。

### 站内优化

#### Meta信息

Meta信息的优化是站内优化的基本要求。无论你用什么框架搭建的博客，每个页面的Meta信息完备是基础，可以使用[meta seo inspector](https://www.omiod.com/meta-seo-inspector/)插件直接查看Meta信息：

![](https://img.bmpi.dev/73a955f8-db4a-3e5d-dd4e-de0f89e62c0a.png)

也可以使用[SEO Minion](https://chrome.google.com/webstore/detail/seo-minion/giihipjfimkajhlcilipnjeohabimjhi)做日常的站内优化：

![](https://img.bmpi.dev/55a5062b-d8ff-33ff-866a-8c8712104669.png)

#### 关键词

关键词的优化是个长期的过程，需要我们持续追踪网页的关键词排名并做关键词优化才能逐步提高排名。这也是SEO的一大难点，有时候就算你做了很多优化，最终效果也许是没有效果或者只差那么一点点。这也是SEO被人诟病的原因，就像老中医一样，它不是一门精确的科学，虽然我们可以用一些数据驱动的方式帮助我们做更精细的优化，但是这个过程充满了不确定性，所以好的心态更重要。

#### 关键词挖掘

如何挖掘关键词或长尾词？可以使用Google搜索建议去发掘这类长尾词：

![](https://img.bmpi.dev/5162fa12-c6ee-f6c8-2a73-a26ed33d623b.png)

也可以使用如下工具挖掘长尾词：

![](https://img.bmpi.dev/08a21f2f-a2a8-1a72-25fc-217717455b66.png)

#### 内容优化

内容优化和关键词优化的过程类似，这个优化更牵扯到我们网站本身的定位和目标。在目标确定的情况下，我们可以不断的围绕目标相关的关键词去创作具备搜索潜力和搜索意图的内容，不断的迭代这个过程，最终我们的SEO流量肯定会起来的。

内容和网站的定位有很大关系。网站必须有个大的方向，从这个大的方向我们可以找出一批核心关键词，围绕这些核心关键词去写文章，核心关键词的密度必须适中才行，尤其是标题、meta描述、URL等关键位置都最好包含核心关键词。核心关键词外围是附属关键词，这些附属关键词还可以组合出长尾关键词，围绕附属关键词和长尾词也可以写一些文章来提高流量。最终目的是通过这些词打造网站的权威度，或者说是品牌效应。

网站定位可以考虑画一个商业模型画布，如下：

![](https://img.bmpi.dev/tg_media/bmpi365-172.jpg)

#### 内链优化

博客中常见的`文章推荐`就是一种内链优化手段。我们也可以人为从一篇文章中推荐另外一些内容上相关联的文章，这样也可以把一些高权重的页面导流给没有权重的页面。

### 技术性优化

1. 加载速度优化。这个优化一般比较复杂，我会在本系列第四篇文章中详细介绍。
2. 图片优化。同加载速度优化，一般会采用图片懒加载的方式延迟图片的请求。
3. robots.txt。这个可以手动编写。写完后可采用Google的[ robots.txt 测试工具](https://support.google.com/webmasters/answer/6062598?hl=zh-Hans)测试是否正常。
4. sitemap.xml。`wordpress`有很多插件可以自动生成，`hugo/hexo`也都默认开启了此功能。

### 站外优化

1. 其他平台导流：
   1. 文章如果首发于博客平台的，则可同步发至各大社区(如知乎/微信公众号)平台，但是需保留博客网站的原文链接，这样可以增加网站的反向链接，提高网站整体权重。
   2. 国外的社区或者论坛也可以推文章，这样有助于网站积累外链，从而提高网站在Google中的权威度。比如Reddit社区或者大的问答社区。
2. 可添加友情链接：最好是大一点的站的外链。
3. 新增社交分享：可添加一键分享各大社交平台的组件，这样可提高社交媒体中的外链。

## 需注意的问题

一番努力SEO优化之后，一个月过去发现排名没啥变化。这时请不要气馁，根据ahrefs的[《How to Get on the First Page of Google》](https://ahrefs.com/blog/how-to-get-on-the-first-page-of-google/#section7)：

> "Top10排名的页面超过95%都有一年以上的历史"

所以SEO是一场马拉松赛跑，更是时间的艺术。
