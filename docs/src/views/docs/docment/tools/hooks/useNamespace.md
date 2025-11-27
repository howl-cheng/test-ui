# useNamespace(命名空间)

`useNamespace` 是一个用于生成 BEM 命名规范 CSS 类名的 Vue 3 Composition API Hook。它可以帮助你在组件中快速生成符合 BEM 规范的类名，保持样式命名的一致性。

## 功能说明

- ✅ 基于 BEM（Block Element Modifier）命名规范
- ✅ 统一管理组件类名命名空间
- ✅ 提供多种组合方式（Block、Element、Modifier）
- ✅ 支持状态类名生成
- ✅ TypeScript 类型支持
- ✅ 减少类名书写错误

## BEM 命名规范说明

BEM 是一种 CSS 类命名方法论：

- **Block（块）**: 独立的组件，如 `h-button`
- **Element（元素）**: 块的组成部分，用 `__` 连接，如 `h-button__icon`
- **Modifier（修饰符）**: 块或元素的变体，用 `--` 连接，如 `h-button--primary`
- **State（状态）**: 特殊的状态类名，如 `h-is-disabled`

## 参数说明

### block

- **类型**: `string`
- **必填**: 是
- **说明**: 组件块名称，会与命名空间组合生成基础类名
- **示例**: `'button'`、`'c-header'`、`'b-page'`

## 返回值

返回一个对象，包含以下方法和属性：

1. namespace
2. b(blockSuffix)
3. e(element)
4. m(modifier)
5. be(blockSuffix, element)
6. em(element, modifier)
7. bm(blockSuffix, modifier)
8. bem(blockSuffix, element, modifier)
9. is(name, state)

## 使用示例

### 基础用法

```javascript
<template>
  <div :class="ns.b()">
    <span :class="ns.e('text')">按钮</span>
  </div>
</template>

<script setup>
import { useNamespace } from 'hny-ui/hooks'
const ns = useNamespace('button')
</script>

<style scoped>
/* 生成的类名: h-button */
.h-button {
  padding: 8px 16px;
}

/* 生成的类名: h-button__text */
.h-button__text {
  font-size: 14px;
}
</style>
```

### 组合使用示例

```javascript
<template>
  <div :class="ns.b()">
    <div :class="[ns.b(), ns.m('primary')]">主要样式</div>
  </div>
</template>

<script setup>
import { useNamespace } from 'hny-ui/hooks'
const ns = useNamespace('component')
</script>
```

## 源代码

```typescript
/**
 * BEM命名规范hooks
 * 提供默认命名空间和相关的BEM命名方法
 */
const defaultNamespace = 'h'
const statePrefix = "h-is-"
const _bem = (namespace: string, block: string, blockSuffix?: string, element?: string, modifier?: string) => {
  let classname = `${namespace}-${block}`
  if (blockSuffix) {
    classname += `-${blockSuffix}`
  }
  if (element) {
    classname += `__${element}`
  }
  if (modifier) {
    classname += `--${modifier}`
  }
  return classname
}

//生成BEM命名
export const useNamespace = (block: string) => {
  // 默认命名
  const namespace = defaultNamespace

  const b = (blockSuffix: string = '') => _bem(namespace, block, blockSuffix, '', '')
  const e = (element: string) => element ? _bem(namespace, block, '', element, '') : ''
  const m = (modifier: string) => modifier ? _bem(namespace, block, '', '', modifier) : ''
  const be = (blockSuffix: string, element: string) => blockSuffix && element ? _bem(namespace, block, blockSuffix, element, '') : ''
  const em = (element: string, modifier: string) => element && modifier ? _bem(namespace, block, '', element, modifier) : ''
  const bm = (blockSuffix: string, modifier: string) => blockSuffix && modifier ? _bem(namespace, block, blockSuffix, '', modifier) : ''
  const bem = (blockSuffix: string, element: string, modifier: string) => blockSuffix && element && modifier ? _bem(namespace, block, blockSuffix, element, modifier) : ''
  const is = (name: string, state: boolean = true) =>  name && state ? `${statePrefix}${name}` : ''
  return {
    namespace,
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is
  }
}
```
