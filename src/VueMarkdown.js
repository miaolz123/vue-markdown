import Vue from 'vue'
import MarkdownIt from 'markdown-it'
import table from 'markdown-it-synapse-table'
import emoji from 'markdown-it-emoji'
import subscript from 'markdown-it-sub'
import superscript from 'markdown-it-sup'
import footnote from 'markdown-it-footnote'
import deflist from 'markdown-it-deflist'
import abbreviation from 'markdown-it-abbr'
import insert from 'markdown-it-ins'
import mark from 'markdown-it-mark'
import toc from 'markdown-it-toc-and-anchor'
import Prism from 'prismjs'

let md = new MarkdownIt()

export default {
  template: '<div></div>',
  props: {
    source: {
      type: String,
      default: ``,
    },
    show: {
      type: Boolean,
      default: true,
    },
    html: {
      type: Boolean,
      default: true,
    },
    xhtmlOut: {
      type: Boolean,
      default: true,
    },
    breaks: {
      type: Boolean,
      default: true,
    },
    linkify: {
      type: Boolean,
      default: true,
    },
    typographer: {
      type: Boolean,
      default: true,
    },
    quotes: {
      type: String,
      default: '“”‘’',
    },
    toc: {
      type: Boolean,
      default: false,
    },
    tocId: {
      type: String,
      default: 'my-toc',
    },
    tocClass: {
      type: String,
      default: 'section table-of-contents',
    },
    tocFirstLevel: {
      type: Number,
      default: 2,
    },
    tocLastLevel: {
      type: Number,
      default: 2,
    },
    tocAnchorLink: {
      type: Boolean,
      default: true,
    },
    tocAnchorLinkSymbol: {
      type: String,
      default: '#',
    },
    tocAnchorLinkSpace: {
      type: Boolean,
      default: true,
    },
    tocAnchorClass: {
      type: String,
      default: 'toc-anchor-class',
    },
    tocAnchorLinkClass: {
      type: String,
      default: 'toc-anchor-link-class',
    },
  },
  ready() {
    const op = {
      html: this.html,
      xhtmlOut: this.xhtmlOut,
      breaks: this.breaks,
      linkify: this.linkify,
      typographer: this.typographer,
      quotes: this.quotes,
      highlight: (code, lang) => {
        const l = Prism.languages[lang]
        if (l) return Prism.highlight(code, l)
        return ''
      },
    }
    md = new MarkdownIt(op).use(table).use(emoji).use(subscript).use(footnote)
      .use(superscript).use(deflist).use(abbreviation).use(insert).use(mark)
    if (this.toc) md.use(toc, {
      tocClassName: this.tocClass,
      tocFirstLevel: this.tocFirstLevel,
      tocLastLevel: this.tocLastLevel,
      anchorLink: this.tocAnchorLink,
      anchorLinkSymbol: this.tocAnchorLinkSymbol,
      anchorLinkSpace: this.tocAnchorLinkSpace,
      anchorClassName: this.tocAnchorClass,
      anchorLinkSymbolClassName: this.tocAnchorLinkClass,
      tocCallback: (tocMarkdown, tocArray, tocHtml) => {
        if (this.tocId && document.getElementById(this.tocId)) {
          console.log(1212)
          document.getElementById(this.tocId).innerHTML = tocHtml
        }
        this.$dispatch('toc', tocHtml)
      },
    })
    const outHtml = md.render(this.source)
    if (this.show) this.$el.innerHTML = outHtml
    this.$dispatch('parsed', outHtml)
    this.$watch('source', function (newVal) {
      const outHtml = md.render(newVal)
      this.out = outHtml
      if (this.show) this.$el.innerHTML = outHtml
      this.$dispatch('parsed', outHtml)
    })
  },
}
