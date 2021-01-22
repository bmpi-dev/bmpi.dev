---
title: "零成本搭建现代博客之订阅推送篇"
date: 2020-03-28
draft: false
tags: ["独立博客", "个人博客", "技术博客", "博客推送", "博客订阅", "webpushr", "tinyletter", "mailchimp", "邮件列表"]
keywords: "独立博客、博客推送、博客订阅、webpushr、tinyletter、mailchimp、邮件列表"
description: "个人博客搭建好后，如何让你的读者第一时间收到文章更新？本文告诉你答案"
series: ["零成本搭建现代博客指南"]
isCJKLanguage: true
---

> 本文属于[零成本搭建现代博客指南](/series/零成本搭建现代博客指南/)系列第三篇【订阅推送篇】。
> ![](https://img.bmpi.dev/e456f0cb-bb75-3f7c-fd9e-dec5fbfd3761.png)
> 这个系列不少的东西需要你科学上网才能访问，也就是你需要一把[梯子](/affiliate)。

博客搭建好后，如何让你的读者第一时间收到文章更新？

一般我们会采用邮件列表订阅这种传统方式，当然还可以采用浏览器推送这种新一些的方式。本文会分享本博客集成这两种方式的过程。

{{< ad_embed_post >}}

## 订阅

邮件列表有很多选择，我们常用的如mailchimp、sendinblue等，如下图：

![](https://img.bmpi.dev/585423cf-a4f4-de95-1936-90afc2661fe0.png)

不过对于博客不需要这么复杂的解决方案，虽然他们也都有免费计划。在这里我使用了 [tinyletter](https://tinyletter.com/)，一个 mailchimp 提供的针对个人使用的长期免费的邮件订阅方案。效果见这个链接：[Newsletter](https://tinyletter.com/i365)。

当读者订阅后，你可以给他们发任何你想发的信息，包括推送新文章。一个好的实践，可以提高邮件打开率的方式是撰写合适的推荐短语而不是直接全文复制一篇文章然后发送，比如：

![](https://img.bmpi.dev/044cdc88-25d2-37f8-3bcd-1d10075fc9e2.png)

如果你想自动发送新文章的话，也可通过 RSS+Zapier+Tinyletter 去实现自动化通过RSS判断新文章然后发送邮件给订阅者，具体见这篇 [Newsletter for Hugo Blog](https://backendology.com/2018/08/31/hugo-newsletter/) 。如果不想自己配置的话也可以使用 mailchimp 的商业解决方案：[Rss To Email](https://mailchimp.com/features/rss-to-email/)。

## 推送

浏览器通知是我们实现网站推送功能的技术支撑，详细的技术细节这里不再赘述，具体可以看 Google 的这篇 [Introduction to Push Notifications
](https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications) 。

如果你自己要实现一套稳定可用的浏览器通知推送功能，是一件很复杂的事情，我们可以集成现成的服务来实现这个功能。

唯一需要解决的一个问题是Hugo/Hexo这种静态生成工具如何才能判断一篇文章是新文章？可以通过添加一个API标记当前最新的一篇文章，每次生成时自动检测本地和线上的差异，然后判断是否推送浏览器通知，具体的实现可以阅读这篇 [Detecting new posts with Jekyll and Netlify](https://humanwhocodes.com/blog/2018/09/detecting-new-post-jekyll-netlify/) 。

推送服务有非常多的选择，如下图：

![](https://img.bmpi.dev/bf9c8b78-2f52-fd6e-52b8-075717eb2a3f.png)

如何选择合适的服务呢？可以查看这个网站的详细对比：[webpushnotifications](https://www.webpushnotifications.com/) 。最终我选择了 [webpushr](https://www.webpushr.com/) 。

本博客的具体集成 webpushr 实现浏览器推送的代码见 [add web push notifications with webpushr](https://github.com/bmpi-dev/bmpi.dev/commit/f29b1e1c7575aaf10467cd32cfb7eeeeda5af375) 。

![](https://img.bmpi.dev/a44aaad3-7e5d-5316-8236-241dc2349bb4.png)

## 对比

浏览器推送相比邮件订阅哪种效果好呢？根据 [according to PushEngage](http://www.pushengage.com/blog/push-notifications-for-browsers-new-emerging-marketing-channel-for-2016/) ：

> Browser Push Notification ROI is 2x to 10x [that] of Email

如果要你选择，你会选择哪种？
