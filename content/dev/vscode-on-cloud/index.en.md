---
title: "Cloud IDE"
date: 2021-08-23
draft: false
tags: ["AWS", "Pulumi", "VSCode", "AWS Cloud9", "GitHub Codespaces", "IDE"]
keywords: ""
description: "This post shares my experience of building a cloud VSCode on AWS which is similar to GitHub Codespaces."
og_image: "https://img.bmpi.dev/dafdc38a-8e97-7daa-d860-4ad78c4d182b.png"
---

A while back, the GitHub Twitter posted the following Tweet.

![](https://img.bmpi.dev/0dd20034-d46f-8910-a6dc-cf71802979f4.png)

If you press `.` on any GitHub Repo page, you will automatically be redirected to the `github.dev` which is a web version of VSCode and will automatically clone the code of the repo. In this web VSCode you can even install some specific plugins (you can't install plugins that require external dependencies) to make it easier to read the code. Because this site is official, VSCode is automatically bound to your GitHub account, so developers can read, edit, and commit code in it without having to open a local IDE. github1s), an open source project with similar functionality.

VSCode's team leader Erich Gamma (one of the authors of JUnit, one of the authors of Design Patterns, and an Eclipse architect) joined Microsoft in 2011 with the following job description.

> Envision new paradigms for online developer tooling that will be as successful as the IDE has been for the desktop.

Then came the birth of VSCode. We can say that VSCode is designed to be a cloud-based IDE from its inception.

Why use a cloud IDE, it is due to some problems in local development environment, such as

- Environment differences: There are some differences between Mac and Linux, especially when using popular Linux kernel-based technologies like Docker on Mac, which can make the whole experience worse.
- Performance issues: Local development machines generally need to run a lot of software, such as some office and communication app, so the performance is not high enough to stretch.
- Stability problem: The local development machine takes a long time to restart, and it takes a lot of time to set up the development environment after each restart, which wastes a lot of time.
- Dependency issues: If the development environment relies on some specific cloud infrastructure, network communication can be troublesome. Whereas on cloud hosting, it is naturally in a network environment with other cloud infrastructures and the environment is simple to set up.
- Network issues: Modern software development is standing on the shoulders of giants, and a lot of software relies on a large number of libraries, frameworks, and runtime, and these dependencies require fast network speeds to download. Generally cloud hosting has better network performance than a home or office network.
- Security issues: There is a risk of leakage of code or keys placed in the local development environment, such as the loss of code or keys when a developer's development machine is stolen.
- Storage issues: Local development machines have limited disk storage and do not scale well. And the cloud host's disks are easily expandable.

The ultimate solution to these problems is to move the development environment to the cloud, and the most important thing to develop in the cloud is the need for a good IDE support, which has led to a strong demand for cloud IDEs in the industry.

## Cloud IDE

Before we talk about the cloud IDE let's understand some of the main functional points of the IDE, as shown in the following figure.

![](https://img.bmpi.dev/b203c603-cc39-3ee0-3ce4-9ed3d7022777.png)

A good IDE should of course let the programmer write the code to write the cool, see the code to see the smooth. And to achieve this purpose, it is essential to support the following feature points.

- Excellent text editing features, supporting keyboard custom layout.
- Code hint functions, such as syntax highlighting, code jumping, error hints, etc..
- Debugging features.
- Multi-programming language support.
- Code completion function.
- Code refactoring capabilities.
- Extension capabilities, support for user-defined or provided plug-ins.
- Good ecology.

In desktop IDEs, these features are not a problem, and there are many IDEs that support them, such as Visual Studio, Eclipse, IntelliJ IDEA, NetBeans and Xcode. But in the dimension of online support, none of these older IDEs can.

The requirements for cloud IDEs in the early industry were also not high, so there were about three broad categories of cloud IDEs, as follows.

![](https://img.bmpi.dev/6743ed9b-5ffa-3032-1e3e-12aa383e5ec6.png)

- Online editors. Web online editors, mainly CodePen and JSFiddle, make it easy to do online development of front-end pages. But this is far from the desktop IDE experience.
- Repl.it and Jupyter are the main online [REPL](https://en.wikipedia.org/wiki/Read-eval-print_loop). REPL is at most one of the many features supported by desktop IDEs, and its usage scenario is suitable for writing some validation type There is still a long way to go before an engineered code development experience.
- Cloud IDEs with limited functionality, mainly AWS Cloud9, are already very good for code development, even seamlessly using cloud infrastructure, and are suitable for collaborative code development at scale. However, these cloud IDEs are generally not scalable, for example, some plugins cannot be installed.

For example, Github Codespaces uses VSCode combined with Azure cloud servers to give developers a desktop IDE experience and the ability to install plugins. Also, in a [2021 Developer Survey](https://insights.stackoverflow.com/survey/2021) questionnaire from StackOverflow, the most popular developer community, the `Integrated development environment (IDE)` section of a StackOverflow [2021 Developer Survey]() survey (with more than 80,000 developer survey responses), VSCode was voted the most popular IDE with 71% of the votes (up to 50% in 2019).

![](https://img.bmpi.dev/ef162e34-50e9-e7bd-e1aa-1de4b80a27b8.png)

It seems that VSCode achieves the ultimate goal that cloud IDEs are trying to achieve: **the same development experience as desktop IDEs**. The question here is why VSCode?

## Why VSCode

### Good Design

The VSCode remote development model is shown in the following figure.

![](https://img.bmpi.dev/4c5f0a02-139f-1bb5-5dbd-46c1af97f60a.png)

The CS architecture is designed to give VSCode the ability to use remote servers or containers. The local VSCode is only responsible for the UI interface and theme display, while other things such as plug-ins, program runs, terminal processes and debuggers are run on the remote server. The separation of interface display and computation is a very important point for implementing a cloud IDE.

The CS architecture design is also reflected in the code prompting. By developing the `Language Server Protocol` standard protocol, the VSCode core does not need to parse ASTs of multiple programming languages or implement multiple programming language parsers, but delegates these functions to the plug-ins of each language, ensuring that the core is very small and stable.

The same design is also reflected in the Debugger and the `Debug Adaptor Protocol` standard protocol.

More analysis of the architecture can be found in my article [VSCode Plugin Development Notes](/dev/vscode-plugin-development-notes/).

### Cross Platform

VSCode was formerly known as [monaco-editor](https://github.com/Microsoft/monaco-editor) online editor. As a web software, it need to use `Electron` technology to achieve cross-platform functionality. So the desktop VSCode and the server-side Web version of VSCode are actually one code base.

Because it is a web software, there is a third-party Repo [code-server](https://github.com/cdr/code-server) and a VSCode running in the browser.

### Open source

[VSCode](https://github.com/microsoft/vscode) Without open source, it could have ended very differently. It was Microsoft's gorgeous turnaround and enthusiastic embrace of open source that opened the door for VSCode to go global, or it could have ended up as one of Microsoft's many internal projects.

## Build Cloud IDE based on AWS with Pulumi

Thanks to VSCode's open source and web features, we can quickly build a VSCode-based personal cloud IDE that is comparable to [Github Codespaces](https://github.com/features/codespaces), but much cheaper.

My implementation can be found in this [Repo](https://github.com/bmpi-dev/code.bmpi.dev/tree/master/server). The architecture is as follows.

![](https://img.bmpi.dev/dafdc38a-8e97-7daa-d860-4ad78c4d182b.png)

Prerequisites.

1. An AWS account with the AWS CLI installed and AWS Credentials configured locally. The AWS account needs to have rights to access to EC2.
2. A [Pulumi](https://www.pulumi.com/) account and create a project; (if you are not familiar with Pulumi, you can refer to this article [Implementing static blog access statistics based on Serverless](/dev/pulumi-aws-serverless-hugo-site-vists/))

Very simple to use (thanks to the power of Pulumi and AWS CLI).

```bash
git clone https://github.com/bmpi-dev/code.bmpi.dev.git
cd code.bmpi.dev/server
pulumi up # Set up AWS EC2 with Pulumi
./run work # Open remote VSCode
./run rest # Shut down the remote VSCode
```

If `./run open_tunnel` cannot connect to the tunnel while the server is still up, you can run it again after the server is up to establish the tunnel connection.

You need to enter the VSCode login password for the first time access, by executing `sh connect-server.sh` and then execute `cat ~/.config/code-server/config.yaml | grep password:` to get the login password.

You can start using the remote VSCode by accessing `http://localhost:8888/` through your browser.

![](https://img.bmpi.dev/db6642d4-1224-d743-c881-314dd043e318.png)

If you don't need this environment for a while, remember to hibernate it via `./run rest` to hibernate the cloud server. After the server is shut down, AWS does not bill the EC2 instance, but only the storage volumes for a very cheap fee.

If you don't need the environment at all and want to destroy all resources so that AWS doesn't continue to charge, just run `pulumi destroy` to delete all AWS resources.

## About fees

Take an AWS EC2 T2.Medium instance (2 cores 4GB RAM + 50GB storage) as an example. For 5 hours of development per day and 100 hours per month for 20 days, the total cost is $0.0464 * 100 + $0.1 * 50 = $9.64. The same server configuration with Github Codespaces costs $21.50, 2.23 times bigger than our.

## The future of Cloud IDE

Cloud IDE represents the future of an R&D model. The possible development trends of this R&D model are as follows.

- Standardized development environment. A set of cloud IDE development environment can be standardized for batch configuration and used out of the box, significantly reducing the time consumption of developers in configuring the development environment.
- Customized development environment. The development environment can be customized to meet the needs of different types of projects.
- Elastic development environment. The configuration of the development environment relies on the automatic elastic expansion of the cloud service, and the configuration can be dynamically adjusted to meet the dynamic needs of the development environment for resource allocation.
- Intelligent development environment. Relying on the cloud server's machine learning analysis of specific code repositories, it can better achieve intelligent tips to assist development, similar to [GitHub Copilot](https://copilot.github.com/).
- Secure development environment. The code and infrastructure configuration are stored on the cloud server, which can greatly reduce the risk of code or environment key leakage caused by developer negligence. With a good system security configuration of the cloud server, the security risk of the development environment can be reduced.
- Ready-to-use development environment. No need for a specific development machine, just a computer with a browser to access the cloud IDE to start development.

In a nutshell.

```
Cloud IDE, Coding Anytime Anywhere.
```

## Reference

1. [Large-scale IDE technology architecture from VSCode](https://zhuanlan.zhihu.com/p/145981067)
2. [Implementing VSCode-based (Code-Server) on Cloud with AWS CDK](https://holisticsecurity.io/2020/09/06/implementing-vscode-based-on-cloud-with-aws-cdk/)
