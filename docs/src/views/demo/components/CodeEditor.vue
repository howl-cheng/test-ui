<template>
  <div class="code-editor">
    <div class="editor-header">
      <el-button type="info" size="small" circle icon="Refresh" @click="handleRefresh"></el-button>
      <el-button type="info" size="small" circle icon="VideoPlay" @click="handlePlay"></el-button>
    </div>
    <div ref="codeEditorRef" class="editor-content"></div>
  </div>
</template>
<script setup>
import loader from '@monaco-editor/loader'
import { useDemoStore } from '@/store'

const demoStore = useDemoStore()
const codeEditorRef = ref(null);
let editor = null;
let startCode = ref('')
watch(() => demoStore.activeItem, () => {
  nextTick(() => {
    startCode.value = JSON.parse(JSON.stringify(demoStore.code))
    if (!editor) {
      initEditor()
    } else {
      editor.setValue(demoStore.code)
    }
  })
})
// 初始化编辑器
const initEditor = async () => {
  const monaco = await loader.init()
  editor = monaco.editor.create(codeEditorRef.value, {
    value: demoStore.code,
    language: 'html',
    theme: 'vs-dark',
    automaticLayout: true,
    minimap: {
      enabled: false
    },
    fontSize: 12,
    scrollBeyondLastLine: false,
  })
}
// 恢复代码
const handleRefresh = () => {
  if (!editor) return
  editor.setValue(startCode.value)
  demoStore.action_code(editor.getValue())
}
// 执行代码
const handlePlay = () => {
  if (!editor) return
  demoStore.action_code(editor.getValue())
}
</script>