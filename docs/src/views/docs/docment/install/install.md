# 安装

### 安装 hny-ui

```bash
npm install hny-ui
```

### 完整导入

在 `main.js` 或 `main.ts` 中：

```javascript
import HnyUI from 'hny-ui'
import 'hny-ui/styles'

app.use(HnyUI)
```

### 按需导入

```javascript
import { HbButton, HcHeader, HbBasicInfo } from 'hny-ui'
import 'hny-ui/styles'

app.component('HbButton', HbButton)
app.component('HcHeader', HcHeader)
app.component('HbBasicInfo', HbBasicInfo)
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
### 在组件中使用

```javascript
<template>
  <div>
    <hb-button label="点击我" type="primary" />
    <hc-header title="页面标题" />
  </div>
</template>
<script setup>
</script>
```

### 单组件导入

在需要的组件中直接导入：

```javascript
<template>
  <div>
    <hb-button label="点击我" type="primary" @click="handleClick" />
  </div>
</template>

<script setup>
import { HbButton } from 'hny-ui'

const handleClick = () => {
  console.log('按钮被点击了')
}
</script>
```

### 从子包导入

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

## 📚 下一步

安装完成后，你可以：

1. 📖 查看 [组件文档](../) - 了解各个组件的详细用法
2. 🛠️ 查看 [工具函数](../docs/utils) - 了解可用的工具函数和 hooks
3. 🎨 查看 [示例演示](./demo) - 了解如何自定义主题

## 🔗 相关链接

- [准备工作](./prepare) - 环境要求
- [Vue 3 文档](https://vuejs.org/) - Vue 3 官方文档
- [Element Plus 文档](https://element-plus.org/) - Element Plus 官方文档

