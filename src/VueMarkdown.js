import markdownIt from 'markdown-it'
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

const md = new markdownIt().use(emoji).use(subscript).use(superscript)
  .use(footnote).use(deflist).use(abbreviation).use(insert).use(mark)

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
    tableClass: {
      type: String,
      default: 'table',
    },
    toc: {
      type: Boolean,
      default: false,
    },
    tocId: {
      type: String,
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
    },
    tocAnchorLink: {
      type: Boolean,
      default: true,
    },
    tocAnchorClass: {
      type: String,
      default: 'toc-anchor',
    },
    tocAnchorLinkSymbol: {
      type: String,
      default: '#',
    },
    tocAnchorLinkSpace: {
      type: Boolean,
      default: true,
    },
    tocAnchorLinkClass: {
      type: String,
      default: 'toc-anchor-link',
    },
  },
  ready() {
    md.set({
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
    })
    md.renderer.rules.table_open = () => `<table class="${this.tableClass}">\n`
    if (!this.tocLastLevel) this.tocLastLevel = this.tocFirstLevel + 1
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
        if (tocHtml) {
          if (this.tocId && document.getElementById(this.tocId))
            document.getElementById(this.tocId).innerHTML = tocHtml
          this.$dispatch('toc', tocHtml)
        }
      },
    })
    const outHtml = md.render(this.source)
    if (this.show) this.$el.innerHTML = outHtml
    this.$dispatch('parsed', outHtml)
    this.$watch('source', function () {
      const outHtml = md.render(this.source)
      if (this.show) this.$el.innerHTML = outHtml
      this.$dispatch('parsed', outHtml)
    })
  },
}
