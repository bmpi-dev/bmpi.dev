---
title: "AI驱动开发：从Prompt到Product（直播）"
date: 2024-05-01
draft: false
tags: ["chatGPT", "Prompt Engineering", "Pair Programming"]
keywords: ""
description: "本文通过直播的方式分享笔者完全用AI驱动开发的方式开发上线一款产品的全流程。"
isCJKLanguage: true
isMermaidEnabled: true
og_image: "https://img.bmpi.dev/963eb59b-a3bc-5e66-134d-d66bda5845aa.png"
---

## 背景

准备通过直播的方式，展示如何从零开始使用GPT4编写一个完整的产品，代码开源。这个产品的灵感来自于在开发[策引](https://www.myinvestpilot.com/)产品时需要一个能在线支持客户的功能。经过对现有SaaS产品和开源项目的调研后，发现都不太符合需求，因此决定自行开发一个能支持此需求的产品。经过在[i365社区](https://www.i365.tech/)讨论后，觉得将这个开发过程直播出来会很有意思。这个系列直播也是i365社区《[AI驱动开发指南](https://www.i365.tech/post)》系列的一部分。

在2022年发布的文章[AI降临](/self/ai-arrival/)后，我一直在用AI驱动开发的方式开发产品，这种方式已经成为我的工作方式。

在2023年，我与[ChatGPT结对编程](/dev/chatgpt-development-notes/pair-programming/)，开发了一个[myGPTReader](/dev/chatgpt-development-notes/my-gpt-reader/)的产品，在这个产品的开发过程中，我几乎没有单独写过代码，而是通过ChatGPT生成的代码来完成开发。这种方式在我看来是一种新的开发方式，我称之为AI驱动开发。

在2024年，我又尝试完全用ChatGPT开发[策引](https://www.myinvestpilot.com/)产品一个复杂的功能：[多策略服务](/tags/全球投资/)，策引产品[旧的策略服务](https://github.com/bmpi-dev/invest-alchemy)是一个复杂的遗留系统，不仅功能复杂，而且扩展性差，所以我用GPT4完全重构了技术架构，并优化了业务流程，提高了系统的可维护性和可扩展性。我的角色是决策宏观的架构与设计，其他尽可能让GPT4来写代码，而且所有的过程都在一个会话里完成，持续几个月的开发，消耗的Token过百万。这个过程的体验我已经在[i365社区](https://www.i365.tech/)分享过，详情请看：[完全用GPT4开发复杂服务的体验](https://www.i365.tech/post)。

## 直播内容

### 范围

直播内容将涵盖以下方面：

- 产品功能设计
- 域名选择
- 技术架构设计
- 技术栈选择
- 工程搭建
- 代码编写、测试、部署和上线
- LandingPage设计
- SEO优化

这些内容在去年的i365社区《[个人产品开发指南](https://www.i365.tech/post)》中已经有所涉及，但是去年是以AI辅助开发为主，而今年我们希望完全由AI驱动开发，这在策引产品开发中已经成为一种常态。

### 时间

计划每周晚上直播两到三次，每次1-2小时，完成一个小任务，预计持续数月。

### 看点

完全使用GPT驱动开发的特点是尽可能地使用Prompt来引导GPT生成代码，我将负责测试和组装，尽可能地避免自己编写代码。此外，GPT的应用不仅局限于技术和代码，还将参与产品功能设计、业务分析等与产品相关的各个方面，以尽可能地探索AI的边界。

### 渠道

- 小红书：[6739032172](https://www.xiaohongshu.com/user/profile/63c020180000000026013d6b)
- YouTube：[BMPI](https://www.youtube.com/@bmpi)

## 围观交流

- 微信群：目前群成员已经超过四百多人，要加群交流请添加i365的个人微信（`improve365_cn`）拉群，如果无法添加（微信限流），请发送邮件至：`me@i365.tech`。
- 电报群：[bmpi_group](https://t.me/bmpi_group)
- Discord群：[i365 Tech](https://discord.gg/S9mzJfqfKD)
