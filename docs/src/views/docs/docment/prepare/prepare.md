# 准备工作

在使用 hny-ui 组件库之前，请确保你的开发环境满足以下要求。

## 环境要求

### Node.js

- **版本要求**: Node.js >= 16.0.0
- **推荐版本**: Node.js >= 18.0.0 (LTS)

你可以通过以下命令检查 Node.js 版本：

```bash
node -v
```

如果未安装或版本过低，请访问 [Node.js 官网](https://nodejs.org/) 下载安装。

### 包管理器

hny-ui 推荐使用 **pnpm** 作为包管理器，以获得更好的性能和依赖管理。

- **版本要求**: pnpm >= 8.0.0
- **推荐版本**: pnpm >= 8.0.0

安装 pnpm：

```bash
npm install -g pnpm
```

或者使用其他方式安装：

```bash
# 使用 npm
npm install -g pnpm

# 使用 yarn
yarn global add pnpm

# 使用 Homebrew (macOS)
brew install pnpm
```

检查 pnpm 版本：

```bash
pnpm -v
```

### 浏览器支持

hny-ui 支持所有现代浏览器：

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## 项目依赖

hny-ui 基于以下技术栈构建：

- **Vue**: ^3.3.0 (必需)
- **Element Plus**: ^2.11.5 (必需)
- **TypeScript**: 推荐使用，但不是必需的

## 创建新项目

如果你还没有一个 Vue 3 项目，可以使用以下方式创建：

### 使用 Vite 创建（推荐）

```bash
npm create vue@latest my-project
cd my-project
pnpm install
```

### 使用 Vue CLI 创建

```bash
npm install -g @vue/cli
vue create my-project
cd my-project
```

## 下一步

环境准备完成后，你可以：

1. 📦 [安装 hny-ui](./install) - 学习如何安装组件库
2. 📚 查看组件文档 - 了解各个组件的使用方法
3. 🛠️ 查看工具函数 - 了解可用的工具函数和 hooks

## 常见问题

### Q: 必须使用 pnpm 吗？

A: 推荐使用 pnpm，但你也可以使用 npm 或 yarn。不过某些功能（如 workspace）可能在 npm/yarn 下表现不同。

### Q: 是否需要 TypeScript？

A: 不需要。hny-ui 虽然使用 TypeScript 开发，但完全支持在 JavaScript 项目中使用。

### Q: 需要安装 Element Plus 吗？

A: 是的，hny-ui 依赖 Element Plus，需要单独安装。如果你已经在使用 Element Plus，只需确保版本符合要求即可。

## 获取帮助

如果你在准备过程中遇到问题：

- 📖 查看 [完整文档](../)
- 💬 提交 Issue
- 🤝 参与讨论
