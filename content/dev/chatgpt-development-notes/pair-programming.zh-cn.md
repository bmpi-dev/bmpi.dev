---
title: "我与ChatGPT结对编程的体验"
date: 2023-05-21
draft: false
tags: ["chatGPT", "Prompt Engineering", "Pair Programming"]
keywords: ""
description: "本文分享了笔者与 ChatGPT 结对编程的体验并分享一些 Prompt Engineering 的重要技巧。"
isCJKLanguage: true
isMermaidEnabled: true
---

在软件开发过程中，结对编程（Pair Programming）是提升代码质量的一种有效方式。在之前的文章[Google软件工程之文化篇](/dev/software-engineering-at-google/culture/#打造知识共享文化)打造团队知识共享文化中，我曾对这种编程方式做过简单的介绍。

结对编程有两种模式：乒乓模式（Ping-Pong）与驾驶员观察者模式（Driver-Observer），前者适合以TDD的方式开发，后者适合老带新。本文主要采用后者的方式，我以一个观察员的身份去规划系统功能设计并审查代码，然后使用一些Prompt Engineering的技巧让ChatGPT以驾驶员的身份去开发实现。

Prompt Engineering相关的课程推荐观看由Andrew Ng与Isa Fulford讲授的[ChatGPT Prompt Engineering for Developers](https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/)免费短课程，本文也会将课程中的一些Prompt Engineering技巧应用到此次的实际开发中。

这次结对编程的目标是实现一个群发消息给用户的功能，项目背景是一个Slack工作区有大约几千个用户，管理员希望能够通过某种方式以群发的方式向这些用户发送消息，而不是一个一个地去手动发送。但客户也提到无需对此功能进行过多的开发投入，甚至不需要一个管理界面，只需要有方法能让管理员去群发消息即可，哪怕直接操作数据库都可以。

这个功能看起来很简单，就是要实现一个群发消息的功能，最简单的就是在一个大循环里面去遍历所有用户，然后调用发送消息的接口去发送消息即可。但这样的实现方式有几个问题：

- 如何触发消息发送的动作？调用某个接口？还是直接操作数据库？
- 消息怎么存储？存储在数据库？还是存储在文件系统？
- 消息如何定制化？是否需要支持消息模板？
- 消息发送的频率如何控制？是否需要支持消息发送的时间间隔？
- 消息发送的状态如何跟踪？是否需要支持消息发送的状态查询？
- 消息发送失败如何处理？是否需要支持消息发送失败的重试？

这些问题看起来都不是很复杂，但如果要实现一个完整的群发消息的功能，就需要考虑到这些问题，而且这些问题都是需要在设计阶段就要考虑到的，否则后续的开发就会变得很被动，甚至会导致重构。

目前ChatGPT因为有输入上下文大小的限制（3.5的Token最大数量是4K，4的话最高能到32K），无法把整个项目的背景都输入进去，这些限制会影响我们使用它去开发一个完整的功能，所以我们需要把这些问题分解成一些小的问题，然后使用ChatGPT去解决这些小问题，最后再把这些小问题组合起来，就可以实现一个完整的功能了。

现在，是时候与ChatGPT开始结对编程了，我的Prompt都是英文的，当然也可以用中文，不过感觉英文的Prompt效果会更好一些，在写英文Prompt的时候也无需考虑语法是否正确，中式英文也是可以的，因为ChatGPT对语言的理解能力是很强的。另外由于篇幅限制，本文会将ChatGPT的回复以链接的形式展示，读者可以点击链接查看ChatGPT的回复。

> **Prompt**: Let's start to implement this feature, use cloudflare worker with typescript, there is a database to store message sent history, it is like the sql migration behavior, there is a dir to store the message template files, the message send will store in to the database and will not send again. So we will have a sendMessage function, this function will first to scan the message dir to get the file list and will compare the database to get the not send message files but every time it only to get one un-send message templat then use the slack post message to send the message to all the users. That means every time the sendMessage function execute it just send one message to all users if there is. the message template file is a json like file but store the slack blocks template, the template can use the data to render a real slack message blocks. 
> 
> Based this, you can implement one step by step.Rember I have the project and no need to give me how to init the project, just start the function implement and the template design, I also want to know how to build the blocks from the template, and there is also a sqlite database to store the users table, so you may need to create a migration sql to create the new message table.
>
> **Answer**: [From ChatGPT](https://gist.github.com/madawei2699/d80d35f43df478c483ce1e5ed050114b#chatgpt-2).

这里的Prompt是一个比较长的描述，所以可以提出了第一个Prompt的技巧：`撰写明确而具体的指示`。这个Prompt的目的是给予ChatGPT要实现功能的背景及功能的大致实现思路，这样ChatGPT就可以根据这个背景去实现功能了。

在第二段中，我还要求它给予详细的实现步骤，并且不需要考虑初始化项目的步骤，因为这不是一个新项目，我们需要在已有代码的基础上去实现新的功能。所以这里的Prompt还有一个技巧：`给模型思考的时间`。**Step by step**是一个具有魔力的Prompt词汇，可以让ChatGPT花更多的时间去计算思考这个问题，而不是直接给出一个答案。

这个Prompt的意图有以下几个：

- 让ChatGPT以Cloudflare Worker + Typescript的方式去实现这个功能；
- 有一个数据库用于存储消息发送的历史记录，类似于SQL的迁移行为，这里的数据库是SQLite；
- 有一个目录用于存储消息模板文件，消息发送时会从这个目录中读取消息模板文件；
- 消息发送时会把消息存储到数据库中，以便后续查询；
- 消息发送时会把消息发送给所有用户；
- 消息模板文件是一个JSON文件，里面存储了Slack的消息模板，可以使用数据渲染出一个真实的Slack消息；
- 每次发送消息时，只会发送一条消息给所有用户；
- 根据以上这些要求，让ChatGPT一步步去实现这个功能，并且不需要考虑初始化项目的步骤；
- 同时让ChatGPT创建一个数据库迁移SQL，用于创建消息表。

但在ChatGPT的回答中，我发现它错误理解了我的一个需求，于是我继续在这个会话中给它提出了一个新的Prompt：

> **Prompt**: I think there is some mistake: - The getUnsentMessages function need to scan the messages dir and compare the database which just save the sent message and only get the oldest unsend message file. - the renderMessageTemplate function use the template and a dic to render a real json, u need to think how to render the template, is there any tmeplate render methond in typescript.
>
> **Answer**: [From ChatGPT](https://gist.github.com/madawei2699/d80d35f43df478c483ce1e5ed050114b#chatgpt-3).

在这一轮的对话中，ChatGPT正确的理解了我的需求，于是我把它的代码整理了后合并入了项目中，这样这个功能的大致框架就完成了，接下来就是一些细节的问题了。这里可以提出第三个Prompt的技巧：`迭代Prompt`。如果你发现ChatGPT没有正确的理解你的需求，那么你可以继续在这个会话中微调你的Prompt，直到ChatGPT正确的理解你的需求为止。

后续的Prompt我一直在与ChatGPT讨论如何使用Typescript的模板引擎去渲染消息模板，但是ChatGPT一直没有给出一个满意的答案（见这个及后续的几个[Prompt](https://gist.github.com/madawei2699/d80d35f43df478c483ce1e5ed050114b#you-7)），于是我决定放弃这个方案，改用另外一种方案，这里可以提出第四个Prompt的技巧：`放弃方案`。如果你发现ChatGPT没有给出一个满意的答案，那么你可以放弃这个方案，直接开启新的会话探索另外一种方案。

然后到了数据库的设计，我给ChatGPT提出了一个Prompt：

> **Prompt**: I want to implement a function, it get the cloudflare R2 bucket directory to get the message file list, and then querey the database table to know if this file are sent to all user, that means there is a status filed to record if the message file is sent to all user, becasue the users size are big, so it will need to sent mult times, can u design the table and give the migration sql, the database is sqlite, currently it has a Users table, so you need to consider how to record the message file if it is send to all users.
>
> **Answer**: [From ChatGPT](https://gist.github.com/madawei2699/d80d35f43df478c483ce1e5ed050114b#chatgpt-18).

在几轮Prompt迭代后，数据库的设计也完成了。不过在这个过程中，因为它给的代码不完整，于是我又给它提出了一个Prompt：

> **Prompt**: // first we need to iterate through the list of files and get the file name list, then query the database table MessageBroadcast to insert the file name which is not in the table for (const file of getMessageFileList.objects) { const filename = file.key.split('/').pop(); const messageBroadcast = await c.env.DB.prepare(\` select * from MessageBroadcast where message_file_name = ? \`).bind(filename).first(); if (!messageBroadcast) { await c.env.DB.prepare(\` insert into MessageBroadcast (message_file_name, send_status) values (?, ?) \`).bind(filename, false).run(); } } regarding of the sql, how can I give the file name list to insert those files are not in the table by one sql statement?
>
> **Answer**: [From ChatGPT](https://gist.github.com/madawei2699/d80d35f43df478c483ce1e5ed050114b#chatgpt-23).

在这轮对话中，我们又可以提出第五个Prompt的技巧：`给出代码片段`。如果你发现ChatGPT给出的代码不完整，那么你可以给出一个代码片段，让ChatGPT帮你完成这个代码片段。

然后我发现它的代码我难以理解，于是我又给它提出了一个Prompt：

> **Prompt**: the sql seems magic, can u give the explain or some examples to show how it works?
>
> **Answer**: [From ChatGPT](https://gist.github.com/madawei2699/d80d35f43df478c483ce1e5ed050114b#chatgpt-24).

在这轮对话中，我们又可以提出第六个Prompt的技巧：`代码解释`。如果你发现ChatGPT给出的代码你难以理解，那么你可以要求它给予完整的解释，或者用更简单的方式重写它的代码。这个过程中，还可以提升自己的技术能力，这也是结对编程的一个好处。

在与ChatGPT的这轮对话中，关于数据库SQL的实现时，有个需求是根据数据动态生成SQL，但是ChatGPT并没有给出一个满意的答案，于是我又给它提出了一个Prompt：

> **Prompt**: this generate: INSERT INTO MessageBroadcast (message_filename, status) SELECT filename, 'UNSENT' FROM (VALUES ('1681390809.mustache')) AS files(filename) WHERE filename NOT IN (SELECT message_filename FROM MessageBroadcast); But I want to generate the: INSERT INTO MessageBroadcast (message_filename, status) SELECT filename, 'UNSENT' FROM ( SELECT 'filename1' AS filename UNION SELECT 'filename2' AS filename UNION SELECT 'filename3' AS filename UNION SELECT 'filename4' AS filename ) AS files_to_insert WHERE filename NOT IN ( SELECT message_filename FROM MessageBroadcast );
>
> **Answer**: [From ChatGPT](https://gist.github.com/madawei2699/d80d35f43df478c483ce1e5ed050114b#chatgpt-28).

在这个Prompt中，我用到了第七个Prompt的技巧：`few-shot`。这个Prompt的技巧可大有来头，因为这是GPT-3的论文[Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165)标题的由来。如果你发现ChatGPT没有给出一个满意的答案，那么你可以给出一个更具体的例子，让ChatGPT帮你完成这个例子。

接下来是考虑到SQL的性能问题，因为这是一个大小表联合查询的问题，可能会存在性能的问题，我想与ChatGPT进一步讨论下，看是否存在优化的空间，于是我又给它提出了一个Prompt：

> **Prompt**: Think step by step, the question context is, the Users table have almost a thousand users, and the MessageBroadcast table have a record means a message need to send to all users, and the UserMessageBroadcastStatus is like a middle table to record if this message has sent to all users, so the requirment is we need to find a batch size like 30 users who are not sent to this message, so what is the sql like?
>
> **Answer**: [From ChatGPT](https://gist.github.com/madawei2699/d80d35f43df478c483ce1e5ed050114b#chatgpt-32).

这里依旧用到了Prompt的第二个技巧：`Think step by step`。但它显然没有给出一个满意的答案，于是我又给它提出了一个Prompt：

> **Prompt**: the question is at the beginning, the message is created in the MessageBroadcast, and the UserMessageBroadcastStatus has nothing, it only will insert data after the message is sent to the user, then a process will updat the table, think again!
>
> **Answer**: [From ChatGPT](https://gist.github.com/madawei2699/d80d35f43df478c483ce1e5ed050114b#chatgpt-33).

这显然也用到了Prompt的第三个技巧：`Think again`，最终它给了我一个满意的答案。

这些对话的过程中，还用到了以下的一些Prompt技巧：

- 要求结构化输出：比如直接要求它输出SQL语句；
- 翻译代码：比如将Python代码翻译成Typescript代码；
- 总结：比如总结一下这个问题的解决方案；

这些Prompt技巧，都是我在与ChatGPT的对话中，不断尝试的结果。最终在20多个Prompt的对话中，我与ChatGPT结对编程耗时不到两小时，完成了这个功能的开发，这是一个非常高效的过程。
