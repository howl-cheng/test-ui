# hny-ui

hny-ui 统一组件库 - 基于 Vue 3 的现代化组件库，包含组件、工具、主题和钩子。

## ✨ 特性

- 🚀 基于 Vue 3 + TypeScript 开发
- 📦 支持按需导入，减少打包体积
- 🎨 提供完整的主题系统
- 🔧 丰富的工具函数和组合式 API
- 📱 响应式设计，支持移动端
- 🌍 国际化支持
- 📖 完整的 TypeScript 类型定义

## 📦 安装

```bash
npm install hny-ui
# 或
pnpm add hny-ui
# 或
yarn add hny-ui
```

## 🚀 快速开始

### 完整导入

```javascript
import hny from 'hny-ui'
import 'hny-ui/styles'
import { createApp } from 'vue'

const app = createApp()
app.use(hny)
```

### 按需导入

```javascript
// 导入组件
import { hnyButton, hnyHeader } from 'hny-ui'

// 导入工具函数
import { someUtilFunction } from 'hny-ui'

// 导入 hooks
import { useNamespace } from 'hny-ui'

// 导入样式
import 'hny-ui/styles'
```

### 子包导入

```javascript
// 从子包导入
import { HnyButton } from 'hny-ui/components'
import { someUtilFunction } from 'hny-ui/utils'
import { useNamespace } from 'hny-ui/hooks'
import 'hny-ui/styles'
```

## 📚 组件使用

### Button 按钮

```vue
<template>
  <hny-Button 
    label="点击我" 
    type="primary" 
    size="medium"
    @click="handleClick"
  />
</template>

<script setup>
const handleClick = () => {
  console.log('按钮被点击了')
}
</script>
```

### Header 头部

```vue
<template>
  <hny-Header title="页面标题" />
</template>
```

## 🛠️ 开发

### 环境要求

- Node.js >= 16
- pnpm >= 8

### 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建所有包
pnpm build

# 运行示例项目
pnpm dev:examples

# 类型检查
pnpm typecheck

# 清理构建文件
pnpm clean
```

### 项目结构

```
hny-ui/
├── packages/           # 核心包
│   ├── components/     # 组件库
│   ├── hooks/         # 组合式 API
│   ├── utils/         # 工具函数
│   └── styles/        # 样式文件
├── examples/          # 示例项目
└── docs/             # 文档
```

## 📝 组件 API

### hnyButton

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| label | string | '按钮' | 按钮文本 |
| type | 'primary' \| 'success' \| 'default' | 'default' | 按钮类型 |
| size | 'small' \| 'medium' \| 'large' | 'medium' | 按钮尺寸 |

| 事件 | 参数 | 说明 |
|------|------|------|
| click | (label: string) | 点击事件 |

## 🤝 贡献

欢迎贡献代码！请先阅读 [贡献指南](CONTRIBUTING.md)。

## 📄 许可证

[MIT License](LICENSE)

## 🔗 相关链接

- [Vue 3 文档](https://vuejs.org/)
- [TypeScript 文档](https://www.typescriptlang.org/)
- [Vite 文档](https://vitejs.dev/)
