<template>
  <div class="docs-container">
    <div class="docs-content" v-html="htmlContent"></div>
  </div>
</template>
<script setup>
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

const htmlContent = ref('')

const generateHtmlContent = async () => {
  const mdContent = await import(`./prepare.md?raw`)
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang }).value}</code></pre>`
      }
      return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
    }
  })
  htmlContent.value = md.render(mdContent.default)
}

onMounted(() => {
  generateHtmlContent()
})
</script> 