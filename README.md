# vue-markdown

[![npm](https://img.shields.io/npm/v/vue-markdown.svg?style=flat)](https://www.npmjs.com/package/vue-markdown)
[![npm](https://img.shields.io/npm/l/vue-markdown.svg?style=flat)](https://www.npmjs.com/package/vue-markdown)
[![npm](https://img.shields.io/npm/dt/vue-markdown.svg?style=flat)](https://www.npmjs.com/package/vue-markdown)

A Powerful and Highspeed Markdown Parser for Vue.

Quick start: `<vue-markdown>i am a ~~tast~~ **test**.</vue-markdown>`

Supported Markdown Syntax:

* [x] automatic table of contents
* [x] table & class customize
* [x] *SyntaxHighlighter
* [x] definition list
* [x] strikethrough
* [x] abbreviation
* [x] superscript
* [x] subscript
* [x] footnote
* [x] insert
* [x] emoji
* [x] mark

`*SyntaxHighlighter` work with [Prism](http://prismjs.com) recommend

# Instllation

### Browser globals

> The **dist** folder contains `vue-markdown.js` and `vue-markdown.min.js` with the component exported in the `window.VueMarkdown` object. 

```html
<body>
  <vue-markdown>i am a ~~tast~~ **test**.</vue-markdown>
</body>
<script src="path/to/vue.js"></script>
<script src="path/to/vue-markdown.js"></script>
<script>
    Vue.use(VueMarkdown);
    var vm = new Vue({
        el: "body"
    });
</script>
```

### NPM

```shell
$ npm install --save vue-markdown
```

## CommonJS

```js
var VueMarkdown = require('vue-markdown');

new Vue({
  components: {
    'vue-markdown': VueMarkdown
  }
})
```

## ES6

```js
import VueMarkdown from 'vue-markdown'

new Vue({
  components: {
    VueMarkdown
  }
})
```

# Example

[Live Demo](http://miaolz123.github.io/vue-markdown/)

# Slots

```html
<vue-markdown>this is the default slot</vue-markdown>
```

VueMarkdown has a default slot which used to write `markdown` source.

TIP: The default slot only render **once** at the beginning, and it will overwrite the prop of `source`!

# Props

| Prop | Type | Default | Describe |
| ---- | ---- | ------- | ------- |
| watches | Array | `["source", "show", "toc"]` | HTML refresh automatically when the prop in this array changed |
| source | String | `null` | the markdown source code |
| show | Boolean | `true` | enable render to the default slot automatically |
| html | Boolean | `true` | enable HTML syntax in source |
| xhtml-out | Boolean | `true` | `<br></br>` => `<br />` |
| breaks | Boolean | `true` | `\n` => `<br>` |
| linkify | Boolean | `true` | autoconvert URL-like text to link |
| emoji | Boolean | `true` | `:)` => `😃` |
| typographer | Boolean | `true` | enable some language-neutral replacement and quotes beautification |
| lang-prefix | String | `language-` | CSS language prefix for fenced blocks |
| quotes | String | `“”‘’` | use `“”‘’` for Chinese, `„“‚‘` for German, `«»„“` for Russian |
| table-class | String | `table` | customize html class of the `<table>` |
| toc | Boolean | `false` | enable automatic table of contents |
| toc-id | String | `undefined` | the HTML id to render TOC |
| toc-class | String | `table` | customize html class of the `<ul>` wrapping the TOC |
| toc-first-level | Number | `2` | use `2` if you want to skip `<h1>` from the TOC |
| toc-last-level | Number | `'toc-first-level' + 1` | use `5` if you want to skip `<h6>` from the TOC |
| toc-anchor-link | Boolean | `true` | enable the automatic anchor link in the headings |
| toc-anchor-class | String | `toc-anchor` | customize the anchor class name |
| toc-anchor-link-symbol | String | `#` | customize the anchor link symbol |
| toc-anchor-link-space | Boolean | `true` | enable inserting a space between the anchor link and heading |
| toc-anchor-link-class | String | `toc-anchor-link` | customize the anchor link symbol class name |

# Events

| Name | Param[Type] | Describe |
| ---- | --------- | -------- |
| rendered | outHtml[String] | dispatch when render finish |
| toc-rendered | tocHtml[String] | dispatch when TOC render finish, never dispatch if the toc[prop] is `false` |

# Thanks

- [markdown-it](https://github.com/markdown-it/markdown-it)
- [transtone](https://github.com/transtone)

# License

Copyright (c) 2016 [miaolz123](https://github.com/miaolz123) by [MIT](https://opensource.org/licenses/MIT)