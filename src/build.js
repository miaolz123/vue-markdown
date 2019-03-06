import VueMarkdownComponent from './VueMarkdown'

export function install(Vue, options) {
  const _options = Object.assign({
    tag: 'vue-markdown'
  }, options)

  Vue.component(_options.tag, VueMarkdownComponent)
}
