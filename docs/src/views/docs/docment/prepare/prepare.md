# 准备工作

### 项目依赖

hny-ui 基于以下技术栈构建，在使用hny-ui之前，需要确保安装Vue，Element Plus，axios正确安装注册：

- **Vue**: ^3.3.0 (必需)
- **Element Plus**: ^2.11.5 (必需)
- **axios**: "^1.13.1" (必需)
- **TypeScript**: 推荐使用，但不是必需的

### 组件使用样式单位为px，如果需要实现自适应建议项目配置pxtorem

推荐安装插件
- **postcss**: "^8.5.6",
- **postcss-pxtorem**: "^6.1.0",

封装rem.js
```javascript
const baseSize = 100
const setRem = () => {
  const screenWidth = document.documentElement.clientWidth
  const baseWidth = 1920
  document.documentElement.style.fontSize = baseSize * Math.min(screenWidth / baseWidth, 2) + 'px'
}
setRem()
window.addEventListener('resize', setRem)
```

main导入使用
```javascript
import './utils/rem'
```

配置viteConfig
```shell
css: {
  postcss: {
    plugins: [
      pxtorem({
        rootValue: 100,
        propList: ['*'],
        mediaQuery: false,
        replace: true,
        minPixelValue: 1,
        unitPrecision: 6,
        selectorBlackList: ['van']
      })
    ]
  },
},
```

### 环境准备完成后，你可以：

1. 📦 [安装 hny-ui](./install) - 学习如何安装组件库
2. 📚 查看组件文档 - 了解各个组件的使用方法
3. 🛠️ 查看工具函数 - 了解可用的工具函数和 hooks

### 常见问题

#### Q: 是否需要 TypeScript？

A: 不需要。hny-ui 虽然使用 TypeScript 开发，但完全支持在 JavaScript 项目中使用。

#### Q: 需要安装 Element Plus 吗？

A: 是的，hny-ui 依赖 Element Plus，需要单独安装。如果你已经在使用 Element Plus，只需确保版本符合要求即可。

#### Q: 需要安装 axios 吗？

A: 是的，hny-ui 依赖 axios，需要单独安装。如果你已经在使用 axios，只需确保版本符合要求即可。

