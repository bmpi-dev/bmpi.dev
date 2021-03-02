---
title: "Serverless应用开发小记"
date: 2020-08-30
draft: false
tags: ["AWS", "Lambda", "Serverless", "Terraform", "Infrastructure as code", "无服务器架构", "Docker", "AWS ECS", "DevOps"]
keywords: ""
description: "本文描述了笔者开发一个基于 AWS Serverless 技术的应用的全过程。"
isCJKLanguage: true
og_image: "https://img.bmpi.dev/48504c01-c2d0-e05a-1eda-d82b88f6496d.png"
---

## 背景

本文描述了笔者开发一个基于 AWS Serverless 技术的应用的全过程。基础设施使用 Serverless Framework 和 Terraform 搭建。系统的核心模块是每天都会执行一次的定时任务：该任务通过[ Tushare ](https://tushare.pro/)获取一组ETF指数基金价格数据，处理之后会将交易信号生成文本存放至 S3 桶。之后会发送消息给 AWS SNS Topic ，订阅该主题的用户会收到邮件提醒。在系统的 Web 页面里有用户邮件订阅入口，也可以访问每天的历史交易信号记录。

本文覆盖以下内容：

- 构建一个 Docker 镜像来执行 Core Service。
- 使用 Terraform 构建 Core Service 所需的以下 AWS 基础设施服务：
  - 设置 ECR 仓库。
  - 使用 Fargate 设置 ECS 集群。
  - 设置 Fargate 任务。
  - 设置 CloudWatch 定时任务。
  - 设置 IAM 权限角色。
  - 设置 SNS 主题。
  - 设置 VPC 网络。
- 使用 Serverless Framework 构建 API Service 和 Web 所需的以下 AWS 基础设施服务：
  - 设置 Lambda 函数。
  - 设置 API Gateway。
  - 设置 Route53。
  - 设置 CloudFront。
  - 设置 TLS 证书。
  - 设置 S3 桶。
  - 设置 CloudFormation。

最终效果见：[线上版本](https://money.i365.tech/)。

源码见：[代码仓库](https://github.com/bmpi-dev/invest-alchemy)。

技术栈如下：

![](https://img.bmpi.dev/b1e5efb6-a764-ec0a-cbed-2573936fe7e3.png)

## 先决条件

你需要先注册以下账号：

- [AWS账号](https://aws.amazon.com/)
- [Serverless账号](https://www.serverless.com/)

## 背景知识

### 应用架构演进历史[^1]

![](https://img.bmpi.dev/0fa1a962-7d25-4263-7844-d6f76d2360c1.png)

- 单体应用(Monolithic)：适合创业公司的小型应用；性能好。
- 面向服务(SOA)：适合复杂企业业务的大型应用。
- 微服务(Microservices)：复杂弹性可伸缩应用，适合有经验的团队。
- 无服务器(Serverless)：成本低，适合后台任务；也适用于客户量大的应用程序和快速增长并需要无限扩展的应用程序。

### Serverless

> Build and run applications without thinking about servers[^2]

无服务器计算（或简称 serverless），是一种执行模型，在该模型中，云服务商（AWS，Azure 或 Google Cloud）负责通过动态分配资源来执行一段代码，并且仅收取运行代码所使用资源的费用。该代码通常运行在无状态的容器中，能够被包括 HTTP 请求、数据库事件、队列服务、监控报警、文件上传、调度事件（cron 任务）等各种事件触发。被发送到云服务商执行的代码通常是以函数的形式，因此，无服务器计算有时是指 “函数即服务” 或者 FAAS。[^3]

#### 优势

- 无服务器管理成本
- 弹性扩容
- 为服务运行时间付费
- 自带高可用、容错

#### 劣势

- 冷启动性能差
- 监控与调试复杂
- 依赖云厂商

### DevOps

![](https://www.jamesbowman.me/post/cdlandscape/ContinuousDeliveryToolLandscape-fullsize.jpeg)

这是 DevOps 工具全景图，我在此应用开发过程中也只用了一小部分工具，甚至没有测试流程。当然应用这些工具也需要考虑项目的实际情况，灵活应用。

## 应用架构

![](https://img.bmpi.dev/48504c01-c2d0-e05a-1eda-d82b88f6496d.png)

本应用分为三大模块：

- Core Service：后台定时任务，提供获取基金价格数据、分析生成交易信号及发送邮件功能。
- API Service：提供订阅主题 API。
- Web：提供订阅主题入口页面及查看历史交易信号记录功能。

## 实现

由于接下来需要使用多种 AWS 云服务，要了解这些服务请看这篇[《AWS各服务解释》](https://wiki.bmpi.dev/#AWS%E5%90%84%E6%9C%8D%E5%8A%A1%E8%A7%A3%E9%87%8A:AWS%E5%90%84%E6%9C%8D%E5%8A%A1%E8%A7%A3%E9%87%8A%20AWS%E5%A5%BD%E6%96%87%20Index)。

### 工程目录结构

```bash
.
├── api # api service
│   ├── serverless.yml
│   └── sns.js # lambda function
├── core # core service
│   ├── Dockerfile
│   ├── Infrastructure
│   │   └── tf-fargate
│   │       ├── cloudwatch.tf
│   │       ├── ecr.tf
│   │       ├── ecs.tf
│   │       ├── iam.tf
│   │       ├── main.tf
│   │       ├── output.tf
│   │       ├── sns.tf
│   │       ├── tasks
│   │       │   └── task_definition.json
│   │       ├── variables.tf
│   │       └── vpc.tf
│   ├── Makefile # CLI entry
│   ├── requirements.txt
│   └── src
│       ├── fund.txt
│       └── main.py # fargate task
└── web # web service
    ├── binaryMimeTypes.js
    ├── client
    │   ├── assets
    │   │   └── styles
    │   │       └── global.less
    │   ├── components
    │   │   └── navbar.vue
    │   ├── layouts
    │   │   └── default.vue
    │   ├── pages
    │   │   └── index.vue
    │   └── plugins
    │       └── iview.js
    ├── index.js
    ├── nuxt.config.js
    ├── nuxt.js # lambda function
    ├── package-lock.json
    ├── package.json
    ├── secrets_example.json
    ├── serverless.yml
    └── yarn.lock
```

### Core Service

Core Service 通过 AWS Fargate 运行，Fargate 比 Lambda 更适合运行长时间的后台任务。Core Service 用 Python 开发，要使其运行在 AWS ECS 环境中，先要构建Docker镜像，之后推送至 AWS ECR 仓库。

#### Docker 镜像

```bash
FROM python:3.8-slim-buster

USER root
WORKDIR /tmp

# for source
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# for compile
RUN  apt-get update \
  && apt-get install -y wget \
  && apt-get install -y build-essential \
  && rm -rf /var/lib/apt/lists/*

# for TA-Lib
RUN pip install numpy && \
  wget http://prdownloads.sourceforge.net/ta-lib/ta-lib-0.4.0-src.tar.gz && \
  tar -xvzf ta-lib-0.4.0-src.tar.gz && \
  cd ta-lib/ && \
  ./configure --prefix=/usr && \
  make && \
  make install
RUN rm -R ta-lib ta-lib-0.4.0-src.tar.gz

# set the working directory in the container
WORKDIR /code
# copy the dependencies file to the working directory
COPY requirements.txt .
# install dependencies
RUN pip3 install -r requirements.txt
# copy the content of the local src directory to the working directory
COPY src/ .
# command to run on container start
CMD [ "python", "./main.py" ]
```

在这里需要注意的是基础镜像的选择，一般我们在选择 Python 镜像的时候用的是 alpine 版本。但是 alpine 版本在安装一些本地二进制包的时候需要大量的编译，这个编译会遇到各种错误，最终我选择了 buster 版本，也就是基于 ubuntu 的版本。如果想进一步了解可看这篇[《Using Alpine can make Python Docker builds 50× slower》](https://pythonspeed.com/articles/alpine-docker-python/)。

需要先获取 Tushare 的 API Token 后，在本地运行 Docker：

```
docker build -t invest-alchemy/core . # 构建
docker run -t -i -e TUSHARE_API_TOKEN=xxxx invest-alchemy/core # 本地运行
```

之后在 AWS 中创建 ECR 仓库，之后可以将本地构建的镜像推送到 ECR 中供 ECS 任务使用：

```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin replace_with_your_ecr_addr.dkr.ecr.us-east-1.amazonaws.com # 登陆ECR

docker build -t invest-alchemy/core . # 本地构建

docker tag invest-alchemy/core:latest replace_with_your_ecr_addr.dkr.ecr.us-east-1.amazonaws.com/invest-alchemy/core:latest # 打Tag

docker push replace_with_your_ecr_addr.dkr.ecr.us-east-1.amazonaws.com/invest-alchemy/core:latest # 推送远程仓库
```

#### 构建基础设施

接下来通过 Terraform 构建所需的基础设施(ECS/IAM/SNS/VPC/CloudWatch)。这块主要参考这篇[《Serverless job scheduling using AWS Fargate》](https://zoph.me/posts/2019-09-22-serverless-jobs-scheduling-using-aws-fargate/)。

##### ECR/ECS/Task

详见源码，此块不再赘述。注意将 `capacity_provider` 设置为 `FARGATE_SPOT` 可大幅降低成本。

##### CloudWatch

详见源码，此块不再赘述。注意在 `ecs_target`/`network_configuration` 设置可使用默认的 VPC 网络，一定要将 `assign_public_ip` 设置为 `true` 才行，否则容器任务将无法访问外部网络。

##### VPC

使用 AWS 默认的 VPC 网络。AWS Fargate 可运行在多种网络模式下，这里选择了最简单的公共子网模式。

![](https://img.bmpi.dev/ff9ced8e-daf9-b600-f3b8-033a3c78939e.png)

其他模式见[《CloudFormation Templates for AWS Fargate deployments》](https://github.com/nathanpeck/aws-cloudformation-fargate)。

要想进一步学习可看这篇[《Fargate networking 101》](https://cloudonaut.io/fargate-networking-101/)。

##### IAM

```
######################### Role used by the container regulates what AWS services the task has access to, e.g. your application is using a DynamoDB, then the task role must give the task access to Dynamo.
resource "aws_iam_role" "ecs_service_role" {
  name               = "${var.project}_ecs_service_role_${var.env}"
  assume_role_policy = "${data.aws_iam_policy_document.ecs_service_assume_role_policy.json}"
}

resource "aws_iam_role_policy" "ecs_service_policy" {
  name   = "${var.project}_ecs_service_role_policy_${var.env}"
  policy = "${data.aws_iam_policy_document.ecs_service_policy.json}"
  role   = "${aws_iam_role.ecs_service_role.id}"
}

data "aws_iam_policy_document" "ecs_service_policy" {
  statement {
    effect = "Allow"
    resources = ["*"]
    actions = [
        "iam:ListPolicies",
        "iam:GetPolicyVersion"
    ]
  }
}

data "aws_iam_policy_document" "ecs_service_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy_attachment" "ecs_service_role_policy_attachment" {
  role       = aws_iam_role.ecs_service_role.name
  policy_arn = "arn:aws:iam::aws:policy/AWSLambdaFullAccess" # https://gist.github.com/gene1wood/55b358748be3c314f956
}

######################### Role used by the container enables the service to e.g. pull the image from ECR, spin up or deregister tasks etc

resource "aws_iam_role" "ecs_task_execution_role" {
  name = "${var.project}_ecs_task_execution_role_${var.env}"
 
  assume_role_policy = <<EOF
{
 "Version": "2012-10-17",
 "Statement": [
   {
     "Action": "sts:AssumeRole",
     "Principal": {
       "Service": "ecs-tasks.amazonaws.com"
     },
     "Effect": "Allow",
     "Sid": ""
   }
 ]
}
EOF
}
 
resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_policy_attachment" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy" # https://gist.github.com/gene1wood/55b358748be3c314f956
}

######################### Role used for ECS Events

resource "aws_iam_role" "ecs_events_role" {
  name               = "${var.project}_ecs_events_role_${var.env}"
  assume_role_policy = "${data.aws_iam_policy_document.ecs_events_assume_role_policy.json}"
}

resource "aws_iam_role_policy_attachment" "ecs_events_role_policy" {
  policy_arn = "${data.aws_iam_policy.ecs_events_policy.arn}"
  role       = "${aws_iam_role.ecs_events_role.id}"
}

data "aws_iam_policy" "ecs_events_policy" {
  arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceEventsRole" # https://gist.github.com/gene1wood/55b358748be3c314f956
}

data "aws_iam_policy_document" "ecs_events_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type = "Service"
      identifiers = ["events.amazonaws.com"]
    }
  }
}
```

这里定义了三个角色：

- ecs_service_role：容器应用权限，比如 Core Service 需要给 S3 和 SNS 推送数据，就需要此角色具备相关权限。
- ecs_task_execution_role：ECS 任务执行权限，比如 ECS 需要从 ECR 拉取镜像，需要具备访问 ECR 的权限。
- ecs_events_role：CloudWatch 定时任务权限，比如定时任务需要执行 ECS 任务，需具备 `AmazonEC2ContainerServiceEventsRole` 角色的权限。

##### 敏感信息

系统总是需要依赖一些敏感信息，比如各类 api token 。Core Service 依赖 Tushare API token，所以需将其通过 Terraform 注入。在这里我参考了这篇[《A comprehensive guide to managing secrets in your Terraform code》](https://blog.gruntwork.io/a-comprehensive-guide-to-managing-secrets-in-your-terraform-code-1d586955ace1)。

文章提供了这几种管理敏感信息的方式：

- 环境变量
- 加密文件(AWS KMS)
- 密钥仓库(AWS Secrets manager)

第一种环境变量方式最简单，之后两种有一定的使用成本，因为对密钥安全要求不高，这里采用了第一种简单的方式。

先定义变量：

```json
variable "TUSHARE_API_TOKEN" {
  description = "Tushare API Token from .env"
  type        = string
}
```

然后在 ECS 定义处注入此环境变量：

```json
data "template_file" "task" {
  template = "${file("./Infrastructure/tf-fargate/tasks/task_definition.json")}"

  vars = {
    project             = "${var.project}"
    aws_region          = "${var.aws_region}"
    ecr_image_uri       = "${var.ecr_image_uri}"
    TUSHARE_API_TOKEN = "${var.TUSHARE_API_TOKEN}" # 注入变量
  }
}
```

最后在 `task_definition.json` 处将此变量注入容器：

```json
"environment": [{"name": "TUSHARE_API_TOKEN", "value": "${TUSHARE_API_TOKEN}"}]
```

每次执行变更时需要输入这个 key。这样就不会将 key 泄露至代码仓库了。

#### Make 构建脚本

```make
################ Config ########################
S3_BUCKET ?= invest-alchemy
AWS_REGION ?= us-east-1
ENV ?= dev
ECR := 745121664662.dkr.ecr.us-east-1.amazonaws.com/invest-alchemy-core-ecr-dev # ECR Repository Example: 123456789012.dkr.ecr.eu-west-1.amazonaws.com/{project_name}-ecr-{env}
################################################

################ Artifacts Bucket ##############
artifacts:
	@echo "Creation of artifacts bucket"
	@aws s3 mb s3://$(S3_BUCKET)
	@aws s3api put-bucket-encryption --bucket $(S3_BUCKET) \
		--server-side-encryption-configuration \
		'{"Rules": [{"ApplyServerSideEncryptionByDefault": {"SSEAlgorithm": "AES256"}}]}'
	@aws s3api put-bucket-versioning --bucket $(S3_BUCKET) --versioning-configuration Status=Enabled
################################################


build-docker:
	@echo "run aws ecr get-login --region $(AWS_REGION) first"
	@docker build -t $(PROJECT) .
	@docker tag $(PROJECT) $(ECR)
	@docker push $(ECR)

################ Terraform #####################

init:
	@. .env
	@terraform init \
		-backend-config="bucket=$(S3_BUCKET)" \
		-backend-config="key=$(PROJECT)/terraform.tfstate" \
		./Infrastructure/tf-fargate/

validate:
	@terraform validate ./Infrastructure/tf-fargate/

plan:
	@terraform plan \
		-var="env=$(ENV)" \
		-var="project=$(PROJECT)" \
		-var="description=$(DESCRIPTION)" \
		-var="aws_region=$(AWS_REGION)" \
		-var="artifacts_bucket=$(S3_BUCKET)" \
		./Infrastructure/tf-fargate/

apply:
	@terraform apply \
		-var="env=$(ENV)" \
		-var="project=$(PROJECT)" \
		-var="description=$(DESCRIPTION)" \
		-compact-warnings ./Infrastructure/tf-fargate/

destroy:
	@read -p "Are you sure that you want to destroy: '$(PROJECT)-$(ENV)-$(AWS_REGION)'? [yes/N]: " sure && [ $${sure:-N} = 'yes' ]
	@terraform destroy ./Infrastructure/tf-fargate/
```

先执行 `make build-docker` 构建镜像并上传至 ECR，然后执行 `make init` 初始化 Terraform。之后执行 `make validate && make plan` 验证下基础设施配置有无问题。如果都没有问题则执行 `make apply` 构建真正的基础设施。

#### 工作流

如果系统代码有改动，则可重复执行以下流程：

- 修改代码
- `make build-docker`
- `make apply`

### API Service

API Service只有一个订阅 SNS 主题的 API，用来帮助用户订阅 Core Service 提供的主题。

#### Serverless Framework

```yml
service: api
app: invest-alchemy
org: madawei2699

provider:
  name: aws
  role: arn:aws:iam::745121664662:role/invest-alchemy-lambda
  runtime: nodejs12.x
  stage: dev
  region: us-east-1

functions:
  subscribe_sns:
    handler: sns.subscribe_sns
    memorySize: 128
    description: Subscribe sns topic.
    environment:
      snsTopicArn: arn:aws:sns:us-east-1:745121664662:trade-signal-topic
    events:
      - http: 
          path: subscribe
          method: post
          cors: true
          integration: LAMBDA
```

此处定义了 subscribe_sns 的函数，我们用 Javascript 实现，源码详见 [sns.js](https://raw.githubusercontent.com/bmpi-dev/invest-alchemy/master/api/sns.js)，此处不再赘述。

需要注意的是代码内需要定义 SNS 主题，所以需要具备订阅 SNS 的角色权限，这个我们在 Serverless 配置中指定了此函数执行的 Role 为 `arn:aws:iam::745121664662:role/invest-alchemy-lambda`，该角色具备订阅 SNS 的权限，它附加的策略有 `AWSLambdaBasicExecutionRole` 和 `AmazonSNSFullAccess`。

在 Lambda 中执行的代码可以直接导入 AWS SDK 而无需安装，同时也无需设置 AWS Credentials，因为函数执行时直接具备角色附带的权限。

### Web

Web 系统提供了用户可访问的网页以供用户注册订阅邮箱。在该模块采用了 Vue.js 和 Nuxt.js 构建 SEO 友好的服务端渲染（Server-Side Rendered）网页。我主要参考这篇[《AWS | Vue Nuxt Ssr》](https://www.serverless.com/examples/aws-node-vue-nuxt-ssr)。

```yml
service: web
app: invest-alchemy
org: madawei2699

provider:
  name: aws
  runtime: nodejs12.x
  stage: ${self:custom.secrets.NODE_ENV}
  region: us-east-1
  environment: 
    NODE_ENV: ${self:custom.secrets.NODE_ENV}

functions:
  nuxt:
    handler: index.nuxt
    memorySize: 256
    events:
      - http:
          path: /
          method: any
          cors: true
      - http:
          path: /{proxy+} 
          method: any
          cors: true

plugins:
  - serverless-apigw-binary
  - serverless-domain-manager
  - serverless-offline

custom:
  secrets: ${file(secrets.json)}
  apigwBinary:
    types:
      - '*/*'
  customDomain:
    domainName: ${self:custom.secrets.DOMAIN}
    basePath: ''
    stage: ${self:custom.secrets.NODE_ENV}
    createRoute53Record: true
```

这里需要注意的是网关集成了自定义域名和 TLS 证书：需要先在 AWS Route53 配置域名，然后在 AWS Certificate Manager 申请 TLS 证书，具体过程请参考上面提到的文章。

等证书申请成功后就可以执行 `sls create_domain` 创建域名的 DNS 信息。

最后执行 `npm run deploy` 部署至 AWS 。如果想本地调试可以执行 `npm run start-server`。

### 调试/日志

在 AWS 控制台中选择 CloudWatch 服务查看日志组，通过分析相关的日志定位问题。如果没有日志生成，也可以通过查看 `CloudTrail` 中的日志查看定时任务事件是否生成。

## 需要注意的问题

### Serverless成本计算

Serverless 的一大优势是按需付费，对于一些定时任务或流量小的网站，成本比单独购买 VPS 要便宜。另外还具备了极高的可用性与弹性扩容能力，这也是单台 VPS 不可能做到的。

想分析花费可以通过 AWS Billing 服务。我们所用的收费服务（排除了一些在该系统收费可忽略的服务如 S3/VPC/CloudFront 等）包括：

- API Gateway: 每1百万次请求1美元。
- ECS Spot Fargate: 每vCPU/时为0.01289974美元，每 GB 内存/时为0.00141649美元。
- Lambda: 每128M内存/100毫秒为0.0000002083美元。
- SNS: 每10万次 Email 推送2美元。

以上都以 US East 区计算。

从 CloudWatch 日志组中得知每次运行 API 与 Web 服务的 Lambda 每个请求执行时间为 1200 ms；Core 服务每天运行3分钟计算。一个月流量假设有10万 PV，每 PV 分别产生一次 Web 与 API 请求。Lambda 的费用为：200000 * 1200 / 100 * 0.0000002083 = 0.5 美元；ECS 费用为 3 * 30 / 60 * (0.01289974 + 0.00141649) = 0.02 美元。API Gateway 费用为 200000 / 1000000 = 0.2 美元；SNS 假设有1千人订阅邮件，则为 1000 * 30 / 100000 = 0.3 美元。

则每月成本为：0.5 + 0.02 + 0.2 + 0.3 = 1.02 美元。以 `vultr VPS` 为例，最便宜的配置为 1 vCPU + 512 MB 配置一个月为2.5美元，这还不包括发邮件的成本。

### 冷启动慢

后台定时任务对启动时间不敏感，如果非常在意启动时间可通过一些定时任务不断的预热，不过这也会导致成本提高。想进一步了解可参考这篇[《Solving Serverless Cold Starts with Advanced Tooling》](https://medium.com/hackernoon/serverless-cold-starts-using-them-to-your-advantage-3dfdf9a0bc66)。

### VPC 收费坑

VPC 大部分服务不收费，除了 VPN/NAT Gateway/Endpoints(Gateway免费/Interface收费)，而 Interface 的 Endpoints 收费很贵，不需要的时候尽可能停止掉，而要想单独删除还不行，必须把相关 AWS 的服务删除掉才能停止收费。

需要注意的是，Endpoints 是按照可用区域收费的，创建一个 Endpoints 如果存在6个可用区域，那就是按6倍来计费的。

## 阅读材料

- [Serverless Stack](https://serverless-stack.com/)
- [Serverless 应用开发指南](http://serverless.ink/)
- [Serverless 好文](https://wiki.bmpi.dev/#Serverless%E5%A5%BD%E6%96%87:Serverless%E5%A5%BD%E6%96%87)

#### *References*
[^1]: https://rubygarage.org/blog/monolith-soa-microservices-serverless
[^2]: https://aws.amazon.com/serverless/
[^3]: https://serverless-stack.com/chapters/zh/what-is-serverless.html