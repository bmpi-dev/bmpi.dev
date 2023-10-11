/*! markmap-view v0.15.4 | MIT License */
(function (exports, d3) {
  'use strict';
  
  /*! markmap-common v0.15.3 | MIT License */
  function _extends$1() {
    _extends$1 = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends$1.apply(this, arguments);
  }
  const testPath = "npm2url/dist/index.cjs";
  const defaultProviders = {
    cdnjs: path => `https://cdnjs.cloudflare.com/ajax/libs/${path}`
  };
  class UrlBuilder {
    constructor() {
      this.providers = _extends$1({}, defaultProviders);
      this.provider = "cdnjs";
    }
    getFastestProvider(timeout = 5e3, path = testPath) {
      return new Promise((resolve, reject) => {
        Promise.all(Object.entries(this.providers).map(async ([name, factory]) => {
          try {
            const res = await fetch(factory(path));
            if (!res.ok) {
              throw res;
            }
            await res.text();
            resolve(name);
          } catch (_unused) {}
        })).then(() => reject(new Error("All providers failed")));
        setTimeout(reject, timeout, new Error("Timed out"));
      });
    }
    async findFastestProvider(timeout) {
      // this.provider = await this.getFastestProvider(timeout);
      this.provider = "cdnjs";
      return this.provider;
    }
    setProvider(name, factory) {
      if (factory) {
        this.providers[name] = factory;
      } else {
        delete this.providers[name];
      }
    }
    getFullUrl(path, provider = this.provider) {
      if (path.includes("://")) {
        return path;
      }
      const factory = this.providers[provider];
      if (!factory) {
        throw new Error(`Provider ${provider} not found`);
      }
      return factory(path);
    }
  }
  new UrlBuilder();
  class Hook {
    constructor() {
      this.listeners = [];
    }
    tap(fn) {
      this.listeners.push(fn);
      return () => this.revoke(fn);
    }
    revoke(fn) {
      const i = this.listeners.indexOf(fn);
      if (i >= 0) this.listeners.splice(i, 1);
    }
    revokeAll() {
      this.listeners.splice(0);
    }
    call(...args) {
      for (const fn of this.listeners) {
        fn(...args);
      }
    }
  }
  const uniqId = Math.random().toString(36).slice(2, 8);
  let globalIndex = 0;
  function getId() {
    globalIndex += 1;
    return `mm-${uniqId}-${globalIndex}`;
  }
  function noop() {
    // noop
  }
  function walkTree(tree, callback) {
    const walk = (item, parent) => callback(item, () => {
      var _item$children;
      (_item$children = item.children) == null ? void 0 : _item$children.forEach(child => {
        walk(child, item);
      });
    }, parent);
    walk(tree);
  }
  function addClass(className, ...rest) {
    const classList = (className || '').split(' ').filter(Boolean);
    rest.forEach(item => {
      if (item && classList.indexOf(item) < 0) classList.push(item);
    });
    return classList.join(' ');
  }
  function childSelector(filter) {
    if (typeof filter === 'string') {
      const tagName = filter;
      filter = el => el.tagName === tagName;
    }
    const filterFn = filter;
    return function selector() {
      let nodes = Array.from(this.childNodes);
      if (filterFn) nodes = nodes.filter(node => filterFn(node));
      return nodes;
    };
  }
  function memoize(fn) {
    const cache = {};
    return function memoized(...args) {
      const key = `${args[0]}`;
      let data = cache[key];
      if (!data) {
        data = {
          value: fn(...args)
        };
        cache[key] = data;
      }
      return data.value;
    };
  }
  
  /*! @gera2ld/jsx-dom v2.2.2 | ISC License */
  const VTYPE_ELEMENT$1 = 1;
  const VTYPE_FUNCTION$1 = 2;
  const SVG_NS$1 = 'http://www.w3.org/2000/svg';
  const XLINK_NS$1 = 'http://www.w3.org/1999/xlink';
  const NS_ATTRS$1 = {
    show: XLINK_NS$1,
    actuate: XLINK_NS$1,
    href: XLINK_NS$1
  };
  const isLeaf$1 = c => typeof c === 'string' || typeof c === 'number';
  const isElement$1 = c => (c == null ? void 0 : c.vtype) === VTYPE_ELEMENT$1;
  const isRenderFunction$1 = c => (c == null ? void 0 : c.vtype) === VTYPE_FUNCTION$1;
  function h(type, props, ...children) {
    props = Object.assign({}, props, {
      children: children.length === 1 ? children[0] : children
    });
    return jsx$1(type, props);
  }
  function jsx$1(type, props) {
    let vtype;
    if (typeof type === 'string') vtype = VTYPE_ELEMENT$1;else if (typeof type === 'function') vtype = VTYPE_FUNCTION$1;else throw new Error('Invalid VNode type');
    return {
      vtype,
      type,
      props
    };
  }
  function Fragment$1(props) {
    return props.children;
  }
  const DEFAULT_ENV$1 = {
    isSvg: false
  };
  function insertDom$1(parent, nodes) {
    if (!Array.isArray(nodes)) nodes = [nodes];
    nodes = nodes.filter(Boolean);
    if (nodes.length) parent.append(...nodes);
  }
  function mountAttributes$1(domElement, props, env) {
    for (const key in props) {
      if (key === 'key' || key === 'children' || key === 'ref') continue;
      if (key === 'dangerouslySetInnerHTML') {
        domElement.innerHTML = props[key].__html;
      } else if (key === 'innerHTML' || key === 'textContent' || key === 'innerText' || key === 'value' && ['textarea', 'select'].includes(domElement.tagName)) {
        const value = props[key];
        if (value != null) domElement[key] = value;
      } else if (key.startsWith('on')) {
        domElement[key.toLowerCase()] = props[key];
      } else {
        setDOMAttribute$1(domElement, key, props[key], env.isSvg);
      }
    }
  }
  const attrMap$1 = {
    className: 'class',
    labelFor: 'for'
  };
  function setDOMAttribute$1(el, attr, value, isSVG) {
    attr = attrMap$1[attr] || attr;
    if (value === true) {
      el.setAttribute(attr, '');
    } else if (value === false) {
      el.removeAttribute(attr);
    } else {
      const namespace = isSVG ? NS_ATTRS$1[attr] : undefined;
      if (namespace !== undefined) {
        el.setAttributeNS(namespace, attr, value);
      } else {
        el.setAttribute(attr, value);
      }
    }
  }
  function flatten$1(arr) {
    return arr.reduce((prev, item) => prev.concat(item), []);
  }
  function mountChildren$1(children, env) {
    return Array.isArray(children) ? flatten$1(children.map(child => mountChildren$1(child, env))) : mount$1(children, env);
  }
  function mount$1(vnode, env = DEFAULT_ENV$1) {
    if (vnode == null || typeof vnode === 'boolean') {
      return null;
    }
    if (vnode instanceof Node) {
      return vnode;
    }
    if (isRenderFunction$1(vnode)) {
      const {
        type,
        props
      } = vnode;
      if (type === Fragment$1) {
        const node = document.createDocumentFragment();
        if (props.children) {
          const children = mountChildren$1(props.children, env);
          insertDom$1(node, children);
        }
        return node;
      }
      const childVNode = type(props);
      return mount$1(childVNode, env);
    }
    if (isLeaf$1(vnode)) {
      return document.createTextNode(`${vnode}`);
    }
    if (isElement$1(vnode)) {
      let node;
      const {
        type,
        props
      } = vnode;
      if (!env.isSvg && type === 'svg') {
        env = Object.assign({}, env, {
          isSvg: true
        });
      }
      if (!env.isSvg) {
        node = document.createElement(type);
      } else {
        node = document.createElementNS(SVG_NS$1, type);
      }
      mountAttributes$1(node, props, env);
      if (props.children) {
        let childEnv = env;
        if (env.isSvg && type === 'foreignObject') {
          childEnv = Object.assign({}, childEnv, {
            isSvg: false
          });
        }
        const children = mountChildren$1(props.children, childEnv);
        if (children != null) insertDom$1(node, children);
      }
      const {
        ref
      } = props;
      if (typeof ref === 'function') ref(node);
      return node;
    }
    throw new Error('mount: Invalid Vnode!');
  }
  
  /**
   * Mount vdom as real DOM nodes.
   */
  function mountDom$1(vnode) {
    return mount$1(vnode);
  }
  
  /**
   * Render and mount without returning VirtualDOM, useful when you don't need SVG support.
   */
  function hm(...args) {
    return mountDom$1(h(...args));
  }
  const memoizedPreloadJS = memoize(url => {
    document.head.append(hm('link', {
      rel: 'preload',
      as: 'script',
      href: url
    }));
  });
  const jsCache = {};
  const cssCache = {};
  async function loadJSItem(item, context) {
    var _item$data;
    const src = item.type === 'script' && ((_item$data = item.data) == null ? void 0 : _item$data.src) || '';
    item.loaded || (item.loaded = jsCache[src]);
    if (!item.loaded) {
      if (item.type === 'script') {
        item.loaded = new Promise((resolve, reject) => {
          document.head.append(hm('script', _extends$1({}, item.data, {
            onLoad: resolve,
            onError: reject
          })));
          if (!src) {
            // Run inline script synchronously
            resolve(undefined);
          }
        }).then(() => {
          item.loaded = true;
        });
        if (src) jsCache[src] = item.loaded;
      }
      if (item.type === 'iife') {
        const {
          fn,
          getParams
        } = item.data;
        fn(...((getParams == null ? void 0 : getParams(context)) || []));
        item.loaded = true;
      }
    }
    await item.loaded;
  }
  function loadCSSItem(item) {
    const url = item.type === 'stylesheet' && item.data.href || '';
    item.loaded || (item.loaded = cssCache[url]);
    if (item.loaded) return;
    item.loaded = true;
    if (url) cssCache[url] = true;
    if (item.type === 'style') {
      document.head.append(hm('style', {
        textContent: item.data
      }));
    } else if (item.type === 'stylesheet') {
      document.head.append(hm('link', _extends$1({
        rel: 'stylesheet'
      }, item.data)));
    }
  }
  async function loadJS(items, context) {
    items.forEach(item => {
      var _item$data2;
      if (item.type === 'script' && (_item$data2 = item.data) != null && _item$data2.src) {
        memoizedPreloadJS(item.data.src);
      }
    });
    context = _extends$1({
      getMarkmap: () => window.markmap
    }, context);
    for (const item of items) {
      await loadJSItem(item, context);
    }
  }
  function loadCSS(items) {
    for (const item of items) {
      loadCSSItem(item);
    }
  }
  
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  
  function count(node) {
    var sum = 0,
      children = node.children,
      i = children && children.length;
    if (!i) sum = 1;else while (--i >= 0) sum += children[i].value;
    node.value = sum;
  }
  function node_count () {
    return this.eachAfter(count);
  }
  
  function node_each (callback) {
    var node = this,
      current,
      next = [node],
      children,
      i,
      n;
    do {
      current = next.reverse(), next = [];
      while (node = current.pop()) {
        callback(node), children = node.children;
        if (children) for (i = 0, n = children.length; i < n; ++i) {
          next.push(children[i]);
        }
      }
    } while (next.length);
    return this;
  }
  
  function node_eachBefore (callback) {
    var node = this,
      nodes = [node],
      children,
      i;
    while (node = nodes.pop()) {
      callback(node), children = node.children;
      if (children) for (i = children.length - 1; i >= 0; --i) {
        nodes.push(children[i]);
      }
    }
    return this;
  }
  
  function node_eachAfter (callback) {
    var node = this,
      nodes = [node],
      next = [],
      children,
      i,
      n;
    while (node = nodes.pop()) {
      next.push(node), children = node.children;
      if (children) for (i = 0, n = children.length; i < n; ++i) {
        nodes.push(children[i]);
      }
    }
    while (node = next.pop()) {
      callback(node);
    }
    return this;
  }
  
  function node_sum (value) {
    return this.eachAfter(function (node) {
      var sum = +value(node.data) || 0,
        children = node.children,
        i = children && children.length;
      while (--i >= 0) sum += children[i].value;
      node.value = sum;
    });
  }
  
  function node_sort (compare) {
    return this.eachBefore(function (node) {
      if (node.children) {
        node.children.sort(compare);
      }
    });
  }
  
  function node_path (end) {
    var start = this,
      ancestor = leastCommonAncestor(start, end),
      nodes = [start];
    while (start !== ancestor) {
      start = start.parent;
      nodes.push(start);
    }
    var k = nodes.length;
    while (end !== ancestor) {
      nodes.splice(k, 0, end);
      end = end.parent;
    }
    return nodes;
  }
  function leastCommonAncestor(a, b) {
    if (a === b) return a;
    var aNodes = a.ancestors(),
      bNodes = b.ancestors(),
      c = null;
    a = aNodes.pop();
    b = bNodes.pop();
    while (a === b) {
      c = a;
      a = aNodes.pop();
      b = bNodes.pop();
    }
    return c;
  }
  
  function node_ancestors () {
    var node = this,
      nodes = [node];
    while (node = node.parent) {
      nodes.push(node);
    }
    return nodes;
  }
  
  function node_descendants () {
    var nodes = [];
    this.each(function (node) {
      nodes.push(node);
    });
    return nodes;
  }
  
  function node_leaves () {
    var leaves = [];
    this.eachBefore(function (node) {
      if (!node.children) {
        leaves.push(node);
      }
    });
    return leaves;
  }
  
  function node_links () {
    var root = this,
      links = [];
    root.each(function (node) {
      if (node !== root) {
        // Don’t include the root’s parent, if any.
        links.push({
          source: node.parent,
          target: node
        });
      }
    });
    return links;
  }
  
  function hierarchy(data, children) {
    var root = new Node$1(data),
      valued = +data.value && (root.value = data.value),
      node,
      nodes = [root],
      child,
      childs,
      i,
      n;
    if (children == null) children = defaultChildren;
    while (node = nodes.pop()) {
      if (valued) node.value = +node.data.value;
      if ((childs = children(node.data)) && (n = childs.length)) {
        node.children = new Array(n);
        for (i = n - 1; i >= 0; --i) {
          nodes.push(child = node.children[i] = new Node$1(childs[i]));
          child.parent = node;
          child.depth = node.depth + 1;
        }
      }
    }
    return root.eachBefore(computeHeight);
  }
  function node_copy() {
    return hierarchy(this).eachBefore(copyData);
  }
  function defaultChildren(d) {
    return d.children;
  }
  function copyData(node) {
    node.data = node.data.data;
  }
  function computeHeight(node) {
    var height = 0;
    do node.height = height; while ((node = node.parent) && node.height < ++height);
  }
  function Node$1(data) {
    this.data = data;
    this.depth = this.height = 0;
    this.parent = null;
  }
  Node$1.prototype = hierarchy.prototype = {
    constructor: Node$1,
    count: node_count,
    each: node_each,
    eachAfter: node_eachAfter,
    eachBefore: node_eachBefore,
    sum: node_sum,
    sort: node_sort,
    path: node_path,
    ancestors: node_ancestors,
    descendants: node_descendants,
    leaves: node_leaves,
    links: node_links,
    copy: node_copy
  };
  
  var name = "d3-flextree";
  var version$1 = "2.1.2";
  var main = "build/d3-flextree.js";
  var module = "index";
  var author = {
    name: "Chris Maloney",
    url: "http://chrismaloney.org"
  };
  var description = "Flexible tree layout algorithm that allows for variable node sizes.";
  var keywords = [
    "d3",
    "d3-module",
    "layout",
    "tree",
    "hierarchy",
    "d3-hierarchy",
    "plugin",
    "d3-plugin",
    "infovis",
    "visualization",
    "2d"
  ];
  var homepage = "https://github.com/klortho/d3-flextree";
  var license = "WTFPL";
  var repository = {
    type: "git",
    url: "https://github.com/klortho/d3-flextree.git"
  };
  var scripts = {
    clean: "rm -rf build demo test",
    "build:demo": "rollup -c --environment BUILD:demo",
    "build:dev": "rollup -c --environment BUILD:dev",
    "build:prod": "rollup -c --environment BUILD:prod",
    "build:test": "rollup -c --environment BUILD:test",
    build: "rollup -c",
    lint: "eslint index.js src",
    "test:main": "node test/bundle.js",
    "test:browser": "node test/browser-tests.js",
    test: "npm-run-all test:*",
    prepare: "npm-run-all clean build lint test"
  };
  var dependencies = {
    "d3-hierarchy": "^1.1.5"
  };
  var devDependencies = {
    "babel-plugin-external-helpers": "^6.22.0",
    "babel-preset-es2015-rollup": "^3.0.0",
    d3: "^4.13.0",
    "d3-selection-multi": "^1.0.1",
    eslint: "^4.19.1",
    jsdom: "^11.6.2",
    "npm-run-all": "^4.1.2",
    rollup: "^0.55.3",
    "rollup-plugin-babel": "^2.7.1",
    "rollup-plugin-commonjs": "^8.0.2",
    "rollup-plugin-copy": "^0.2.3",
    "rollup-plugin-json": "^2.3.0",
    "rollup-plugin-node-resolve": "^3.0.2",
    "rollup-plugin-uglify": "^3.0.0",
    "uglify-es": "^3.3.9"
  };
  var packageInfo = {
    name: name,
    version: version$1,
    main: main,
    module: module,
    "jsnext:main": "index",
    author: author,
    description: description,
    keywords: keywords,
    homepage: homepage,
    license: license,
    repository: repository,
    scripts: scripts,
    dependencies: dependencies,
    devDependencies: devDependencies
  };
  
  const {
    version
  } = packageInfo;
  const defaults = Object.freeze({
    children: data => data.children,
    nodeSize: node => node.data.size,
    spacing: 0
  });
  
  // Create a layout function with customizable options. Per D3-style, the
  // options can be set at any time using setter methods. The layout function
  // will compute the tree node positions based on the options in effect at the
  // time it is called.
  function flextree(options) {
    const opts = Object.assign({}, defaults, options);
    function accessor(name) {
      const opt = opts[name];
      return typeof opt === 'function' ? opt : () => opt;
    }
    function layout(tree) {
      const wtree = wrap(getWrapper(), tree, node => node.children);
      wtree.update();
      return wtree.data;
    }
    function getFlexNode() {
      const nodeSize = accessor('nodeSize');
      const spacing = accessor('spacing');
      return class FlexNode extends hierarchy.prototype.constructor {
        constructor(data) {
          super(data);
        }
        copy() {
          const c = wrap(this.constructor, this, node => node.children);
          c.each(node => node.data = node.data.data);
          return c;
        }
        get size() {
          return nodeSize(this);
        }
        spacing(oNode) {
          return spacing(this, oNode);
        }
        get nodes() {
          return this.descendants();
        }
        get xSize() {
          return this.size[0];
        }
        get ySize() {
          return this.size[1];
        }
        get top() {
          return this.y;
        }
        get bottom() {
          return this.y + this.ySize;
        }
        get left() {
          return this.x - this.xSize / 2;
        }
        get right() {
          return this.x + this.xSize / 2;
        }
        get root() {
          const ancs = this.ancestors();
          return ancs[ancs.length - 1];
        }
        get numChildren() {
          return this.hasChildren ? this.children.length : 0;
        }
        get hasChildren() {
          return !this.noChildren;
        }
        get noChildren() {
          return this.children === null;
        }
        get firstChild() {
          return this.hasChildren ? this.children[0] : null;
        }
        get lastChild() {
          return this.hasChildren ? this.children[this.numChildren - 1] : null;
        }
        get extents() {
          return (this.children || []).reduce((acc, kid) => FlexNode.maxExtents(acc, kid.extents), this.nodeExtents);
        }
        get nodeExtents() {
          return {
            top: this.top,
            bottom: this.bottom,
            left: this.left,
            right: this.right
          };
        }
        static maxExtents(e0, e1) {
          return {
            top: Math.min(e0.top, e1.top),
            bottom: Math.max(e0.bottom, e1.bottom),
            left: Math.min(e0.left, e1.left),
            right: Math.max(e0.right, e1.right)
          };
        }
      };
    }
    function getWrapper() {
      const FlexNode = getFlexNode();
      const nodeSize = accessor('nodeSize');
      const spacing = accessor('spacing');
      return class extends FlexNode {
        constructor(data) {
          super(data);
          Object.assign(this, {
            x: 0,
            y: 0,
            relX: 0,
            prelim: 0,
            shift: 0,
            change: 0,
            lExt: this,
            lExtRelX: 0,
            lThr: null,
            rExt: this,
            rExtRelX: 0,
            rThr: null
          });
        }
        get size() {
          return nodeSize(this.data);
        }
        spacing(oNode) {
          return spacing(this.data, oNode.data);
        }
        get x() {
          return this.data.x;
        }
        set x(v) {
          this.data.x = v;
        }
        get y() {
          return this.data.y;
        }
        set y(v) {
          this.data.y = v;
        }
        update() {
          layoutChildren(this);
          resolveX(this);
          return this;
        }
      };
    }
    function wrap(FlexClass, treeData, children) {
      const _wrap = (data, parent) => {
        const node = new FlexClass(data);
        Object.assign(node, {
          parent,
          depth: parent === null ? 0 : parent.depth + 1,
          height: 0,
          length: 1
        });
        const kidsData = children(data) || [];
        node.children = kidsData.length === 0 ? null : kidsData.map(kd => _wrap(kd, node));
        if (node.children) {
          Object.assign(node, node.children.reduce((hl, kid) => ({
            height: Math.max(hl.height, kid.height + 1),
            length: hl.length + kid.length
          }), node));
        }
        return node;
      };
      return _wrap(treeData, null);
    }
    Object.assign(layout, {
      nodeSize(arg) {
        return arguments.length ? (opts.nodeSize = arg, layout) : opts.nodeSize;
      },
      spacing(arg) {
        return arguments.length ? (opts.spacing = arg, layout) : opts.spacing;
      },
      children(arg) {
        return arguments.length ? (opts.children = arg, layout) : opts.children;
      },
      hierarchy(treeData, children) {
        const kids = typeof children === 'undefined' ? opts.children : children;
        return wrap(getFlexNode(), treeData, kids);
      },
      dump(tree) {
        const nodeSize = accessor('nodeSize');
        const _dump = i0 => node => {
          const i1 = i0 + '  ';
          const i2 = i0 + '    ';
          const {
            x,
            y
          } = node;
          const size = nodeSize(node);
          const kids = node.children || [];
          const kdumps = kids.length === 0 ? ' ' : `,${i1}children: [${i2}${kids.map(_dump(i2)).join(i2)}${i1}],${i0}`;
          return `{ size: [${size.join(', ')}],${i1}x: ${x}, y: ${y}${kdumps}},`;
        };
        return _dump('\n')(tree);
      }
    });
    return layout;
  }
  flextree.version = version;
  const layoutChildren = (w, y = 0) => {
    w.y = y;
    (w.children || []).reduce((acc, kid) => {
      const [i, lastLows] = acc;
      layoutChildren(kid, w.y + w.ySize);
      // The lowest vertical coordinate while extreme nodes still point
      // in current subtree.
      const lowY = (i === 0 ? kid.lExt : kid.rExt).bottom;
      if (i !== 0) separate(w, i, lastLows);
      const lows = updateLows(lowY, i, lastLows);
      return [i + 1, lows];
    }, [0, null]);
    shiftChange(w);
    positionRoot(w);
    return w;
  };
  
  // Resolves the relative coordinate properties - relX and prelim --
  // to set the final, absolute x coordinate for each node. This also sets
  // `prelim` to 0, so that `relX` for each node is its x-coordinate relative
  // to its parent.
  const resolveX = (w, prevSum, parentX) => {
    // A call to resolveX without arguments is assumed to be for the root of
    // the tree. This will set the root's x-coord to zero.
    if (typeof prevSum === 'undefined') {
      prevSum = -w.relX - w.prelim;
      parentX = 0;
    }
    const sum = prevSum + w.relX;
    w.relX = sum + w.prelim - parentX;
    w.prelim = 0;
    w.x = parentX + w.relX;
    (w.children || []).forEach(k => resolveX(k, sum, w.x));
    return w;
  };
  
  // Process shift and change for all children, to add intermediate spacing to
  // each child's modifier.
  const shiftChange = w => {
    (w.children || []).reduce((acc, child) => {
      const [lastShiftSum, lastChangeSum] = acc;
      const shiftSum = lastShiftSum + child.shift;
      const changeSum = lastChangeSum + shiftSum + child.change;
      child.relX += changeSum;
      return [shiftSum, changeSum];
    }, [0, 0]);
  };
  
  // Separates the latest child from its previous sibling
  /* eslint-disable complexity */
  const separate = (w, i, lows) => {
    const lSib = w.children[i - 1];
    const curSubtree = w.children[i];
    let rContour = lSib;
    let rSumMods = lSib.relX;
    let lContour = curSubtree;
    let lSumMods = curSubtree.relX;
    let isFirst = true;
    while (rContour && lContour) {
      if (rContour.bottom > lows.lowY) lows = lows.next;
      // How far to the left of the right side of rContour is the left side
      // of lContour? First compute the center-to-center distance, then add
      // the "spacing"
      const dist = rSumMods + rContour.prelim - (lSumMods + lContour.prelim) + rContour.xSize / 2 + lContour.xSize / 2 + rContour.spacing(lContour);
      if (dist > 0 || dist < 0 && isFirst) {
        lSumMods += dist;
        // Move subtree by changing relX.
        moveSubtree(curSubtree, dist);
        distributeExtra(w, i, lows.index, dist);
      }
      isFirst = false;
      // Advance highest node(s) and sum(s) of modifiers
      const rightBottom = rContour.bottom;
      const leftBottom = lContour.bottom;
      if (rightBottom <= leftBottom) {
        rContour = nextRContour(rContour);
        if (rContour) rSumMods += rContour.relX;
      }
      if (rightBottom >= leftBottom) {
        lContour = nextLContour(lContour);
        if (lContour) lSumMods += lContour.relX;
      }
    }
    // Set threads and update extreme nodes. In the first case, the
    // current subtree is taller than the left siblings.
    if (!rContour && lContour) setLThr(w, i, lContour, lSumMods);
    // In the next case, the left siblings are taller than the current subtree
    else if (rContour && !lContour) setRThr(w, i, rContour, rSumMods);
  };
  /* eslint-enable complexity */
  
  // Move subtree by changing relX.
  const moveSubtree = (subtree, distance) => {
    subtree.relX += distance;
    subtree.lExtRelX += distance;
    subtree.rExtRelX += distance;
  };
  const distributeExtra = (w, curSubtreeI, leftSibI, dist) => {
    const curSubtree = w.children[curSubtreeI];
    const n = curSubtreeI - leftSibI;
    // Are there intermediate children?
    if (n > 1) {
      const delta = dist / n;
      w.children[leftSibI + 1].shift += delta;
      curSubtree.shift -= delta;
      curSubtree.change -= dist - delta;
    }
  };
  const nextLContour = w => {
    return w.hasChildren ? w.firstChild : w.lThr;
  };
  const nextRContour = w => {
    return w.hasChildren ? w.lastChild : w.rThr;
  };
  const setLThr = (w, i, lContour, lSumMods) => {
    const firstChild = w.firstChild;
    const lExt = firstChild.lExt;
    const curSubtree = w.children[i];
    lExt.lThr = lContour;
    // Change relX so that the sum of modifier after following thread is correct.
    const diff = lSumMods - lContour.relX - firstChild.lExtRelX;
    lExt.relX += diff;
    // Change preliminary x coordinate so that the node does not move.
    lExt.prelim -= diff;
    // Update extreme node and its sum of modifiers.
    firstChild.lExt = curSubtree.lExt;
    firstChild.lExtRelX = curSubtree.lExtRelX;
  };
  
  // Mirror image of setLThr.
  const setRThr = (w, i, rContour, rSumMods) => {
    const curSubtree = w.children[i];
    const rExt = curSubtree.rExt;
    const lSib = w.children[i - 1];
    rExt.rThr = rContour;
    const diff = rSumMods - rContour.relX - curSubtree.rExtRelX;
    rExt.relX += diff;
    rExt.prelim -= diff;
    curSubtree.rExt = lSib.rExt;
    curSubtree.rExtRelX = lSib.rExtRelX;
  };
  
  // Position root between children, taking into account their modifiers
  const positionRoot = w => {
    if (w.hasChildren) {
      const k0 = w.firstChild;
      const kf = w.lastChild;
      const prelim = (k0.prelim + k0.relX - k0.xSize / 2 + kf.relX + kf.prelim + kf.xSize / 2) / 2;
      Object.assign(w, {
        prelim,
        lExt: k0.lExt,
        lExtRelX: k0.lExtRelX,
        rExt: kf.rExt,
        rExtRelX: kf.rExtRelX
      });
    }
  };
  
  // Make/maintain a linked list of the indexes of left siblings and their
  // lowest vertical coordinate.
  const updateLows = (lowY, index, lastLows) => {
    // Remove siblings that are hidden by the new subtree.
    while (lastLows !== null && lowY >= lastLows.lowY) lastLows = lastLows.next;
    // Prepend the new subtree.
    return {
      lowY,
      index,
      next: lastLows
    };
  };
  
  /*! @gera2ld/jsx-dom v2.2.2 | ISC License */
  const VTYPE_ELEMENT = 1;
  const VTYPE_FUNCTION = 2;
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const XLINK_NS = 'http://www.w3.org/1999/xlink';
  const NS_ATTRS = {
    show: XLINK_NS,
    actuate: XLINK_NS,
    href: XLINK_NS
  };
  const isLeaf = c => typeof c === 'string' || typeof c === 'number';
  const isElement = c => (c == null ? void 0 : c.vtype) === VTYPE_ELEMENT;
  const isRenderFunction = c => (c == null ? void 0 : c.vtype) === VTYPE_FUNCTION;
  function jsx(type, props) {
    let vtype;
    if (typeof type === 'string') vtype = VTYPE_ELEMENT;else if (typeof type === 'function') vtype = VTYPE_FUNCTION;else throw new Error('Invalid VNode type');
    return {
      vtype,
      type,
      props
    };
  }
  function Fragment(props) {
    return props.children;
  }
  const DEFAULT_ENV = {
    isSvg: false
  };
  function insertDom(parent, nodes) {
    if (!Array.isArray(nodes)) nodes = [nodes];
    nodes = nodes.filter(Boolean);
    if (nodes.length) parent.append(...nodes);
  }
  function mountAttributes(domElement, props, env) {
    for (const key in props) {
      if (key === 'key' || key === 'children' || key === 'ref') continue;
      if (key === 'dangerouslySetInnerHTML') {
        domElement.innerHTML = props[key].__html;
      } else if (key === 'innerHTML' || key === 'textContent' || key === 'innerText' || key === 'value' && ['textarea', 'select'].includes(domElement.tagName)) {
        const value = props[key];
        if (value != null) domElement[key] = value;
      } else if (key.startsWith('on')) {
        domElement[key.toLowerCase()] = props[key];
      } else {
        setDOMAttribute(domElement, key, props[key], env.isSvg);
      }
    }
  }
  const attrMap = {
    className: 'class',
    labelFor: 'for'
  };
  function setDOMAttribute(el, attr, value, isSVG) {
    attr = attrMap[attr] || attr;
    if (value === true) {
      el.setAttribute(attr, '');
    } else if (value === false) {
      el.removeAttribute(attr);
    } else {
      const namespace = isSVG ? NS_ATTRS[attr] : undefined;
      if (namespace !== undefined) {
        el.setAttributeNS(namespace, attr, value);
      } else {
        el.setAttribute(attr, value);
      }
    }
  }
  function flatten(arr) {
    return arr.reduce((prev, item) => prev.concat(item), []);
  }
  function mountChildren(children, env) {
    return Array.isArray(children) ? flatten(children.map(child => mountChildren(child, env))) : mount(children, env);
  }
  function mount(vnode, env = DEFAULT_ENV) {
    if (vnode == null || typeof vnode === 'boolean') {
      return null;
    }
    if (vnode instanceof Node) {
      return vnode;
    }
    if (isRenderFunction(vnode)) {
      const {
        type,
        props
      } = vnode;
      if (type === Fragment) {
        const node = document.createDocumentFragment();
        if (props.children) {
          const children = mountChildren(props.children, env);
          insertDom(node, children);
        }
        return node;
      }
      const childVNode = type(props);
      return mount(childVNode, env);
    }
    if (isLeaf(vnode)) {
      return document.createTextNode(`${vnode}`);
    }
    if (isElement(vnode)) {
      let node;
      const {
        type,
        props
      } = vnode;
      if (!env.isSvg && type === 'svg') {
        env = Object.assign({}, env, {
          isSvg: true
        });
      }
      if (!env.isSvg) {
        node = document.createElement(type);
      } else {
        node = document.createElementNS(SVG_NS, type);
      }
      mountAttributes(node, props, env);
      if (props.children) {
        let childEnv = env;
        if (env.isSvg && type === 'foreignObject') {
          childEnv = Object.assign({}, childEnv, {
            isSvg: false
          });
        }
        const children = mountChildren(props.children, childEnv);
        if (children != null) insertDom(node, children);
      }
      const {
        ref
      } = props;
      if (typeof ref === 'function') ref(node);
      return node;
    }
    throw new Error('mount: Invalid Vnode!');
  }
  
  /**
   * Mount vdom as real DOM nodes.
   */
  function mountDom(vnode) {
    return mount(vnode);
  }
  
  var css_248z$1 = ".markmap{font:300 16px/20px sans-serif}.markmap-link{fill:none}.markmap-node>circle{cursor:pointer}.markmap-foreign{display:inline-block}.markmap-foreign a{color:#0097e6}.markmap-foreign a:hover{color:#00a8ff}.markmap-foreign code{background-color:#f0f0f0;border-radius:2px;color:#555;font-size:calc(1em - 2px);padding:.25em}.markmap-foreign pre{margin:0}.markmap-foreign pre>code{display:block}.markmap-foreign del{text-decoration:line-through}.markmap-foreign em{font-style:italic}.markmap-foreign strong{font-weight:700}.markmap-foreign mark{background:#ffeaa7}";
  
  var css_248z = ".markmap-container{height:0;left:-100px;overflow:hidden;position:absolute;top:-100px;width:0}.markmap-container>.markmap-foreign{display:inline-block}.markmap-container>.markmap-foreign>div:last-child,.markmap-container>.markmap-foreign>div:last-child *{white-space:nowrap}";
  
  const globalCSS = css_248z$1;
  function linkWidth(nodeData) {
    const data = nodeData.data;
    return Math.max(4 - 2 * data.depth, 1.5);
  }
  function minBy(numbers, by) {
    const index = d3.minIndex(numbers, by);
    return numbers[index];
  }
  function stopPropagation(e) {
    e.stopPropagation();
  }
  function createViewHooks() {
    return {
      transformHtml: new Hook()
    };
  }
  
  /**
   * A global hook to refresh all markmaps when called.
   */
  const refreshHook = new Hook();
  const defaultColorFn = d3.scaleOrdinal(d3.schemeCategory10);
  const isMacintosh = typeof navigator !== 'undefined' && navigator.userAgent.includes('Macintosh');
  class Markmap {
    constructor(svg, opts) {
      this.options = Markmap.defaultOptions;
      this.revokers = [];
      this.handleZoom = e => {
        const {
          transform
        } = e;
        this.g.attr('transform', transform);
      };
      this.handlePan = e => {
        e.preventDefault();
        const transform = d3.zoomTransform(this.svg.node());
        const newTransform = transform.translate(-e.deltaX / transform.k, -e.deltaY / transform.k);
        this.svg.call(this.zoom.transform, newTransform);
      };
      this.handleClick = (e, d) => {
        let recursive = this.options.toggleRecursively;
        if (isMacintosh ? e.metaKey : e.ctrlKey) recursive = !recursive;
        this.toggleNode(d.data, recursive);
      };
      this.viewHooks = createViewHooks();
      this.svg = svg.datum ? svg : d3.select(svg);
      this.styleNode = this.svg.append('style');
      this.zoom = d3.zoom().filter(event => {
        if (this.options.scrollForPan) {
          // Pan with wheels, zoom with ctrl+wheels
          if (event.type === 'wheel') return event.ctrlKey && !event.button;
        }
        return (!event.ctrlKey || event.type === 'wheel') && !event.button;
      }).on('zoom', this.handleZoom);
      this.setOptions(opts);
      this.state = {
        id: this.options.id || this.svg.attr('id') || getId(),
        minX: 0,
        maxX: 0,
        minY: 0,
        maxY: 0
      };
      this.g = this.svg.append('g');
      this.revokers.push(refreshHook.tap(() => {
        this.setData();
      }));
    }
    getStyleContent() {
      const {
        style
      } = this.options;
      const {
        id
      } = this.state;
      const styleText = typeof style === 'function' ? style(id) : '';
      return [this.options.embedGlobalCSS && css_248z$1, styleText].filter(Boolean).join('\n');
    }
    updateStyle() {
      this.svg.attr('class', addClass(this.svg.attr('class'), 'markmap', this.state.id));
      const style = this.getStyleContent();
      this.styleNode.text(style);
    }
    toggleNode(data, recursive = false) {
      var _data$payload;
      const fold = (_data$payload = data.payload) != null && _data$payload.fold ? 0 : 1;
      if (recursive) {
        // recursively
        walkTree(data, (item, next) => {
          item.payload = _extends({}, item.payload, {
            fold
          });
          next();
        });
      } else {
        var _data$payload2;
        data.payload = _extends({}, data.payload, {
          fold: (_data$payload2 = data.payload) != null && _data$payload2.fold ? 0 : 1
        });
      }
      this.renderData(data);
    }
    initializeData(node) {
      let nodeId = 0;
      const {
        color,
        nodeMinHeight,
        maxWidth,
        initialExpandLevel
      } = this.options;
      const {
        id
      } = this.state;
      const container = mountDom(jsx("div", {
        className: `markmap-container markmap ${id}-g`
      }));
      const style = mountDom(jsx("style", {
        children: [this.getStyleContent(), css_248z].join('\n')
      }));
      document.body.append(container, style);
      const groupStyle = maxWidth ? `max-width: ${maxWidth}px` : '';
      let foldRecursively = 0;
      walkTree(node, (item, next, parent) => {
        var _item$children, _parent$state, _item$payload;
        item.children = (_item$children = item.children) == null ? void 0 : _item$children.map(child => _extends({}, child));
        nodeId += 1;
        const group = mountDom(jsx("div", {
          className: "markmap-foreign",
          style: groupStyle,
          children: jsx("div", {
            dangerouslySetInnerHTML: {
              __html: item.content
            }
          })
        }));
        container.append(group);
        item.state = _extends({}, item.state, {
          id: nodeId,
          el: group.firstChild
        });
        item.state.path = [parent == null || (_parent$state = parent.state) == null ? void 0 : _parent$state.path, item.state.id].filter(Boolean).join('.');
        color(item); // preload colors
  
        const isFoldRecursively = ((_item$payload = item.payload) == null ? void 0 : _item$payload.fold) === 2;
        if (isFoldRecursively) {
          foldRecursively += 1;
        } else if (foldRecursively || initialExpandLevel >= 0 && item.depth >= initialExpandLevel) {
          item.payload = _extends({}, item.payload, {
            fold: 1
          });
        }
        next();
        if (isFoldRecursively) foldRecursively -= 1;
      });
      const nodes = Array.from(container.childNodes).map(group => group.firstChild);
      this.viewHooks.transformHtml.call(this, nodes);
      // Clone the rendered HTML and set `white-space: nowrap` to it to detect its max-width.
      // The parent node will have a width of the max-width and the original content without
      // `white-space: nowrap` gets re-layouted, then we will get the expected layout, with
      // content in one line as much as possible, and subjecting to the given max-width.
      nodes.forEach(node => {
        var _node$parentNode;
        (_node$parentNode = node.parentNode) == null ? void 0 : _node$parentNode.append(node.cloneNode(true));
      });
      walkTree(node, (item, next, parent) => {
        var _parent$state2;
        const state = item.state;
        const rect = state.el.getBoundingClientRect();
        item.content = state.el.innerHTML;
        state.size = [Math.ceil(rect.width) + 1, Math.max(Math.ceil(rect.height), nodeMinHeight)];
        state.key = [parent == null || (_parent$state2 = parent.state) == null ? void 0 : _parent$state2.id, state.id].filter(Boolean).join('.') +
        // FIXME: find a way to check content hash
        item.content;
        next();
      });
      container.remove();
      style.remove();
    }
    setOptions(opts) {
      this.options = _extends({}, this.options, opts);
      if (this.options.zoom) {
        this.svg.call(this.zoom);
      } else {
        this.svg.on('.zoom', null);
      }
      if (this.options.pan) {
        this.svg.on('wheel', this.handlePan);
      } else {
        this.svg.on('wheel', null);
      }
    }
    setData(data, opts) {
      if (opts) this.setOptions(opts);
      if (data) this.state.data = data;
      if (!this.state.data) return;
      this.initializeData(this.state.data);
      this.updateStyle();
      this.renderData();
    }
    renderData(originData) {
      var _origin$data$state$x, _origin$data$state$y;
      if (!this.state.data) return;
      const {
        spacingHorizontal,
        paddingX,
        spacingVertical,
        autoFit,
        color
      } = this.options;
      const layout = flextree({}).children(d => {
        var _d$payload;
        if (!((_d$payload = d.payload) != null && _d$payload.fold)) return d.children;
      }).nodeSize(node => {
        const [width, height] = node.data.state.size;
        return [height, width + (width ? paddingX * 2 : 0) + spacingHorizontal];
      }).spacing((a, b) => {
        return a.parent === b.parent ? spacingVertical : spacingVertical * 2;
      });
      const tree = layout.hierarchy(this.state.data);
      layout(tree);
      const descendants = tree.descendants().reverse();
      const links = tree.links();
      const linkShape = d3.linkHorizontal();
      const minX = d3.min(descendants, d => d.x - d.xSize / 2);
      const maxX = d3.max(descendants, d => d.x + d.xSize / 2);
      const minY = d3.min(descendants, d => d.y);
      const maxY = d3.max(descendants, d => d.y + d.ySize - spacingHorizontal);
      Object.assign(this.state, {
        minX,
        maxX,
        minY,
        maxY
      });
      if (autoFit) this.fit();
      const origin = originData && descendants.find(item => item.data === originData) || tree;
      const x0 = (_origin$data$state$x = origin.data.state.x0) != null ? _origin$data$state$x : origin.x;
      const y0 = (_origin$data$state$y = origin.data.state.y0) != null ? _origin$data$state$y : origin.y;
  
      // Update the nodes
      const node = this.g.selectAll(childSelector('g')).data(descendants, d => d.data.state.key);
      const nodeEnter = node.enter().append('g').attr('data-depth', d => d.data.depth).attr('data-path', d => d.data.state.path).attr('transform', d => `translate(${y0 + origin.ySize - d.ySize},${x0 + origin.xSize / 2 - d.xSize})`);
      const nodeExit = this.transition(node.exit());
      nodeExit.select('line').attr('x1', d => d.ySize - spacingHorizontal).attr('x2', d => d.ySize - spacingHorizontal);
      nodeExit.select('foreignObject').style('opacity', 0);
      nodeExit.attr('transform', d => `translate(${origin.y + origin.ySize - d.ySize},${origin.x + origin.xSize / 2 - d.xSize})`).remove();
      const nodeMerge = node.merge(nodeEnter).attr('class', d => {
        var _d$data$payload;
        return ['markmap-node', ((_d$data$payload = d.data.payload) == null ? void 0 : _d$data$payload.fold) && 'markmap-fold'].filter(Boolean).join(' ');
      });
      this.transition(nodeMerge).attr('transform', d => `translate(${d.y},${d.x - d.xSize / 2})`);
  
      // Update lines under the content
      const line = nodeMerge.selectAll(childSelector('line')).data(d => [d], d => d.data.state.key).join(enter => {
        return enter.append('line').attr('x1', d => d.ySize - spacingHorizontal).attr('x2', d => d.ySize - spacingHorizontal);
      }, update => update, exit => exit.remove());
      this.transition(line).attr('x1', -1).attr('x2', d => d.ySize - spacingHorizontal + 2).attr('y1', d => d.xSize).attr('y2', d => d.xSize).attr('stroke', d => color(d.data)).attr('stroke-width', linkWidth);
  
      // Circle to link to children of the node
      const circle = nodeMerge.selectAll(childSelector('circle')).data(d => {
        var _d$data$children;
        return (_d$data$children = d.data.children) != null && _d$data$children.length ? [d] : [];
      }, d => d.data.state.key).join(enter => {
        return enter.append('circle').attr('stroke-width', '1.5').attr('cx', d => d.ySize - spacingHorizontal).attr('cy', d => d.xSize).attr('r', 0).on('click', (e, d) => this.handleClick(e, d)).on('mousedown', stopPropagation);
      }, update => update, exit => exit.remove());
      this.transition(circle).attr('r', 6).attr('cx', d => d.ySize - spacingHorizontal).attr('cy', d => d.xSize).attr('stroke', d => color(d.data)).attr('fill', d => {
        var _d$data$payload2;
        return (_d$data$payload2 = d.data.payload) != null && _d$data$payload2.fold && d.data.children ? color(d.data) : '#fff';
      });
      const foreignObject = nodeMerge.selectAll(childSelector('foreignObject')).data(d => [d], d => d.data.state.key).join(enter => {
        const fo = enter.append('foreignObject').attr('class', 'markmap-foreign').attr('x', paddingX).attr('y', 0).style('opacity', 0).on('mousedown', stopPropagation).on('dblclick', stopPropagation);
        fo.append('xhtml:div').select(function select(d) {
          const clone = d.data.state.el.cloneNode(true);
          this.replaceWith(clone);
          return clone;
        }).attr('xmlns', 'http://www.w3.org/1999/xhtml');
        return fo;
      }, update => update, exit => exit.remove()).attr('width', d => Math.max(0, d.ySize - spacingHorizontal - paddingX * 2)).attr('height', d => d.xSize);
      this.transition(foreignObject).style('opacity', 1);
  
      // Update the links
      const path = this.g.selectAll(childSelector('path')).data(links, d => d.target.data.state.key).join(enter => {
        const source = [y0 + origin.ySize - spacingHorizontal, x0 + origin.xSize / 2];
        return enter.insert('path', 'g').attr('class', 'markmap-link').attr('data-depth', d => d.target.data.depth).attr('data-path', d => d.target.data.state.path).attr('d', linkShape({
          source,
          target: source
        }));
      }, update => update, exit => {
        const source = [origin.y + origin.ySize - spacingHorizontal, origin.x + origin.xSize / 2];
        return this.transition(exit).attr('d', linkShape({
          source,
          target: source
        })).remove();
      });
      this.transition(path).attr('stroke', d => color(d.target.data)).attr('stroke-width', d => linkWidth(d.target)).attr('d', d => {
        const origSource = d.source;
        const origTarget = d.target;
        const source = [origSource.y + origSource.ySize - spacingHorizontal, origSource.x + origSource.xSize / 2];
        const target = [origTarget.y, origTarget.x + origTarget.xSize / 2];
        return linkShape({
          source,
          target
        });
      });
      descendants.forEach(d => {
        d.data.state.x0 = d.x;
        d.data.state.y0 = d.y;
      });
    }
    transition(sel) {
      const {
        duration
      } = this.options;
      return sel.transition().duration(duration);
    }
  
    /**
     * Fit the content to the viewport.
     */
    async fit() {
      const svgNode = this.svg.node();
      const {
        width: offsetWidth,
        height: offsetHeight
      } = svgNode.getBoundingClientRect();
      const {
        fitRatio
      } = this.options;
      const {
        minX,
        maxX,
        minY,
        maxY
      } = this.state;
      const naturalWidth = maxY - minY;
      const naturalHeight = maxX - minX;
      const scale = Math.min(offsetWidth / naturalWidth * fitRatio, offsetHeight / naturalHeight * fitRatio, 2);
      const initialZoom = d3.zoomIdentity.translate((offsetWidth - naturalWidth * scale) / 2 - minY * scale, (offsetHeight - naturalHeight * scale) / 2 - minX * scale).scale(scale);
      return this.transition(this.svg).call(this.zoom.transform, initialZoom).end().catch(noop);
    }
  
    /**
     * Pan the content to make the provided node visible in the viewport.
     */
    async ensureView(node, padding) {
      let itemData;
      this.g.selectAll(childSelector('g')).each(function walk(d) {
        if (d.data === node) {
          itemData = d;
        }
      });
      if (!itemData) return;
      const svgNode = this.svg.node();
      const {
        spacingHorizontal
      } = this.options;
      const relRect = svgNode.getBoundingClientRect();
      const transform = d3.zoomTransform(svgNode);
      const [left, right] = [itemData.y, itemData.y + itemData.ySize - spacingHorizontal + 2].map(x => x * transform.k + transform.x);
      const [top, bottom] = [itemData.x - itemData.xSize / 2, itemData.x + itemData.xSize / 2].map(y => y * transform.k + transform.y);
      // Skip if the node includes or is included in the container.
      const pd = _extends({
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }, padding);
      const dxs = [pd.left - left, relRect.width - pd.right - right];
      const dys = [pd.top - top, relRect.height - pd.bottom - bottom];
      const dx = dxs[0] * dxs[1] > 0 ? minBy(dxs, Math.abs) / transform.k : 0;
      const dy = dys[0] * dys[1] > 0 ? minBy(dys, Math.abs) / transform.k : 0;
      if (dx || dy) {
        const newTransform = transform.translate(dx, dy);
        return this.transition(this.svg).call(this.zoom.transform, newTransform).end().catch(noop);
      }
    }
  
    /**
     * Scale content with it pinned at the center of the viewport.
     */
    async rescale(scale) {
      const svgNode = this.svg.node();
      const {
        width: offsetWidth,
        height: offsetHeight
      } = svgNode.getBoundingClientRect();
      const halfWidth = offsetWidth / 2;
      const halfHeight = offsetHeight / 2;
      const transform = d3.zoomTransform(svgNode);
      const newTransform = transform.translate((halfWidth - transform.x) * (1 - scale) / transform.k, (halfHeight - transform.y) * (1 - scale) / transform.k).scale(scale);
      return this.transition(this.svg).call(this.zoom.transform, newTransform).end().catch(noop);
    }
    destroy() {
      this.svg.on('.zoom', null);
      this.svg.html(null);
      this.revokers.forEach(fn => {
        fn();
      });
    }
    static create(svg, opts, data = null) {
      const mm = new Markmap(svg, opts);
      if (data) {
        mm.setData(data);
        mm.fit(); // always fit for the first render
      }
  
      return mm;
    }
  }
  Markmap.defaultOptions = {
    autoFit: false,
    color: node => {
      var _node$state;
      return defaultColorFn(`${((_node$state = node.state) == null ? void 0 : _node$state.path) || ''}`);
    },
    duration: 500,
    embedGlobalCSS: true,
    fitRatio: 0.95,
    maxWidth: 0,
    nodeMinHeight: 16,
    paddingX: 8,
    scrollForPan: false,
    spacingHorizontal: 80,
    spacingVertical: 5,
    initialExpandLevel: -1,
    zoom: true,
    pan: false,
    toggleRecursively: false
  };
  function deriveOptions(jsonOptions) {
    const derivedOptions = {};
    const options = _extends({}, jsonOptions);
    const {
      color,
      colorFreezeLevel
    } = options;
    if ((color == null ? void 0 : color.length) === 1) {
      const solidColor = color[0];
      derivedOptions.color = () => solidColor;
    } else if (color != null && color.length) {
      const colorFn = d3.scaleOrdinal(color);
      derivedOptions.color = node => colorFn(`${node.state.path}`);
    }
    if (colorFreezeLevel) {
      const color = derivedOptions.color || Markmap.defaultOptions.color;
      derivedOptions.color = node => {
        node = _extends({}, node, {
          state: _extends({}, node.state, {
            path: node.state.path.split('.').slice(0, colorFreezeLevel).join('.')
          })
        });
        return color(node);
      };
    }
    const numberKeys = ['duration', 'maxWidth', 'initialExpandLevel'];
    numberKeys.forEach(key => {
      const value = options[key];
      if (typeof value === 'number') derivedOptions[key] = value;
    });
    const booleanKeys = ['zoom', 'pan'];
    booleanKeys.forEach(key => {
      const value = options[key];
      if (value != null) derivedOptions[key] = !!value;
    });
    return derivedOptions;
  }
  
  exports.Markmap = Markmap;
  exports.defaultColorFn = defaultColorFn;
  exports.deriveOptions = deriveOptions;
  exports.globalCSS = globalCSS;
  exports.loadCSS = loadCSS;
  exports.loadJS = loadJS;
  exports.refreshHook = refreshHook;
  
  })(this.markmap = this.markmap || {}, d3);