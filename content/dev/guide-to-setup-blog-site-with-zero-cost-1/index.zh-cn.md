---
title: "零成本搭建现代博客之搭建篇"
date: 2020-02-29
draft: false
tags: ["Markdown", "独立博客", "个人博客", "技术博客", "GitHub博客", "Hugo", "Netlify", "Github", "Namecheap", "AWS"]
keywords: "Markdown, 独立博客, Hugo, Netlify, Github, Namecheap, AWS"
description: "本文介绍了如何零成本搭建一个自由独立的写作平台-基于GitHub的个人技术博客搭建指南"
series: ["零成本搭建现代博客指南"]
isCJKLanguage: true
---

> 本文属于[零成本搭建现代博客指南](/series/零成本搭建现代博客指南/)系列第一篇【个人技术博客搭建篇】。
> ![](https://img.bmpi.dev/3972bce0-19ad-3c31-78da-99b35aab1f8a.png)
> 这个系列不少的东西需要你科学上网才能访问，也就是你需要一把[梯子](/affiliate)。

## 为什么要搭建自己的个人博客

你可能会想，我们有知乎专栏、微信公众号、简书、头条号与百家号等等，为什么还要搭建一个博客呢？在自媒体的时代，个人博客看起来就像是一个古董一样老旧，不仅需要自己维护，还没有多少人阅读。

一开始我也是这么想的，直到我经历了这些：

![](https://img.bmpi.dev/6c9080d7-473c-cace-8b20-9e704f8fe4d9.png)

![](https://img.bmpi.dev/f2f0120a-9764-4a9b-f3fb-af48c5434861.png)

毕竟在别人的地方上不自由，让我们还是花点时间搭建一个自己的网站吧！除了独立自由，自己的博客还有以下优点：

1. 个人品牌打造
2. 备份归档文章
3. 广告被动收入

{{< ad_embed_post >}}

## 个人博客搭建基本流程

搭建一个网站在十年前可能很麻烦，但是在2020年就算你完全不懂技术也可以在很短的时间譬如半小时内搭建一个属于自己的网站。在很久以前要做一个静态网站需要以下流程：

1. ~~选择一个成熟的CMS平台，如Wordpress。~~
2. ~~租一台独立服务器或者共享的虚拟主机空间。~~
3. ~~配置服务器，安装各种复杂软件。~~
4. ~~配置CMS平台，选择主题皮肤，定制修改。~~
5. ~~买域名，配置域名解析。~~
6. ~~在CMS平台上写第一篇文章。~~

![](https://img.bmpi.dev/b832b17e-473c-adcd-4630-1c243176ec28.png)

这么复杂的流程劝退了很多人。在 SasS 时代一切都变得简单起来，现在我们只需要以下的流程：

1. 使用 [Hugo](https://gohugo.io/)/[Hexo](https://hexo.io/) 等静态网站生成工具生成一个网站。
2. 在 [GitHub](https://github.com/) 开一个仓库，将网站使用Git上传至仓库。
3. 在 [Netlify](https://www.netlify.com/) 上绑定GitHub仓库。
4. 用[Markdown写第一篇文章](/dev/what-markdown-can-do/)。通过Git推送到仓库后，网站自动更新发布上线！
5. [买域名](https://www.tkqlhce.com/kp97mu2-u1HRKNKNLMHJLKOOOOQ)，配置域名解析。

看起来依旧很麻烦，不过少了最麻烦的服务器购买与配置环节，让以上5步**仅需要几分钟即可完成一个网站的发布创建**。

之前我写了一篇[《打造优雅高效的写作环境》](/self/build-write-tool-v1/)，里面介绍我使用 Hexo 搭建博客的过程，而现在我的博客是基于 Hugo 搭建的，本质两者没啥区别，都是基于 Markdown 的静态网站生成器，它们都属于 [JAMStack](https://jamstack.org/) 技术栈（这个技术栈主要研究无服务器的静态网站生成技术，利用 CDN 部署网站）。Hugo 和 Hexo 的最大差异在于生成网站的速度，如果你有大量网页需要生成，最好使用 Hugo，因为它是使用 [Golang](https://golang.org/) 语言开发的，这也是我最终选择 Hugo 的原因。

目前还有大量的网站例如博客、品牌网站、图片站甚至电商站等都是用 [Wordpress](https://zh-cn.wordpress.com/) 建站工具搭建的，互联网上近 35% 的网站是用它搭建的，所以先说说 Wordpress 和 Hugo 这类静态化站的差异：

| 维度 | Wordpress | Hugo |
| -- | -- | -- |
| 部署 | 一般需要独立的服务器 | 一般不需要服务器，直接部署到 CDN |
| 性能 | 因为是 PHP 开发的动态站，所以在性能上有瓶颈，可能需要做不少设置才能提高一些性能，但和 Hugo 的静态网站相比还是太差 | 纯静态化的页面，理论上性能极高，可以不考虑性能问题 |
| 速度 | 加载速度和 CDN 有很大的关系，也和服务器渲染网页的速度有关系，因为 Wordpress 是动态网站，需要动态渲染，所以速度也差一些 | 已经生成好的网页，速度取决于 CDN 的速度了 |
| 定制化 | 生态已经很繁荣了，所以几乎你需要的任何东西都有插件可以满足 | 插件少，如果想定制很多功能，那么需要你对 Hugo 有深入的了解 |
| 后台管理 | 本身就是 CMS 系统，可以在后台管理各种功能 | 本身是个静态化工具，没有后台管理功能，很多设置都直接使用文本来配置，对非程序员不友好。但是目前也有相关的 CMS 系统，如 [forestry](https://forestry.io/)，配合 [gatsbyjs](https://www.gatsbyjs.org/) 之类的技术可以开发出任何你想要的网站 |
| SEO | 对 SEO 很友好 | 需要一些定制才能提高 SEO |

从上述对比可知：

1. 如果你完全不懂技术的话，可以使用Hugo在本地生成一个静态站体验下，然后学习一点[Git基本知识](https://learnxinyminutes.com/docs/zh-cn/git-cn/)，将网站推送到 GitHub ，然后使用 Netlify 配置部署。之所以不推荐用Wordpress是因为配置服务器是个复杂而麻烦的过程，可能直接劝退了非程序员的朋友。
2. 如果你懂一点技术，玩过 Linux 或者 Windows 版本的 [LAMP](https://wiki.deepin.org/wiki/LAMP%E6%9C%8D%E5%8A%A1)，那么还是推荐使用 Wordpress。
3. 如果玩过 Wordpress 但对性能有很高的要求，也不想在性能提升上浪费精力，又想使用 Markdown 的话，那么建议体验下 Hugo 吧，本文正是为这类人准备的，当然不懂技术也可以了解下，看完至少你会了解到如何不花钱搭建一个属于自己的博客。

## 使用Hugo搭建个人博客

> 在以下部分我都以 Mac 的安装环境为例，但是其他平台应该也都是相似的

先看个动图，展示下 Hugo 是如何简单的搭建一个网站：

[![Kapture-2020-03-01-at-0.34.57.gif](https://s5.gifyu.com/images/Kapture-2020-03-01-at-0.34.57.gif)](https://gifyu.com/image/IxgR)

1. 安装Hugo和Git

```
brew install hugo
brew install git
```

2. 选择主题皮肤

在 Hugo 官方的[主题站](https://themes.gohugo.io/)我们可以找到大量别人已经开发好的主题皮肤。我们以本博客主题 [Coder](https://themes.gohugo.io/hugo-coder/) 为例：

```
hugo new site bmpi.dev
```

执行这个命令后我们得到了这些文件:

```
.
├── archetypes
│   └── default.md
├── config.toml # 配置文件入口
├── content # Markdown 文件存放入口
├── data
├── layouts # 网站页面结构管理入口
├── static # 网站静态资源存放入口
└── themes # 网站主题皮肤入口
```

这是Hugo帮我们生成好的网站骨架，其中 `content` 是我们写文章的地方，每篇文章就是一个 Markdown 文件。如下图是我博客目前的文章：

![](https://img.bmpi.dev/bfbb42ad-6007-b1d0-d5d2-e96ced5c116b.png)

然后开始添加主题：

```
cd bmpi.dev
git init
git submodule add https://github.com/luizdepra/hugo-coder.git themes/hugo-coder
```

配置 Hugo，主要是修改 `config.toml`：

```toml {linenos=table,hl_lines=[4],linenostart=1}
baseURL = "http://example.org/"
languageCode = "en-us"
title = "My New Hugo Site"
theme = "hugo-coder"
```

这是最简单的配置，本博客的配置文件在这里可以看到：[bmpi.dev config.toml](https://github.com/bmpi-dev/bmpi.dev/blob/master/config.toml)。

复制一些主题样本数据：

```
cp -R themes/hugo-coder/exampleSite/ .
```

启动！

```
hugo server
```

最终效果：

![](https://img.bmpi.dev/11caabbc-5203-a45c-af8d-141ab3c5a829.png)

以上就是一个非常简单的使用 Hugo 创建网站的过程，当然这只是开始，如果你想深度定制 Hugo 的话，最好先看看它的官方[帮助文档](https://gohugo.io/documentation/)，主要包括模版定制、内容组织、配置等。

## 使用GitHub托管个人博客

本博客的代码都存放到了`全球最大同性交友网站` GitHub 上了，具体看这里 [bmpi.dev](https://github.com/bmpi-dev/bmpi.dev) 。

GitHub 目前已经从代码存放库进化到了无所不包，有人在里面写小说，有人在里面写博客，有人在里面存放自己的照片。无论你是不是程序员，都可以了解下如何利用好这个网站。

让我们开始建立一个仓库，不过你得先注册一个账号：

![](https://img.bmpi.dev/ff7a7542-1a49-0153-891b-aef08ef5007c.png)

![](https://img.bmpi.dev/86e6fc0b-6c70-faec-b867-0aa426e8f50f.png)

接下来让我们把上一步创建的网站数据通过 Git 上传到 GitHub 托管。

```
git add .
git commit -m "first commit"
git remote add origin https://github.com/bmpi-dev/test.bmpi.dev.git
git push -u origin master
```

![](https://img.bmpi.dev/1c62cc67-96b1-b926-3918-c68c7d2259cd.png)

至此，我们已经将网站上传到了 GitHub 。如果之后你要新增文章后上传也只需要执行：

```
git add .
git commit -m "update"
git push
```

## 使用Netlify部署个人博客

上传到 GitHub 后，接下来让我们开始部署网站：

[![Kapture-2020-03-01-at-1.16.11.gif](https://s5.gifyu.com/images/Kapture-2020-03-01-at-1.16.11.gif)](https://gifyu.com/image/Ixgo)

Netlify 本身是个具备 CI/CD 功能的 CDN 网站托管平台，同类还有 [`ZEIT Now`](https://zeit.co/)。注册好账号后，开始新建一个网站：

![](https://img.bmpi.dev/84d75f2e-9f66-b248-7202-e0508428388a.png)

如上点 `Deploy site` 后：

![](https://img.bmpi.dev/7e9976fa-b4cb-9708-bef0-55fb9e3441f7.png)

![](https://img.bmpi.dev/a38c93b5-3041-f16c-4ea6-a01d3ddfb1d3.png)

如上图，我们的网站因为域名配置不正确，导致一些静态资源无法正常加载，让我们开始修复这个问题：

```toml {linenos=table,hl_lines=[1],linenostart=1}
baseurl = "https://frosty-colden-937773.netlify.com/"
title = "johndoe"

theme = "hugo-coder"
```

修改好 `config.toml` 后，使用之前介绍的 Git 上传方法将更新的文件上传至 GitHub，然后再次访问 `https://frosty-colden-937773.netlify.com/`:

![](https://img.bmpi.dev/fcd662df-9f23-e3dc-e521-c12a4ec736dd.png)

网站上线了！至此我们没有花一毛钱，不过你会发现这个域名很奇怪，这是 Netlify 免费给我们的二级域名，要想使用自己的域名，我们的花钱买个域名，不过这个域名的费用一般也可以用网站的广告收入来 cover，所以可以说是零成本建站。

> 需要注意的是这个网站已经自带 CDN 功能了，你无需再次集成如 [cloudflare](https://www.cloudflare.com/) 之类的 CDN，默认免费的账户 Netlify 给我们每月[100GB](https://www.netlify.com/pricing/)的流量，超出需要掏钱了，不过这个对小站来说足够了。

## 个人博客集成评论功能

网站加入评论可以让我们和网站的受众互动起来，也可以对某个主题进行持久的讨论，我的[博客](https://www.bmpi.dev)使用了 [utteranc](https://utteranc.es/)，而我的[电报群聚合站](https://tg.bmpi.dev)则使用了 [disqus](https://disqus.com/)。

可能一般网站使用 disqus 的居多，这也是很成熟的评论框架，但是 utteranc 的优势在于完全集成了 GitHub，所有的评论数据都存放到 GitHub 的 issue 里了：

![](https://img.bmpi.dev/30573d3e-d39f-438b-900c-bc29cd6ee635.png)

集成 disqus 很简单，网上有大量的帖子，具体集成方式这里不做赘述了。而集成 utteranc 的代码也可以看这里 [utteranc.html](https://github.com/bmpi-dev/bmpi.dev/blob/master/themes/hugo-coder/layouts/partials/posts/utteranc.html)。

## 个人博客集成自定义域名

域名一般我在 [Namecheap](https://www.tkqlhce.com/kp97mu2-u1HRKNKNLMHJLKOOOOQ) 上购买，当然 GoDaddy 上也可以。比如这个 `bmpi.dev` 第一年是91元人民币，第二年是120元。也有非常便宜的域名，譬如 xyz 后缀的第一年只要7元。有人担心这些域名对 SEO 不友好，其实没啥影响，com 域名主要是历史悠久，一般人想到一个品牌可能第一时间想到的就是 com 域名，不过我们的博客初始没啥影响力，选个小众后缀但好记的的反而比较好。

买好域名后，我们需要将 DNS 配置成 Netlify 的，当然我的博客选择的是 `AWS Route53` 做我的域名解析服务。Netlify 配置域名很简单，安装它的提示来即可。因为 `bmpi.dev` 主 DNS 已经用 `AWS Route53` 配置了，我就按它的配置界面来介绍了。

1. 先在 Netlify 的域名配置里加入 `test.bmpi.dev`：

![](https://img.bmpi.dev/6568d8b5-d2b6-fb3e-94c9-756f3df501e0.png)

2. 在 `AWS Route53` 中配置 CNAME 域名解析：

![](https://img.bmpi.dev/8692c1b5-dff4-1ad5-6b59-8ae74f36fc25.png)

稍等一会，等 Netlify 给我们自动配置好 HTTPS 证书后，在此之前我们先把网站的 `config.toml` 里的网站域名修改成 `test.bmpi.dev`，之后大概等个10分钟左右让我们访问 [test.bmpi.dev](https://test.bmpi.dev)。

![ac75bf15b8e74ef39e56cd95197d7422_th.gif](https://s5.gifyu.com/images/ac75bf15b8e74ef39e56cd95197d7422_th.gif)

## 个人博客集成流量监控

本博客使用了 [Google Analytics](https://analytics.google.com/analytics/web/)，也就是我们常说的 GA 统计:

![](https://img.bmpi.dev/a850bb38-7eaa-398f-486f-de798305f4e3.png)

接下来让我们给 `test.bmpi.dev` 集成 GA，因为主域名已经通过 DNS 验证过了，所以直接添加跟踪代码即可：

![](https://img.bmpi.dev/46c3ed2f-0aa6-b754-fefd-60d335fd6470.png)

![](https://img.bmpi.dev/6d650f52-99c6-6f24-0257-5bdb8aeeded0.png)

注意跟踪代码要添加到每个网页文件 <HEAD> 标记中，在 Hugo 中一般在主题的模版里直接添加，这个公共的文件在 [`/themes/hugo-coder/layouts/_default/baseof.html`](https://github.com/bmpi-dev/test.bmpi.dev/blob/master/themes/hugo-coder/layouts/_default/baseof.html#L91)：

```html {linenos=table,linenostart=91}
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-154678195-6"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-154678195-6');
</script>
```

以上就是集成 GA 的流程，同时建议把 [`GoogleSearchConsole`](https://search.google.com/search-console/about)集成上，这就是我们常说的站长工具，可以了解 Google 爬虫对我们网站的索引率，网站出现的一些影响 SEO 的因素都可以通过这个工具发现。

![](https://img.bmpi.dev/255b9c52-ef00-8db8-c3b9-dcea7fb63a7b.png)

## 个人博客集成广告投放

零成本的关键，广告收入覆盖我们的域名支出费用，如果你对广告不了解，建议先看这篇[什么是互联网广告](/money/what-is-internet-advertising/)。

本博客集成了 [`Google AdSense`](https://www.google.com/adsense/start/)。Google 还要一个 [`Ads`](https://ads.google.com/home/)，AdSense 是媒体如站长用来接广告的平台，而 Ads 是广告主用来投放广告的。

集成 Google AdSense 有一些条件，域名需要一些时间，网站内容不能太少，所以前期可以不接这个，等你的流量达到一定规模了再接，否则审核可能无法通过。集成过程和 GA 很相似，这里不在赘述。

![](https://img.bmpi.dev/f8ce36bb-94df-98f2-2438-eaad3cc44f00.png)

## 个人博客图床的选择

博客中最常见的就是图片资源了，图片一般会存放到某个图床或者云服务当中。

在国内如果你的域名备案过的话可以使用[七牛云服务](https://www.qiniu.com/)，具体集成方式参考[《打造优雅高效的写作环境》](/self/build-write-tool-v1/)。

本博客由于域名没有备案，所以使用的是 AWS S3 + CloudFront，具体集成方式参考[《我的笔记系统》](/self/note-system/)中`VSCode插件一键存储图片至S3`部分的介绍。

当然你也可以使用 GitHub 来托管图片，只要在 Markdown 中引用相对路径的图片即可。

## 关于个人博客备案的问题

2020年3月1日国家互联网信息办公室发布了[《网络信息内容生态治理规定》](http://www.cac.gov.cn/2019-12/20/c_1578375159509309.htm)。在这份公告中鼓励以下内容制作：

![](https://img.bmpi.dev/5ed7aad5-6164-1efe-55d7-c693bfce0eec.png)

备案还是不备案，这是一个问题。

对于商业产品用户都是国内的话那必须要备案，备案后你也可以使用国内的云服务和 CDN 了，这样网站在国内的加载速度也会很快。

```
最初，
没有人在意这场灾难，
这不过是一场山火，
一次旱灾，
一个物种的灭绝，
一座城市的消失，
直到这场灾难与每个人息息相关。
```
