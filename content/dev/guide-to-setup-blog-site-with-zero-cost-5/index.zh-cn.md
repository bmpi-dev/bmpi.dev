---
title: "零成本搭建现代博客之优化国内访问速度"
date: 2020-12-26
draft: false
tags: ["独立博客", "加载速度优化", "CDN", "阿里云", "境外网站国内访问速度优化", "HTTPS加速"]
keywords: "独立博客、加载速度优化、CDN、阿里云、境外网站国内访问速度优化、HTTPS加速"
description: "网站部署国外又不想备案，国内访问速度太慢怎么办？本文教你优化国外部署网站在国内的访问速度。"
series: ["零成本搭建现代博客指南"]
---

> 本文属于[零成本搭建现代博客指南](/series/零成本搭建现代博客指南/)系列第五篇【优化国内访问速度篇】。

[构建我的被动收入](https://www.bmpi.dev/)网站部署在`Netlify CDN`上，我在[零成本搭建现代博客之加载速度优化篇](/dev/guide-to-setup-blog-site-with-zero-cost-4/)这篇文章中对它做了大量的基础技术性加载速度优化。最终达到在 [Google PageSpeed Insights
](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fwww.bmpi.dev%2F&hl=en&tab=desktop) 上PC端98分的评分:

![](https://img.bmpi.dev/e3402768-d1c4-dcfa-0674-051ebeb874e4.png)

但是由于`Netlify CDN`在国内的访问速度并不好，导致国内用户访问速度非常的慢，甚至不可用。为了优化国内的访问速度，需要通过`CDN`给国内用户加速。

## 博客架构

为了更好的分析这个问题，我画了本博客的网络架构图：

![](https://img.bmpi.dev/b35c877d-7bdd-aed8-afb2-b968a2a2002b.png)

### 优化前

* Step 1.1: 本地写完文章后，推送到 [BMPI.dev GitHub Repository](https://github.com/bmpi-dev/bmpi.dev)。
* Step 1.2: [Netlify](https://www.netlify.com/) 在检测到 `GitHub` 推送的`Commit`后，触发`Deploy`流水线，把此次变更发布自动上线。
![](https://img.bmpi.dev/c2be44e4-f78d-e7c6-a6df-f6c2b841118b.png)
* Step 2.1: 本博客的`DNS`解析托管在`AWS Route53`服务上，当用户请求`https://www.bmpi.dev`，浏览器在解析过程中根据默认的配置找到了`Netlify CDN`地址，最终获取到了网站内容。

### 问题分析

国内用户访问网站慢的原因是，国内电信出口链路到`Netlify CDN`最近的边缘节点(`新加坡digitalocean`)延迟高，可能是其节点对国内链路没有做优化。

如果能使用支持国内网络的`CDN`或针对国内链路做优化的国际`CDN`，则能提高国内用户的访问加载速度，根据这篇[提升你的外国服务器网站国内访问速度](https://www.bilibili.com/read/cv4759943/)里提到的：

> 利用阿里云海外CDN，中国访客大部分会解析到亚太一区节点，而亚太一区CDN节点到中国大陆的线路大部分都经过了优化（香港节点和新加坡节点为[三网GIA](https://zhuanlan.zhihu.com/p/68381011)），而节点到源站服务器的线路又没有经过我国运营商国际出口，没有审查所以速度本来就不会太慢。

那么可以通过给网站配置`阿里云CDN`，在`AWS Route53`配置基于`地理位置`的`DNS`路由策略，将国内的请求转发至`阿里云CDN`，将国外的请求转发至`Netlify CDN`。如下图的`DNS`配置：

![](https://img.bmpi.dev/3ab55443-fe2d-5fcd-1abd-3d094d9a6231.png)

考虑到备案的复杂性（内容审查及流程繁琐），我使用了`阿里云CDN全球（不含中国）`的加速配置（只要加速地区包含中国，所加速的域名必须做备案，但是本博客的域名托管至国外且顶级域名为`dev`，这种小众域名在国内还[不能备案](http://xn--eqrt2g.xn--vuq861b/)），国内用户的请求最终由阿里云新加坡节点服务，而阿里云新加坡的节点到国内相比`Netlify CDN`是做过链路优化的。

### 优化后

如博客架构图所示，加入了红框中的`Step 2.3`后，我们可以基于`DNS`路由策略将不同区域的用户请求转发至不同的`CDN`。

## 优化过程

1. 配置阿里云CDN。具体过程见[提升你的外国服务器网站国内访问速度](https://www.bilibili.com/read/cv4759943/)。**必须注意加速域名不能和源站域名相同，所以需要在Netlify上重新部署一个相同的网站(网址不同)作为CDN源站，同时需要考虑屏蔽爬虫爬取CDN源站，防止内容重复。考虑到此网址未公开，搜索引擎无法通过其他网址爬取此网址，所以不做爬虫屏蔽也可以。**

2. 需要在DNS配置基于位置的路由策略。中国区流量分配至`阿里云CDN`，其他默认流量分配给`Netlify CDN`。

3. `HTTPS证书`。需手动在阿里云上申请免费证书给`CDN域名`使用，同时下载此证书配置给`Netlify`使用。过期前需要重新申请证书并更新。

4. `HTTPS加速`。如下图所示，`HTTPS`中`TLS`的加解密是个耗时的过程，更不要说浏览器还需要校验证书的合法性。在这篇[高性能 Nginx HTTPS 调优 - 如何为 HTTPS 提速 30%](https://kalasearch.cn/blog/high-performance-nginx-tls-tuning/)中，提到了一些优化`HTTPS`的手段，这些优化的设置在`阿里云CDN`中都可以设置。

![](https://img.bmpi.dev/f14027df-6283-3dad-1f7e-2c49bdc1c145.png)

* 开启`HTTP/2`: HTTP/2 中可以在一个连接中进行并行多个请求。
* 调整`Cipher`优先级: 尽量挑选更新更快的 Cipher，有助于减少延迟。
* 启用`OCSP Stapling`: 忽略证书验证，能加快与网站连接速度。
* 调整`ssl_buffer_size`: 如果是`Rest API`服务器，则有必要调整小此值。
* 启用`SSL Session`缓存: 启用`SSL Session`缓存可以大大减少`TLS`的反复验证，减少`TLS`握手的 roundtrip。

在`阿里云CDN`中可做如下设置优化：

![](https://img.bmpi.dev/ef49c333-0d2c-68bb-7f94-fcfb63f701e8.png)

5. 测试不同地区用户访问的`CDN`：

![](https://img.bmpi.dev/a5107ab6-2b01-37f5-9e47-6b239c77176f.png)

如果响应头里看到`server: Netlify`，则请求是到`Netlify CDN`的。

![](https://img.bmpi.dev/dcfab9dd-233d-fb9e-43f5-6038ecf45836.png)

如果看到`server: Tengine`，则请求是到`阿里云CDN`的。

6. [网站线路测速](https://www.17ce.com/):

![](https://img.bmpi.dev/a5ce7b4b-8530-bec5-14ff-8b295cbeefc5.png)

看起来国内不同地区访问速度相差还是挺大的，考虑到测速网站本身的机房网络问题，与实际用户访问的速度差异估计不同。

`阿里云CDN`国内用户访问不同地区的平均响应时间：

![](https://img.bmpi.dev/9fd9b60d-593c-841e-8656-d571e917a760.png)

## 总结

经过此番优化，最终本站获得了如下的优势：

* 网站源内容在国外`CDN`托管；
* 域名在国外`AWS Route53`托管；
* 网站无需备案与内容审查；
* 国内用户请求至`阿里云新加坡CDN`，国外用户直接请求至`Netlify CDN`；
* 爬虫不会受到影响，经测速百度爬虫请求的还是`Netlify CDN`；
* 双站部署对SEO没有影响，`阿里云CDN`请求的`Netlify`源站网址没有公开，不会被爬虫爬取到；
* HTTPS加速（通过[阿里云CDN配置](https://help.aliyun.com/document_detail/109894.html)）。

**如果你所在的地区访问速度特别慢的话，可以留言告知我。**
