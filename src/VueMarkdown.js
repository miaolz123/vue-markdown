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

const md = new markdownIt().use(emoji).use(subscript).use(superscript)
  .use(footnote).use(deflist).use(abbreviation).use(insert).use(mark)

const rende = (root) => {
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
  if (root.toc) md.use(toc, {
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
        root.$dispatch('toc', tocHtml)
      }
    },
  })
  const outHtml = md.render(root.source)
  if (root.show) root.$el.innerHTML = outHtml
  root.$dispatch('parsed', outHtml)
}

export default {
  template: '<div v-on:click="rende" ></div>',
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
  methods: {
    rende: function () {
      rende(this)
    }
  },
  ready() {
    rende(this)
    this.$watch('source', function () {
      const outHtml = md.render(this.source)
      if (this.show) this.$el.innerHTML = outHtml
      this.$dispatch('parsed', outHtml)
    })
  },
}
