---
title: "善用GitHub"
date: 2022-11-12
draft: false
tags: ["GitHub", "GitHub Codespaces", "GitHub博客", "GitHub Pages"]
description: "用GitHub来学习、创作与展示。"
isCJKLanguage: true
markmap:
  enabled: true
---

- [GitHub是好的学习平台](#github是好的学习平台)
- [GitHub是好的写作平台](#github是好的写作平台)
- [GitHub是好的开发平台](#github是好的开发平台)
- [利用GitHub打造个人技术影响力](#利用github打造个人技术影响力)
- [基于GitHub的生态](#基于github的生态)
- [GitHub Next](#github-next)

```markmap
# GitHub
## 学习平台
- GitHub Search
- GitHub Stars
- GitHub Dev
## 文字创作
- GitHub Markdown
- GitHub Pages
- GitHub Discussions
## 代码创作
- GitHub Codespaces
- GitHub Copilot
- GitHub Actions
- GitHub Projects
- GitHub Packages
## 技术影响力
- GitHub Profile
- 开源项目
## 生态
- SSO
- Cloudflare
- Vercel
- Railway
## GitHub Next
- AI
- 语音编程
- 协作
- 可交互文档
```

[GitHub](https://github.com/)是微软旗下的一个在线软件源代码托管服务平台，也是一个拥有八千多万开发者用户的社区。很多开发者应该对GitHub有一定的了解，但非技术人员大多可能并不会去使用它。本文更多是想给非技术人员来介绍这个平台，看完这篇文章，希望能让更多人在上面来学习、创作与展示自己的作品。

## GitHub是好的学习平台

GitHub拥有非常多的开源项目，这些开源项目中的一些已经成为了IT行业的软件基石，比如[Linux](https://github.com/torvalds/linux)内核项目。

如果你想学一门软件开发的技术，比如学会用Python做一些数据分析，那GitHub就是这方面最好的一个学习平台。为什么这么说？

学习首先是需要找一个好的教程，在GitHub上最不缺的就是教程类的项目。以Python为例，通过在GitHub上搜索，可以很容易找到这个[Awesome Python](https://github.com/vinta/awesome-python)的项目，它收集了很多Python相关的教程、项目、库等等，你可以在这个项目中找到你想要的学习资料。而且因为它是一个Star数近十五万的明星项目，被很多开发者认可，所以上面推荐的资料质量也是非常高的。

当然GitHub并不完全是英文的，中文资料也很多，不过我还是推荐尽可能使用英文的资料，如果你要走技术之路，英文是必须的。

找到教程学习后，接下来就是去开发一个真正的项目了。按正常的流程，我们需要在我们的电脑上配置复杂的软件开发环境，就这一步已经让很多人望而却步了。但是在GitHub上，你可以直接在网页上编辑代码，然后提交到GitHub上，这样你就可以在任何一台电脑上开发你的项目了。这个功能叫做[GitHub Codespaces](https://github.com/features/codespaces)。

比如下面就是我在开发的一个开源项目，其是一个基于Python的项目，我可以在网页上直接编辑代码，然后提交到GitHub上。

![](https://img.bmpi.dev/8e6e3140-4fd4-37f7-8de4-a783234d6060.png)

在上图红框部分可以创建一个免费在线的开发环境，打开后就是一个网页版的VSCode。也就是说GitHub给了你一个云端开发环境（一个拥有Root用户权限的Linux系统，可以配置安装任何软件）！这个开发环境可以一直存储在云端，在任何时候打开就可以继续开发，保存在上面的文件也不会被删除。

![](https://img.bmpi.dev/c96cab40-57fd-8c1c-2db8-60fa489be2db.png)

有时候当你只想阅读其他人的代码时，在GitHub网页上按下`.`键就会自动打开一个在线VSCode的开发环境，相比网页可以更方面的阅读与搜索代码。

GitHub还提供了强大的代码搜索功能，除了在GitHub.com上搜索外，还可以在[GitHub code search](https://cs.github.com/)上搜索，这个搜索引擎可以搜索GitHub上的所有的公开仓库代码。我觉得它提供了类似[sourcegraph](https://sourcegraph.com/search)的体验，包括更好的代码符号跳转功能。

在一个浏览器内搞定代码的搜索、阅读与开发功能，我觉得这是非常震撼的，起码在十几年前是不可能的。

如果你并不想写代码，只想写点文字，GitHub也能给你带来非常好的写作体验。

## GitHub是好的写作平台

基于[Markdown](/tags/markdown/)的写作一直是我推崇的，早在十年前，我在[Wordpress](https://wordpress.com/)上写作，Wordpress提供了最简单的网站搭建体验，以至于全球有超过四成的网站都是用Wordpress搭建的，包括个人博客。但Wordpress的搭建还是太麻烦了，虽然现在很多国内的云服务商都提供了一键搭建Wordpress的功能，但还是有很多限制，比如不是免费的，需要备案，需要维护服务器等。

在GitHub上写作非常简单，只需要一个GitHub账号，然后在GitHub上创建一个仓库，然后在仓库里创建一个Markdown文件，就可以开始写作了。写作的内容就是Markdown格式的文本，GitHub会自动将Markdown转换为HTML，然后在浏览器上显示出来。

除了这种方式，还可以使用[Cloudflare Pages](https://pages.cloudflare.com/)，它可以将GitHub仓库里的内容自动部署到Cloudflare的CDN上，这样就可以使用自定义域名了。

如果你想要更好的写作体验，还可以使用这个[vuepress-theme-hope](https://vuepress-theme-hope.github.io/v2/zh/)的开源项目，它提供了非常强大的定制能力，使用方式却很简单，比如我用它在GitHub上搭建了一个文档网站：[free4chat开发手记](https://dev-notes.free4.chat/)。在每个页面的底部都有一个`在GitHub上编辑此页`的按钮，点击后就可以直接在GitHub上修改这个页面，修改后提交，GitHub会自动重新构建网站，然后你就可以在网站上看到修改后的内容了。

由于GitHub的仓库会自动保存每次修订的历史记录，如果出错也可以回退到之前的版本，再也不担心数据丢失的问题了。

当然这个博客也是在GitHub上搭建的，你可以在这个仓库查看到它的原始文件：[bmpi-dev/bmpi.dev](https://github.com/bmpi-dev/bmpi.dev)。

如果想给网站添加评论功能，可以使用[giscus](https://giscus.app/)，它会自动将评论保存到GitHub仓库的Discussions里，这样就不用担心评论数据丢失的问题了。比如本博客的评论数据都在这里：[bmpi-dev/bmpi.dev/discussions](https://github.com/bmpi-dev/bmpi.dev/discussions/categories/announcements)。

## GitHub是好的开发平台

GitHub是**最好**的开发平台。从上面的内容相信你可以看出来，GitHub围绕软件的搜索、阅读与开发体验方面做了很多改进。甚至用一个浏览器就可以完成软件产品的开发、测试与部署。本文不会详细的介绍GitHub的全部功能，但以下这些功能是我感觉非常值得尝试的：

- Jupyter Notebook：[对机器学习有很好的支持](https://github.blog/2022-11-22-exciting-new-github-features-powering-machine-learning/)，比如直接在网页执行Notebook内的代码并将结果渲染出来。
- [GitHub Codespaces](https://github.com/features/codespaces)：提供一个在线的[云端IDE](/dev/vscode-on-cloud/)，可以在浏览器里直接编辑代码，然后在云端编译、运行、调试代码，非常方便。甚至还提供了GPU的实例，可以训练机器学习模型。
- [GitHub Copilot](https://github.com/features/copilot)：提供一个在线的AI代码自动补全功能，可以根据上下文对你的代码自动补全，甚至包括[写博客](https://twitter.com/madawei2699/status/1458313535792955393)！（这篇文章的一部分就是这个AI小助手自动撰写的，你能看出来吗？）
- [GitHub Actions](https://github.com/features/actions)：提供一个Pipeline as Code的CI/CD服务。比如可以实现，当博客文章更新时，自动发送通知给订阅者，我的博客就实现了类似的功能，具体的实现可以看这个文件：[.github/workflows/gh-pages.yml](https://github.com/bmpi-dev/bmpi.dev/blob/master/.github/workflows/gh-pages.yml)。
- [GitHub Packages](https://github.com/features/packages)：提供类似Docker Hub的软件包管理功能。

最重要的是，这些功能很多都提供了免费的额度，足够日常使用了，你要做的就是去创作，利用[技术杠杆](/self/how-to-get-rich/#选择带杠杆的商业模式)去实现自己的想法。

## 利用GitHub打造个人技术影响力

打造个人技术影响力，可能是很多开发者无偿在GitHub上创造各种开源项目的一个主要原因。而技术影响力又可以让开发者能获得更多的机会，比如获得更多的工作机会，影响更多的人等。

在GitHub上你可以找到很多很厉害的人，比如前端大佬[antfu](https://github.com/antfu)，Elixir的作者[José Valim](https://github.com/josevalim)，通过关注这些人的动态，了解最新的技术趋势，不断提高自己的技术能力。

GitHub也是一个很好的技术展示平台，你可以通过创建自己的GitHub Profile来展示自己的技术栈，比如我的[GitHub Profile](https://github.com/madawei2699)。也可以用这个工具[GitHub Profile README Generator](https://rahuldkjain.github.io/gh-profile-readme-generator/)来生成自己的GitHub Profile。

![](https://img.bmpi.dev/09976689-173e-3fbf-66ca-03ef5a9716df.png)

## 基于GitHub的生态

GitHub的生态系统非常庞大，有很多SaaS服务可以与其集成，从而提供完美的开发体验，比如：

- [SSO](/dev/distributed-system/authentication-and-authorization/#认证)：很多技术网站都提供了GitHub的SSO集成，尤其是和开发者SaaS服务相关的网站，如果要使用这些服务，则必须要有一个GitHub账号。
- [Cloudflare](https://www.cloudflare.com/)：全球最流行的CDN，和GitHub集成后，Cloudflare Pages可以实现自动部署，当代码push到GitHub后，Cloudflare会自动将网站发布到Cloudflare的全球网络节点中。
- [Vercel](https://vercel.com/)：和Cloudflare Pages一样，集成GitHub后，可以自动部署网站到Vercel的CDN网络中。我的一些[小工具](/tool/)就是部署到Vercel上的。
- [Railway](https://railway.app/)：提供了后端服务包括数据库的托管，集成GitHub后，可以自动部署应用到Railway的服务器上。

这些SaaS服务同样都提供了一些免费额度，轻度使用，可以免费做很多小项目。

## GitHub Next

[GitHub Next](https://githubnext.com/)正在探索一些能影响软件开发未来的方向，目前有几个方向挺有意思的：

- AI：或者说深度学习模型，正在逐渐的[改变世界](https://twitter.com/madawei2699/status/1586313511973838848)，比如GitHub Copilot正是基于深度学习模型来实现代码自动补全的功能。未来基于GitHub Copilot的代码重构、写自动化测试、与开发者结对编程也不是不可能的事情，当然让AI帮我们写文章，或者合写文章也是一件自然而然的事情。
- 语音编程：如果能通过自然语言与GitHub Copilot沟通，那编程将会变成搭积木一样的简单，一些基本的功能就可以通过语音来实现，而不需要写代码。这事想想就觉得不可思议，甚至有种托尼·斯塔克与贾维斯对话去制造钢铁侠战甲的感觉。
- 协作：由于疫情的出现，远程工作正变得越来越流行（或者说需要），远程结对编写代码目前还没有什么比较好的方式，解决多人如何在同一个代码库实时协作是个有意思的领域。
- 可交互文档：虽然GitHub现在对Markdown的支持已经非常好了，但这种支持还仅限静态的，如何让文档变得可交互，让文档更有表达性，也是一个值得进一步挖掘的方向。

![](https://img.bmpi.dev/b4ec85ea-e0c8-7713-0d18-dee1797d9e87.png)

虽然我注册GitHub有很多年了，但逐渐投入越来越多的时间在上面还是在这几年。尤其是这两年来，我愈发觉得GitHub正在逐渐改变软件开发的常规模式，尤其是GitHub Copilot的出现，以及一条龙式的开发体验，甚至以后从代码的设计、开发、测试到部署都可以在GitHub网页上完成，这些都是我之前想象不到的。

希望这篇文章能让读者对GitHub有个全新的了解，如果你还没有注册GitHub，那就赶紧去注册一个吧。
