---
title: "分布式系统下的认证与授权"
date: 2021-12-18
draft: false
tags: ["认证", "授权", "凭证", "分布式系统", "JWT"]
keywords: ""
description: "本文从高层次梳理在不同架构演进中认证、授权及凭证这些和架构安全相关的技术的发展过程。"
isCJKLanguage: true
og_image: "https://img.bmpi.dev/0f3dfb95-7f80-2311-74f1-f70ea7fd9a69.png"
categories: [
    "分布式技术"
]
aliases: [
    "/dev/authentication-and-authorization-in-a-distributed-system/"
]
markmap:
  enabled: true
  id: "authentication-and-authorization-in-a-distributed-system"
---

在软件系统设计中，如何让应用能够在各种环境中安全高效的访问是个复杂的问题，这个问题的背后是一系列软件设计时需要考虑的架构安全问题：<sup>[架构安全性 | 凤凰架构](https://icyfenix.cn/architect-perspective/general-architecture/system-security/)</sup>

- 认证：系统如何识别合法用户，也就是解决 **你是谁** 的问题；
- 授权：系统在识别合法用户后，还需要解决 **你能做什么** 的问题；
- 凭证：系统如何保证它与用户之间的承诺是双方真实意图的体现，是准确、完整且不可抵赖的；
- 保密：如何安全的持久化用户的账户信息，确保不会被任何人窃取与滥用；
- 传输：在复杂的用户环境中，如何安全的传递用户信息，保证不被第三方窃听、篡改和冒充。

在漫长的架构演进历史中，业界对这些问题已经有很成熟的解决方案。在架构安全这块，最好的是遵循技术标准与最佳实践，尽可能**不重复造轮子或“创新”**。下面这个思维导图就是针对这些问题的常见的技术标准及方案：

<!-- ![](https://img.bmpi.dev/0f3dfb95-7f80-2311-74f1-f70ea7fd9a69.png) -->

```markmap
# 架构安全
## 认证
### 方式
#### 通信信道上的认证
##### SSL/TLS
- 加密算法
- 生成密钥
- 公钥分发
- CA 认证
- 核验公钥
- 签名
- 验证
#### 通信协议上的认证
##### HTTP
- RFC 7235
   - HTTP Basic
- RFC 7616
   - Digest
- RFC 6750
   - Bearer
- RFC 7486
   - HOBA
- RFC 6287
   - OCRA(质疑/应答算法)
- 扩展方案
   - AWS4-HMAC-SHA256
   - Windows Live ID
   - Twitter Basic
#### 通信内容上的认证
##### Web认证
- 表单认证
- RFC 6238
   - TOTP(基于时间的一次性密码算法)
- WebAuthn
### SSO
- Kerberos-based
- CAS
- SAML
- OIDC
## 授权
### 访问控制
- ACL
- RBAC
- ABAC
### OAuth2
- 授权码模式
- 隐式授权模式
- 密码模式
- 客户端模式
## 凭证
### 自包含令牌
- JWT
### 引用令牌
- Cookie-Session
## 实现
### Java
- JAAS
- Shiro
- Spring Security
```

在研究分布式系统的认证和授权问题前，让我们回到单体架构的时代，看看在单体架构上这些问题是如何被解决的。

## 单体系统

![](https://img.bmpi.dev/6a49ae32-998b-f030-b9a2-f77c3ac66c84.png)

### 认证

认证主要解决 **你是谁** 的问题，从方式上来看有以下三种：<sup>[认证 | 凤凰架构](https://icyfenix.cn/architect-perspective/general-architecture/system-security/authentication.html)</sup>

- 基于通信信道：建立通信信道之前需要证明 **你是谁**。在网络传输（Network）场景中的典型是基于 SSL/TLS 传输安全层的认证。
- 基于通信协议：在获取资源之前需要证明 **你是谁**。在互联网（Internet）场景中的典型是基于 HTTP 协议的认证。
- 基于通信内容：在提供服务之前需要证明 **你是谁**。在万维网（World Wide Web）场景中的典型是基于 Web 内容的认证。

在单体系统时代，认证方式一般是在通信信道上开启 HTTPS，在通信协议上利用 [HTTP Basic](https://datatracker.ietf.org/doc/html/rfc7235#section-4.2)/[Digest](https://datatracker.ietf.org/doc/html/rfc7616)/[Bearer](https://datatracker.ietf.org/doc/html/rfc6750)/[HOBA](https://datatracker.ietf.org/doc/html/rfc7486)/[OCRA](https://datatracker.ietf.org/doc/html/rfc6287) 等方式并在通信内容上结合表单或 [TOTP](https://datatracker.ietf.org/doc/html/rfc6238) 等的认证组合方式。这样可以从通信的不同阶段获得相应的安全保证。

如果想对基于 HTTP 协议的认证方式做进一步的了解，可以参考这两篇文章：

1. [认证 | 凤凰架构](https://icyfenix.cn/architect-perspective/general-architecture/system-security/authentication.html)
2. [细说API - 认证、授权和凭证 - Thoughtworks洞见](https://insights.thoughtworks.cn/api-2/)

#### 单点登录（[SSO](https://en.wikipedia.org/wiki/Single_sign-on)）

认证的一个常见应用场景是单点登录。单点登录主要解决了一个一次登录访问多个独立应用的问题。在单点登录方案出现之前，每个应用都需要独立登录维持各自的会话。相关的技术方案已经很成熟，主要有以下：

- [Kerberos-based](https://datatracker.ietf.org/doc/html/rfc4120)：MIT 设计的 SSO 协议，基于对称密码学，并需要一个值得信赖的第三方。其广泛用于操作系统认证，如被 Windows 2000 和后续的操作系统作为默认的认证方法。
- [CAS](https://www.apereo.org/projects/cas)：Yale 设计的 SSO 协议，基于浏览器的 SSO 方案，部署简单，适用于简单的应用场景。
- [SAML](https://en.wikipedia.org/wiki/Security_Assertion_Markup_Language)：基于 XML 标记语言的认证断言方案，适用的场景众多，但技术较复杂。
- [OIDC](https://openid.net/connect/)：在 OAuth2 的基础上额外加一个 JWT 来传递用户信息。功能全面强大，是目前很流行的 SSO 方案。

### 授权

授权主要解决 **你能做什么** 的问题，从方案上来说有以下几种：

- [ACL](https://en.wikipedia.org/wiki/Access-control_list)：访问控制列表（Access-control list）广泛用于操作系统内部的文件系统、网络及进程权限控制方面。如在 Linux 中，可通过 `getfacl` 获取目录的默认 ACL 设置。
- [RBAC](https://en.wikipedia.org/wiki/Role-based_access_control)：RBAC 通过将权限属性从 ACL 方案中的单个用户抽取成更为抽象的角色（Role），通过给角色一组权限属性，再将多个角色赋予某个用户，实现了比 ACL 更为灵活强大的权限控制方案。实际上大部分系统的授权方案采用 RBAC 就足够了。但 RBAC 在面临复杂的权限控制需求时可能面临角色爆炸的问题，这时可以考虑采用更细粒度的 ABAC 方案。
- [ABAC](https://en.wikipedia.org/wiki/Attribute-based_access_control)：ABAC 是比 RBAC 更细粒度的权限控制方案。通过引入一组称为“属性“的特征，包括用户属性、环境属性和资源属性。例如，ABAC 可以对用户的访问做进一步的控制，如只允许在特定的时间或与相关员工相关的某些分支机构进行访问员工信息的操作，而不是让某部门的人员总是能够访问员工信息。但 ABAC 的问题在于初始设置需要定义大量的属性，工作量比 RBAC 要大。
- [OAuth2](https://datatracker.ietf.org/doc/html/rfc6749)：OAuth2 是为了解决应用系统给第三方系统授权的问题而设计的授权框架。传统的客户端服务器交互模式中，客户端持有资源访问凭证（如用户名密码），服务端验证成功后放行。而在给第三方系统提供资源时，如果给第三方系统资源凭证，可能会带来未知的安全问题，比如凭证泄漏，凭证回收等问题。如果应用系统需面向第三方系统提供服务，那需要使用此方案。同时因为 OAuth2 做授权的时候一般需要用户登录，也能实现单点登录的功能。

如果想对授权做进一步的了解，可以参考这篇文章：

1. [授权 | 凤凰架构](https://icyfenix.cn/architect-perspective/general-architecture/system-security/authorization.html)

### 凭证

凭证是为了解决在认证授权后如何承载认证授权信息的问题。在单体应用时代，主流的解决方案是基于 HTTP 协议的 Cookie-Session 机制为代表的服务端状态存储技术。

由于 HTTP 协议本身是无状态的，要维持一个会话（Session），而不是每次访问都重新认证授权，需要客户端也就是浏览器通过 Cookie 来存储服务器端返回的一个凭证信息，这个凭证信息一般是一串随机的字符串，用来代表用户此次的会话标识。每次请求浏览器都会在 HTTP Header 中携带这个 Cookie 信息，应用拿到这个会话标识后从内存或缓存（Cache）中查询出用户的信息，这样就定位到了具体的用户，实现了会话的维持。

这套古老的方案存在以下先天优势：<sup>[凭证 | 凤凰架构](https://icyfenix.cn/architect-perspective/general-architecture/system-security/credentials.html)</sup>

- 状态信息都存储于服务器，只要依靠客户端的 [同源策略](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy) 和 HTTPS 的传输层安全，保证 Cookie 中的键值不被窃取而出现被冒认身份的情况，就能完全规避掉上下文信息在传输过程中被泄漏和篡改的风险（但 Cookie 方案容易受到 [CSRF](https://owasp.org/www-community/attacks/csrf) 攻击，这种可通过 [CSRF Token](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#token-based-mitigation) 技术防御）；
- 另一大优点是服务端有主动的状态管理能力，可根据自己的意愿随时修改、清除任意上下文信息，譬如很轻易就能实现强制某用户下线的这样功能；
- 服务端也很容易实现如统计用户在线这类功能；

一切都很美好，直到我们来到了分布式系统时代。

## 分布式系统

分布式系统与单体系统的一大区别就是状态管理。分布式系统通过把单体系统中有状态的部分转移到中间件中去管理，从而很容易做到水平扩容，提高系统峰值处理能力。在架构认证和授权部分，分布式和单体并没有什么不同，唯独有变化的在持有状态的凭证部分。

我们知道单体应用在服务端管理用户会话信息，客户端只持有会话标识。如果服务端要将此用户会话状态转移出去有两种处理思路：

- 将用户会话信息继续托管至服务端。此时有几种服务端方案可以选择：
  - 中心化存储：转移到中间件如 Redis 中去。利用 Redis [极高的并发处理能力](https://redis.io/topics/benchmarks)，也可以做到弹性横行扩容。不过可能会带来中间件高可用性维护难的问题，通过租赁云服务商的托管中间件是降低中间件 [单点故障（SPOF）](https://en.wikipedia.org/wiki/Single_point_of_failure) 的一种方式；
  - 会话复制（Session replication）：让各个节点之间采用复制式的 Session，每一个节点中的 Session 变动都会发送到组播地址的其他服务器上，这样某个节点崩溃了，不会中断该节点用户的服务。但 Session 之间组播复制的同步代价高昂，节点越多时，同步成本越高。
  - 会话粘滞（Sticky session）：通过负载均衡算法如 Nginx 的 [IP Hash](https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/) 算法将来自同一 IP 的请求转发至同一服务。每个服务节点都不重复地保存着一部分用户的状态，如果这个服务崩溃了，里面的用户状态便完全丢失。
  > 为什么在分布式系统中共享状态就这么困难？这是因为分布式系统中有一个不可能三角的理论：[CAP](https://en.wikipedia.org/wiki/CAP_theorem)。这个理论简单的理解就是因为在分布式系统中，因为网络无法做到绝对的可靠（分区容错性：**P**artition Tolerance），只能在一致性（**C**onsistency）和可用性（**A**vailability）间选择一个。
  >
  > 比如上述的三种服务端方案其实都是牺牲了 CAP 的某个方面。比如第一种中心化存储方案我们放弃了中心化存储的分区容错性，一旦其网络分区，整个集群都会不可用。第二种会话复制方案我们牺牲了可用性，当节点在同步会话数据时，整个服务会短暂的不可用。第三种会话粘滞方案我们牺牲了一致性，一旦某个节点宕机，整个集群的数据会因该节点的数据丢失而达到不一致的状态。
- 将状态从服务端转移到客户端。Cookie-Session 是一种引用令牌（Reference tokens），也就是客户端持有的是服务端存储的会话引用标识。还有一种自包含令牌（Self-contained tokens），如 [JWT](https://datatracker.ietf.org/doc/html/rfc7519.html) 就是这种客户端保存会话信息的技术，服务端只是去校验会话信息是否合法。

### JWT

如果你对 JWT 不了解，可以先看这两篇：

1. [JWT | 凤凰架构](https://icyfenix.cn/architect-perspective/general-architecture/system-security/credentials.html#jwt)
2. [The Hard Parts of JWT Security Nobody Talks About](https://www.pingidentity.com/en/company/blog/posts/2019/jwt-security-nobody-talks-about.html)

由于 JWT 的 Payload 并未做过多限制，所以很容易产生滥用的问题，并且带来很多误解。 比如下面的一些问题：

- 误把 JWT 当作 Cookie-Session 使用（把 JWT 当作引用令牌使用），会带来未知的隐患。遵循不重复造轮子和“创新”的指导原则，尽可能不要这么做；
- 认为 JWT 更安全。虽然 JWT 采用了一定的加密算法签名，使其具备了抗篡改的能力。但其 Payload 大部分都只是采用 `base64UrlEncode` 编码，数据并不是加密的。攻击者可以通过 [会话劫持（Session hijacking）](https://owasp.org/www-community/attacks/Session_hijacking_attack) 技术拿到 JWT 会话信息，之后通过 [会话重放攻击（Session Replay Attack）](https://campus.barracuda.com/product/webapplicationfirewall/doc/49058327/session-replay-attack/) 获取用户资源，所以最佳实践是通过启用 TLS/SSL 来加密通信信道。
- 把 JWT 存储到浏览器的 Local Storage 中。此方式很容易受到 [XSS](https://owasp.org/www-community/attacks/xss/) 攻击导致 JWT 泄漏。可通过服务端启用 [内容安全策略（CSP）](https://developers.google.com/web/fundamentals/security/csp/) 来防御这种攻击。
- 采用对称加密方式签名（Signature）。对称加密密钥一旦泄漏，会让整个服务的基础设施遭受安全威胁。JWT 支持非对称加密算法，只有签名的服务需要私钥，其他验证 JWT 信息的服务只需要使用公钥即可。
- 不校验 JWT 的签名算法。这篇 [Critical vulnerabilities in JSON Web Token libraries](https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/) 文章提到 JWT 的一种漏洞，通过 `none` 算法规避令牌验证。所以最好每次都验证 JWT header 中的签名算法是否是期望的。

相信看了上述的一些问题，你对 JWT 的<span class="heti-em">简单</span>、<span class="heti-em">安全</span>有了新的理解。这还没完，JWT 还有以下一些 Cookie-Session 没有的问题：

- 令牌难以主动失效：JWT 中虽然有 `exp`、`nbf` 与 `iat` 这些和时间相关的属性，但很难在令牌到期之前让令牌失效，比如很难在用户退出登录时立刻让签发的令牌全部失效。虽然可能通过一些“黑名单”的技术解决这个问题，不过相比 Cookie-Session 来说，引入了一定的复杂性；
- 令牌数据老旧：很难把签发的令牌全部更新成最新的数据。比如把用户的权限信息（Role）放在 JWT Payload 中，当用户的角色发生变化时，很难把之前签发的令牌信息更新成最新的数据；
- 令牌存储：存储在客户端意味着有多种选择：Cookie？Local Storage？如果放在 Cookie 中，为了安全，一般会给 Cookie 设置 `http-only` 和 `secure` 的属性。但这也会带来一定的不便性，比如客户端要读取 JWT Payload 的内容只能借助服务端 API 接口。如果将 JWT 存储至浏览器 Local Storage，虽然方便了客户端读取，但可能会带来 XSS 攻击的威胁，又需要去设置 CSP 来防御这种威胁；
- 令牌大小：JWT 相比 Cookie-Session 还是大不少，尤其是要在 Payload 中存储一些额外的权限信息。一般服务端都有对 HTTP Header 的大小限制；
- 网络开销：更大的文本意味着更高的网络开销，进一步会需要更复杂的基础设施，也会产生复杂的运维问题等；
- 难以统计：服务端无状态意味着很难做诸如统计用户在线数量的功能；

JWT 解决了 Cookie-Session 方案在分布式系统中因 CAP 的限制而带来的问题，但同时也带来了一些新的问题。所以并不能说 JWT 就是 Cookie-Session 在分布式系统中的完美替代。

那么 JWT 的最佳使用场景到底是什么？这篇 [Stop using JWT for sessions](http://cryto.net/~joepie91/blog/2016/06/13/stop-using-jwt-for-sessions/) 给出了以下的结论：**JWT 更适合作分布式系统中的一次性令牌使用**。分布式系统继续使用 Cookie-Session 做会话管理，但可以在认证鉴权后生成 JWT 做分布式系统内部服务调用间的一次性令牌。

让我们通过一个例子来理解下在分布式系统下的认证授权场景。

### 一个例子

![](https://img.bmpi.dev/9c440a22-887c-c05c-e381-fd84f6071858.png)

> 1. 此处 Auth 服务承担的是授权（Authorization）的职责，而不是认证（Authentication）的职责；
> 2. OAuth2 在协议中是做授权框架的，但是其一般需要登录授权，也能实现 SSO 的功能。

1. 用户通过 HTTPS 访问我们的应用。当请求发送至微服务网关层（Gateway），网关检测 HTTP Header 中的 Cookie 发现没有 `SESSIONID` 这个键值对，重定向至 SSO 登录页面。
2. 用户通过 SSO 登录我们的应用。
   1. 用户信息存放至 AD/LDAP 等系统中。管理员提前给用户配置好角色权限。
   2. SSO 集成方案我们选择 OIDC。OIDC 集成了 AD/LDAP，当用户提供正确的用户名和密码后，SSO 重定向至网关。
   3. 网关生成了 `SESSIONID` 键值对并通过 HTTP `Set-Cookie` 响应给用户浏览器设置了此 Cookie。
3. 浏览器重新发起带 `SESSIONID` Cookie 的请求。网关经过查询其缓存或中间件（如将会话信息存放至 Redis）中的 Session 信息确认了用户的身份信息。之后网关请求 Auth 服务利用其私钥签名生成 JWT 凭证，JWT Payload 中可以存放一部分用户信息和角色信息，这些信息可以从中间件中或 AD/LDAP 中查询出。
4. 网关之后将此 JWT 凭证通过反向代理转发至内部的 BFF 服务，之后请求到达内部的领域微服务。
5. 各领域微服务接受到请求后，先从 HTTP Header 中拿出 JWT 凭证。
   1. 在执行真正的业务逻辑前，先利用之前定时从 Auth 服务中同步获取的公钥。
      1. Auth 服务通过一个类似 `https://<your_domain>/.well-known/jwks.json` 的 API 提供 JWT 公钥的分发。关于 `.well-known` 前缀，可阅读 [RFC 5785](https://datatracker.ietf.org/doc/html/rfc5785) 做进一步了解。在 `jwks.json` 文件中，我们可以找到 [JWK](https://datatracker.ietf.org/doc/html/rfc7517) 或 JSON Web Key，这是我们用来验证签名的公钥。
      2. 校验 JWT 这块逻辑属于微服务共有的部分，一般可以开发一个 SDK 包来做这个通用的工作。为了提高性能，可使用缓存技术，定时从 Auth 中同步公钥。
   2. 获取到公钥后验证成功后拿出 JWT Payload 即可获取到用户信息和角色权限。

全部流程就是这样，我们得到了以下的一些好处：

- 这个流程里我们并没有将 JWT 返回给用户，只是在认证授权过后生成一个一次性的 JWT 令牌凭证用于微服务内部服务间的调用。因为用户的权限信息存放至 JWT Payload 中，内部的服务并不需要从 AD/LDAP 中获取用户权限信息。可能有人觉得内部服务直接从中间件中获取用户会话信息也可以，但这又让我们的应用进一步耦合了中间件，同时也让一个请求链路中产生更多的子请求，不如直接在请求头中存放用户信息的方式高效。
- 在微服务内部间传递的是经过非对称加密算法签名的 JWT 凭证，并不是一个 JWT Payload 信息。就算我们的微服务内部被入侵，攻击者也并不能通过篡改凭证中用户的权限信息来搞破坏。这也满足了分布式系统中 [零信任网络（Zero Trust）](https://icyfenix.cn/distribution/secure/zero-trust.html) 的部分要求。
- 与外部第三方应用的通讯（M2M），可以采用 OAuth2 的方式或 Personal Access Token 这种方式来集成。
- 通过引入 SDK 与定时同步公钥的机制，我们引入了一定的复杂度。比如 SDK 在异构编程语言的项目中开发复杂的问题。不过这个问题在云原生系统时代有了不同的解法，让我们之后讨论这个问题。

架构总是在演进，也许分布式系统中很多问题我们还没完全解决，就来到了云原生时代。

## 云原生系统

如果你对云原生应用开发还不了解的话，可以先看看我这篇 [K8S 云原生应用开发小记](/dev/guide-to-k8s-cloud-native/)。云原生系统其实并不是什么后分布式系统时代。它们两者都是为了解决不同场景的问题而出现的解决方案。

在认证授权这块，云原生系统的优势在于可以通过 [服务网格(Service Mesh)](https://icyfenix.cn/immutable-infrastructure/mesh/) 做一些业务系统中通用的切面工作，比如我们在分布式系统中遇到的校验 JWT 的 SDK 其实就可以放入服务网格中的边车（[Sidecar](https://www.thoughtworks.com/radar/techniques/sidecars-for-endpoint-security)）去实现，让业务应用更专注特定领域的业务。

由于这篇文章并不主要讨论云原生，对这部分感兴趣的可以参考以下两篇文章做进一步了解：

1. [Service Mesh架构下的认证与授权](https://insights.thoughtworks.cn/service-mesh-authentication-authorization/)
2. [微服务下的身份认证和令牌管理](https://insights.thoughtworks.cn/microservices-authentication-token-management/)

## 总结

由于篇幅及能力限制，这篇文章我只能从高层次梳理在不同架构演进中认证、授权及凭证这些和架构安全相关的技术的发展过程。由于这些技术涉及了大量的技术标准及实践，很难在一篇文章中对这些技术做详尽的分享，更无法去分享如何实现。但有了这些理论支持和最佳实践，希望能让你在实现的过程中多了一个指引。如果你想进一步了解，可参考文章中的参考文章链接。

最后，技术总是在不断的发展，但并不是新技术总比老技术“先进”。正如文章中对 Cookie-Session 与 JWT 的分析对比，技术方案总是充满了各种 `Trade-off`。而作为一个工程师，我们能做的就是认清这些技术的历史背景及局限性，选择最适合项目需求的技术方案。
