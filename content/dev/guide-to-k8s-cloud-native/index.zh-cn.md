---
title: "K8S 云原生应用开发小记"
date: 2021-11-08
draft: false
tags: ["kubernetes", "K8S", "Cloud Native", "云原生架构"]
keywords: ""
description: "本文分享了笔者使用 K8S 云原生技术开发个人项目的踩坑经验。"
isCJKLanguage: true
og_image: "https://img.bmpi.dev/4c613ca1-0874-d09b-79ad-243cd926bfba.png"
---

> 注：本篇文章是作者与 [GitHub Copilot](https://copilot.github.com/) 结对创作完成。Copilot 大概完成了本文 5% 左右的部分。作者也在这个 [Tweet](https://twitter.com/madawei2699/status/1458313535792955393) 上部分记录了 Copilot 的创作部分。

作为一个业余独立开发者，我在开发上的投入时间和资金都不多，所以对 [项目技术栈](/dev/tech-stack-of-side-project/) 的选择有两个很基本的要求：

1. 这项技术能极大的提高我的开发效率。
2. 这项技术不需要投入过多资金。

第一点对我的影响是，我会选择使用更高效的技术栈，包括编程语言、生态与架构等：

- 我对 [Elixir](/dev/tech-stack-of-side-project/#编程语言) 的尝试，就是因为它是基于 Erlang 平台的，有着强大的并发模型与富有表达力的语言特性，还可以利用 Erlang/OTP 的生态，这可以让我更加高效的开发上线某个产品。
- 我对 [Serverless](/dev/guide-to-serverless/) 的尝试，是因为不少个人产品初始用户都很少，用传统租 VPS 的方式会浪费很多资源，而且 Serverless 的弹性扩容能力与可用性都是传统 VPS 不可比拟的，所以我会用 Serverless 开发一些小产品。
- 我对 [IaC](/dev/tech-stack-of-side-project/#devops相关) 的尝试，是因为它可以以声明的方式构建基础设施，还可以对基础设施版本做管理，这样我对基础设施的投入是一次性的，而无需每次重复手工操作配置部署环境。

第二点对我的影响是，我会避免使用庞大耗费资源的技术，转而去寻找廉价轻量级的替代技术。这也意味着我不会追求过高的 SLA，性价比是我的主要目标。选择工业级的技术栈，牺牲掉一定的可用性，一方面让我可以接受这个成本，另外一方面还能得到工业级的扩展性。这方面的体现是我对 Serverless 的成本分析上，我会选择成本可以承受的服务组件，同时选择最具性价比的计费方式。

我对 K8S 的初步印象是它并不符合我这两点的要求。这也是我一直没有在个人项目上尝试的原因。直到我看到这篇 [The Architecture Behind A One-Person Tech Startup](https://twitter.com/madawei2699/status/1381417261425065986) 的长文。

![](https://img.bmpi.dev/adfd0869-e190-4027-2d53-6e973dbf5b32.png)

作者介绍了他在个人项目上运用 K8S 的经验，K8S 虽然需耗费一定的资源，但却带来了强大的扩展性与可靠性。

## 架构演进历史

应用架构从组成形态来看，主要分为单体与分布式架构：

- 原始的分布式架构甚至比单体都要早，因为早期的计算机性能都很差，无法满足人类不断膨胀的对计算能力的需求，进而导致应用架构的演进。随着单台计算机性能的提高，而原始分布式技术又非常的复杂，所以单体架构流行了很长一段时间，直到单台计算机的性能无法满足计算人类社会爆炸增长的海量信息。

- 分布式架构能协调利用多台计算机的计算能力，提供更高的性能，更高的可用性，更高的扩展性。但由于其复杂性，分布式架构的演进又分为这几个阶段：
  - 第一阶段：[面向服务的架构（SOA）](https://icyfenix.cn/architecture/architect-history/soa.html)。面向服务的架构是一次具体地、系统性地成功解决分布式服务主要问题的架构模式。但这种架构需要应用开发人员花费大量的时间和精力学习框架本身，且这种架构模式的架构设计比较复杂，推广成本太高。
  - 第二阶段：[微服务架构](https://icyfenix.cn/architecture/architect-history/microservices.html)。微服务是一种通过多个小型服务组合来构建单个应用的架构风格，这些服务围绕业务能力而非特定的技术标准来构建。这就解决了 SOA 的复杂性问题，让业务开发人员能更专注业务开发。但微服务的问题在于业务开发人员依旧要面对这些注册发现、跟踪治理、负载均衡、传输通信等分布式架构需解决的问题。
  - 第三阶段：[云原生架构](https://icyfenix.cn/architecture/architect-history/cloud-native.html)。云原生架构是从软件层面独力应对微服务架构无法解决的问题，发展成为软、硬一体（软件定义计算、软件定义网络、软件定义存储），合力应对分布式架构的通用问题。利用容器、虚拟化技术、不可变基础设施、服务网格、声明式 API 等技术，K8S 提供了开箱即用的弹性伸缩、服务发现、配置中心、服务网关	、负载均衡、服务安全、监控告警、容错处理等功能。这些技术能够构建**容错性好**、**易于管理**和**便于观察**的**松耦合系统**，结合可靠的自动化手段，云原生技术使工程师能够轻松地对系统作出**频繁和可预测的重大变更**。

### 云原生时代

> 当虚拟化的基础设施从单个服务的容器扩展至由多个容器构成的服务集群、通信网络和存储设施时，软件与硬件的界限便已经模糊。一旦虚拟化的硬件能够跟上软件的灵活性，那些与业务无关的技术性问题便有可能从软件层面剥离，悄无声息地解决于硬件基础设施之内，让软件得以只专注业务，真正“围绕业务能力构建”团队与产品。(摘自 [凤凰架构/后微服务时代](https://icyfenix.cn/architecture/architect-history/post-microservices.html) )

### Kubernetes(K8S) 

#### 设计理念

K8S 创造了一种 DSL 的语言，用户通过这种语言**声明式**的定义了分布式系统架构中用到的**一切资源**（如计算、网络、存储、路由、密钥、证书）。当用户定义了自己期望的资源状态，K8S 就会自动帮助用户创建这些资源，并且自动管理这些资源。

> 资源在 Kubernetes 中是极为常用的术语，广义上讲，Kubernetes 系统中所有你能够接触的方方面面都被抽象成了资源，譬如表示工作负荷的资源（Pod、ReplicaSet、Service、……），表示存储的资源（Volume、PersistentVolume、Secret、……），表示策略的资源（SecurityContext、ResourceQuota、LimitRange、……），表示身份的资源（ServiceAccount、Role、ClusterRole、……），等等。“一切皆为资源”的设计是 Kubernetes 能够顺利施行声明式 API 的必要前提，Kubernetes 以资源为载体，建立了一套同时囊括了抽象元素（如策略、依赖、权限）和物理元素（如软件、硬件、网络）的领域特定语言。通过不同层级间资源的使用关系来描述上至整个集群甚至是集群联邦，下至某一块内存区域或者一小部分的处理器核心的状态，这些对资源状态的描述的集合，共同构成了一幅信息系统工作运行的全景图。(摘自 [凤凰架构/不可变基础设施](https://icyfenix.cn/immutable-infrastructure/schedule/hardware-schedule.html) )

#### 优势

- 能够构建容错性好、便于观察的应用
- 能够以统一的方式管理应用
- 让应用具备弹性扩容的能力
- 一键应用安装部署（Helm）

#### 劣势

- 资源成本高。不论 K8S 的 Master 或者 Worker 节点都需耗费一定的计算资源。
- 学习成本高。K8S 重新定义了很多抽象的技术概念，使用门槛不低。

### 云平台托管 K8S 成本分析

我对不同云平台的 Kubernetes 托管方案选择主要是基于成本方面的考虑。这篇 [K8S Cluster Cost Compare](https://github.com/bmpi-dev/bmpi-tech-starter/blob/main/infra/k8s-cost.md) 文档提供了不同云平台（AWS/Azure/GCP/DigitalOcean/Vultr）的 Kubernetes 托管方案的成本比较。

我最终选择了最便宜的 DigitalOcean 云平台，Master 控制平面基础版（对 SLA 没有高的要求就可以用）是免费的，Worker 节点是新加坡区域的 2 核 4GB 内存的机器（$20/月），还有一个 $10/月 的 Load Balancer 费用。一个月总成本是 $30/月。

由于 Worker 节点需要安装一些 K8S 本身的服务如 kube-proxy、core-dns 等共计 12 个 pod，占用 Worker 节点一半的内存。这样供应用调用的资源还剩 2GB。

## 应用开发部署与架构

![](https://img.bmpi.dev/4c613ca1-0874-d09b-79ad-243cd926bfba.png)

以上图展示了这个云原生应用的开发部署流程以及 K8S 部署的各内部服务的架构：

- 开发部署流程。代码推送到 GitHub 后会触发两个动作：
  - Vercel 会检测前端代码的变化，如果有变化就自动部署到 Vercel 的 CDN 上。
  - GitHub Actions 会检测后端代码的变化，如果有变化就自动构建镜像并发布至 GitHub Packages 里，然后自动创建一个新的 K8S Deployment，并重新部署后端服务。
- 请求流处理流程。当一个用户访问网站时，DNS 经 Cloudflare 解析后，浏览器会发送两个请求至：
  - Vercel 端：浏览器拉取静态页面资源。
  - K8S 端：请求经 K8S 的 Load Balance 解析 Ingress 规则后转发至 default Namespace 的 ExternalName 类型的 Service，之后经其转发至后端服务 （Namespace 为 free4chat） 的 Service，经 Service 最终转发至其中某个 Pod 的 Container。Container 中就是我们的后端业务应用。

## 实现

最终效果见：[线上版本](https://www.free4.chat/)。

源码见：[代码仓库](https://github.com/madawei2699/free4chat)。

### 前置条件

#### 前置知识

如果你对 K8S 不了解，可以先看这个高质量的入门视频：[Kubernetes Tutorial for Beginners [FULL COURSE in 4 Hours]](https://youtu.be/X48VuDVv0do)。在实际操作之前，确保自己能理解基本的 K8S 概念：Namespace、Deployment、Service、Pod、Node、Ingress。

#### 前置资源

你需要先注册以下账号：

- [DigitalOcean](https://www.digitalocean.com/)
- [Cloudflare](https://www.cloudflare.com/)
- 一个域名。

并安装这些软件：

- kubectl
- doctl
- helm

### 工程目录结构

```bash
.
├── .github
│   └── workflows
|       └── workflow.yml
├── Makefile
├── backend
├── frontend
└── infra
    ├── Dockerfile.backend
    ├── k8s
    │   ├── free4chat-svc.yaml
    │   ├── ingress-free4-chat.yaml
    │   ├── ingress_nginx_svc.yaml
    │   └── production_issuer.yaml
    └── tools
        └── nsenter-node.sh
```

整体项目分为 frontend、backend 与 infra 部分，本文主要聚集于 infra 部分，也就是 K8S 的部署。infra 部分没有使用 IaC，因为 K8S 本身就是声明式的构建文件，如果不使用一些云托管服务的话，没必要增加复杂度去使用 IaC。CI/CD 部分使用 GitHub Actions 完成的。

### Dockerfile

后端服务是个 Golang 应用，打包的 [Dockerfile](https://github.com/madawei2699/free4chat/blob/main/infra/Dockerfile.backend) 在此。我还做了一个 [Makefile](https://github.com/madawei2699/free4chat/blob/main/backend/Makefile) 的简单配置，用于编译后端服务。本地使用 Docker 部署后端服务可以使用这个 [Makefile](https://github.com/madawei2699/free4chat/blob/main/Makefile)。

### 配置 K8S

#### 创建 K8S Cluster

在 DigitalOcean 创建 K8S Cluster 是一件非常简单的事情，你只需要选择好区域（取决于你的业务用户所在区域）与 Worker Node 的规格（取决于你的成本预算）就可以创建出一个 Cluster。

#### 连接 K8S Cluster

使用 doctl 配置 K8S：

```bash
doctl kubernetes cluster kubeconfig save use_your_cluster_name
```

#### Namespace

Namespace 是 K8S 用来在单个集群中隔离资源组的机制。比如我们可以在同一个集群创建不同的业务 Namespace，而这个 Namespace 下存放着和这个业务相关的 Pod、Service、Deployment 等资源，如果要删除这个业务相关的资源，只需要删除这个 Namespace 即可。

K8S 默认有个 kube-system 的 Namespace，这个 Namespace 下存放着和 K8S 相关的资源。还有一个 default 的 Namespace，这个 Namespace 存放默认（不带 Namespace）被创建的资源。

#### Backend Service

先创建一个后端服务的 Namespace：

```bash
kubectl create namespace free4chat
```

再创建一个后端 Service 模版 [free4chat-svc.yaml](https://github.com/madawei2699/free4chat/blob/main/infra/k8s/free4chat-svc.yaml)：

```yaml
apiVersion: v1
kind: Service
metadata:
  name: apifree4chat
spec:
  ports:
  - port: 80
    targetPort: 8888
  selector:
    app: apifree4chat
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: apifree4chat
spec:
  selector:
    matchLabels:
      app: apifree4chat
  replicas: 1
  template:
    metadata:
      labels:
        app: apifree4chat
    spec:
      containers:
      - name: echo
        image: <IMAGE>
        resources:
          requests:
            memory: "128Mi"
            cpu: "250m"
          limits:
            memory: "500Mi"
            cpu: "1000m"
        ports:
        - containerPort: 8888
```

之所以说这是模版，因为在 image 这块放了一个 `<IMAGE>` 的占位符，这个占位符会在后面的 GitHub Actions 部署时被替换成真正的镜像。

这个模版定义了一个 Deployment 和 Service 资源。Deployment 定义了 Pod 实例的 CPU 和内存限制、实例数、端口映射和容器镜像等资源。Service 定义了 Cluster 内部访问后端服务的域名和端口。

最终 GitHub Actions 会将这个 Service 和 Deployment 部署到 K8S Cluster 中的`free4chat`的 Namespace 中。

#### Ingress Controller

有了后端服务的 Service，如何让外部流量进入后端服务？这是 K8S Ingress 做的事情。我们首选要安装 Ingress Controller，它有很多类型，如 HAProxy、Nginx、Traefik 等，我们这里选择 Nginx。在 DigitalOcean K8S 管理界面上找到 [Nginx Ingress Controller](https://marketplace.digitalocean.com/apps/nginx-ingress-controller)，然后点击安装即可。

这样会自动创建一个 ingress-nginx 的 Namespace，并且会创建一个 DigitalOcean Load Balance 的服务，这个服务费用是 $10/月，有独立的 IP 地址（可在 DigitalOcean 管理界面查看）。之后我们在 DNS 配置的时候会用到这个 IP。

现在我们需要在 default Namespace 下创建一个 ingress 规则，将 LoadBalance 的流量转发至后端服务，这个配置文件是 [ingress-free4-chat.yaml](https://github.com/madawei2699/free4chat/blob/main/infra/k8s/ingress-free4-chat.yaml)：

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: api-free4chat-ingress
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod # 这个是 cert-manager 的 ClusterIssuer，用于自动生成 SSL 证书
spec:
  tls:
  - hosts:
    - api.k.free4.chat
    secretName: api-free4chat-tls
  rules:
  - host: api.k.free4.chat # 后端服务域名
    http:
      paths:
      - pathType: Prefix
        path: "/"
        backend:
          service:
            name: apifree4chat
            port:
              number: 80
---
kind: Service
apiVersion: v1
metadata:
  name: apifree4chat
spec:
  type: ExternalName # 因为后端服务不在 default Namespace 中，需要通过 ExternalName 这个 Service 来转发至 apifree4chat Namespace 中的后端服务
  externalName: apifree4chat.free4chat.svc.cluster.local # 跨 Namespace 的后端服务域名
```

这个配置文件会生成两个资源，一个是 ingress 规则，一个是 ExternalName 类型的 Service。我们会在配置好 cert-manager 的 ClusterIssuer 后，使用 kubectl 来创建这个资源。

#### Cert Manager(HTTPS)

在 K8S 中通过 Cert Manager 来自动生成和更新域名的 SSL 证书，在这里面我们使用 Let's Encrypt 服务来为我们颁发证书。

先通过 Helm 一键安装 Cert Manager 应用：

```bash
kubectl create namespace cert-manager
helm repo add jetstack https://charts.jetstack.io
helm repo update
helm install cert-manager jetstack/cert-manager --namespace cert-manager --version v1.2.0 --set installCRDs=true
```

执行完这些命令后需要创建一个为生产环境颁发 SSL 证书的 ClusterIssuer 资源，配置文件是 [production_issuer.yaml](https://github.com/madawei2699/free4chat/blob/main/infra/k8s/production_issuer.yaml)：

```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    # Email address used for ACME registration
    email: your@email.com
    server: https://acme-v02.api.letsencrypt.org/directory
    privateKeySecretRef:
      # Name of a secret used to store the ACME account private key
      name: letsencrypt-prod-private-key
    # Add a single challenge solver, HTTP01 using nginx
    solvers:
    - http01:
        ingress:
          class: nginx
```

在 DigitalOcean 中，为了让 Cert Manager 能够自检，必须通过 Nginx Ingress Controller 启用 Pod-Pod 通信，这样 Cert Manager 才能正常工作为 K8S 办法证书，创建一个 Service 资源，配置文件是 [ingress_nginx_svc.yaml](https://github.com/madawei2699/free4chat/blob/main/infra/k8s/ingress_nginx_svc.yaml)：

```yaml
apiVersion: v1
kind: Service
metadata:
  annotations:
    service.beta.kubernetes.io/do-loadbalancer-enable-proxy-protocol: 'true'
    service.beta.kubernetes.io/do-loadbalancer-hostname: "k.free4.chat"
  labels:
    helm.sh/chart: ingress-nginx-2.11.1
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/instance: ingress-nginx
    app.kubernetes.io/version: 0.34.1
    app.kubernetes.io/managed-by: Helm
    app.kubernetes.io/component: controller
  name: ingress-nginx-controller
  namespace: ingress-nginx
spec:
  type: LoadBalancer
  externalTrafficPolicy: Local
  ports:
    - name: http
      port: 80
      protocol: TCP
      targetPort: http
    - name: https
      port: 443
      protocol: TCP
      targetPort: https
  selector:
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/instance: ingress-nginx
    app.kubernetes.io/component: controller
```

### 创建资源

经过以上步骤我们有了一些声明式的 K8S 资源创建配置文件了，现在是时候真正开始创建这些资源了：

```bash
kubectl apply -f production_issuer.yaml # 创建颁发 SSL 证书的 ClusterIssuer 资源
kubectl apply -f ingress_nginx_svc.yaml # 创建解决 Pod-Pod 通信的 Service 资源
kubectl apply -f ingress-free4-chat.yaml # 创建 ingress 规则资源
```

当执行完这些命令后，所有环节里我们还缺少：

- 后端服务资源的创建。这个我们会通过 GitHub Actions 来创建。
- DNS 域名配置。这个我们会在 Cloudflare 上配置。

#### DNS 配置

在 Cloudflare 上配置 DNS 解析：

![](https://img.bmpi.dev/a55880f1-8f45-71d5-a682-65588d0eb4b1.png)

由于我们前端部署在 Vercel 上，后端在 K8S 上，所以这里采用了给后端 K8S 创建一个 *.k 的 A 类记录，映射的 IP 就是 Digital LoadBalance 的 IP。而给主域名的 A 记录映射到 Vercel。这么做的原因是我们没法同时给一个主域名创建两个不同的 IP 记录，所以只能给后端子域名的方式来解决这个问题。

最后创建两个 CNAME 记录，分别是：

- api -> `api.k.free4.chat`：我们的后端服务 API 域名。
- www -> `www.free4.chat`：我们的主域名。

到了这一步我们就可以访问 `https://www.free4.chat` 了。但 `https://api.k.free4.chat` 还不行，因为后端服务并没有创建完成。所以接下来需要通过 GitHub Actions 来创建后端服务。

### GitHub Workflow

通过 GitHub Actions 来创建后端服务的好处是让开发部署自动化，当后端代码产生变化时，会自动触发 GitHub Actions 来构建新的镜像并创建新的后端服务。

要创建一个 GitHub Workflow，只需要创建 [.github/workflows/workflow.yaml](https://github.com/madawei2699/free4chat/blob/main/.github/workflows/workflow.yml)：

```yaml
name: DO_K8S_Deploy

on:
  push:
    branches:
      - main
    paths:
      - 'backend/src/**'
      - 'infra/Dockerfile.backend'
      - '.github/workflows/**'

# A workflow run is made up of one or more jobs that can run sequentially or in parallel.
jobs:
  # This workflow contains a single job called "build".
  build:
    # The type of runner that the job will run on.
    runs-on: ubuntu-latest
    
    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:

    # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it.
    - name: Checkout master
      uses: actions/checkout@main

    # Install doctl.
    - name: Install doctl
      uses: digitalocean/action-doctl@v2
      with:
        token: ${{ secrets.DIGITALOCEAN_ACCESS_TOKEN }}
    
    # Build a Docker image of your application in your registry and tag the image with the $GITHUB_SHA.
    - name: Build container image
      run: docker build -t ghcr.io/madawei2699/apifree4chat:$(echo $GITHUB_SHA | head -c7) -f ./infra/Dockerfile.backend .

    - name: Log in to GitHub Packages
      run: echo "${{ secrets.GITHUB_TOKEN }}" | docker login ghcr.io -u ${{ github.actor }} --password-stdin

    - name: Push image to GitHub Packages
      run: docker push ghcr.io/madawei2699/apifree4chat:$(echo $GITHUB_SHA | head -c7)

    - name: Update deployment file
      run: TAG=$(echo $GITHUB_SHA | head -c7) && sed -i 's|<IMAGE>|ghcr.io/madawei2699/apifree4chat:'${TAG}'|' $GITHUB_WORKSPACE/infra/k8s/free4chat-svc.yaml

    - name: Save DigitalOcean kubeconfig with short-lived credentials
      run: doctl kubernetes cluster kubeconfig save --expiry-seconds 600 ${{ secrets.CLUSTER_NAME }}

    - name: Deploy to DigitalOcean Kubernetes
      run: kubectl apply -f $GITHUB_WORKSPACE/infra/k8s/free4chat-svc.yaml -n free4chat

    - name: Verify deployment
      run: kubectl rollout status deployment/apifree4chat -n free4chat
```

这里唯一要做的就是提前给这个 repo 的 Actions secrets 里创建 `CLUSTER_NAME` 与 `DIGITALOCEAN_ACCESS_TOKEN` 的环境变量供 GitHub Actions 使用。其中 `DIGITALOCEAN_ACCESS_TOKEN` 就是 DigitalOcean 的 API Token，而 `CLUSTER_NAME` 就是我们的 DigitalOcean 上的 Kubernetes Cluster 的名字。

这样每当代码有更新被推送到 GitHub 时，一个新的服务（包括前后端）会自动构建并发布到 Vercel 和 K8S 上。

这时候我们的应用就上线了！

### 还需要做的事情

- 日志：传统的 ELK 需要大量的服务器资源，不适合我们这种轻量级的集群。最简单的就是跑到多个 Pod 里看日志，这方面有个 [stern](https://github.com/wercker/stern) 的工具可以帮助我们在多个 Pod 间进行日志查询。
- 监控与告警：我们可以通过安装 Prometheus 和 Grafana 的方式来监控我们的服务，并且可以通过 Prometheus 的 Alert Manager 来发送告警。但如果整个集群都挂了，那安装到集群里的监控告警服务也不会有效果，所以最佳的实践是使用外部的监控告警服务。这方面可以使用 [New Relic](https://newrelic.com/) 或类似的服务来实现。
- 错误追踪：集成 [Sentry](https://sentry.io/welcome/) 就可以实现后端服务错误追踪。

## 总结

到这里我们已经从零开始（没有包括 K8S Master 控制平面）构建了一个 K8S 集群。让我们思考一个问题，那就是 K8S 到底帮助我们解决了什么问题？

让我们先思考下现代软件开发经常要考虑的 [12要素](https://12factor.net/) ：

![](https://img.bmpi.dev/f8b5fad5-5d4c-5263-8b1e-7d2110a667f8.png)

以上的这些要素，K8S 都直接或间接给出了它的解决方案，而 K8S 也和围绕它的生态让工程师能以低成本去构建出满足这些软件设计要素的健壮软件。

我想这也是 K8S 能号称云上操作系统的原因吧。

## 参考资料

- [Modern Web Hosting for Personal Projects - Mike Cartmell's blog](https://mike.sg/2021/08/29/modern-web-hosting-for-personal-projects/)
- [Architecting Applications for Kubernetes | DigitalOcean](https://www.digitalocean.com/community/tutorials/architecting-applications-for-kubernetes)
- [Kubernetes: The Surprisingly Affordable Platform for Personal Projects | doxsey.net](https://www.doxsey.net/blog/kubernetes--the-surprisingly-affordable-platform-for-personal-projects/)
- [Save Money and Skip the Kubernetes Load Balancer: Lowering Infrastructure Costs with Ingress Controllers, DNS, and Host Ports|downey.io](https://downey.io/blog/skip-kubernetes-loadbalancer-with-hostport-daemonset/)
- [DigitalOcean Kubernetes Without a Load Balancer - Mike Cartmell's blog](https://mike.sg/2021/08/31/digitalocean-kubernetes-without-a-load-balancer/)

