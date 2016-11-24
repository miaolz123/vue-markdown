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

export default {
  md: new markdownIt(),

  template: '<div><slot></slot></div>',

  data() {
    return {
      sourceData: this.source,
    }
  },

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

  computed: {
    tocLastLevelComputed() {
      return this.tocLastLevel > this.tocFirstLevel ? this.tocLastLevel : this.tocFirstLevel + 1
    }
  },

  render(createElement) {
    this.md = new markdownIt()
      .use(subscript)
      .use(superscript)
      .use(footnote)
      .use(deflist)
      .use(abbreviation)
      .use(insert)
      .use(mark)

    if (this.emoji) {
      this.md.use(emoji)
    }

    this.md.set({
      html: this.html,
      xhtmlOut: this.xhtmlOut,
      breaks: this.breaks,
      linkify: this.linkify,
      typographer: this.typographer,
      langPrefix: this.langPrefix,
      quotes: this.quotes,
    })
    this.md.renderer.rules.table_open = () => `<table class="${this.tableClass}">\n`

    if (this.toc) {
      this.md.use(toc, {
        tocClassName: this.tocClass,
        tocFirstLevel: this.tocFirstLevel,
        tocLastLevel: this.tocLastLevelComputed,
        anchorLink: this.tocAnchorLink,
        anchorLinkSymbol: this.tocAnchorLinkSymbol,
        anchorLinkSpace: this.tocAnchorLinkSpace,
        anchorClassName: this.tocAnchorClass,
        anchorLinkSymbolClassName: this.tocAnchorLinkClass,
        tocCallback: (tocMarkdown, tocArray, tocHtml) => {
          if (tocHtml) {
            if (this.tocId && document.getElementById(this.tocId)) {
              document.getElementById(this.tocId).innerHTML = tocHtml
            }

            this.$emit('toc-rendered', tocHtml)
          }
        },
      })
    }

    const outHtml = this.show ? this.md.render(this.sourceData) : ''

    this.$emit('rendered', outHtml)
    return createElement(
      'div', {
        domProps: {
          innerHTML: outHtml,
        },
      },
    )
  },

  beforeMount() {
    if (this.$slots.default) {
      this.sourceData = ''
      for (let slot of this.$slots.default) {
        this.sourceData += slot.text
      }
    }

    this.$watch('source', () => {
      this.rende()
    })

    this.watches.forEach((v) => {
      this.$watch(v, () => {
        this.rende()
      })
    })
  },
}
