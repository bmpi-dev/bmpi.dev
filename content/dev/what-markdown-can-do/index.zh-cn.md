---
title: "用Markdown可以做什么"
date: 2020-02-21
draft: false
tags: ["Markdown", "排版", "LaTex"]
keywords: "Markdown"
description: "本文介绍了零成本用Markdown搞定博客网站、笔记文档、演讲胶片与年终总结报告，彻底抛弃Word与PPT"
isCJKLanguage: true
---
你是否遇到这些问题：写报告需要打开Word/PPT，每次浪费不少时间在排版上？写博客需要在管理后台网页里排版？在这篇文章里我将会介绍如何使用一种纯文本标记语言Markdown去排版各类型文档。

本文大纲如下：

- 基于Markdown的工作流
- 用Markdown生成笔记/博客/幻灯片/专业报告

开始之前，如果觉得本文不错，可以分享给你的朋友。让我们开始吧！

{{< ad_embed_post >}}

## 基于Markdown的工作流

### Markdown是什么

Markdown由 John Gruber 于 2004 年创立，它是一种纯文本标记语言，实际上这篇文章排版就是用Markdown生成的，在这里可以看到它的[源文件](https://raw.githubusercontent.com/bmpi-dev/bmpi.dev/master/content/dev/what-markdown-can-do/index.zh-cn.md)[^0]。

![](https://img.bmpi.dev/602bfd5d-0b33-390e-18e2-a61816d4e788.png)

在这里可以体验下Markdown的具体用法：[微信公众号Markdown在线排版](https://wechat.bmpi.dev)[^1]

### Markdown工作流

![](https://img.bmpi.dev/4ba9bba0-d63c-a2e7-b02f-ab48fcf64b08.png)

上述思维导图使用VSCode插件[`PlantUML`](https://plantuml.com/zh/)[^2]预览纯文本生成的，纯文本如下：

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

## 用Markdown记录笔记

![](https://img.bmpi.dev/41c4f964-08da-f54a-8946-35added31be0.png)

如上图红框，我一般将某个主题相关的笔记用一个Markdown记录，放入相应类别的目录。比如学习类别中，关于SEO的学习资料都会放入`seo_study.md`，所有学习的md文件都放入`study`目录。

## 用Markdown生成博客

本博客使用基于Markdown的[Hugo](https://gohugo.io/)[^3]程序生成，源文件都托管至[GitHub仓库](https://github.com/bmpi-dev/bmpi.dev)[^4]，最后用[Netlify](https://www.netlify.com/)[^5]服务发布至网上。

所以写作的流程一般是：

1. 用Markdown写一篇新文章。
2. 将新文章使用`git push`推送到GitHub仓库。
3. Netlify会自动触发构建从而将新文章上线到网站。
4. 将博客新文章复制到微信公众号/知乎专栏/其他社区同步发布。

## 用Markdown生成幻灯片

本博客的[Talk子域名](https://talk.bmpi.dev/)[^6]也是用Hugo的一个[Slide主题](https://reveal-hugo.dzello.com/#/)[^7]搭建，源码存放于这个[GitHub仓库](https://github.com/bmpi-dev/talk.bmpi.dev)[^8]。

![](https://img.bmpi.dev/hugo-slide-preview.gif)

用Markdown写PPT的好处在于不需要耗费很多时间去排版，再次修改也是对纯文本的更改，缺点是你需要花一点时间（不超过一小时）去学习一些规则。我觉得这是一笔值得的投资，一次投资，终生受益。

该主题还支持幻灯片导出成PDF格式。只需要加`?print-pdf`后缀到网址URL后面即可。

## 用Markdown生成专业报告

![](https://img.bmpi.dev/dc89a01a-b143-3770-e848-4f3e35dbfd2b.png)

如何用Markdown生成如上这种学术期刊类的报告呢？

这需要我们做一些基本的设置，详细的安装设置可以参考我的笔记[《使用PanDoc将Markdown转化成Latex学术期刊PDF模版》](https://wiki.bmpi.dev/#%E4%BD%BF%E7%94%A8PanDoc%E5%B0%86Markdown%E8%BD%AC%E5%8C%96%E6%88%90Latex%E5%AD%A6%E6%9C%AF%E6%9C%9F%E5%88%8APDF%E6%A8%A1%E7%89%88)[^9]

设置好后，可以按照下面的格式：

![](https://img.bmpi.dev/29853913-24d3-bc66-c540-0ba4f8ff7e6f.png)

效果如下：

![](https://img.bmpi.dev/5f621ad7-6272-637f-f049-d72811cba39c.png)

---

Markdown是一种非常简单的排版方法，以上是我的一些经验，如果你有更好的使用方法，请留言给我，互相学习交流。

#### *References*
[^0]: https://raw.githubusercontent.com/bmpi-dev/bmpi.dev/master/content/dev/what-markdown-can-do/index.zh-cn.md
[^1]: https://wechat.bmpi.dev
[^2]: https://plantuml.com/zh/
[^3]: https://gohugo.io/
[^4]: https://github.com/bmpi-dev/bmpi.dev
[^5]: https://www.netlify.com/
[^6]: https://talk.bmpi.dev/
[^7]: https://reveal-hugo.dzello.com/#/
[^8]: https://github.com/bmpi-dev/talk.bmpi.dev
[^9]: https://wiki.bmpi.dev/#%E4%BD%BF%E7%94%A8PanDoc%E5%B0%86Markdown%E8%BD%AC%E5%8C%96%E6%88%90Latex%E5%AD%A6%E6%9C%AF%E6%9C%9F%E5%88%8APDF%E6%A8%A1%E7%89%88
