---
title: "我的绘图工具箱"
date: 2020-12-08
draft: false
tags: ["绘图工具", "PlantUML", "Sketch", "PPT", "Excel", "draw.io", "Google Drawings", "OmniGraffle", "Python Jupyter Notebook", "时序图", "架构图", "部署图", "线框图", "甘特图", "WBS", "思维导图"]
keywords: "浏览器插件、Chrome插件、SEO浏览器插件"
description: "本文分享我常用的绘图工具，包括文本绘图、代码绘图与专业绘图等工具。"
---

由于在写作中经常需要配图，本文分享下我常用的绘图工具以及如何存储并展示配图。

## 文本绘图

文本绘图的好处在于修改、存储方便，很简单即可绘制出固定模式的图，如时序图、架构图、部署图、线框图、甘特图、WBS与思维导图。 [PlantUML](https://plantuml.com/zh/) 是一个支持文本绘制类UML图的工具，可以在 [Real World Plantuml](https://real-world-plantuml.com/) 找到很多用它实现的图。我一般用它来绘制以下一些图。

### 思维导图

![](https://img.bmpi.dev/4ba9bba0-d63c-a2e7-b02f-ab48fcf64b08.png)

文本如下：

```
@startmindmap
skinparam monochrome true
* Markdown排版
** 写作
*** 博客
*** 知乎专栏
*** 微信公众号
** 幻灯片
** 专业报告
** 笔记
@endmindmap
```

可以使用在线编辑器 [PlantUML Editor](http://www.plantuml.com/plantuml/uml/) 在线编辑预览。

### 架构图

![](https://img.bmpi.dev/48504c01-c2d0-e05a-1eda-d82b88f6496d.png)

源文本见 [arch_aws.plantuml](https://raw.githubusercontent.com/bmpi-dev/bmpi.dev/master/content/dev/guide-to-serverless/arch_aws.plantuml)。

## 专业绘图

### Sketch/OmniGraffle

![](https://img.bmpi.dev/0fa1a962-7d25-4263-7844-d6f76d2360c1.png)

源文件见 [Serverless.sketch](https://github.com/bmpi-dev/bmpi.dev/blob/master/content/dev/guide-to-serverless/Serverless.sketch?raw=true)。

要想用 Sketch 画好配图，配色很重要，这方面可以看 draveness 写的这篇[《技术文章配图指南》](https://draveness.me/sketch-and-sketch/)。当然 Sketch 可以做的远不止这些，不过这不在本文讨论范围。

### draw.io/Google Drawings

这类工具都可以绘制各类你想要的配图，唯一限制的就是你的想象力了。

在线绘图工具如 [Google Drawings](https://docs.google.com/drawings) 的多人实时协作功能更是团队协作绘图利器。这篇[《分布式事务中的时间戳》](https://ericfu.me/timestamp-in-distributed-trans/#more)中的配图就是用 Google Drawings 绘制的。

## 代码绘图

### Python Jupyter Notebook

我用这个绘制一些数据分析的图，比如这种：

![](https://img.bmpi.dev/19c641b7-581b-1952-2ed3-d2e23f3d807e.png)

源代码见 [index_month_quote_change.ipynb](https://github.com/bmpi-dev/invest-alchemy/raw/master/strategy/index_month_quote_change.ipynb)。

## 其他工具

### Excel

用 Excel 画图不是不可以，你可以用数据绘制图，也可以用单元格来绘制马赛克的图，不过我一般用它来绘制投资组合的一些走势图和状态图。
![](https://img.bmpi.dev/5d1ac453-75ee-59ab-362b-fce0885f30e5.png)

## 配图存储与展示

图片我一般用 VSCode 插件 [markdown image paste](https://github.com/bmpi-dev/vscode-extension-mardown-image-paste) 配置 AWS S3 后，可将复制到剪贴板的图片一键上传至 S3 桶，之后可通过桶绑定的域名访问图片，本博客所有的配图都是如此存储与展示的。具体详见[《我的笔记系统》](/self/note-system/)`VSCode插件一键存储图片至S3`节。
