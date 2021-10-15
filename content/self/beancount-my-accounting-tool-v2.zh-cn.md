---
title: "使用 Beancount 管理家庭财务"
date: 2021-10-04
draft: false
tags: ["挖财App", "记账工具", "Beancount", "复式记账", "家庭财务", "财务管理"]
keywords: "挖财App、记账工具、Beancount"
description: "本文介绍了我用 Beancount 替换近 9 年多的挖财记账 App。"
series: ["自我提升"]
isCJKLanguage: true
og_image: "https://img.bmpi.dev/3f09e4aa-6318-36ba-4d94-7296af047f21.png"
---

- [使用 Beancount 的心理建设](#使用-beancount-的心理建设)
- [我的 Beancount 记账流程](#我的-beancount-记账流程)
  - [账本建立](#账本建立)
    - [assets.bean](#assetsbean)
    - [liabilities.bean](#liabilitiesbean)
    - [income.bean](#incomebean)
    - [expenses.bean](#expensesbean)
    - [equity.bean](#equitybean)
    - [price.bean](#pricebean)
  - [初始数据建立](#初始数据建立)
  - [开始记账](#开始记账)
    - [日常开支](#日常开支)
    - [周期性记账](#周期性记账)
    - [投资记账](#投资记账)
      - [股票基金投资组合](#股票基金投资组合)
      - [加密币投资](#加密币投资)
      - [RSU](#rsu)
    - [大类资产记账](#大类资产记账)
      - [房产](#房产)
      - [车](#车)
- [特殊场景记账](#特殊场景记账)
  - [如何与家人共同记账](#如何与家人共同记账)
  - [如何报销](#如何报销)
  - [如何查询](#如何查询)
- [定时获取收支报表](#定时获取收支报表)
- [家庭财务诊断](#家庭财务诊断)
- [Beancount 电报群](#beancount-电报群)
- [其他还不错的参考文章或工具资源](#其他还不错的参考文章或工具资源)

今年春节的时候，由于感受到了使用近 9 年的记账 App 挖财可能无法长期使用了，我便花了 11 小时将其迁移到了强大的 [纯文本复式记账]((https://plaintextaccounting.org/)) 软件 [Beancount](https://github.com/beancount/beancount) 上，代价就是历史数据无法迁移过来。为了能够将历史数据导出做个备份，在支付了挖财 50 元 VIP 季会员费后我拿到了 9 年的 Excel 账本，转投 Beancount 的怀抱，希望能继续花一生记录财富慢慢增值的过程。

![](https://img.bmpi.dev/5159fd77-f548-b3b6-daad-e8771026f4ec.png)

对于我的记账史见这篇 [我的财务管理方案](/self/my-accounting-tool/) 文章。放弃使用 9 年多的工具是挺难的，尤其是历史数据的迁移，但有多种原因促使我不得不选择新的工具：

1. 从一些挖财 App 深度用户得知挖财可能要无法使用；
2. 挖财的数据导出需要 VIP 权限；
3. 个人长期的数据托管到商业化的公司手里不仅有可持续使用的问题，还有严重的隐私问题；
4. 已经被很多人推荐过复式记账神器 Beancount 的强大；
5. Beancount 是开源且本地的工具，满足可持续使用与隐私安全的需求。

选择了 Beancount 后我便开始了数据迁移与适应新工具的过程了。目前已经使用 Beancount 近 10 个月，我的感受是记账类 App 虽然让我们能更便捷的利用手机记账，但是却让我们失去了记账的乐趣。用复式记账虽然初次使用需要学习一些知识，但是一旦掌握后可长期使用，性价比其实挺高的。

不过我需要提醒的是，如果你只是想简单记账，或者是想培养记账的习惯，那选择一个记账 App 也可以，但是如果你看重隐私和可持续使用，那 Beancount 就是最好的选择。

这篇文章我并不想写成 Beancount 的教程类文章，所以对 Beancount 的入门介绍我推荐看这篇 [记账神器 Beancount 教程](https://www.skyue.com/19101819.html) 。之后可以看 byvoid 的进阶版教程：

- [Beancount复式记账（一）：为什么](https://byvoid.com/zhs/blog/beancount-bookkeeping-1/)
- [Beancount复式记账（二）：借贷记账法](https://byvoid.com/zhs/blog/beancount-bookkeeping-2/)
- [Beancount复式记账（三）：结余与资产](https://byvoid.com/zhs/blog/beancount-bookkeeping-3/)

当看完这些教程后，相信你已经知道怎么用 Beancount 记账了。接下来我想分享的是我是如何使用 Beancount 记账以及如何解决一些特殊记账的场景。

## 使用 Beancount 的心理建设

不少人畏惧使用命令行（CLI）和纯文本来记账，尤其是非程序员的群体，但这些只是习惯问题。Beancount 的记账是很简单的，比如我们用记账 App 记录一笔中午吃饭的帐是这样的：

![](https://img.bmpi.dev/614dd539-7a8b-614e-7781-c1d39946e129.png)

而用 Beancount 记账是这样的：

```
2021-10-01 * "请客吃饭"
  Liabilities:CreditCard:CN:PINGAN-6467      -83.0 CNY
  Expenses:Food:Lunch
```

看起来用手机记账更直观一些，而且 Beancount 很难在手机上操作，一般都用电脑来记账。但纯文本的优势在于编辑和存储方便，不需要特定的软件即可编辑内容，尤其是有很多笔账要记录的时候，电脑编辑纯文本效率也更高。

手机 App 记账的时间点一般都是随时记录，但 Beancount 的话我一般是一天一记录，有的人是一周或者一月一记录。看起来用手机随时记录很方便，但用电脑记账的话，需要先在手机上暂存，之后在电脑上统一记录。现在大多人用手机支付都有消费提醒，只需要在晚上记账的时候查看下当天的消费记录就可以记录了。

我个人感觉手机记账方便只是一个习惯问题，当我切换到电脑记账的时候不适感也就一周，之后感觉和手机记账差不多，就是时间点的不同而已。所以手机记账方便只是一个习惯问题，并不具备啥优势，时间成本也差不多。

所以说手机记账 App 和 Beancount 的差异主要是`命令行`、`纯文本`和`移动端`的差异。这些差异并不是说手机 App 记账有优势，更主要的是习惯的问题，而习惯的切换成本不过一周时间。带来的好处却是：

1. 数据掌控在自己手里，隐私不会泄露；
2. 更灵活的记账方式；
3. 摆脱手机 App 流水式记账，使用复式记账法专业记账；
4. 长期可持续的记账方式。

## 我的 Beancount 记账流程

我的账本结构包括记账的工具都是参考 [记账神器 Beancount 教程](https://www.skyue.com/19101819.html) 这篇文章。

### 账本建立

在`accounts`这个目录里存放着：

```
.
├── assets.bean # 资产账户，包括银行卡、信用卡、投资组合、房产、车、加密币钱包、RSU 等账户
├── liabilities.bean # 负债账户
├── income.bean # 收入类别
├── expenses.bean # 支出类别
├── equity.bean # 通过 pad 和 balance 初始化资产账户
└── price.bean # 自定义货币价格，这是 Beancount 最神奇的地方，可以自定义货币价格，比如美元和人民币的价格，这样在记账的时候就可以自由的记录货币的价格，而不用担心记账的时候货币价格变动的问题。
```

#### assets.bean

![](https://img.bmpi.dev/3f09e4aa-6318-36ba-4d94-7296af047f21.png)

#### liabilities.bean

```
;房贷
2021-02-11 open Liabilities:Bank:CN:BOC:Mortgage:Loan       CNY ;中国银行

;信用卡
2021-02-11 open Liabilities:CreditCard:CN:CMB               CNY, USD ;招商信用卡双币VISA卡
2021-02-11 open Liabilities:CreditCard:CN:ZFB-HB            CNY ;支付宝花呗

;应付款
2021-02-11 open Liabilities:Payable:Friends:XYZ             CNY ;朋友的应付款
```

#### income.bean

```
;主动收入
2021-02-11 open Income:CN:Salary:XYZ    CNY     ;上班公司收入

;被动收入
2021-02-11 open Income:PassiveIncome:Project    CNY, USD     ;项目被动收入
2021-02-11 open Income:PassiveIncome:Invest    CNY, USD     ;投资被动收入
2021-02-11 open Income:PassiveIncome:Other    CNY, USD     ;其他被动收入

;奖金
2021-02-11 open Income:CN:Bonus:XYZ    CNY     ;公司奖金

;赔付款
2021-02-11 open Income:CN:Compensation    CNY

;影响力：咨询、打赏等
2021-02-11 open Income:CN:Extra    CNY

;退款返款
2021-02-11 open Income:CN:Rebate    CNY

;红包
2021-02-11 open Income:CN:RedEnvelope    CNY

;投资
2021-02-11 open Income:CN:Invest    CNY

;薅羊毛
2021-02-11 open Income:CN:CreditCard:Point    CNY    ;信用卡积分
2021-02-11 open Income:CN:CreditCard:Discount CNY    ;信用卡折扣
2021-02-11 open Income:CN:CreditCard:Other    CNY

;其他
2021-02-11 open Income:CN:Other    CNY, BTC, ETH, BNB, XMR
```

#### expenses.bean

```
;居家
2021-02-11 open Expenses:Home:Phone ;手机电话
2021-02-11 open Expenses:Home:Mortgage:Loan:Interest ;房贷利息
2021-02-11 open Expenses:Home:Insurance:ZJX ;重疾险
2021-02-11 open Expenses:Home:Insurance:SX:MDW ;寿险
2021-02-11 open Expenses:Home:Insurance:YWX:MDW ;意外险
2021-02-11 open Expenses:Home:Insurance:YLX:ZFB ;医疗险
2021-02-11 open Expenses:Home:Insurance:CCX ;财产险
2021-02-11 open Expenses:Home:SDRQ ;水电燃气
2021-02-11 open Expenses:Home:WYF ;物业费
2021-02-11 open Expenses:Home:Delivery ;快递费
2021-02-11 open Expenses:Home:Haircut ;理发费
2021-02-11 open Expenses:Home:Omission ;漏记款
2021-02-11 open Expenses:Home:Other ;其他

;人情
2021-02-11 open Expenses:Relationship:Gift ;礼物
2021-02-11 open Expenses:Relationship:Relative ;礼金
2021-02-11 open Expenses:Relationship:PrePayment ;代付款
2021-02-11 open Expenses:Relationship:FilialPiety ;孝敬
2021-02-11 open Expenses:Relationship:RedEnvelope ;红包
2021-02-11 open Expenses:Relationship:Other ;其他

;购物
2021-02-11 open Expenses:Shopping:Clothing  ;服饰鞋包
2021-02-11 open Expenses:Shopping:Digital  ;电子数码
2021-02-11 open Expenses:Shopping:Home  ;家居百货
2021-02-11 open Expenses:Shopping:Book  ;买书
2021-02-11 open Expenses:Shopping:Makeup  ;化妆护肤
2021-02-11 open Expenses:Shopping:Other  ;其他

;餐饮
2021-02-11 open Expenses:Food:Breakfast ;早餐
2021-02-11 open Expenses:Food:Lunch ;午餐
2021-02-11 open Expenses:Food:Dinner ;晚餐
2021-02-11 open Expenses:Food:DrinkFruit ;饮料水果
2021-02-11 open Expenses:Food:Vegetables ;买菜原料
2021-02-11 open Expenses:Food:Invite ;请客吃饭
2021-02-11 open Expenses:Food:Omission ;漏记款
2021-02-11 open Expenses:Food:Other ;其他

;医疗健康
2021-02-11 open Expenses:Health:Outpatient  ;门诊
2021-02-11 open Expenses:Health:Medical  ;药品
2021-02-11 open Expenses:Health:Examination  ;体检
2021-02-11 open Expenses:Health:Other  ;其他

;娱乐
2021-02-11 open Expenses:Entertainment:Movie  ;电影
2021-02-11 open Expenses:Entertainment:Travel  ;旅游度假
2021-02-11 open Expenses:Entertainment:Hotel  ;酒店住宿
2021-02-11 open Expenses:Entertainment:Media  ;网络流媒体服务
2021-02-11 open Expenses:Entertainment:Show  ;演出门票
2021-02-11 open Expenses:Entertainment:Other

;交通
2021-02-11 open Expenses:Transport:Airline ;飞机
2021-02-11 open Expenses:Transport:Railway ;火车
2021-02-11 open Expenses:Transport:TAXI ;打车
2021-02-11 open Expenses:Transport:GJDT ;公交地铁
2021-02-11 open Expenses:Transport:Car:Oil ;加油
2021-02-11 open Expenses:Transport:Car:Tolls ;过路过桥
2021-02-11 open Expenses:Transport:Car:Maintenance ;保养维修
2021-02-11 open Expenses:Transport:Car:Insurance ;车险
2021-02-11 open Expenses:Transport:Car:Parking ;停车费
2021-02-11 open Expenses:Transport:Car:Wash ;洗车
2021-02-11 open Expenses:Transport:Other ;其他

;五险一金
2021-02-11 open Expenses:Government:Pension ; 养老保险
2021-02-11 open Expenses:Government:Unemployment ; 失业保险
2021-02-11 open Expenses:Government:Medical ; 医疗保险
2021-02-11 open Expenses:Government:Injury ; 工伤保险
2021-02-11 open Expenses:Government:Maternity ; 生育保险

;个人税
2021-02-11 open Expenses:Government:IncomeTax
2021-02-11 open Expenses:Government:Customs ; 关税

;投资
2021-02-11 open Expenses:Invest:Dev ;技术基础设施费用
2021-02-11 open Expenses:Invest:Study ;学习费用
2021-02-11 open Expenses:Invest:Portfolio:Interest ;利息支出
2021-02-11 open Expenses:Invest:Cost ;手续费
2021-02-11 open Expenses:Invest:Other ;其他
```

#### equity.bean

```
;权益账户

2021-02-11 open Equity:Opening-Balances

;初始化资产

;;💰
2021-02-12 pad Assets:Current:Bank:CN:CMB Equity:Opening-Balances
2021-02-13 balance Assets:Current:Bank:CN:CMB  1234567.0 CNY

;;🏠
2021-02-12 pad Assets:Property:CN:XA:XYZ Equity:Opening-Balances
2021-02-13 balance Assets:Property:CN:XA:XYZ      1 HOUSE.XYZ

;;🚗
2021-02-12 pad Assets:Car:XYZ Equity:Opening-Balances
2021-02-13 balance Assets:Car:XYZ      1 CAR.XYZ

;;💹
2021-02-12 pad Assets:Current:Invest:Portfolio:CN Equity:Opening-Balances
2021-02-13 balance Assets:Current:Invest:Portfolio:CN      12345678.9 BDSR

;初始化负债

;;房贷
2021-02-12 pad Liabilities:Bank:CN:BOC:Mortgage:Loan Equity:Opening-Balances
2021-02-13 balance Liabilities:Bank:CN:BOC:Mortgage:Loan  -123456.7 CNY

;;信用卡
2021-02-12 pad Liabilities:CreditCard:CN:CMB Equity:Opening-Balances
2021-02-13 balance Liabilities:CreditCard:CN:CMB  -12345.6 CNY
```

#### price.bean

```
;Commodity Price

;🏠
;;自住房产
2016-09-04 price HOUSE.XYZ                          123456 CNY ;买入成本
2016-09-04 price HOUSE.XYZ                          123456 CNY.UNVEST ;估值
2021-02-13 price HOUSE.XYZ                          1234567 CNY.UNVEST
2021-09-20 price HOUSE.XYZ                          2345678 CNY.UNVEST

;🚗
2021-02-14 price CAR.XYZ                               200000 CNY

;💹
2021-01-31 price BDSR                                  1.1 CNY
2021-05-31 price BDSR                                  1.2 CNY
2021-09-20 price BDSR                                  1.3 CNY

;₿

2021-02-14 price BTC                                   305528 CNY
2021-02-14 price BNB                                   838   CNY
2021-02-14 price ETH                                   11725  CNY
2021-02-20 price BTC                                   372575.75 CNY
2021-02-20 price BNB                                   1888   CNY
2021-02-20 price ETH                                   13140  CNY
2021-04-17 price BTC                                   405702 CNY
2021-04-17 price BNB                                   3519   CNY
2021-04-17 price ETH                                   16354.95  CNY

;💲
2021-02-14 price USD                                   6.46 CNY
2021-02-20 price USD                                   6.49 CNY
2021-05-15 price USD                                   6.44 CNY
2021-09-20 price USD                                   6.47 CNY
```

### 初始数据建立

由于很难将挖财的历史数据转换成 Beancount 的格式，所以我使用`pad`和`balance`命令来初始化账户。这些初始化账目都放在`equity.bean`这个文件中。如果你没有历史数据，那就不需要考虑这个问题，直接开始记账吧。

### 开始记账

#### 日常开支

由于日常消费的账目是最多的，所以每月一个文件来记录消费账目。比如 10 月份的账目存放在`./2021/0-default/10-expenses.bean`文件中：

```
2021-10-03 ! "AWS" "9月账单"
  Liabilities:CreditCard:CN:CMB-9848          -10.35 USD @@ 66.72 CNY
  Expenses:Invest:Dev

2021-10-03 * "买礼品送长辈"
  Assets:Current:Cash:CN:WX                   -85.0 CNY
  Assets:Current:Bank:CN:CMB-6139             -98.0 CNY
  Assets:Current:Cash:CN:WX                   -20.0 CNY
  Liabilities:CreditCard:CN:PINGAN-6467       -10.0 CNY
  Assets:Current:Bank:CN:CMB-6139             -25.0 CNY
  Expenses:Relationship:FilialPiety

2021-10-03 * "加油"
  Liabilities:CreditCard:CN:PINGAN-6467      -295.0 CNY
  Expenses:Transport:Car:Oil

2021-10-02 * "电话费-9395"
  Liabilities:CreditCard:CN:PINGAN-6467      -300.0 CNY
  Expenses:Home:Phone

2021-10-01 * "请客吃饭"
  Liabilities:CreditCard:CN:PINGAN-6467      -83.0 CNY
  Expenses:Food:Lunch
```

从上面可以看出来，有时候一笔账目里包含了多笔消费记录，但是整体属于一个大类别。也可以在记账时做货币换算。

收入的话由于记录条目比较少，一般一年就一个`income.bean`文件。记录频率的话我是晚上一次记录当天所有账目。

#### 周期性记账

```
.
├── 00.bean
├── bankcard.bean # 银行卡转账、信用卡还款、提现等
├── cycle-expenses.bean # 周期消费
└── loans.bean # 房贷
```

手机 App 的周期性记账一般是自动的操作，但 Beancount 只能通过人工复制的方式来记账。我一般在周期发生之前或者之后复制上次的账目到这个月。由于是纯文本记账，虽然无法自动化，但胜在可以灵活的复制修改账目。

#### 投资记账

如果你想简单记录投资组合的收益，那可以直接开设一个虚拟的投资账户，将投资资金出入记录成转账，将收益记录成收入与支出，每年记录一笔。

##### 股票基金投资组合

当然 Beancount 还有更好的玩法。读者都知道我有个 [被动收入的投资组合](/tags/投资组合/) ，因为我按照`基金净值`的方法来记录投资收益，那用 Beancount 就可以这么记录：

1. 在`./accounts/assets.bean`里创建被动收入投资组合货币

```
2021-02-11 commodity BDSR
  export: "BDSR"
  name: "被动收入投资组合"

2021-02-11 open Assets:Current:Invest:Portfolio:CN:HTZQ BDSR ;投资组合，华泰证券托管
```

2. 在`accounts/equity.bean`初始化投资组合资产

```
2021-02-12 pad Assets:Current:Invest:Portfolio:CN:HTZQ Equity:Opening-Balances
2021-02-13 balance Assets:Current:Invest:Portfolio:CN:HTZQ      185418.43 BDSR
```

3. 在`2021/1-invest/00.bean`里记录投资组合资金出入

```
2021-05-31 * "BDSR" "卖出投资组合"
  Assets:Current:Invest:Portfolio:CN:HTZQ -123456 BDSR @@ 123456.00 CNY
  Liabilities:CreditCard:CN:POS-TX
```

4. 在`2021/0-default/event.bean`里记录投资组合资金出入事件

```
2021-05-31 event "投资" "华泰证券转出资金123456元至信用卡"
```

5. 在`accounts/price.bean`创建自定义货币汇率

```
;💹
2021-01-31 price BDSR                                  1.533 CNY
2021-05-31 price BDSR                                  1.581 CNY
2021-09-20 price BDSR                                  1.49 CNY
```

最终使用 [fava](https://github.com/beancount/fava) 查看投资组合的报表：

![](https://img.bmpi.dev/b585a5b2-5347-f623-d13d-41c2b0d323de.png)

##### 加密币投资

同样加密币的投资也可以这么记录：

1. 创建加密货币与钱包账户

```
;₿
2021-02-11 commodity BTC
  export: "BTC"
  name: "Bitcoin"

2021-02-11 commodity ETH
  export: "ETH"
  name: "Ethereum"

2021-02-11 commodity BNB
  export: "BNB"
  name: "Binance"

2021-02-11 commodity XMR
  export: "XMR"
  name: "MONERO"

2021-02-11 open Assets:Current:Crypto:BRD:Wallet BTC ;BRD钱包
2021-02-11 open Assets:Current:Crypto:BINANCE:Wallet BNB, ETH ;BINANCE交易所
;imToken
2021-02-11 open Assets:Current:Crypto:ImToken:Wallet ETH ;imToken钱包
;Cake Wallet
2021-02-11 open Assets:Current:Crypto:Cake:Wallet XMR ;门罗币钱包
```

2. 初始化资产

```
2021-02-12 pad Assets:Current:Crypto:ImToken:Wallet Equity:Opening-Balances
2021-02-13 balance Assets:Current:Crypto:ImToken:Wallet 0.1318 ETH
```

3. 记录交易

```
2021-06-21 * "币安" "买入ETH"
  Assets:Current:Bank:CN:CMB               -10000.0 CNY @@ 0.7942440945 ETH
  Assets:Current:Bank:CN:CMB                -2700.0 CNY @@ 0.2144459055 ETH
  Assets:Current:Crypto:BINANCE:Wallet 1.00869 ETH
```

4. 创建自定义货币汇率

```
2021-02-14 price BTC                                   305528 CNY
2021-02-14 price BNB                                   838   CNY
2021-02-14 price ETH                                   11725  CNY
2021-02-20 price BTC                                   372575.75 CNY
2021-02-20 price BNB                                   1888   CNY
2021-02-20 price ETH                                   13140  CNY
2021-04-17 price BTC                                   405702 CNY
2021-04-17 price BNB                                   3519   CNY
2021-04-17 price ETH                                   16354.95  CNY
```

##### RSU

同样的方式也可以记录公司授予的限制股票，这里不再赘述。

#### 大类资产记账

##### 房产

房产的记账需要考虑是否为投资房产。如果你的房产是自住，那投资的收益其实没啥意义，没必要体现在整体资产中，但是我们可以追踪房产的当前市场估值。

可以通过给自住房创建人民币的变种价格（估值价格），比如我的自住房是这样记账的：

```
;创建房产货币
2021-02-11 commodity HOUSE.XYZ
  name: "你房子的名字"
2021-02-11 open Assets:Property:CN:XA:XYZ                        HOUSE.XYZ

;初始化房产资产
2021-02-12 pad Assets:Property:CN:XA:XYZ Equity:Opening-Balances
2021-02-13 balance Assets:Property:CN:XA:XYZ      1 HOUSE.XYZ

;创建房产价格
2018-09-04 price HOUSE.XYZ                          1000000 CNY ;买入成本
2018-09-04 price HOUSE.XYZ                          1000000 CNY.UNVEST ;估值价格
2021-02-13 price HOUSE.XYZ                          2000000 CNY.UNVEST ;估值价格
2021-09-20 price HOUSE.XYZ                          3000000 CNY.UNVEST ;估值价格
```

这里的关键在于创建了人民币`CNY`的变种货币`CNY.UNVEST`，这样当以人民币`CNY`展示总资产的时候，不会让估值价格影响总资产的统计。但是可以在价格页面查看房子的估值价格。

如果你的房产是投资的，那可以按照上述 [股票基金投资组合](#股票基金投资组合) 的记账方式创建一种房产货币，然后创建房产货币与人民币的汇率（也就是房子的市场价格），这样就可以追踪房产的估值了。

##### 车

车虽然本质是一种负债，但是二手车也是一种资产。所以我还是给车创建了货币，并给了一个大概的二手车估值价格。流程和 [股票基金投资组合](#股票基金投资组合) 的记账方式一样。

## 特殊场景记账

### 如何与家人共同记账

家庭成员共同记账用 Beancount 很简单，使用 GitHub 的私有仓库托管家庭 Beancount 账本，家庭成员使用 Git 去协作编辑家庭账本。比如家人用亲情卡买菜可以这么记录：

```text
2021-02-14 * "买菜"
  share: "亲情卡"
  Liabilities:CreditCard:CN:PINGAN       -29.28 CNY
  Expenses:Food:Vegetables
```

这里的`share: "亲情卡"`是一个元数据标签，最终可以通过查询这个元数据标签来筛选出家庭成员的账目。当然家庭成员可以单独开设自己的资产账户来记账。

真正的难点在于让家庭成员学会使用 Git 协作编辑，但这个也只是习惯问题，Git 的基本用法最多半天就用习惯了。

### 如何报销

报销使用 Beancount 的 Tag 标签，比如报销的时候可以这么记账：

```text
plugin "beancount.plugins.tag_pending"

2019-09-30 * "垫付机票" ^201909-out
    Assets:Cash           -1000 CNY
    Assets:Receivables     1000 CNY

2019-10-01 * "机票报销" ^201909-out
    Assets:Receivables    -1000 CNY
    Assets:Cash            1000 CNY
```

如果是公司出差等报销时间会拖得比较长的情况下，推荐使用 tag_pending 这个官方插件。开启此插件，并给待报销的交易加上 ^tag 即可。该插件会为所有总额不为 0 的标签自动加上 #PENDING，一目了然。

### 如何查询

比如统计家庭成员的消费记录，可以这么使用 BQL 查询：

```sql
select * where any_meta('share') ~ '亲情卡' # 查询亲情卡交易
select sum(position) as total where any_meta('share') ~ '亲情卡' and number(convert(units(position), 'CNY')) > 0 # 查询亲情卡消费总额（人民币）
```

![](https://img.bmpi.dev/8fbc2e1b-7c6d-e9bb-9944-bfd379b8a610.png)

## 定时获取收支报表

能在手机用邮件定时接收每月家庭的收入与开支报表是件很方便的事情，我们可以利用 GitHub Actions 来实现。

`.github/workflows/schedule-email.yml`:

```yaml
name: schedule-email
on: 
  schedule:
    # * is a special character in YAML so you have to quote this string
    - cron:  '0 0 2 */1 *'
jobs:
  make-html-send-email:
    name: make-html-send-email
    runs-on: ubuntu-latest
    steps:
    - name: Checkout repository
      uses: actions/checkout@master
    - name: Set up Python3
      uses: actions/setup-python@v1
      with:
        python-version: '3.7'
    - uses: BSFishy/pip-action@v1
      with:
        packages: |
          beancount
    - run: python tool/get_year_last_month.py
    - run: printf '# '$(python tool/get_year_last_month.py ym)'\n' > out.md
    - run: printf '## Net income report' >> out.md
    - run: printf '\n' >> out.md
    - run: printf '### Monthly total income' >> out.md
    - run: printf '\n' >> out.md
    - run: printf '```text\n' >> out.md
    - run: bean-query main.bean $(echo 'SELECT abs(sum(cost(position))) as total_income WHERE account ~ "^Income:*" and year = '$(python tool/get_year_last_month.py y)' and month = '$(python tool/get_year_last_month.py m)' GROUP BY month') >> out.md
    - run: printf '```' >> out.md
    - run: printf '\n' >> out.md
    - run: printf '### Monthly total expense' >> out.md
    - run: printf '\n' >> out.md
    - run: printf '```text\n' >> out.md
    - run: bean-query main.bean 'SELECT sum(cost(position)) as total_expense WHERE account ~ "Expenses:*" and year = '$(python tool/get_year_last_month.py y)' and month = '$(python tool/get_year_last_month.py m)' GROUP BY month' >> out.md
    - run: printf '```' >> out.md
    - run: printf '\n' >> out.md
    - run: printf '## Monthly income detail' >> out.md
    - run: printf '\n' >> out.md
    - run: printf '```text\n' >> out.md
    - run: bean-query main.bean $(echo 'SELECT account, abs(sum(cost(position))) as total WHERE account ~ "^Income:*" and year = '$(python tool/get_year_last_month.py y)' and month = '$(python tool/get_year_last_month.py m)' GROUP BY month, account ORDER BY total, account DESC') >> out.md
    - run: printf '```' >> out.md
    - run: printf '\n' >> out.md
    - run: printf '## Monthly expenses detail' >> out.md
    - run: printf '\n' >> out.md
    - run: printf '```text\n' >> out.md
    - run: bean-query main.bean 'SELECT account, sum(cost(position)) as total WHERE account ~ "Expenses:*" and year = '$(python tool/get_year_last_month.py y)' and month = '$(python tool/get_year_last_month.py m)' GROUP BY month, account ORDER BY total, account DESC' >> out.md
    - run: printf '```' >> out.md
    - run: printf '\n' >> out.md
    - run: cat out.md
    - name: send-email
      uses: dawidd6/action-send-mail@v3
      with:
        server_address: smtp.exmail.qq.com
        server_port: 465
        username: ${{secrets.MAIL_USERNAME}}
        password: ${{secrets.MAIL_PASSWORD}}
        subject: Monthly income & expenses report
        html_body: file://out.md
        convert_markdown: true
        to: ${{secrets.MAIL_TO}}
        from: ${{secrets.MAIL_FROM}}
```

`tool/get_year_last_month.py`:

```python
#!/bin/python
import datetime
import sys
now = datetime.datetime.now()
last_month = now.month - 1 if now.month > 1 else 12
year = now.year if now.month > 1 else now.year - 1

if __name__ == '__main__':
     if len(sys.argv) > 1:
        option = sys.argv[1]
        if option == 'y':
            print(year)
        elif option == 'm':
            print(last_month)
        else:
            print(str(year) + '/' + str(last_month))
```

这样每月月初就可以收到一份统计家庭月开支的报表：

```
2021/9
Net income report
Monthly total income
total_income
------------
   **.** USD, *****.** CNY
Monthly total expense
          total_expense          
---------------------------------
123456.0 CNY,    50.0                       USD,     0.01                      ETH
Monthly income detail
           account               total    
----------------------------- ------------
Income:CN:Salary:XYZ           123456.70 CNY
.......
Income:PassiveIncome:Other       28.11 USD
Monthly expenses detail
                  account                      total    
------------------------------------------- ------------
Expenses:Shopping:Digital                   12144.06 CNY
.......
Expenses:Invest:Cost                            0.01 ETH
Expenses:Invest:Dev                            81.21 CNY,    50.0  USD
```

## 家庭财务诊断

**记账的目标不在于记录一个流水账，而应该能帮助我们分析诊断家庭财务的健康度，最终实现家庭的理财规划目标**。在 [我的家庭理财规划](/self/my-financial-planning/#家庭财务诊断) 这篇文章中，我介绍了如何根据家庭财务报表去分析家庭财务的健康度。在此不再赘述。

## Beancount 电报群

这个电报群解决了我很多记账的问题，群里有很多专业记账的大佬，和他们交流我学习到很多，也让我意识到之前用 App 记的都是流水账。

- [Beancount複式記賬討論](https://t.me/beancount_zh)

## 其他还不错的参考文章或工具资源

- [把自己当做一家公司：使用 beancount 记账](https://gitpress.io/c/beancount-tutorial/)
- [Beancount —— 命令行复式簿记 | wzyboy’s blog](https://wzyboy.im/post/1063.html)
- [使用 Beancount 记录证券投资 | wzyboy’s blog](https://wzyboy.im/post/1317.html)
- [Beancount · Blind with Science](https://blindwith.science/tags/beancount/)
- [Beancount复式记账](https://blog.zsxsoft.com/post/41)
- [基于Telegram的Beancount记账](http://costflow.io/)
- [Beancount云记账](https://beancount.io/)
