<template>
  <div class="code-editor">
    <div class="editor-header">
      <el-button type="info" size="small" circle icon="Refresh" @click="handleRefresh"></el-button>
      <el-button type="info" size="small" circle icon="VideoPlay" @click="handlePlay"></el-button>
      <el-button type="info" size="small" circle icon="Setting" @click="handleSetting"></el-button>
    </div>
    <div ref="codeEditorRef" class="editor-content"></div>
    <el-drawer v-model="settingVisible" title="请求参数配置" size="20%">
      <el-form :model="settingParams" label-width="100px" label-position="top">
        <el-form-item label="timeout">
          <el-input v-model="settingParams.timeout" placeholder="请输入timeout"></el-input>
        </el-form-item>
        <el-form-item label="baseURL">
          <el-input v-model="settingParams.baseURL" placeholder="请输入baseURL"></el-input>
        </el-form-item>
        <el-form-item label="clientId">
          <el-input v-model="settingParams.clientId" placeholder="请输入clientid"></el-input>
        </el-form-item>
        <el-form-item label="token">
          <el-input v-model="settingParams.token" type="textarea" :rows="10" placeholder="请输入token"></el-input>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script setup>
import loader from '@monaco-editor/loader'
import { useDemoStore } from '@/store'
const demoStore = useDemoStore()
const codeEditorRef = ref(null);
const settingVisible = ref(false)
const settingParams = ref(demoStore.settingParams)
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

const handleSetting = () => {
  settingVisible.value = true
}

</script>