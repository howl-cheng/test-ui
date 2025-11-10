# 安装

本文档将指导你如何在项目中安装和使用 hny-ui 组件库。

## 📦 安装步骤

### 1. 安装 hny-ui

使用你喜欢的包管理器安装 hny-ui：

```bash
# 使用 npm
npm install hny-ui

# 使用 pnpm（推荐）
pnpm add hny-ui

# 使用 yarn
yarn add hny-ui
```

### 2. 安装依赖

hny-ui 依赖于以下包，请确保你的项目中已安装：

```bash
# 安装 Vue 3（如果还没有）
npm install vue@^3.3.0

# 安装 Element Plus（必需）
npm install element-plus@^2.11.5
```

或者使用 pnpm：

```bash
pnpm add vue@^3.3.0 element-plus@^2.11.5
```

## 🚀 使用方式

### 方式一：完整导入（推荐用于快速开始）

在 `main.js` 或 `main.ts` 中：

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import hnyUI from 'hny-ui'
import 'hny-ui/styles'

const app = createApp(App)
app.use(ElementPlus)
app.use(hnyUI)
app.mount('#app')
```

### 方式二：按需导入（推荐用于生产环境）

#### 导入组件

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 按需导入组件
import { HbButton, HcHeader, HbBasicInfo, HbStructureType } from 'hny-ui'
// 导入样式
import 'hny-ui/styles'

const app = createApp(App)
app.use(ElementPlus)
// 注册组件
app.component('HbButton', HbButton)
app.component('HcHeader', HcHeader)
app.component('HbBasicInfo', HbBasicInfo)
app.component('HbStructureType', HbStructureType)
app.mount('#app')
```
这里只是示例作用，具体按需导入需要不建议在main.js挨个注册，最好统一封装注册组件方法，例如
```javascript
const allComponent = { HbButton, HcHeader, HbBasicInfo, .... }
export default {
  install (app) {
    //注册自定义组件全局组件
    Object.keys(allComponent).forEach(key => {
      app.component(key, allComponent[key])
    })
  }
```
#### 在组件中使用

```javascript
<template>
  <div>
    <hb-button label="点击我" type="primary" />
    <hc-header title="页面标题" />
  </div>
</template>

<script setup>
// 无需导入，组件已全局注册
</script>
```

### 方式三：单组件导入（最小化打包体积）

在需要的组件中直接导入：

```javascript
<template>
  <div>
    <hb-button label="点击我" type="primary" @click="handleClick" />
  </div>
</template>

<script setup>
import { HbButton } from 'hny-ui'
import 'hny-ui/styles'

const handleClick = () => {
  console.log('按钮被点击了')
}
</script>
```

### 方式四：从子包导入

你也可以从特定的子包导入：

```javascript
// 导入组件
import { HbButton, HcHeader } from 'hny-ui/components'

// 导入工具函数
import { someUtilFunction } from 'hny-ui/utils'

// 导入 hooks
import { useNamespace } from 'hny-ui/hooks'

// 导入样式
import 'hny-ui/styles'
```

## 📝 TypeScript 支持

hny-ui 完全支持 TypeScript，你可以直接使用：

```typescript
import { createApp } from 'vue'
import type { App } from 'vue'
import hnyUI from 'hny-ui'
import 'hny-ui/styles'

const app: App = createApp({})
app.use(hnyUI)
```

类型定义会自动提供，无需额外配置。

## 🎨 样式导入

无论使用哪种导入方式，都需要导入样式文件：

```javascript
import 'hny-ui/styles'
```

或者如果你只需要特定组件的样式：

```javascript
// 在构建工具中配置按需导入样式
// 具体配置请参考下方"构建工具配置"
```
## 🎨 按钮权限

无论使用哪种导入方式，都需要进行权限列表的设置，具体配置请参考工具指令:v-hasPremi

## ⚙️ 构建工具配置

### Vite 配置

如果你使用 Vite，可以在 `vite.config.js` 或 `vite.config.ts` 中配置：

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // 其他配置...
})
```

### 按需导入优化

为了减少打包体积，你可以使用插件实现真正的按需导入：

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        // 配置 hny-ui 组件自动导入
        // 需要相应的插件支持
      ]
    })
  ]
})
```

## ✅ 验证安装

安装完成后，你可以在组件中测试：

```javascript
<template>
  <div>
    <hb-button label="测试按钮" type="primary" />
  </div>
</template>

<script setup>
import { HbButton } from 'hny-ui'
import 'hny-ui/styles'
</script>
```

如果按钮正常显示，说明安装成功！

## 🔧 常见问题

### Q: 安装后组件无法显示？

A: 请确保：
1. 已安装并注册 Element Plus
2. 已导入样式文件 `import 'hny-ui/styles'`
3. 已正确注册组件或使用全局注册

### Q: TypeScript 报错找不到类型定义？

A: 确保已安装 `hny-ui` 的完整版本，类型定义包含在包中。如果问题仍然存在，检查 `tsconfig.json` 中的类型配置。

### Q: 样式不生效？

A: 请确保：
1. 已导入 `import 'hny-ui/styles'`
2. 已导入 Element Plus 样式 `import 'element-plus/dist/index.css'`
3. 检查构建工具是否正确处理 CSS 文件

### Q: 如何实现真正的按需导入？

A: 推荐使用 `unplugin-vue-components` 插件，可以自动按需导入组件和样式。具体配置请参考相关插件文档。

### Q: 支持 Vue 2 吗？

A: 不支持。hny-ui 基于 Vue 3 开发，需要 Vue 3.3.0 或更高版本。

## 📚 下一步

安装完成后，你可以：

1. 📖 查看 [组件文档](../) - 了解各个组件的详细用法
2. 🛠️ 查看 [工具函数](../docs/utils) - 了解可用的工具函数和 hooks
3. 🎨 查看 [示例演示](./demo) - 了解如何自定义主题

## 🔗 相关链接

- [准备工作](./prepare) - 环境要求
- [Vue 3 文档](https://vuejs.org/) - Vue 3 官方文档
- [Element Plus 文档](https://element-plus.org/) - Element Plus 官方文档

