---
title: "零成本搭建现代博客之加载速度优化篇"
date: 2020-04-19
draft: false
tags: ["独立博客", "个人博客", "技术博客", "加载速度优化", "Chrome Audits", "webpagetest", "图片优化", "CDN", "AMP", "广告加载优化"]
keywords: "独立博客、加载速度优化、Chrome Audits、webpagetest、图片优化、CDN、AMP、广告加载优化"
description: "博客搭建好后，如何优化加载速度？本文告诉你答案"
series: ["零成本搭建现代博客指南"]
isCJKLanguage: true
---

> 本文属于[零成本搭建现代博客指南](/series/零成本搭建现代博客指南/)系列第四篇【加载速度优化篇】。
> ![](https://img.bmpi.dev/e4e1ee7e-2f99-972a-b691-07edeb0b4935.png)
> 这个系列不少的东西需要你科学上网才能访问，也就是你需要一把[梯子](/affiliate)。

个人博客搭建好后，如何优化加载速度？我们都知道如果一个网页在2至3秒还没有加载出来的话，用户因为焦虑就会关闭这个网页了。

在[《零成本搭建现代博客之SEO优化篇》](/dev/guide-to-setup-blog-site-with-zero-cost-2/)这篇文章里我们知道网站加载速度属于[SEO技术性优化](/tags/技术性优化/)很重要的一个方面。如何提高网站加载速度对获取流量来说是个很重要的环节。

通过一个对Google的爬取规律观察，**Google爬虫对新站一天大约爬半个小时，网站响应越慢，爬虫爬的速度也越慢**。所以从网站被收录的角度看，提高网站加载速度也是很有必要的。

{{< ad_embed_post >}}

先说结果，本博客优化之前，Google PageSpeed Insights 在移动端的评分为76分：

![](https://img.bmpi.dev/aab2bb8f-60ca-f2da-cc00-b5d605c4779e.png)

经过以下的一些方法优化后，移动端的评分为95分：

![](https://img.bmpi.dev/b171195b-d106-87cf-67ed-73889c9b6417.png)

**Google搜索结果现在对移动端越来越重视了，用户在移动端上对网站加载速度的要求也越高，所以对移动端的加载速度优化要更重视一些。**

## 加载速度评估

要想优化加载速度，我们首先要通过一些方法量化分析网站加载速度，这样才能更好的对加载速度进行优化。以下是常用的一些分析网站加载速度的工具。

### [Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)

![](https://img.bmpi.dev/tg_media/web_cpc-244.jpg)

PageSpeed是检测网站加载速度很重要的工具，它可以给予我们非常详细的优化点，从中可以发现拖慢网站的元凶。

### Chrome Audits(Lighthouse)

![](https://img.bmpi.dev/tg_media/web_cpc-249.jpg)

Chrome浏览器自带的Audits除了能让我们查看网站的加载速度，还可以查看网站最佳实践、可用性、SEO及PWA方面的评分及改进点。如果你的网站在这几方面评分都超过90分，那一定是Google在这几方面很喜欢的网站了。

### [webpagetest](https://www.webpagetest.org/)

![](https://img.bmpi.dev/tg_media/web_cpc-322.jpg)

webpagetest是**非常强大**的测试网站加载速度并深入分析网站资源加载速度的工具，还可以测试网站在不加载（屏蔽）某些资源的情况下网站加载速度与正常加载的对比，这样可以发现让网站加载速度变慢的资源或库。

我在测试本站的时候曾保留了一份[测试报告](https://www.webpagetest.org/video/compare.php?tests=200216_D1_4561cee4859af5b0cb0dcb6740902455%2C200216_GB_ab54b9bcbb4ce9b55b3820a58a6d87fc&thumbSize=100&ival=100&end=visual)，最终通过这个工具定位到了让网站评分降低的原因。

### 用户反馈

有时候不同地区的加载速度是不同的，更麻烦的是你很难知道当地的网络情况，这时候就需要用户的反馈了。

## 加载速度优化

### 图片优化

#### 图片大小优化

在这篇[《使用AWS Lambda提高网站图片加载速度1X倍》](/dev/aws-lambda-edge-img-to-webp/)，我使用了Webp这种新型的图片格式让网站在Chrome下图片加载速度提高了十倍多。

优化图片大小非常重要，网站资源大头一般都是图片，图片太大会导致加载速度很慢，在手机端也很耗费用户的流量。一般可以通过对图片大小进行裁剪，对图片格式进行转换这些方式来降低图片大小。

#### 图片懒加载

在这篇[《Lazy load offscreen images with lazysizes》](https://web.dev/codelab-use-lazysizes-to-lazyload-images/)中提到了使用图片懒加载来延迟图片加载时机。当用户浏览到某个区域的时候该区域的图片才会开始加载，并不会一次加载网页全部的图片，[lazysizes](https://github.com/aFarkas/lazysizes)是一个对SEO友好的图片懒加载库，本站使用它实现图片懒加载。

### 前端资源优化

网站的前端资源越来越大了，尤其是当你使用了很多第三方库的时候。

> 用库一时爽，优化火葬场！

如果想极大的提高网站加载速度，尽可能使用少的第三方库。

#### JS和CSS优化

在这篇[《Eliminate render-blocking resources》](https://web.dev/render-blocking-resources/)中提到了如何识别非重要的CSS和JS代码，通过去除不需要的代码减小前端资源文件大小。

#### 第三方库优化

在这篇[《Loading Third-Party JavaScript》](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/)中提到了如何正确加载第三方包，通过分析第三方包的加载时序图来判断对加载速度影响最大的几个因素，从而帮助你优化第三方包的加载。

### 内容结构优化

#### 加载更多

一般对于瀑布流布局的网站，通过加载更多来降低每页返回的页面大小。不过这种方式对爬虫并不算友好，只有第一个页面可以被爬取到。

#### 分页

常规网站一般通过分页来控制每页返回的页面大小。分页页面通过设置唯一的 [canonical url](https://support.google.com/webmasters/answer/139066?hl=zh-Hans) 可以让爬虫更好的爬取到分页页面。

### CDN

本站使用了免费的 [netlify](https://www.netlify.com/) 作为CDN来提高网站在不同地区的加载速度，CDN通过边缘服务器缓存来提高用户请求网页的速度，一般的CDN都会设置某个失效时间后自动去源站拉取最新的内容缓存到边缘服务器。

你也可以选择诸如 [Amazon CloudFront](https://aws.amazon.com/cn/cloudfront/) 与 [cloudflare](https://www.cloudflare.com/) 这类CDN。还有一些特殊的比如具备反爬虫的CDN，如imperva收购的 [distilnetworks](https://www.imperva.com/products/bot-management/) 就是很厉害的反爬虫CDN。

### 静态化技术

动态网站一般需要做一些查询数据库和页面渲染的额外工作，为了提高网站响应速度，一些框架可以自动生成静态化页面部署到CDN中来提高网站响应速度。比如本站使用了基于 [Hugo](https://gohugo.io/) 的静态化技术框架，类似的还有 [Hexo](https://hexo.io/)，这类技术都属于 [JAMSTACK](https://jamstack.org/)，还有新型的 [gatsbyjs](https://www.gatsbyjs.org/) 技术让我们更容易开发出更快的网站。

### [AMP](https://amp.dev/)

AMP是Google推出的Web组件框架，可以加速移动端的访问速度，比如你可以看看[本篇文章的AMP](/amp/dev/guide-to-setup-blog-site-with-zero-cost-4/)版本页面，在移动端访问速度是非常快的。

### 广告优化

使用webpagetest研究本站前端资源的加载速度，最终发现让网站变慢的是Google Adsense广告资源。

通过将广告延迟5秒展示加载的方式来提高页面访问速度，具体代码见 [seo improve by delay google ads load](https://github.com/bmpi-dev/bmpi.dev/commit/a98beba8e14a4a75884c3ecfa3b9037469caae67)，此举将网站加载速度评分提升至90+了。但是测试后发现这种延迟广告展示的方式会降低广告收入😂。

## 总结

在SEO技术性优化中，提升加载速度是很重要的一个方面，我们需要使用多种手段去降低页面返回的大小来提升网站的加载速度。而且在设计、开发与运营网站的全流程中，加载速度始终是各个环节都需要考虑的问题。本篇文章介绍的只是几个很简单的方面去提升，如果你有更好的方式，请留言交流，共同进步。
