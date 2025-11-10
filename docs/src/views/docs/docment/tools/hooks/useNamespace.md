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

### namespace

- **类型**: `string`
- **默认值**: `'h'`
- **说明**: 当前使用的命名空间前缀

### b(blockSuffix)

- **类型**: `(blockSuffix?: string) => string`
- **说明**: 生成 Block 类名
- **格式**: `{namespace}-{block}` 或 `{namespace}-{block}-{blockSuffix}`
- **示例**: 
  - `ns.b()` → `'h-button'`
  - `ns.b('group')` → `'h-button-group'`

### e(element)

- **类型**: `(element: string) => string`
- **说明**: 生成 Element 类名
- **格式**: `{namespace}-{block}__{element}`
- **示例**: 
  - `ns.e('icon')` → `'h-button__icon'`
  - `ns.e('text')` → `'h-button__text'`

### m(modifier)

- **类型**: `(modifier: string) => string`
- **说明**: 生成 Modifier 类名
- **格式**: `{namespace}-{block}--{modifier}`
- **示例**: 
  - `ns.m('primary')` → `'h-button--primary'`
  - `ns.m('large')` → `'h-button--large'`

### be(blockSuffix, element)

- **类型**: `(blockSuffix: string, element: string) => string`
- **说明**: 生成 Block + Element 组合类名
- **格式**: `{namespace}-{block}-{blockSuffix}__{element}`
- **示例**: 
  - `ns.be('group', 'item')` → `'h-button-group__item'`

### em(element, modifier)

- **类型**: `(element: string, modifier: string) => string`
- **说明**: 生成 Element + Modifier 组合类名
- **格式**: `{namespace}-{block}__{element}--{modifier}`
- **示例**: 
  - `ns.em('icon', 'large')` → `'h-button__icon--large'`

### bm(blockSuffix, modifier)

- **类型**: `(blockSuffix: string, modifier: string) => string`
- **说明**: 生成 Block + Modifier 组合类名
- **格式**: `{namespace}-{block}-{blockSuffix}--{modifier}`
- **示例**: 
  - `ns.bm('group', 'horizontal')` → `'h-button-group--horizontal'`

### bem(blockSuffix, element, modifier)

- **类型**: `(blockSuffix: string, element: string, modifier: string) => string`
- **说明**: 生成 Block + Element + Modifier 组合类名
- **格式**: `{namespace}-{block}-{blockSuffix}__{element}--{modifier}`
- **示例**: 
  - `ns.bem('group', 'item', 'active')` → `'h-button-group__item--active'`

### is(name, state)

- **类型**: `(name: string, state?: boolean) => string`
- **说明**: 生成状态类名
- **格式**: `h-is-{name}`
- **参数**:
  - `name`: 状态名称
  - `state`: 状态值，默认为 `true`，当为 `false` 时返回空字符串
- **示例**: 
  - `ns.is('disabled', true)` → `'h-is-disabled'`
  - `ns.is('active', false)` → `''`

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

### 按钮组件示例

```javascript
<template>
  <div 
    :class="[
      ns.b(), 
      ns.m(size), 
      ns.m(type),
      ns.is('disabled', disabled)
    ]"
    @click="handleClick"
  >
    {{ label }}
  </div>
</template>

<script setup>
import { useNamespace } from 'hny-ui/hooks'

const ns = useNamespace('button')

const props = defineProps({
  label: String,
  type: {
    type: String,
    default: 'default' // primary, success, error, warning
  },
  size: {
    type: String,
    default: 'medium' // small, medium, large
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const handleClick = () => {
  if (!props.disabled) {
    // 点击事件处理
  }
}
</script>
```

### 头部组件示例

```javascript
<template>
  <div :class="ns.b()">
    <div :class="ns.e('left')">
      <slot name="left"></slot>
    </div>
    <div :class="ns.e('center')">
      {{ title }}
    </div>
    <div :class="ns.e('right')">
      <div 
        v-if="showBack" 
        :class="ns.e('back')" 
        @click="handleBack"
      >
        返回
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNamespace } from 'hny-ui/hooks'

const ns = useNamespace('c-header')

defineProps({
  title: String,
  showBack: Boolean
})

const emit = defineEmits(['back'])

const handleBack = () => {
  emit('back')
}
</script>

<style scoped>
/* 生成的类名示例:
 * h-c-header
 * h-c-header__left
 * h-c-header__center
 * h-c-header__right
 * h-c-header__back
 */
</style>
```

### 组合使用示例

```javascript
<template>
  <div :class="ns.b()">
    <!-- Block + Modifier -->
    <div :class="[ns.b(), ns.m('primary')]">主要样式</div>
    
    <!-- Element + Modifier -->
    <div :class="ns.em('icon', 'large')">大图标</div>
    
    <!-- Block + Element -->
    <div :class="ns.be('group', 'item')">分组项</div>
    
    <!-- Block + Element + Modifier -->
    <div :class="ns.bem('group', 'item', 'active')">激活状态</div>
    
    <!-- 状态类名 -->
    <div :class="ns.is('loading', isLoading)">加载中</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useNamespace } from 'hny-ui/hooks'

const ns = useNamespace('component')
const isLoading = ref(false)
</script>
```

### 动态类名组合

```javascript
<template>
  <div :class="buttonClasses">
    <span :class="ns.e('icon')">图标</span>
    <span :class="ns.e('text')">文本</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useNamespace } from 'hny-ui/hooks'

const ns = useNamespace('button')

const props = defineProps({
  type: String,
  size: String,
  disabled: Boolean
})

const buttonClasses = computed(() => {
  return [
    ns.b(),
    props.type && ns.m(props.type),
    props.size && ns.m(props.size),
    ns.is('disabled', props.disabled)
  ].filter(Boolean)
})
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

## BEM 类名生成规则总结

| 方法 | 参数 | 生成格式 | 示例 |
|------|------|----------|------|
| `b()` | - | `h-{block}` | `h-button` |
| `b('suffix')` | blockSuffix | `h-{block}-{suffix}` | `h-button-group` |
| `e('icon')` | element | `h-{block}__{element}` | `h-button__icon` |
| `m('primary')` | modifier | `h-{block}--{modifier}` | `h-button--primary` |
| `be('group', 'item')` | blockSuffix, element | `h-{block}-{suffix}__{element}` | `h-button-group__item` |
| `em('icon', 'large')` | element, modifier | `h-{block}__{element}--{modifier}` | `h-button__icon--large` |
| `bm('group', 'horizontal')` | blockSuffix, modifier | `h-{block}-{suffix}--{modifier}` | `h-button-group--horizontal` |
| `bem('group', 'item', 'active')` | blockSuffix, element, modifier | `h-{block}-{suffix}__{element}--{modifier}` | `h-button-group__item--active` |
| `is('disabled', true)` | name, state | `h-is-{name}` | `h-is-disabled` |
