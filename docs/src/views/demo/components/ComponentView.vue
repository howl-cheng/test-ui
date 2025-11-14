<template>
  <div class="component-view" v-loading="loading" element-loading-text="Loading...">
    <div v-if="error" class="view-error">{{ error }}</div>
    <div v-else class="view-content" ref="componentViewRef"></div>
  </div>
</template>
<script setup>
import HnyUI, { directive, setRequestParams } from 'hny-ui'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { loadModule } from 'vue3-sfc-loader'
import { useDemoStore } from '@/store'
const demoStore = useDemoStore()
const componentViewRef = ref(null)
const loading = ref(false)
const error = ref('')
let appInstance = null
let styleElements = []

watch(() => demoStore.code,  () => {
  nextTick(() => {
    renderComponent()
  })
})

watch(() => demoStore.settingParams,  () => {
  nextTick(() => {
    renderComponent()
  })
}, { deep: true })

onUnmounted(() => {
  clearComponent()
})

const clearComponent = () => {
  if (appInstance) {
    appInstance.unmount()
  }
  // 清理样式标签
  styleElements.forEach(style => {
    if (style.parentNode) {
      style.parentNode.removeChild(style)
    }
  })
  styleElements = []
}

const renderComponent = async () => {
  if (!componentViewRef.value) return
  loading.value = true
  error.value = ''
  clearComponent()
  componentViewRef.value.innerHTML = ''
  setRequestParams(demoStore.settingParams)
  try {
    const options = {
      moduleCache: {
        vue: await import('vue')
      },
      getFile: () => demoStore.code,
      addStyle: (styleStr) => {
        const style = document.createElement('style');
        style.textContent = styleStr;
        document.head.appendChild(style);
        styleElements.push(style);
      },
      log: () => {} // 禁用内部日志
    }
    const Component = await loadModule('./virtual-component.vue', options)
    appInstance = createApp(Component)
    // 挂在组件库
    appInstance.use(directive)
    appInstance.use(HnyUI)
    appInstance.use(ElementPlus)
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      appInstance.component(key, component)
    }
    // 挂在节点
    appInstance.mount(componentViewRef.value)
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}

</script>