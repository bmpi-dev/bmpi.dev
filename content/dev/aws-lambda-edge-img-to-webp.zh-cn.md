---
title: "使用AWS Lambda提高网站图片加载速度1X倍"
date: 2020-02-06
draft: false
tags: ["AWS", "Lambda", "Webp", "CDN", "CloudFront", "图片压缩", "无服务架构"]
keywords: "AWS、Lambda、Webp、CDN、图片压缩、无服务架构、CloudFront"
description: "网站流量中大头是图片资源，如何减少图片大小是很重要的事情。本文分享了使用AWS Lambda@Edge无服务架构通过判断浏览器UA自动转换CDN缓存的图片为Webp，将网站图片加载速度提高了1X倍以上"
isCJKLanguage: true
---

当你浏览一个网站页面的时候，浏览器开始了加载页面的过程，你当然希望立即看到这个网页的内容，如果网站加载过慢你可能会产生焦虑并直接关闭它，这对网站的影响是致命的，因为搜索引擎会统计网站的跳出率，进而影响网站的域名权重和排名，如果放任网页加载很慢会逐渐导致网站的自然搜索流量降低很多，所以一个好的网站应该加载时间越短越好，最长也不应该超过3秒。现代网站都会使用一些技术去提高网站加载速度，比如我们可以：
1. 提高域名DNS解析速度；
2. 通过一些打包工具压缩CSS和JS文件包的大小；
3. JS延迟或异步加载；
4. 图片懒加载；
5. 静态资源加CDN支持；
6. 使用高压缩比的有损图片格式等。

{{< ad_embed_post >}}

## 网站加载速度影响因素分析

以上影响网站加载速度的因素中，图片资源过大是一个很重要的因素。在Web流量中，图片一直是大头，如何将图片压缩的更小却不损失一些细节是大家一直在研究的话题。为了更好的演示这个问题，我使用Google提供的Pagespeed Insights评估了下我博客的这篇文章页面[《我的财务管理方案》](/money/my-accounting-tool/):

![](https://img.bmpi.dev/91eaa951-b7aa-1571-111a-2522a0893528.png)

如上图所示，全部图片加载耗时39秒之多，这纵然和我上传了过大的PNG图片有关系，实际我应该在本地上传图片前做一番压缩的，不过由于我的工作流中写文章是用Markdown格式的，图片一般是截图或者复制直接粘贴进Markdown文件中（通过VSCode插件自动帮我从内存中上传到AWS S3中然后插入CDN链接至VSCode），由于图片在内存中上传S3是PNG无损图片格式的，PNG图片一般都很大的，如果图片很多的话会导致用户流量网页需要加载很长时间：

![](https://img.bmpi.dev/c6675094-4ad6-054a-d2f7-cbf4d0b5c6cd.png)

这篇文章如果首次加载需要下载近10MB的图片资源，如果网速慢的话根本加载不完。要解决这个问题，让我们先研究下不同图片格式的差异：

### 图片格式对比

![](https://img.bmpi.dev/9b8f652d-a950-dfd3-4041-b5b40d168b72.png)

如上图，考虑到压缩比与浏览器兼容性，一般我们在网页用的图片主要是JPEG(JPG)/GIF/PNG这三种，JPEG和JPG是同一种格式，只因为早期Windows后缀不允许四个的后缀名。这篇[Comparison of different image
compression formats](https://homepages.cae.wisc.edu/~ece533/project/f06/aguilera_rpt.pdf)论文对比了BMP、TIFF、PNG、JPEG、JPEG 2000图片的压缩比较：

![](https://img.bmpi.dev/a49fa944-c326-6b95-171f-5eaa19059628.png)

从上可看，一般网站对图片没啥格式要求的话，尽量使用JPG格式图片，压缩比高的有损图片，如果要支持无损图片，可以使用PNG。

不过Google在2010年发布了一种黑科技的图片格式：[WebP](https://developers.google.com/speed/webp)。

### WebP

与PNG相比，WebP无损图像的尺寸要小26％。在同等的SSIM质量指数下，WebP有损图像比同类JPEG图像小25-34％。无损WebP支持透明性（也称为Alpha通道），而仅增加22％的字节数。对于可以接受有损RGB压缩的情况，有损WebP还支持透明性，与PNG相比，文件大小通常小3倍。从我个人的测试中，同一张图片，如：<https://img.bmpi.dev/3461797f-6a16-e9a5-a01c-f583d7086b49.png>，PNG大小为2.1MB，WebP为198KB，而图片细节并没什么丢失（从网页浏览看）。

这么看WebP很完美，唯一的问题在于兼容性，Safari到2020年了都不支持Webp，十年过去了！！！不仅Safari不支持，所有以Safari内核WebKit开发的浏览器都不支持，包括iOS上的Chrome。那我们能不能不支持Safari或者说iOS平台呢？

![](https://img.bmpi.dev/e488bfc5-40b4-9d2b-070b-68b2bb7183e6.png)

## 要不要支持iOS是个问题

如果你网站不在乎iOS的流量，那当然可以不支持，不过当我看到我的一个网站的统计如下时：

![](https://img.bmpi.dev/e9cd4185-2372-bccd-62f4-186555917824.png)

![](https://img.bmpi.dev/c7d4be48-a581-34ee-9e22-b06096a7f0b1.png)

如上图所示，近一半的流量都来自iOS平台，所以还是得支持iOS。

## AWS Lambda@Edge方案

简单介绍下我博客（https://bmpi.dev）的技术栈：

1. 博客使用Hugo静态编译Markdown文件生成页面。
2. 博客使用Netlify集成Github托管。每次我写完文章通过Git Push到Github后会自动触发Netlify构建网站并发布。
3. 图片都存放在AWS S3中，通过AWS CloudFront作为CDN加速。
4. 域名通过AWS Route53服务解析。

我们可以通过判断浏览器User Agent的类型给iOS用户返回jpg/png图片，给支持webp的浏览器返回webp格式图片，如下：

user->browser->js check ua->imgix(image convert api)->s3

不过这个方案存在两个问题：

1. imgix处理1000个图片3美刀，太贵！
2. 由于是静态渲染生成网站，并没有可编程控制的Web服务器，没法直接从服务端处理用户请求。

### 方案设计

我们换一种可行的方案：

user->browser->aws cloudfront->aws lambda->s3

![](https://img.bmpi.dev/174a6694-7cf6-7220-71fe-f9e9035ca226.png)

如上图，当用户通过CDN访问S3中的图片时会抛出四种事件：Viewer Request、Origin Request、Viewer Response、Origin Response。AWS允许我们使用Lambda@Edge（Lambda的扩展，只能部署在us-east-1区域中，但是可以同步到各区域的cloudfront中）监听这四种事件并做一些处理，比如对浏览器请求的header与cookie做一些修改，对源响应做一些额外处理，比如转换图片之类。具体流程如下分解[^0]：

1. 监听浏览器对CDN的请求，并触发劫持任何Viewer Request请求的Lambda函数。
2. 根据我们从请求中收到的浏览器UA，确定请求事件是否针对图像，以及请求资源的浏览器是否支持WebP。
3. 如果确定请求是针对图像的，并且浏览器支持WebP，则将其替换为.webp的请求uri图像扩展名，并将原始扩展名添加到请求header中。
4. 接下来，我们触发一个单独的Lambda函数，该Lambda函数劫持任何来自CDN的Origin Response事件。
5. 如果响应事件的请求uri扩展名为.webp，并且响应状态为404，我们将在S3存储桶中检查同一张图片，但使用原始扩展名，请在步骤3中将其放入请求header中。
6. 如果在S3中找到具有原始扩展名的图像，则使用Sharp[^1]运行webp转换后先存放至S3中供下次使用然后将其放置在原始响应中，否则，将404响应保持不变。

### 成本分析

通过AWS这篇文章[^2]分析指出，处理了100万张图像，15GB存储和50GB数据传输也才不到90块钱人民币，的确很便宜。

在上述方案中，我们每次将处理好的webp图片存放至S3中，供下次用户查询时不需要再次转换立即就可以从S3中取出给用户，响应速度提升了，同时减少了Lambda@Edge函数的运行，可以帮我们省钱，相比新增的S3存储，因为webp格式本身是很小的，这个存储成本也是可以接收的。

### 方案实现

在编写代码之前，确保你先看了这篇AWS官方介绍文章：《Resizing Images with Amazon CloudFront & Lambda@Edge | AWS CDN Blog》[^3]。

最终代码放至[aws-lambda-edge-img2webp](https://github.com/bmpi-dev/aws-lambda-edge-img2webp)[^4]。

代码组织结构如下：

```bash
.
├── Dockerfile
├── Makefile
├── aws-sam-lambda-edge-webp.yaml
├── dist
│   ├── origin-response-function.zip
│   └── viewer-request-function.zip
├── lambda
│   ├── origin-response-function
│   │   ├── index.js
│   │   ├── package-lock.json
│   │   └── package.json
│   └── viewer-request-function
│       ├── index.js
│       ├── package-lock.json
│       └── package.json
```

1. Viewer-Request Function

![](https://img.bmpi.dev/1973a57c-e896-b425-bbe5-482fa589bc1d.png)

2. Origin-Response Function

![](https://img.bmpi.dev/eae64234-944a-9914-e136-c72ce7f1f77d.png)

3. 编写Dockerfile与Makefile构建Lambda部署包：

![](https://img.bmpi.dev/6fa60f91-ed99-5599-f262-fba74df80d36.png)

![](https://img.bmpi.dev/4773cb21-d0df-8e6e-e256-47330d3c4c3b.png)

在本地项目根目录执行`make all`后脚本自动使用Docker打包Lambda@Edge压缩包至dist目录，然后我们上传至AWS的`us-east-1`中的S3桶中，如果没有可以随便建一个，我建立的是`bmpidev-aws-lambda-edge`，这个必须和下面的CloudFormation配置文件一致才行，方便我们接下来使用，然后将dist中两个压缩包上传至这个S3桶中。

4. CloudFormation配置文件

![](https://img.bmpi.dev/b4ea6049-2067-a856-eb83-065841bc1c7a.png)

将以上文件上传至`us-east-1`区域的CloudFormation新建一个堆栈，此配置文件会自动生成Lambda函数所需的角色和AWS IAM策略，这个文件执行完毕后，你需要给IAM/角色/权限中赋予S3写入读取权限，这样Origin-Response Function才有权限将webp上传到你的图片资源桶中。

5. 部署Lambda函数至Lambda@Edge

在Lambda>函数>bmpidevImgTransformResponse/bmpidevImgTransformRequest中，点击操作>功能>部署到Lambda@Edge。

![](https://img.bmpi.dev/21fb28c9-c603-3f7c-4b45-2a0ba822d3ad.png)

如上图，确认后，开始将Lambda函数部署到Lambda@Edge并关联到你的CloudFront中，你在CloudFront监控中应该可以看到部署的Lambda函数的统计信息。

6. 在CloudWatch中查看Lambda日志

这个在调试的时候很有用，Lambda的Nodejs支持打印日志的，这样我们就可以看到函数执行的具体情况了。

## AWS Lambda@Edge方案的坑

1. AWS Lambda@Edge Viewer Request部署压缩包不能超过1MB，而Origin Response却可以超过1MB，所以在打包的时候必须将这两个函数分别打包才行，因为Origin Response函数中我们需要使用Sharp转换图片格式，而这个包的node_modules很大，整个压缩包快40MB了。而Viewer Request由于只使用了useragent和path的nodejs包，打包后才102KB。
2. AWS与S3的权限配置也很重要，删除Lambda@Edege函数也需要在CloudFront里取消关联后才能删除，一般耗时几小时才能生效。
3. Lambda@Edge必须在us-east-1区域部署才行，其他区域无此功能，部署后可以同步到全球各区域的CloudFront关联，如果要删除则必须先全部取消CloudFront Lambda关联才能自行删除。
4. 需要注意Nodejs版本支持，目前最高支持nodejs10.x。
5. 给IAM角色赋予S3写入读取权限。
6. 如果是同一账号，只要给Lambda的执行角色赋予S3操作权限，则无需加入S3 Bucket存储桶策略，否则需要加入相关策略，具体可通过这个工具[^5]生成。
7. 如果还是无法访问S3，请检阅此文件[^6]
8. 如果还是不行，则只能通过Lambda测试来发现问题，日志可在CloudWatch查看相关日志流（需注意S3区域，不同用户从不同区域访问CloudFront，日志会放入相关区域的CloudWatch中），也可以通过CloudFront Monitoring查看聚合日志统计。
9. 如果存储桶是私有的，则Lambda在判定对象是否存在时返回的是403而不是404，这是有意义的，因为可以防止攻击者去枚举桶中的数据。具体查看[^7]。
10. 通过日志观察函数执行时间和内存消耗来调整内存大小和最大执行时间优化服务可用性。

## 最终效果

![](https://img.bmpi.dev/696de595-9c57-be34-ba54-f9c3964aafe3.png)

同一个页面，在支持webp格式的浏览器中总加载大小从10MB降低至不到1MB，加载时间从12秒降至3秒。

#### *References*
[^0]: https://medium.com/nona-web/converting-images-to-webp-from-cdn-9433b56a3d52
[^1]: https://github.com/lovell/sharp
[^2]: https://docs.aws.amazon.com/solutions/latest/serverless-image-handler/overview.html
[^3]: https://aws.amazon.com/cn/blogs/networking-and-content-delivery/resizing-images-with-amazon-cloudfront-lambdaedge-aws-cdn-blog/
[^4]: https://github.com/bmpi-dev/aws-lambda-edge-img2webp
[^5]: https://awspolicygen.s3.amazonaws.com/policygen.html
[^6]: https://aws.amazon.com/cn/premiumsupport/knowledge-center/lambda-execution-role-s3-bucket/
[^7]: https://stackoverflow.com/questions/50008445/aws-cloudfront-returns-access-denied-from-s3-origin-with-query-string
