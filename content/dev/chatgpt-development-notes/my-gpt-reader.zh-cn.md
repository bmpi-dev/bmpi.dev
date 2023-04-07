---
title: "ChatGPT应用开发小记"
date: 2023-04-07
draft: true
tags: ["chatGPT"]
keywords: ""
description: "本文分享了笔者使用 chatGPT 开发 myGPTReader 开源项目的过程。"
isCJKLanguage: true
categories: [
    "什么是X"
]
---

如何开发一个基于 chatGPT 的应用？答案就在问题里，那就是用 chatGPT 来开发基于 chatGPT 的应用。本文以笔者的一个开源项目 [myGPTReader](https://github.com/madawei2699/myGPTReader) 为例，分享我是如何基于 chatGPT 去开发这个系统的，这个系统的功能见这篇文章：[我的 AI 阅读助手](/self/my-gpt-reader/)。

为了探索 chatGPT 辅助开发的可能性，我在项目开发之初就记录了与 chatGPT 对话的过程，将近一个月的开发日志都记录在 [ChatGPT Driven Development Record](https://github.com/madawei2699/myGPTReader/blob/main/docs/CDDR.md) 这个文档里。

从最终的结果看，我的角色从开发变成了产品设计与测试，整个项目的代码我个人亲自编写的可能不到 10%，从后端服务到前端页面，甚至连 Logo 都是 AI 来完成的，Logo 的设计过程我也记录到了 [Midjourney Driven Design Record](https://github.com/madawei2699/myGPTReader/blob/main/docs/MDDR.md) 这个文件了。

更有意思的是，这个项目因缺少部署文档，使一些不了解技术但又想独立部署该项目的网友犯难，但最终他们与 chatGPT 反向去研究这个项目，竟然也能成功部署。

总之这是一个 chatGPT 含量极高的项目，无论是开发过程还是最终的功能。

## AI 背景知识

### 大语言模型（LLM）

chatGPT 背后的技术是一个大语言模型（LLM: Large Language Model），

```text
user: 你能给我说说chatGPT背后的技术吗？比如大语言模型，还有训练过程

chatGPT: 当谈到ChatGPT时，背后的技术通常是指OpenAI GPT（Generative Pre-trained Transformer）模型，这是一种使用Transformer网络架构进行预训练的大型语言模型。GPT是基于无监督学习技术构建的，该技术可以在没有标签的大量数据集上进行训练，以自动发现数据中的模式和结构。

GPT模型的训练过程分为两个阶段：预训练和微调。

预训练阶段使用一个大规模的无标签语料库，例如维基百科、新闻文章、小说等，通过预测给定文本序列中下一个单词的任务，对模型进行训练。这个任务被称为“语言模型”，因为模型被训练为理解自然语言中的上下文和语法规则，以便能够预测下一个单词。在这个过程中，GPT模型可以学习到自然语言的规则和结构，形成了通用的语言表示。

在预训练完成后，微调阶段使用少量的标记数据对模型进行微调，以适应特定的下游任务，例如问答、文本分类、生成对话等。微调过程通过反向传播梯度更新模型的权重，以最小化特定任务的损失函数。微调的过程可以增强模型对特定任务的理解能力，并且可以使模型在下游任务上表现更好。

总的来说，GPT模型的背后技术是基于Transformer网络的大型无监督语言模型，通过预训练和微调两个阶段的训练，能够学习自然语言的规则和结构，并且在各种下游任务上表现出色。
```

## myGPTReader 应用架构


## myGPTReader 实现过程

