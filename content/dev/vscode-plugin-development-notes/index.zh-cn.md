---
title: "VSCode插件开发小记"
date: 2019-12-22
draft: false
tags: ["Get Things Done", "时间管理", "工具", "VSCode Extension", "VSCode插件开发"]
aliases: [
    "/zh-cn/dev/vscode-plugin-development-notes/"
]
keywords: "GTD、时间管理、工具、VSCode插件开发、Emacs、TypeScript、Github Actions、VSCode Extension"
description: "本文讲述了基于VSCode编辑器开发一款ToDo插件并分析了Emacs和VSCode架构的差异"
isCJKLanguage: true
---

## VSCode介绍

VSCode是微软开源的一款基于Electron开发的代码编辑器。Electron 是一个基于 Chromium 的项目，可用于开发基于 Node.js 的本地应用程序。VSCode 使用 Blink 排版引擎渲染用户界面。虽然基于 Electron 框架，但并不是Atom的复刻。Code是由“Monaco”的编辑器核心制作，与 Visual Studio Team Services 相同。

{{< ad_embed_post >}}

在2019年的Stack Overflow组织的开发者调研中，VS Code被认为是最受开发者欢迎的开发环境，据调查87317名受访者中有50.7%的受访者声称正在使用VS Code[^0]。

![](https://img.bmpi.dev/2019-12-22-12-06-14.png)

### Feature Overview

{{< figure src="https://img.bmpi.dev/2019-12-22-11-52-59.png" caption="Visual Studio Code feature overview" link="https://delftswa.gitbooks.io/desosa-2017/content/vscode/chapter.html">}}

### Context View

{{< figure src="https://img.bmpi.dev/2019-12-22-11-47-35.png" caption="Context view diagram" link="https://delftswa.gitbooks.io/desosa-2017/content/vscode/chapter.html">}}

### Module Organization

{{< figure src="https://img.bmpi.dev/2019-12-22-11-51-53.png" caption="Module organization" link="https://delftswa.gitbooks.io/desosa-2017/content/vscode/chapter.html">}}

### VSCode Architecture

{{< figure src="https://img.bmpi.dev/2019-12-22-11-46-42.png" caption="VSCode architecture" link="https://programmer.help/blogs/disclosure-of-vscode-technology.html">}}

{{< figure src="https://img.bmpi.dev/2019-12-22-11-46-56.png" caption="Process structure of VSCode" link="https://programmer.help/blogs/disclosure-of-vscode-technology.html">}}

从上图可以看出来渲染进程与调试/插件进程都是隔离的，通过RPC去调用，这保证了VSCode在安装很多插件时都能以极快的速度启动，这点对于用户体验很重要，因为启动太慢会让人焦虑（想想IDEA和Emacs在插件多的时候的感人启动速度）。

### Emacs Architecture

{{< figure src="https://img.bmpi.dev/2019-12-22-11-39-24.png" caption="EMACS Conceptual Architecture" link="https://chrismennie.ca/EMACS-Conceptual-Architecture.pdf">}}

分析完VSCode的架构后，我们还可以学习下上古神器Emacs的架构，Emacs拥有极其强大的扩展能力，号称伪装成操作系统的编辑器（只差一个内核了）。

在Emacs的世界里，用户的输入通过终端输入给Command Dispatcher组件，前者与Lisp解释器共同处理用户的输入，然后调用底层的Display Processer（处理显示）和Primitives（提供基本功能，例如刷新屏幕，插入一个字符并加载文件），这两个组件又调用最底层的Buffer（缓存区）和OS（操作系统原生命令）。

这种架构很类似我们Web开发中的MVC架构，通过Lisp解释器提供强大的定制能力，用户可以编写elisp代码给Emacs添加各种功能。

同样的VSCode也提供了各种插件API，虽不及Emacs这么强大，但是对于我们的很多需求都足够了，加上VSCode的生态的确要远比Emacs的好，入门门槛极低，我在不了解VSCode插件开发到发布第一款插件总共花了不到两天的时间（还是断断续续的开发）。

## VSCode插件开发

### 背景
如果只是做一个很简单的demo插件，可能不到半小时就搞定了，不过真实的场景一般是比较复杂的，在[《我的时间管理工具》](/zh-cn/self/gtd-tools-i-used/)这篇文章中提到我开发了VSCode插件[TODO++](https://marketplace.visualstudio.com/items?itemName=mdw.vscode-todo-plus-plus)，这是一款基于别人插件的修改版本，我需要的很多功能[vscode-todo-plus](https://github.com/fabiospampinato/vscode-todo-plus)都已经提供了，但是我需要查看我当前正在做的事情以及当前标记为很重要但是未开始做的事情，我需要在VSCode左侧的窗口中再提供两个窗口（DOING/CRITICAL）。

### step1/开发

因为要添加TreeView的两个窗口，首先要了解TreeView的基本知识，可以查看VSCode官方的[Tree View Guide](https://code.visualstudio.com/api/extension-guides/tree-view)及[your-first-extension](https://code.visualstudio.com/api/get-started/your-first-extension)。

全部的代码在这里 [add doing task tree view](https://github.com/bmpi-dev/vscode-todo-plus-plus/commit/73b25e64bfc3c75d992a8e20d3b5ec4842efb2e2)。

需要注意的是需要先在`package.json`的加入自己的command，因为我们要在TreeView中添加刷新按钮，当点击刷新按钮时，需要调用我们添加的这个刷新命令。

```json
{
    "command": "todo.refreshDoingEntry",
    "title": "Refresh",
    "icon": {
        "light": "resources/icons/refresh_light.svg",
        "dark": "resources/dark/refresh_dark.svg"
    }
}
```

这个json会注册 `todo.refreshDoingEntry` 到VSCode的命令表中，那这个命令真正在[`commands.ts`](https://github.com/bmpi-dev/vscode-todo-plus-plus/blob/master/src/commands.ts)中：

```js
function refreshDoingEntry () {
  DoingFiles.refresh ( true );
}
```

```Typescript
class Doing extends View {

  id = 'todo.views.0doing';
  clear = false;
  filePathRe = /^(?!~).*(?:\\|\/)/;

  getTreeItem ( item: Item ): vscode.TreeItem {
    return item
  }

  async getChildren ( item?: Item ): Promise<Item[]> {

    if ( this.clear ) {

      setTimeout ( this.refresh.bind ( this ), 0 );

      return [];

    }

    let obj = item ? item.obj : await Utils.files.get ();

    while ( obj && '' in obj ) obj = obj['']; // Collapsing unnecessary groups

    if ( _.isEmpty ( obj ) ) return [new Placeholder ( 'No todo files found' )];

    if ( obj.textEditor ) {

      const items = [],
            lineNr = obj.hasOwnProperty ( 'lineNr' ) ? obj.lineNr : -1;

      Utils.ast.walkChildren ( obj.textEditor, lineNr, data => {

        data.textEditor = obj.textEditor;
        data.filePath = obj.filePath;
        data.lineNr = data.line.lineNumber;

        let isDoing = data.line.text.includes("@doing") || (data.line.text.includes("@started") && !data.line.text.includes("@done"));

        let isGroup = false;

        Utils.ast.walkChildren2 ( obj.textEditor, data.line.lineNumber, data => {
          if ((data.line.text.includes("@doing") || data.line.text.includes("@started")) && !data.line.text.includes("@done")) {
            isGroup = true;
            return false;
          }
          return true;
      });

        if (isDoing || isGroup) {
          const label = _.trimStart ( data.line.text ),
              item = isGroup ? new Group ( data, label ) : new Todo ( data, label );
          items.push ( item );
        }
      });

      if ( !items.length ) { return []; }

      return items;

    } else {

      const keys = Object.keys ( obj ).sort ();

      return keys.map ( key => {

        const val = obj[key];

        if ( this.filePathRe.test ( key ) ) {

          const uri = Utils.view.getURI ( val );

          return new File ( val, uri );

        } else {

          return new Group ( val, key, this.config.embedded.view.icons );

        }

      });

    }

  }

  refresh ( clear? ) {

    this.clear = !!clear;

    super.refresh ();

  }

}
```

`Doing extends View implements vscode.TreeDataProvider<Item>`，这就是VSCode的TreeView，以`id = 'todo.views.0doing'`注册，在`package.json`中:

```json
"views": {
      "todo": [
        {
          "id": "todo.views.0doing",
          "name": "Doing"
        },
        {
          "id": "todo.views.3critical",
          "name": "Critical"
        },
        {
          "id": "todo.views.1files",
          "name": "Files"
        },
        {
          "id": "todo.views.2embedded",
          "name": "Embedded"
        }
      ]
    }
```

注册刷新按钮到TreeView中:

```json
"view/title": [
        {
          "command": "todo.refreshDoingEntry",
          "when": "view == todo.views.0doing",
          "group": "navigation@0"
        }
    ]
```

最后别忘了在`index.ts`中export:
```typescript
export default [Doing, Critical, Files, Embedded];
```

### step2/发布

开发完毕后，我们可以利用Github Actions提供的自动化发布插件[Vscode release plugin](https://github.com/marketplace/actions/vscode-release-plugin)编写自己的插件发布pipeline:

```yaml
on: push
name: "Release Vscode Plugin "
jobs:
  npmInstall:
    name: npm install
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - name: npm install
        run: npm install
      - name: Vscode release plugin
        uses: JCofman/vscodeaction@master
        env:
          PUBLISHER_TOKEN: ${{ secrets.PUBLISHER_TOKEN }}
        with:
          args: publish -p $PUBLISHER_TOKEN
```

这样每次push都会触发自动发布至[VSCode Marketplace](https://marketplace.visualstudio.com/vscode)。当然要了解详细的发布知识，可以查看官方的[Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#create-a-publisher)。

## 进一步阅读

可研究下VSCode官方提供了一些插件的Demo: [vscode-extension-samples](https://github.com/microsoft/vscode-extension-samples)。

插件开发中不可避免要Debug，VSCode也提供了强大的Debug能力，可参考[Debugging extensions](https://vscode-docs.readthedocs.io/en/stable/extensions/debugging-extensions/)。

{{< ad_embed_post >}}

#### *References*
[^0]: [ Developer Survey Results 2019 - Most Popular Development Environments](https://insights.stackoverflow.com/survey/2019)