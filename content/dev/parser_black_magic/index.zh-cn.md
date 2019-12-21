---
title: "Parser黑魔法"
date: 2019-12-21
draft: true
series: ["GTD"]
tags: ["gtd", "tool", "parser", "jison", "bison", "lex", "flex", "bnf", "yacc", "dsl"]
categories: [
    "TODO", "dev", "js", "lib"
]
---

我们在开发过程中对于文本处理一般会用Regex来搞定，比如识别一个字符串中的邮箱及手机号之类。但是对于复杂的文本格式，我们可能会通过写一个解析工具来解析，但是你可能很难想到用flex/bison来做。想象下这么一个场景，你需要将Nginx的conf文件转换成json格式。

```nginx
worker_processes  1;
events {
    worker_connections  1024;
}
http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;
    server {
        listen       80;
        server_name  localhost;
        location / {
            root   html;
            index  index.html index.htm;
        }
    }
}
```
这个格式解析单靠Regex是搞不定的。我们需要更强的Text Processing Tools[^0]。我们知道一门计算机语言和一个Nginx配置文件本质上是由特定词法和语法组成的，了解编译器识别计算机语言的过程有助于我们进一步解决Nginx配置文件的解析。

## Compiler Architecture

{{< figure src="2019-12-21-19-15-21.png" caption="Compiler Architecture" link="https://cs.lmu.edu/~ray/notes/compilerarchitecture/">}}

如上图所示，在我们的问题域中最关心的是Lexical Analysis与Syntax Analysis。

### Lexical Analysis
Lexical Analysis将以下的C语言函数：
```c
void do_awesome_stuff(int a, string b) {
    /* Code here */
}
```
Token化为：
```
TYPE: void
IDENTIFIER: do_awesome_stuff
OPEN_BRACKET: (
TYPE: int
IDENTIFIER: a,
COMMA: ,
TYPE: string
IDENTIFIER: b
CLOSE_BRACKET: )
OPEN_BRACE: {
COMMENT: /* Code here */*
CLOSE_BRACE: }
```

### Syntax Analysis
Syntax Analysis将Token序列解析为Abstract Syntax Tree[^1]:

![](2019-12-21-19-29-39.png)

有了AST（抽象语法树）后，可以进一步生成IR（中间语言），也可以在语义分析中做语法正确性检查（如各种语法lint工具）。

{{< figure src="2019-12-21-19-35-40.png" caption="BNF/Flex/Bison" link="https://starbeamrainbowlabs.com/blog/article.php?article=posts%2F267-Compilers-101.html">}}

如上图所示，第1、2、3步中出现了BNF、Flex、Bison。

### BNF(Backus normal form)

> Backus–Naur form or Backus normal form (BNF) is a notation technique for context-free grammars, often used to describe the syntax of languages used in computing, such as computer programming languages, document formats, instruction sets and communication protocols. They are applied wherever exact descriptions of languages are needed: for instance, in official language specifications, in manuals, and in textbooks on programming language theory.[^2]

简单来说，BNF是一种用于表示上下文无关(CFG)文法的形式语言(形式语言一般有两个方面：语法和语义，由字母表上的某些有限长字符串的集合)。

### CFG(context-free grammars)

在计算机科学中，若一个形式文法 G = (V, Σ, P, S) 的产生式规则都取如下的形式：A -> α，则谓之。其中 A∈V ，α∈(V∪Σ)* 。上下文无关文法取名为“上下文无关”的原因就是因为字符 A 总可以被字符串 α 自由替换，而无需考虑字符 A 出现的上下文。一个形式语言是上下文无关的，如果它是由上下文无关文法生成的。上下文无关文法重要的原因在于它们拥有足够强的表达力来表示大多数程序设计语言的语法；实际上，几乎所有程序设计语言都是通过上下文无关文法来定义的。BNF（巴克斯-诺尔范式）经常用来表达上下文无关文法。[^3]

### Flex

Flex在Lexical Analysis阶段用来生成词法分析器。

### Bison

Bison用于自动生成语法分析器(Parser)程序，实际上可用于所有常见的操作系统。Bison把LALR形式的上下文无关文法描述转换为可做语法分析的C或C++程序。

### LALR/LL/LR

在计算机科学中，LALR分析器是一种规范LR分析方法的简化形式。它可以对上下无关文法进行语法分析。LALR即“Look-Ahead LR”。其中，Look-Ahead为“向前看”，L代表对输入进行从左到右的检查，R代表反向构造出最右推导序列。 LALR分析器可以根据一种程序设计语言的正式语法的产生式而对一段文本程序输入进行语法分析，从而在语法层面上判断输入程序是否合法。 实际应用中的LALR分析器并不是由人手工写成的，而是由类似于yacc和GNU Bison之类的LALR语法分析器生成工具构成。[^4]

LL分析器是一种处理某些上下文无关文法的自顶向下分析器。因为它从左（Left）到右处理输入，再对句型执行最左推导出语法树（Left derivation，相对于LR分析器）。能以此方法分析的文法称为LL文法。[^5]

### Automata Theory

我们知道，自动化理论（automata theory）里，有FSA（Finite State Automata）和PDA（PushDown Automata），前者可以用regular expression表述，而后者可以处理CFG（Context Free Grammar）。而CFG便是flex/bison要处理的对象！[^6]

{{< figure src="2019-12-21-22-56-22.png" caption="Automata Theory" height="400" width="400">}}

能被DFA和NFA识别的语言是正则语言。能被PDA识别的语言为CFG语言。几乎所有程序设计语言都是通过CFG来定义的。BNF经常用来表达CFG。

**所以我们知道靠正则是解决不了Nginx配置文件这种CFG语言的。这种情况需要我们写BNF文法来解决。**

### Compiler-compiler

一个编译器编译程序(compiler-compiler)或者编译器产生程序(compiler generator)是一个帮助用户根据某种语言或机器的规则来产生语法分析器，解释器或者编译器的工具。当前最早也是最常见的编译器编译程序是语法分析器产生程序(parser generator)这个形式，其输入是一个编程语言的形式文法 (一般是用BNF表示)，然后产生出一些语法分析器的代码，作为这个语言编译器的一部分。

理想的编译器编译程序，只要给予一个编程语言的完整描述以及目标的指令集架构，然后就能自动从中产生出合适的编译器。实际上, 最先进的技术还没有到达这么复杂的地步，而大多数现有的编译器产生程序都不能处理语义学或者目标架构的信息部分。[^7]

## 不同语言的Parser生成器

语言    | Parser
--------|------
c       | bison
clojure | instaparse
javascript   | jison
javascript   | peg.js
各种语言  | antlr4
golang | participle
erlang | yecc

其他的详见 [Comparison_of_parser_generators](https://en.wikipedia.org/wiki/Comparison_of_parser_generators) 。


## 使用JS写一个Parser

了解完上面这么多枯燥的理论，是时候该实战了，让我们使用Parser解决一个真正的问题。在[《我的时间管理工具》](/zh-cn/self/gtd-tools-i-used/)这篇文章中提到我开发了[todo_parser_lib](https://github.com/bmpi-dev/todo_parser_lib)，这个库便是用JavaScript的jison库开发的解析todo文件为json的AST格式的功能。

jison到底有多强，可以从这里感受下: [ProjectsUsingJison](https://github.com/zaach/jison/wiki/ProjectsUsingJison)。

todo文件是一种类似yaml/python缩进风格的纯文本格式的文件，如下：

```
test1:
    ☐ test list1 @started(19-12-11 21:16)
    > test list1 comm
    ✔ test list2 @critical @started(19-12-11 21:16) @done(19-12-11 21:17) @lasted(1m2s)
    ✘ cancel @cancelled(19-12-11 21:28)
    test2:
        ☐ test list21 @started(19-12-11 21:16)
        ✔ test list22 @critical @started(19-12-11 21:16) @done(19-12-11 21:17) @lasted(1m2s)
        ✘ test list23 cancel @cancelled(19-12-11 21:28)

test3:
    ☐ test list31 @started(19-12-11 21:16)
    ✔ test list32 @critical @started(19-12-16 09:24) @done(19-12-16 09:24) @lasted(41s)
```

我们最终要生成如下的JSON Scheme:

```json
[
  {
    "name": "test1:",
    "todo": [
      {
        "name": "☐ test list1 @started(19-12-11 21:16)",
        "todo": []
      },
      {
        "name": "test2:",
        "todo": [
          {
            "name": "☐ test list21 @started(19-12-11 21:16)",
            "todo": []
          }
        ]
      }
    ]
  },
  {
    "name": "test3:",
    "todo": [
      {
        "name": "☐ test list31 @started(19-12-11 21:16)",
        "todo": []
      }
    ]
  }
]
```

### step1/词法分析

Javascript的jison自带了词法分析功能，不过也可以使用第三方的词法分析库，由于yaml/python缩进风格的文法，本身不是CFG，需要我们做一定的处理才能正常的Token化[^8]。在这里我们使用[lexer](https://github.com/aaditmshah/lexer)来解析缩进风格的文法。

### step2/语法分析

### step3/Render

### step4/工程化

## Nginx配置文件Parser

让我们回到开始的问题，现在你可以使用BNF去大胆的写一个解析Nginx配置文件的Parser吧。

## 进一步阅读

创作一门属于自己的Toy Language/Compiler，可以看看这篇文章 [Writing Your Own Toy Compiler Using Flex, Bison and LLVM](https://gnuu.org/2009/09/18/writing-your-own-toy-compiler/) 。

当然也可以看看王垠的 [《对 Parser 的误解》](http://www.yinwang.org/blog-cn/2015/09/19/parser) 。

想看大型编程语言的语法分析，可以看看Elixir基于Erlang平台是怎么把自己编译成Erlang的：[elixir_parser.yrl](https://github.com/elixir-lang/elixir/blob/master/lib/elixir/src/elixir_parser.yrl)

#### *References*
[^0]: [List of Text Processing Tools](https://www.shlomifish.org/open-source/resources/text-processing-tools/)
[^1]: <https://en.wikipedia.org/wiki/Abstract_syntax_tree>
[^2]: <https://en.wikipedia.org/wiki/Backus%E2%80%93Naur_form>
[^3]: <https://zh.wikipedia.org/wiki/%E4%B8%8A%E4%B8%8B%E6%96%87%E6%97%A0%E5%85%B3%E6%96%87%E6%B3%95>
[^4]: <https://zh.wikipedia.org/wiki/LALR%E8%AF%AD%E6%B3%95%E5%88%86%E6%9E%90%E5%99%A8>
[^5]: <https://zh.wikipedia.org/wiki/LL%E5%89%96%E6%9E%90%E5%99%A8>
[^6]: [如何愉快地写个小parser](https://zhuanlan.zhihu.com/p/20178871)
[^7]: <https://zh.wikipedia.org/wiki/%E7%B7%A8%E8%AD%AF%E5%99%A8%E7%B7%A8%E8%AD%AF%E7%A8%8B%E5%BC%8F>
[^8]: [Looking for examples of Jison grammars that use indentation for block-structure](https://stackoverflow.com/questions/14803043/looking-for-examples-of-jison-grammars-that-use-indentation-for-block-structure)