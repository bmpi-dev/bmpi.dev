---
title: "打造优雅高效的写作环境"
date: 2016-06-26
draft: false
tags: ["写作系统", "Hexo", "GitHub Pages", "图床"]
aliases: [
    "/zh-cn/self/build-write-tool-v1/"
]
keywords: ["写作系统", "Hexo", "GitHub Pages", "图床"]
description: "本文介绍了使用GitHub Pages以及Hexo工具打造个人优化高效的写作系统"
---

写作是一件很有趣的事情，长期形成良好的写作习惯可以帮助我们有条理的处理解决问题，同时给人生留下点回忆也不错。在我们很小的时候也许就有记日记的习惯，大脑的记忆量毕竟很有限，所以我们用纸和笔来记东西，但是传统的纸和笔存在很大的问题，无法长久的保存东西。进入互联网时代后我们有了很多选择，各类网站博客、专栏、微博、公众号等可以让我们写作的地方，但是这些都无法解决以下几个问题。

1. 排版。编辑器不支持Markdown语法。每次看到那种糟糕的排版都让人没有看的欲望了。很多宝贵的时间都浪费到排版上了。
2. 版本管理。如果有多个版本常规的博客只能你自己来保存了，一旦出错就很难回到之前的版本了。
3. 难以长期保存。诸如网站关闭或者电脑损坏丢失都会导致之前的资料丢失，资料很难长期保存。
4. 网站难看。很多网站博客只提供一些难看的主题，你很难定制好看的主题，大部分这些难看的主题对移动终端还不友好。
5. 文章发布流程繁琐。很多网站的编辑写作界面都很糟糕，发布起来还很麻烦，如果能通过简单的命令就可以发布上去是多么优雅的事情。
6. 不支持自定义域名。难以个性化的域名很难体现个人的品牌。
7. 受限的写作环境。一些网站为了通过政府部门的内容审查，你写的内容很可能不经意被强制删除，总之在别人的地盘上你的东西不一定是你的。
以上就是可能存在的几个问题，我理想的写作环境应该是可以解决上述几个问题的，下面我通过几步来打造一个专属于我们自己的优雅的写作发布环境。

## 环境搭建

### 博客系统（Hexo） & 主题（Next）

首先我们需要一个博客系统，目前市场上存在很多完整的博客系统：如Wordpress或一些CMS系统等，但是这些系统都太大，很臃肿。我们需要一个轻量级别的博客系统，并且能配合GitHub Pages来管理我们的文章及相关信息。Hexo就是一个满足我们需求的博客系统。
在Mac下通过命令行安装：

```shell
npm install hexo-cli -g
hexo init blog
cd blog
npm install
hexo server
```

> 如果是Windows或者Linux系统也可以通过如下命令来安装，Windows系统需要提前安装好NPM软件包，安装流程可以通过Google或者官方文档来查看。

这时候你已经部署好了Hexo博客系统，并且初始化好了博客系统所需的文件，blog就是你的博客根目录。这时候我们需要安装一款名为Next的主题，这个主题也是本博客目前使用的主题，你也可以选择你自己喜欢的主题。Next主题很强大，响应式设计并且支持很多第三方服务的特性，这个大家可以通过官网Hexo来查看。

经过Next主题官方文档的指导后，相信你已经配置好了该主题。那目前我们已经完成了博客系统和主题的配置，接下来需要把博客系统发布到互联网上，这样所有人就可以来访问我们的博客了。

### 系统部署（GitHub Pages）

如果是传统的个人博客的话，一般需要租一台在线的VPS系统或者空间来存放我们的软件，但是这样你需要操心很多事情了，不仅需要自己维护服务器，还需要每月付费供养服务器，比较麻烦。我们有更好更优雅的方式，就是通过GitHub Pages来存放我们的博客系统。具体安装介绍可以看官网GitHub Pages。

为什么我们需要GitHub Pages来部署我们的系统，一方面是因为GitHub Pages是免费的，很多服务器的维护都不需要你操心，更重要的一方面是你可以用Git来管理你的博客，通过几条简单的命令就可以发布、回滚之前版本来管理你的博客网站。

```shell
git add --all
~$git commit -m "Initial commit"
~$git push -u origin master
```

上面的命令就是在你的blog目录里面操作的，一旦你注册好了一个GitHub帐号后，在上面建立一个仓库（repository）后，在你计算上设置好SSH Key来打通和GitHub仓库的通道后，你就可以通过上述几条命令来把你本地的代码上传同步到仓库里面去。用人话讲就是，你通过那几条命令把你的网站上传到GitHub的网站上去了。然后你可以访问： http://username.github.io ，这网址就是你的博客地址，需要把里面的username替换为你的GitHub账户名。

### 域名绑定

毕竟 http://username.github.io 这种域名无法体现我们对逼格，可以在Godaddy或者万网注册一个域名去，可以以你的名字来注册，一般短的都注册不到了。万网的域名如果托管到阿里云到话需要备案，至于备案流程的话阿里云会有相关的流程帮你做，大概需要半个月之久。备案后我们可以在域名管理里把域名解析到 http://username.github.io ，如果觉得万网的DNS不好的话可以把DNS解析放到DNSNode上面去，然后在里面设置CNAME子域名。

![](https://img.bmpi.dev/51239c3c-dddc-1fd7-b54d-72e5f7328f29.png)

然后在blog目录里面的source目录下新建一个CNAME文件，文件内容就是你自己的域名。

![](https://img.bmpi.dev/da244afe-1bac-0063-b0a0-70cd5cb2535e.png)

这样你可以直接访问你的域名就可以访问你的博客了。实际上做了一次跳转。

### 运营统计

接下来我们需要对博客和主题进行一些配置，以达到更好的一些效果，比如评论分享（多说）、文章阅读次数（LeanCloud）、文章分类标签、侧边栏的设置、第三方服务的配置（Google Webmaster & Analytics、腾讯站点分析）。这方面可以看Next主题的配置文档。
大概说下流程，评论可以在Next主题里面启用多说评论系统（你需要注册一个多说账户），文章阅读次数可以参考这篇文章。文章分类标签可以在用Hexo命令来新建分类和标签页面，这个可以参考Hexo官方文档，如果你想对主题CSS等文件进行一些修改后发现并没有效果的话，那可以先清空Hexo数据库和产生的文件。进入blog目录在命令行执行：

```shell
hexo clean #清空Hexo数据库和产生的文件
hexo d -g #重新产生博客文章并发布到GitHub，前提得在Hexo里配置好GitHub账户
```

侧边栏得配置可以在Next主题里面配置。第三方服务等都可以参考Next主题的配置文档。这样通过Google的Webmaster你可以把你的站点设置的对搜索引擎更友好，这样别人就可以方便的通过搜索引擎找到你的文章了，提高流量了。同时设置腾讯分析和Google Analytics可以让你很方便的了解网站的流量和访问情况等。腾讯分析可以每天或每周订阅网站统计分析报告。

## 写作发布

搞定了烦人的环境配置后，我们开始了最重要的部分：写作！一切都是为了更优雅的写作。

Markdown语法

Hexo博客系统的写作方式很简单，通过Markdown语法来写作。首先让我们新建一个文章吧。

```shell
hexo new title #title是你的写作
hexo d -g #重新产生博客文章并发布到GitHub，前提得在Hexo里配置好GitHub账户
```

这样在blog/source/_post目录就产生一个title的md文件，这个文件就是我们要写作的，当然有个小麻烦在于你每次敲完命令都需要去找这个文件，我们可以通过以下的设置来让hexo系统自动用软件来给我们打开这个要写作的文件。首先在blog目前新建一个scripts的目录，然后在里面新建一个open-tools.js的文件，文件内容如下：

```js
var exec = require('child_process').exec;
// Hexo 3
hexo.on('new', function(data){
    exec('open -a "/Applications/Mou.app" ' + data.path);
});
```

这个文件的意思就是新建一篇文章后hexo会自动用Mou这个app来打开这个md文件，然后你就可以用Mou这个Markdown编辑软件来写作了。
至于Markdown语法怎么搞，网上有很多教程，但是为了直观的给你一个感受，你可以看看我这篇文章的md文件，然后对比下输出的文章就大概理解Markdown的精髓了。

![](https://img.bmpi.dev/e1e841ef-4d74-34a5-8c74-801fcddb0592.png)

### 编辑工具

目前我用Ulysses来书写Markdown文件。

![](https://img.bmpi.dev/60c0dc31-a5d3-a039-f17e-c16f4dd50e0a.png)

写作发布流程

在Mac打开iTerm终端

```
cd blog
```

新建文章并用Mou编写文章内容

```
hexo new title
```

发布文章到GitHub Pages

```
hexo d -g
```

修改文章后继续执行第3步即可重新发布上去

### 版本管理

如果我们想回到某一个写作版本的话也可以很方便的通过GitHub仓库里面进行回滚操作。每次当我们执行hexo d -g命令的时候实际上就是产生一个版本，你可以登陆到GitHub仓库里面看到每次提交的版本，当然这个仓库存放的是已经产生的Html文件，也就是在blog目录里面的public目录，这个目录的所有文件都会被发布到GitHub仓库里面去。但是source/_post目录里面存放的才是你真正的源文件，都是些md文件，那这些文件并没有被GitHub仓库管理，所以为了对这些源文件进行版本管理，你需要在GitHub新建一个仓库用来存放blog目录，blog目录里面有些文件并不需要发布到GitHub，这些不需要的文件你可以在.gitignore（存放在blog根目录下，如果没有你可以新建一个）里面写明，我的这个文件内容如下：

```
.DS_Store
Thumbs.db
db.json
*.log
node_modules/
public/
.deploy*/
```

这里面的node_modules目录里面放着一些node的模块，public目录存放着hexo产生的html文件（也就是你的博客）。当你部署好这个仓库后，你可以通过以下git命令来把你的博客系统发布GitHub仓库：

```
git add . #把此次更改写入git缓存
git commit -m "some changes" #把此次更改提交到本地库里去
git push #把本地库更改同步到GitHub远程库里去
git status #查看本地git库状态
```

在这个库里你可以找到你写作源文件的所有发布的版本，当然也可以回滚到任意版本中去，相当简单方便。

### 图床

当我们写作的时候，经常需要引用图片到文章里去，如果图片少的话我们可以直接把图片放入每篇文章的目录里面，然后发布到GitHub里去，但是这样会导致GitHub仓库变得越来越大，并且同步会非常慢。所以我们需要一个稳定强大长久的私人图床。一般小型网站的图床都不做考虑。

新浪微博图床

![](https://img.bmpi.dev/e3706295-909d-5605-8c3f-1517eea78d1b.png)

这个可以安装一个Chrome插件来实现（微博图床）。


微博图床的优点就是自动给你产生不同尺寸的图片，还贴心的给你Markdown的语法，但是一个问题可能出在新浪微博屏蔽这种外链了，长期会有一些隐患的。

### 七牛云存储

付费的存储空间里面七牛云存储稳定而且不错，免费认证的用户就有10GB存储空间，每月10G下载流量，足够博客用了。当你注册后建立一个新空间后，下载一个qrsync同步工具，可以很方便的把你本地的文件推送到七牛云存储空间里面，具体安装文档你可以看官方的说明文档，我这里贴出来这个工具的配置文档(conf.json)供你参考：

```json
{
    "src":"your src dir",
    "dest":"qiniu:access_key=123&secret_key=456&bucket=789",
    "debug_level":  1
}
```

在这里把src替换成泥实际目录的绝对路径。dest里面替换access_key、secret_key及bucket。
这样每当你在src目录里添加图片后，执行如下命令即可把src目录的文件推送到bucket里面。

```
qrsync conf.json
```

需要注意的是src目录里面不需要建立子目录，因为这个同步工具会忽略子目录，直接把文件全部放到src根目录即可。
那怎么访问bucket里面的图片呢？每个存储空间都有一个域名，那任何一张图片访问的形式就是：http://七牛存储域名/xxx.jpg 。那么所有图片都可以这么调用外链。考虑到存储空间有流量的限制，为了防止别人调用你的图片，你可以在存储空间管理里面设置白名单，把你的域名添加进去即可，这样只有你的域名可以访问这个图片等外链了。
如果你觉得七牛云存储无法长期存活的话，你可以把本地这个图片文件夹同步到OneDrive网盘里去，你甚至可以把所有的文件都放到OneDrive里面同步上去，这样几个地方互为备份，就可以长久的写下去了。

### 优雅的写作环境

这就是我觉得优雅的写作环境了，任何不懂编程的人也可以这么给自己搞一个长期写作的地方，你只需要花几十块钱买一个域名，剩下的都是免费的。除了环境搭建前期稍微有点复杂外，一旦环境搭建好后剩下的工作就很简单。
你拥有了一个非常简单强大的写作环境，流程简单，只需要输入两条命令＋写一个MD文档，不需要麻烦的排版，也不需要麻烦的发布，图片等存储也是非常简单的，只需要一条同步命令即可在MD文档里访问图片地址。然后你就可以在任何地方访问你的博客了，各类文档都有几个地方互为备份（异地灾备），长期下去你写的东西都可以安全的存储、访问和搜索，同时有强大的版本管理，任何时候你都可以回滚到任意版本，不要担心出错。

> 优雅的写作是为了更自由的表达自己。