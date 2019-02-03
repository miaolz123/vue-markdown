import Vue from 'vue'

export default interface VueMarkdown extends Vue {
  watches: Array<string>
  source: string
  show: boolean
  highlight: boolean
  html: boolean
  xhtmlOut: boolean
  breaks: boolean
  linkify: boolean
  emoji: boolean
  typographer: boolean
  langPrefix: string
  quotes: string
  tableClass: string
  taskLists: boolean
  toc: boolean
  tocId: string
  tocClass: string
  tocFirstLevel: number
  tocLastLevel: number
  tocAnchorLink: boolean
  tocAnchorClass: string
  tocAnchorLinkSymbol: string
  tocAnchorLinkSpace: boolean
  tocAnchorLinkClass: string
  anchorAttributes: object
  prerender: Function
  postrender: Function
}
