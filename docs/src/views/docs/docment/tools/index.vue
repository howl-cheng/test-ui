<template>
  <div class="docs-utils">
    <div class="utils-left" ref="containerRef">
      <div v-for="item in tabList" :key="item.id" :id="item.id  ">
        <div v-for="child in item.children" :key="child.id" :id="child.id">
          <div class="docs-content" v-html="htmlContentMap[child.id] || ''"></div>
        </div>
      </div>
    </div>
    <div class="utils-right">
      <el-anchor
        :container="containerRef"
        direction="vertical"
      >
        <el-anchor-link v-for="item in tabList" :key="item.id" :href="`#${item.id}`" :title="item.title">
          <template #sub-link>
            <el-anchor-link v-for="child in item.children" :key="child.id" :href="`#${child.id}`" :title="child.title"></el-anchor-link>
          </template>
        </el-anchor-link>
      </el-anchor>
    </div>
  </div>
</template>
<script setup>
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
const containerRef = ref(null)
const htmlContentMap = ref({})

const tabList = ref([
  { id: 'utils', title: 'utils(函数)', children: [
    { id: 'timeParse', path: 'utils/timeParse', title: 'timeParse(解析时间)' },
    { id: 'handleTree', path: 'utils/handleTree', title: 'handleTree(数组转树)' }
  ]},
  { id: 'hooks', title: 'hooks(钩子)', children: [
    { id: 'useNamespace', path: 'hooks/useNamespace', title: 'useNamespace(命名空间)' }
  ]},
  { id: 'directive', title: 'directive（指令）', children: [
    { id: 'hasPermi', path: 'directives/hasPermi', title: 'v-hasPermi(按钮权限判断)' },
    { id: 'resizeH', path: 'directives/resizeH', title: 'v-resizeH(表格高度适应)' }
  ]}
])

// 使用 import.meta.glob 预加载所有 markdown 文件
const mdModules = import.meta.glob('./**/*.md', { eager: true, as: 'raw' })

const generateHtmlContent = (path) => {
  // 构建完整的文件路径
  const filePath = `./${path}.md`
  const mdContent = mdModules[filePath]
  
  if (!mdContent) {
    console.warn(`Markdown file not found: ${filePath}`)
    return ''
  }
  
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
  let html = md.render(mdContent)
  return html
}

// 加载所有 markdown 内容
onMounted(() => {
  for (const item of tabList.value) {
    for (const child of item.children) {
      const html = generateHtmlContent(child.path)
      htmlContentMap.value[child.id] = html
    }
  }
})
</script>
