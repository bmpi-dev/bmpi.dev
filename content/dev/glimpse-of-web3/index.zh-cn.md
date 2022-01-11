---
title: "走进 Web3"
date: 2022-01-07
draft: false
tags: ["Web3", "区块链", "ETH", "分布式系统", "DAO", "去中心化"]
keywords: ""
description: "本文介绍下最近大火的Web3，以及NFTs与DeFi。"
isCJKLanguage: true
og_image: "https://img.bmpi.dev/6ab55cab-ceaf-3657-77db-4e1660924ca4.png"
categories: [
    "什么是X"
]
---

<div class="heti heti--ancient heti--vertical" style="margin: auto;">
  <h2>青玉案·元夕<span class="heti-meta heti-small">[南宋]<abbr title="原字坦夫，后改字幼安，中年后别号稼轩">辛弃疾</abbr></span></h2>
  <p class="heti-verse heti-x-large">
    东风夜放花千树。更吹落、星如雨。<br>
    宝马雕车香满路。凤箫声动，玉壶光转，一夜鱼龙舞。<br>
    蛾儿雪柳黄金缕。笑语盈盈暗香去。<br>
    众里寻他千百度。蓦然回首，那人却在，灯火阑珊处。<br>
  </p>
  <!-- <img src="https://img.bmpi.dev/97a36cb0-7834-9e56-abf7-7b9e52721861.png" style="margin: auto;"> -->
</div>

互联网诞生之初，大家期望能打造一个去中心化的（decentralized）分布式网络（distributed network），所以有了超文本协议（HTTP）、点对点传输协议（P2P，基于此技术的 BT 下载是互联网第一个去中心化的应用程序）。互联网的信息通过网页（HTML）展示，页面间通过超链接（hyperlink）串联起来。互联网的内容则通过 P2P 的方式共享分发。

之后随着 PC 与移动端的普及与大力发展，资本也涌入进来。互联网的数据与内容逐渐被少数中心化的（centralized）寡头公司掌握，我们的生活都被这些公司的产品所承包。个人隐私、数据逐渐被这些巨头收集分析，通过大数据与人工智能技术对用户画像，精准投放广告。在 [在线广告](/dev/what-is-internet-advertising/) 的加持下，互联网公司的市值也如滚雪球一般膨胀的停不下来。

作为用户我们讨厌互联网公司对隐私的收集、分析与贩卖，这种监视一切的感觉虽然讨厌但我们却离不开它们的产品。互联网公司的产品大多是免费的，这个秘诀就在于用户也是其产品的一部分。每个用户都在给平台的产品附加价值，由于网络效应，互联网产品的价值与用户数量成指数级的关系。典型的产品如 IM 类的微信，社交媒体的微博，用的人越多，越多人就离不开它。

正如「分久必合，合久必分」，互联网发展史上两股潮流也在你方唱罢我登场，这两股潮流就是「中心化」与「去中心化」。互联网从早期经历了 Web1 的去中心化然后走向了 Web2 的中心化，最终来到了 Web3 的去中心化。而这一切都是因为十多年前那个神秘人点燃了 [火种](https://bitcoin.org/bitcoin.pdf)。

一种基于 [区块链](https://zh.wikipedia.org/wiki/区块链) 技术的名为比特币（[Bitcoin](https://bitcoin.org/zh_CN/)）的应用被创造出来了，在 [创世纪块](https://blockchair.com/bitcoin/block/0) 里甚至引用了泰晤士报当天的头版标题：财政大臣正站在第二轮救助银行业的边缘（[Chancellor on brink of second bailout for banks](https://www.thetimes.co.uk/article/chancellor-alistair-darling-on-brink-of-second-bailout-for-banks-n9l382mn62h)）。这个火种如「星星之火，可以燎原」一样，烧出了「币圈」与「链圈」。

驱动比特币底层的去中心化的区块链技术启发了在加拿大的 [Vitalik Buterin](https://zh.wikipedia.org/wiki/維塔利克·布特林)，之后他创立了以太坊（[Ethereum](https://www.ethereum.org/)）。以太坊的诞生产生了有计算能力的区块链（之前比特币是基于只能记账的区块链的应用），可编程（[EVM](https://ethereum.org/en/developers/docs/evm/)）的链打开了 Web3 的大门。

互联网诞生之前，信息的流动非常的缓慢与低效，是 [Web1](https://zh.wikipedia.org/wiki/Web_2.0#Web_1.0) 让信息流动起来。信息虽然流动起来，但只有少数人参与了进来。随着互联网的发展，参与的人越来越多，是 [Web2](https://zh.wikipedia.org/wiki/Web_2.0) 让海量的信息交互起来。但无论 Web1 还是 Web2，都没有本质的区别，依旧是信息在参与流动与计算，但 [Web3](https://en.wikipedia.org/wiki/Web3) 让价值流动起来了。

> Web3 将催生一个全新的全球数字经济, 创造新的商业模式和市场, 打破像 Google 和 Facebook 这样的平台垄断，并产生大量自下而上的创新。（Gavin Wood）

要理解如何让价值流动起来，先要理解一些以太坊的知识。以太坊的 EVM 让链上具备计算能力，而天然去中心化的特性让其成为一个超级分布式的计算机。这个计算机有别与 Web2 中的云计算，云计算是中心化的超级计算机。在 Web2 中用户的数据（价值）不是掌握在用户手里的，而是掌握在一个个有着云计算的寡头公司手中，比如 AWS、Google、Facebook、Twitter 等。要让价值流动起来，就需要让价值从少数寡头公司中所属变为从属为网络中每个参与者。数字加密货币天然具备能解决这个问题的能力，当货币具备了计算的能力，自然也就有了价值流动的能力。

人类社会之所以能不断发展，是因为我们是一个协作的物种，大部分动物不会协作。而能协作是因为我们可以通过建立一个个合约与他人建立合作关系。在 Web3 之前，任何合约的正常履行无论是线下还是线上都依赖于国家这个机器的力量，我们都也知道违约的惩罚。

如何在不依赖外部力量去解决合约的正确履行呢？目前看到一个可行的方式是让合约代码化，赋予自动执行的力量。以太坊的计算能力体现在智能合约（[Smart Contract](https://ethereum.org/en/developers/docs/smart-contracts/)）上，这正是以太坊的创新之处，区块链本身就具备记录价值的能力（分布式账薄），智能合约通过以太坊的 EVM 自动执行，确保了合约的正确履行。

智能合约的执行依赖于以太坊中的天然气（[Gas](https://ethereum.org/en/developers/docs/gas/)），可以把它理解为现实世界中的电力一样，我们的一切生活所需电器都需要电力的支持，我们也需要定期缴纳电费。在以太坊的世界中，每个人都拥有一个钱包，钱包里存放着我们的数字资产如 BTC 与 [ETH](https://ethereum.org/en/eth/)。

有了智能合约后，我们可以创造基于此的 Web3 应用，也被称为 dapp（[decentralized application](https://ethereum.org/en/developers/docs/dapps/)） 的去中心化应用。dapp 让普通用户接入了以太坊的世界。可以把 dapp 理解为 Web2 中的各类 App，这些 App 提供了各类互联网的服务。

想象下从目前这些技术我们可以得到什么？打造 Web3 我们还缺什么重要的组成部分？「经济基础决定上层建筑」，打造 Web3 需要很多组织招募优秀的工程师加入，合力去打造新的生态。如何构建新形态下的组织？如何募集资金？传统的中心化组织形态（公司）和 IPO（上市）已经不适合 Web3 了，要彻底的去中心化，需要创造新的经济形态。

让我们先回顾下 Web2 下的经济形态吧。在 Web2 中，互联网公司通过天使投资募集资金，组建工程师队伍，发布网站或 App。通过互联网在线广告或会员付费等形式赚钱，达到一定规模后在交易所发行股票上市（IPO）。

Web3 需要解决这些 Web2 中的问题：

- 组建公司
- 天使投资
- 打造 Web3 产品
- IPO

在以太坊上只需要一定的 Gas 费即可凭空创造一个代币（[Token](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/)）。这个代币可以代表任何东西，比如股权、实体资产、彩票、美元或虚拟游戏中的角色等。比如建立美元与加密货币价格桥梁的 USDT 就是一种代币（因价格锚定美元，又称稳定币）。如果你持有美元，想要获得比特币（BTC）或以太坊（ETH），除了 [挖矿](/dev/guide-to-mining/) 外，可以直接通过在中心化交易所（如 [币安](https://accounts.binance.com/zh-CN/register?ref=20676177)）或与其他人（C2C）兑换。

有了代币以后，可以解决很多上述 Web2 中的问题。比如你洗澡的时候突然有了个天才的想法（灵感也可能来自 Web2 的产品），但你没钱招募人才。在 Web3 的世界可以直接发个代币（此时没啥价值），想要来钱快可以在交易所上币（ICO，方便割韭菜，但可能需要一大笔钱给交易所），一旦这种代币被别人接受（形成共识）后，就有了价值，作为发币方你就潜在的获得了大量的钱（浮动盈亏，要变现还得找个流动性好的市场）。

由于币是被凭空创造出来的，要让其有价值，就需要很多人形成共识（[Consensus](https://en.wikipedia.org/wiki/Consensus_(computer_science))）。就像黄金一样，它的价值就在于几千年来代代相传的共识，让其有了坚不可摧的价值。想想钻石也一样，神奇之处就在于其稀缺性都没了，工业上可以大量创造出来，但由于其共识（韭菜）过于强大，导致市场价格很坚挺，这就是共识的力量。

要形成共识就需要让一部分人先有币（让一部分人先富起来），这部分有币的人为了自己的价值就会推广这个币。所以第一步就需要分发这些币，在币圈常见的做法是空投（[Airdrop](https://en.wikipedia.org/wiki/Airdrop_(cryptocurrency))）。要让空投有价值，就需要对投币用户做一定筛选。比如我们的 Web3 产品是一款要颠覆 Twitter 的社交媒体产品，那最好的空投对象就是 Twitter 用户了。可以在智能合约中设定规则，按 Twitter follower 的数量来按比例投币。

现在你有了代币，甚至都不需要天使投资（也可以理解为市场中每个愿意交易你代币的人都是天使投资）就可以开始组建团队了，不需要组建公司（不然又回到 Web2 的世界了）。在 Web3 中公司就是 DAO（[Decentralized autonomous organization](https://en.wikipedia.org/wiki/Decentralized_autonomous_organization)）。DAO 的特点在于通过智能合约去制定组织章程，而非在 Web2 中公司章程这种。持有代币的人就可以成为 DAO 的一员，甚至可以对公司的决策产生影响。

在空投了 50% 的币给 Twitter 用户后，你给 DAO 预留了 20% 的币，给团队成员预留了 20% 的币，还剩 10% 的币预留。目前我们还没有产品呢，但已经解决了很多 Web2 需要提前解决的问题。😂

接下来就是打造 Web3 产品了。Web3 产品的特点是啥？价值流动！如何让价值流动起来？通过钱包登录！把钱包类比成 Web1 的用户名/密码组合、Web2 中的单点登录（SSO），通过钱包去标识用户。从比特币的创世纪块出现的时候，区块链就具备记录额外信息的能力，它不只是一个分布式账薄，也是一个分布式数据库，可以存储额外的信息。

由于钱包地址很长，所以有了 [ENS](https://ens.domains/)，ENS 就像 Web2 中的域名服务商。比如我的 ENS 地址是 [madawei.eth](https://app.ens.domains/name/madawei.eth/details)。如果别人给我转账，不需要再输入一长串根本记不住的地址，只需要输入这个地址就可以了。ENS 还可以给区块链中添加个人介绍的信息，比如博客地址、头像、社交媒体等，支付一定的 Gas 费就可以写入这些信息，其他人包括 Web3 应用都可以获取到这些共享信息。

另外一个有意思的 Web3 应用是 [Mirror](https://mirror.xyz/)，Mirror 类似于 Web2 中的 Wordpress（世界上最流行的博客应用）。通过钱包（如 [Metamask](https://metamask.io/index.html)）登录后在 Mirror 上可以通过发布文章赚钱。但并不是 Web2 中通过广告赚钱，而是通过 [NFT](https://en.wikipedia.org/wiki/Non-fungible_token)。

> NFT 是一种不可替代的代币，它使用区块链提供所有权证明，但不限制底层数字文件的共享或复制，其更像是一种在 Web3 世界里身份的证明。这两年 [NFT 正处于高速发展期](https://consensys.net/reports/web3-report-q3-2021/#NFTs-Q3)，在游戏、音乐、电影等泛文化领域都有广泛的应用。

在 Mirror 里发布文章可以选择是否也发行 NFT，在支付一定的 Gas 费用后就可以发布独一无二的 NFT 了。读者如果非常喜欢这篇文章，可以通过支付一定的 ETH 来收藏这篇文章。这个收藏并不是 Web2 里的收藏，而是在以太坊的区块链里写入了你的所有权证明。可能很多人难以理解为什么要对一篇文章付费呢？在 Web2 里你可以给作者打赏，但在 Web3 里通过 NFT 这种形式，读者获得了所有权证明，甚至可以进一步卖掉这个所有权证明，作者也获得了经济上的支持，有动力进一步创作了，对整个生态来说是良性循环。

{{< figure src="https://img.bmpi.dev/51674a7c-d494-0cdf-b8ab-39f25a024b88.png" caption="郭宇的一篇文章在 Mirror 上的 NFT 收益">}}

Mirror 的数据都存在在 [Arweave](https://www.arweave.org/) 之上，Arweave 的愿景是提供去中心化、可扩展和永久的链上数据存储。如果说以太坊是超级分布式计算机，那 Arweave 给这个计算机提供了一块无限大的分布式存储硬盘。

目前 Web3 还处于探索未来的各种可能性之中，所以涌现了很多新奇的东西，很多一瞬而过，少数成为了经典。目前最大的一个问题就是 Gas 费太贵了。

![](https://img.bmpi.dev/a3f8624e-bcbc-1f8f-180a-bd499b243f9c.png)

「在 Web3 呼吸都要钱」，说的就是 Gas 费。因为一旦需要写入信息到区块链就需要支付 Gas 费。当然以太坊也在着力解决此问题，比如目前的 [LAYER 2 ROLLUPS](https://ethereum.org/en/developers/docs/scaling/layer-2-rollups/) 提案就是为了提高交易速度，降低 Gas 费。相信一旦解决了这个问题，又会有一次 dapp 的爆发出现。

当然另外一个目前很火的 Web3 应用领域就是去中心化金融（[DeFi](https://en.wikipedia.org/wiki/Decentralized_finance)）。数字加密货币本身就起源于金融领域，把传统的金融业搬上 Web3 并做一定的创新是必不可少的一个环节。

**Web3 相比于 Web2 的主要吸引力之一，是用户不再是被出售的产品，而是因其积极贡献而被奖励的网络参与者**。当然我也相信基于区块链的 Web3 可能只是未来的一个方向。也可能未来是 Web2 + Web3 这种模式，类似于目前的 5G 应用场景一样。Web3 不是 Web2 的替代，更像是一个方面的提升。

但 Web3 会不会从去中心化逐渐发展为中心化呢？考虑到比特币的绝大部分算力目前都掌握在少数几个矿池公司手中，再精妙的算法也抵挡不了人性对利益的追求，用户为了方便连隐私都可以不要，更不会为了一个去中心化的技术问题而放弃中心化的便利，Web3 这条去中心化之路注定漫长而难走。

本文参考的文章有：

- [THE WEB3 REPORT](https://consensys.net/reports/web3-report-q3-2021/)
- [useWeb3](https://www.useweb3.xyz/)
- [为什么去中心化很重要](https://mirror.xyz/0xE43a21Ee76b591fe6E479da8a8a388FCfea6F77F/s_gLu_k5doYkghJNquwR8DTpxFbf05CaP1F59w2qkDY)
- [NFTs和千粉理论](https://mirror.xyz/0xE43a21Ee76b591fe6E479da8a8a388FCfea6F77F/LcbIVhTR17ieNrlz-6ZunVjI3w0bPMnM1SgXg2g-1JI)
- [Arweave—不仅仅是存储这么简单](https://mirror.xyz/0xE43a21Ee76b591fe6E479da8a8a388FCfea6F77F/KlnOtrlg2Yhfiv9G7HBRx1vPnCHbgGpSydG8YLy-x2E)
- [为什么Web3很重要](https://mirror.xyz/0xE43a21Ee76b591fe6E479da8a8a388FCfea6F77F/UyzNfmd23FdvcmZVA-mLh2B10ooZysE7uhOg97Gezr8)
- [关于Web3: 退休这两年我错过的技术趋势](https://mirror.xyz/guoyu.eth/f2yLu59TJ4u07FQ13UmiN4-cLELv3g-qQirY7YF_Qyw)
- [Quarter I 2022](https://mirror.xyz/0xE43a21Ee76b591fe6E479da8a8a388FCfea6F77F/nQ192QDooQl7M5mG1sOf2IroyRzNyQzBK9J1m_lQmjY?continueFlag=6093989111564a68c297d3f4bb8831b0)
- [Web3.0](https://docs.worklife.vip/web/#/19/2000)
- [Dapp-Learning](https://github.com/Dapp-Learning-DAO/Dapp-Learning)
- [Defining the web3 stack](https://edgeandnode.com/blog/defining-the-web3-stack)
- [My first impressions of web3](https://moxie.org/2022/01/07/web3-first-impressions.html)

> 注：
>
> 0. 由于 Web3 和钱相关，目前相比 Web2 存在不少安全问题。比如 ENS 中 0 宽字符可能会导致转账错误的问题，又比如 [My first impressions of web3](https://moxie.org/2022/01/07/web3-first-impressions.html) 这篇文章提到的 NFT 实验 中 Web3 基础设施的安全问题会导致用户资产丢失。
> 1. 由于 Web3 还处于探索阶段，不少资料或者概念都有一定歧义或不准确的地方，如果本文有错误的地方，欢迎留言指正。
> 2. 本文 [Mirror](https://mirror.xyz/madawei.eth/d5WqrV5HsWmvLby8oVCDsQrLqx3hoe8A89R6YjvvHOg) 地址。
