# v-resizeH(自适应高度)

`resizeH` 是一个用于自动调整元素高度的自定义指令，根据前一个兄弟元素的高度动态计算并设置当前元素的高度。

## 功能说明

- ✅ 自动根据前一个兄弟元素高度调整当前元素高度
- ✅ 响应式监听父元素和兄弟元素尺寸变化
- ✅ 支持动态切换计算模式
- ✅ 自动清理资源，避免内存泄漏

## 指令参数

### binding.value

- **类型**: `boolean`
- **必填**: 否（默认为 `false`）
- **说明**: 
  - `true`: 高度为 `calc(100% - (前一个元素高度 + 10) / 100rem)`
  - `false`: 高度为 `100%`

## 安装方式

### 方法一：通过插件方式全局安装（推荐）

```javascript
import { createApp } from 'vue'
import { directive } from 'hny-ui'
import App from './App.vue'

const app = createApp(App)
app.use(directive)
app.mount('#app')
```

### 方法二：单独引入并注册

```javascript
import { createApp } from 'vue'
import { resizeH } from 'hny-ui'
import App from './App.vue'

const app = createApp(App)
app.directive('resizeH', resizeH)
app.mount('#app')
```

## 使用示例

### 基础用法

```html
<template>
  <div class="container">
    <!-- 搜索区域 -->
    <div class="search-box">搜索表单</div>
    
    <!-- 表格区域，自动根据搜索框高度调整 -->
    <el-table v-resizeH="true" :data="tableData">
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="age" label="年龄" />
    </el-table>
  </div>
</template>
```

### 不使用计算模式

```html
<template>
  <div class="container">
    <div class="search-box">搜索表单</div>
    
    <!-- 高度设置为 100% -->
    <el-table v-resizeH="false" :data="tableData">
      <el-table-column prop="name" label="姓名" />
    </el-table>
  </div>
</template>
```

### 动态切换

```html
<template>
  <div class="container">
    <div class="search-box" v-show="showSearch">搜索表单</div>
    
    <!-- 根据搜索框显示状态动态调整 -->
    <el-table v-resizeH="showSearch" :data="tableData">
      <el-table-column prop="name" label="姓名" />
    </el-table>
    
    <el-button @click="showSearch = !showSearch">
      切换搜索框
    </el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showSearch = ref(true)
const tableData = ref([...])
</script>
```

## 注意事项

- 指令会自动查找当前元素的前一个兄弟元素来计算高度
- 如果找不到前一个兄弟元素，会输出警告并将高度设置为 `100%`
- 指令会在组件卸载时自动清理 ResizeObserver，无需手动处理

