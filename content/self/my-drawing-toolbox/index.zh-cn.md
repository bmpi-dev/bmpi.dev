---
title: "我的绘图工具箱"
date: 2020-12-08
draft: false
tags: ["绘图工具", "PlantUML", "Sketch", "PPT", "Excel", "draw.io", "Google Drawings", "OmniGraffle", "Python Jupyter Notebook", "时序图", "架构图", "部署图", "线框图", "甘特图", "WBS", "思维导图", "白板绘图"]
keywords: "浏览器插件、Chrome插件、SEO浏览器插件"
description: "本文分享我常用的绘图工具，包括白板绘图、文本绘图、代码绘图与专业绘图等工具。"
isCJKLanguage: true
og_image: "https://img.bmpi.dev/4928b4de-db94-968e-115b-767d2e2f007a.png"
markmap:
  enabled: true
isMermaidEnabled: true
plotly: true
categories: [
    "技术写作"
]
---

由于在写作中经常需要配图，本文分享下我常用的绘图工具以及如何存储并展示配图。

## 白板绘图

### Excalidraw

白板绘图的好处在于灵活度非常高。好的白板工具可以很方便的绘制自由的图片和预定义的结构化图形，这方面我在用的工具是 [Excalidraw](https://excalidraw.com/)，由于是本工具是开源的，我也部署了自己的 Excalidraw [白板工具](https://wb.bmpi.dev)。在 [基于纯文本的人生管理](/self/life-in-plain-text/) 这篇文章里所有的配图都是用 Excalidraw 绘制，比如下图：

![Excalidraw](https://img.bmpi.dev/4928b4de-db94-968e-115b-767d2e2f007a.png)

一个好的白板工具应该需要有什么特性呢？Excalidraw 的创始人写了一篇很好的文章 [Rethinking Virtual Whiteboard](https://blog.excalidraw.com/rethinking-virtual-whiteboard/) 来回答这个问题。

Excalidraw 的优点有以下：

- 无需注册，直接使用，用完即走；
- 代码开源，免费使用，不用担心商业问题；
- 多人实时协作，共同绘制；
- 数据可导出，可通过链接直接分享给任何人；
- 数据存储在浏览器本地，文件可离线编辑；
- 扩展性强，可以导入其他人绘制的资源库；
- 数据采用[端到端加密](https://blog.excalidraw.com/end-to-end-encryption/)，服务器端数据加密存储，隐私保护很可靠；
- 保存的文件可直接在 VSCode 编辑（通过插件），同时可被其他网站嵌入使用，比如不只是笔记工具的 [Logseq](https://logseq.com/) 里的绘图功能就是嵌入 Excalidraw 完成的；

拥有这么多特性，用 Excalidraw 能画啥图得取决于你的想象力了：在 [One Year of Excalidraw](https://blog.excalidraw.com/one-year-of-excalidraw/) 与 [Create Diagrams That Look Like Hand-drawn
](https://pakstech.com/blog/draw-diagrams/) 这两篇文章里可以看到使用 Excalidraw 画常见的结构图如架构图、结构图、流程图与交互图等，也可以自由绘制如品牌Logo、事件风暴图、原型图、对比图、手绘图、四格漫画与平面图等。

除了 Excalidraw 外，其创始人早期用了另一个白板工具近 10 年，这个工具是 [zwibbler](https://zwibbler.com/)，我看了下感觉用 Excalidraw 完全可以替代它。

### [Miro](https://miro.com/) && [Mural](https://www.mural.co/) && [Figma](https://www.figma.com/)

这几个在线白板很适合团队协作（比如敏捷工作流如 Retro、站会、头脑风暴、工作坊等），和 Excalidraw 不同之处在于，它们支持的模版更为丰富，还能集成不同的 App，比如在白板里插入表格和图片之类。其中 Figma 虽然是个类似 Sketch 的设计工具，但是也支持白板的用法。

不好的地方在于它们都不是开源的，但是也提供了免费版。当然也可以用 Google 出品的 [jamboard](https://jamboard.google.com/) 替代，虽然没有提供模版，但是基本功能都类似。

### Perfect FreeHand

[带有压感的在线手写板工具](https://hw.bmpi.dev)，以下是用手写板手写的效果：

![](https://img.bmpi.dev/cb9a0d14-9e1c-800c-19ab-c2b82316cce0.png)

## 文本绘图

文本绘图的好处在于修改、存储方便，很简单即可绘制出固定模式的图，如时序图、架构图、部署图、线框图、甘特图、WBS与思维导图。 [PlantUML](https://plantuml.com/zh/) 是一个支持文本绘制类UML图的工具，可以在 [Real World Plantuml](https://real-world-plantuml.com/) 找到很多用它实现的图。我一般用它来绘制以下一些图。

### 思维导图

![](https://img.bmpi.dev/4ba9bba0-d63c-a2e7-b02f-ab48fcf64b08.png)

文本如下：

```text
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

<u title="2022/02/18日更新">除了PlantUML外还可以用 [Markmap](https://github.com/gera2ld/markmap)</u>，相比PlantUML的好处在于它基于Web，不需要通过渲染生成图片的方式就可以从文本生成可交互的思维导图。比如下面的通过Markdown生成思维导图的例子：

```text
# markmap

## Links

- <https://markmap.js.org/>
- [GitHub](https://github.com/gera2ld/markmap)

## Related

- [coc-markmap](https://github.com/gera2ld/coc-markmap)
- [gatsby-remark-markmap](https://github.com/gera2ld/gatsby-remark-markmap)

## Features

- links
- **inline** ~~text~~ *styles*
- multiline
  text
- `inline code`
-
    ```js
    console.log('code block');
    ```
- Katex - $x = {-b \pm \sqrt{b^2-4ac} \over 2a}$

## 当然也支持中文啦
```

通过此库最终生成的效果：

```markmap
# markmap

## Links

- <https://markmap.js.org/>
- [GitHub](https://github.com/gera2ld/markmap)

## Related

- [coc-markmap](https://github.com/gera2ld/coc-markmap)
- [gatsby-remark-markmap](https://github.com/gera2ld/gatsby-remark-markmap)

## Features

- links
- **inline** ~~text~~ *styles*
- multiline
  text
- `inline code`
-
    ```js
    console.log('code block');
    ```
- Katex - $x = {-b \pm \sqrt{b^2-4ac} \over 2a}$

## 当然也支持中文啦
```

### 架构图

![](https://img.bmpi.dev/48504c01-c2d0-e05a-1eda-d82b88f6496d.png)

源文本见 [arch_aws.plantuml](https://raw.githubusercontent.com/bmpi-dev/bmpi.dev/master/content/dev/guide-to-serverless/arch_aws.plantuml)。

<u title="2022/02/18日更新">除了PlantUML外还可以用 [Mermaid](https://github.com/mermaid-js/mermaid) </u>来通过文本生成各种UML图。比如下面通过文本生成时序图的例子：

```text
sequenceDiagram
    autonumber
    张三->>李四: Hello John, how are you?
    loop Healthcheck
        李四->>李四: Fight against hypochondria
    end
    Note right of 李四: Rational thoughts!
    李四-->>张三: Great!
    李四->>王五: How about you?
    王五-->>李四: Jolly good!
```

生成的效果图如下：

```mermaid
sequenceDiagram
    autonumber
    张三->>李四: Hello John, how are you?
    loop Healthcheck
        李四->>李四: Fight against hypochondria
    end
    Note right of 李四: Rational thoughts!
    李四-->>张三: Great!
    李四->>王五: How about you?
    王五-->>李四: Jolly good!
```

GitHub的Markdown已经支持Mermaid了，相比PlantUML的优势在于其原生支持Web，无需通过生成图片即可集成到网站页面中。

如果想更灵活的绘制复杂的架构图，推荐使用PlantUML底层使用的[graphviz](https://graphviz.org/)工具，它的效果可参考这篇[Graphviz and Hugo](https://mullikine.github.io/posts/graphviz/)文章。甚至可以用它来绘制RFC协议标准里的<q>ascii</q>风格的文本配图，比如下面的例子：

```text
digraph {
    subgraph cluster_0 {
        a0 -> a1 -> a2 -> a3;
        label = "process \#1";
    }

    subgraph cluster_1 {
        b0 -> b1 -> b2 -> b3;
        label = "process \#2";
    }

    start -> a0;
    start -> b0;
    a1 -> b3;
    b2 -> a3;
    a3 -> a0;
    a3 -> end;
    b3 -> end;
}
```

会生成如下ascii文本图形：

```ascii
     +- - - - - - - - - - - - - +
     '        process #1        '
     '                          '
     ' +----+            +----+ '       +----------+
  +- ' | a1 | <--------- | a0 | ' <--   |  start   |
  |  ' +----+            +----+ '       +----------+
  |  '   |                 ^    '         |
  |  '   |                 |    '         |
  |  '   |                 |    '         v
  |  '   |                 |    '     + - - - - - - -+
  |  '   |                 |    '     '  process #2  '
  |  '   v                 |    '     '              '
  |  ' +----+              |    '     ' +----------+ '
  |  ' | a2 |              |    '     ' |    b0    | '
  |  ' +----+              |    '     ' +----------+ '
  |  '   |                 |    '     '   |          '
  |  '   |                 |    '     '   |          '
  |  '   |                 |    '     '   v          '
  |  '   |                 |    '     ' +----------+ '
  |  '   |                 |    '     ' |    b1    | '
  |  '   |                 |    '     ' +----------+ '
  |  '   |                 |    '     '   |          '
  |  '   |                 |    '     '   |          '
  |  '   |                 |    '     '   v          '
  |  '   |               +----+ '     ' +----------+ '
  |  '   +-------------> | a3 | ' <-- ' |    b2    | '
  |  '                   +----+ '     ' +----------+ '
  |  '                          '     '   |          '
  |  +- - - - - - - - - - - - - +     '   |          '
  |                        |          '   |          '
  |                        |          '   |          '
  |                        |          '   v          '
  |                        |          ' +----------+ '
  +------------------------+--------> ' |    b3    | '
                           |          ' +----------+ '
                           |          '              '
                           |          + - - - - - - -+
                           |              |
                           |              |
                           |              v
                           |            +----------+
                           +-------->   |   end    |
                                        +----------+
```

可以通过graphviz的命令行工具来生成，也可以使用这个在线网站：[dot-to-ascii](https://dot-to-ascii.ggerganov.com/)。

> 关于如何用文本画好一幅好的架构图，推荐看 [C4 Model](https://c4model.com/) 的作者的这篇 [Software architecture diagrams as text](https://dev.to/simonbrown/visio-draw-io-lucidchart-gliffy-etc-not-recommended-for-software-architecture-diagrams-4bmm)。

## 专业绘图

## ASCII

ASCII风格的绘图很适合放在代码或纯文本文档中，如：

![](https://img.bmpi.dev/b2b51eab-7a45-637b-04fc-21fcc43fd8b4.png)

![](https://img.bmpi.dev/e053e651-8507-f792-cdcb-8c64a4302f62.png)

手工画显然太困难，可以使用相关的工具绘制：

1. [asciiflow](https://asciiflow.com/)是款功能简单的免费在线绘制ASCII风格图的网站。
2. [monodraw](https://monodraw.helftone.com/)是Mac上功能强大的付费App，可以绘制复杂的ASCII图形，如下图：

![](https://img.bmpi.dev/4a1c8325-2fcf-e2df-2cb8-3603d10dbe53.png)

### Sketch/OmniGraffle

![](https://img.bmpi.dev/0fa1a962-7d25-4263-7844-d6f76d2360c1.png)

源文件见 [Serverless.sketch](https://github.com/bmpi-dev/bmpi.dev/blob/master/content/dev/guide-to-serverless/Serverless.sketch?raw=true)。

要想用 Sketch 画好配图，配色很重要，这方面可以看 draveness 写的这篇[《技术文章配图指南》](https://draveness.me/sketch-and-sketch/)。当然 Sketch 可以做的远不止这些，不过这不在本文讨论范围。

### draw.io/Google Drawings

这类工具都可以绘制各类你想要的配图，唯一限制的就是你的想象力了。

在线绘图工具如 [Google Drawings](https://docs.google.com/drawings) 的多人实时协作功能更是团队协作绘图利器。这篇[《分布式事务中的时间戳》](https://ericfu.me/timestamp-in-distributed-trans/#more)中的配图就是用 Google Drawings 绘制的。

## 代码绘图

### Plotly

[Plotly](https://plotly.com/javascript/)是一个基于[d3.js](https://d3js.org/)与[stack.gl](https://github.com/stackgl)的图形库，它可以用来绘制各种类型的图表，比如散点图、折线图、饼图、柱状图甚至3D图形等。

{{< plotly json="/self/my-drawing-toolbox/scatter3d.json" height="400px" >}}

> - 与Hugo的集成可参考这篇[Plotly & Hugo](https://mertbakir.gitlab.io/hugo/plotly-with-hugo/)。
>
> - 如果是想基于各类数据库做商业数据分析的话还可以使用如[Metabase](https://github.com/metabase/metabase)这类开源方案。

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

## 关于绘图工具的思考

没有一种工具是万能的，万能如 Excalidraw 也无法替代 Lucidchart/Draw.io/Google Drawings/Visio 这些复杂的工具（他们更适合复杂的对精确性有高度要求的图）。更没有一种软件工具能替代纸和笔。工具更重要的是背后使用它的人，能用图片讲好一个故事才是我们需要不断提升的能力，一个工具能做到不限制你的发挥就算适合的好的工具。

![](https://img.bmpi.dev/c5519e95-440b-3edb-4f2e-dfe8f3a2db63.png)

## 进一步阅读

- [技术文章配图指南](https://draveness.me/sketch-and-sketch/)
- [技术配图的一些心得](https://www.codedump.info/post/20220304-weekly-8/)