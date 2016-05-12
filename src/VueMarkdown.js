import markdownIt from 'markdown-it'
import emoji from 'markdown-it-emoji'
import subscript from 'markdown-it-sub'
import superscript from 'markdown-it-sup'
import footnote from 'markdown-it-footnote'
import deflist from 'markdown-it-deflist'
import abbreviation from 'markdown-it-abbr'
import insert from 'markdown-it-ins'
import mark from 'markdown-it-mark'
import toc from 'markdown-it-toc-and-anchor'

let md = new markdownIt()

const rende = (root) => {
  md = new markdownIt().use(subscript).use(superscript)
    .use(footnote).use(deflist).use(abbreviation).use(insert).use(mark)
  if (root.emoji) md.use(emoji)
  md.set({
    html: root.html,
    xhtmlOut: root.xhtmlOut,
    breaks: root.breaks,
    linkify: root.linkify,
    typographer: root.typographer,
    langPrefix: root.langPrefix,
    quotes: root.quotes,
  })
  md.renderer.rules.table_open = () => `<table class="${root.tableClass}">\n`
  if (!root.tocLastLevel) root.tocLastLevel = root.tocFirstLevel + 1
  if (root.toc) {
    md.use(toc, {
      tocClassName: root.tocClass,
      tocFirstLevel: root.tocFirstLevel,
      tocLastLevel: root.tocLastLevel,
      anchorLink: root.tocAnchorLink,
      anchorLinkSymbol: root.tocAnchorLinkSymbol,
      anchorLinkSpace: root.tocAnchorLinkSpace,
      anchorClassName: root.tocAnchorClass,
      anchorLinkSymbolClassName: root.tocAnchorLinkClass,
      tocCallback: (tocMarkdown, tocArray, tocHtml) => {
        if (tocHtml) {
          if (root.tocId && document.getElementById(root.tocId))
            document.getElementById(root.tocId).innerHTML = tocHtml
          root.$dispatch('toc-rendered', tocHtml)
        }
      },
    })
  } else if (root.tocId && document.getElementById(root.tocId))
    document.getElementById(root.tocId).innerHTML = ''
  const outHtml = root.show ? md.render(root.source) : ''
  root.$el.innerHTML = outHtml
  root.$dispatch('rendered', outHtml)
}

export default {
  template: '<div></div>',
  props: {
    watches: {
      type: Array,
      default: () => ['source', 'show', 'toc'],
    },
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
    emoji: {
      type: Boolean,
      default: true,
    },
    typographer: {
      type: Boolean,
      default: true,
    },
    langPrefix: {
      type: String,
      default: 'language-',
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
      default: 'table-of-contents',
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
  data: () => ({
    msg: 'hello',
  }),
  ready() {
    rende(this)
    this.$watch('source', () => { rende(this) })
    this.watches.forEach((v) => {
      this.$watch(v, () => { rende(this) })
    })
  },
}
