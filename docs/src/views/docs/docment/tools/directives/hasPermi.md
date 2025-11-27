# v-hasPermi(按钮权限判断)

`hasPermi` 是一个用于控制按钮或元素显示/隐藏的自定义指令，基于用户权限列表进行权限判断。当用户没有指定权限时，元素会被自动移除。

## 功能说明

- ✅ 基于权限数组进行权限控制
- ✅ 支持单个或多个权限判断
- ✅ 支持超级管理员权限 `*:*:*`（拥有所有权限）
- ✅ 自动移除无权限的元素
- ✅ 支持动态权限更新
- ✅ 响应式更新（支持权限变化时重新判断）

## 指令参数

### binding.value

- **类型**: `string[]`
- **必填**: 是
- **说明**: 权限标识数组，用于判断用户是否有权限
- **示例**: `['user:add']`、`['user:edit', 'user:view']`

**判断规则**：
- 如果用户权限列表中包含 `*:*:*`，则所有权限检查都会通过
- 如果用户权限列表中包含数组中的任意一个权限，则显示元素
- 如果都不满足，则移除元素

## API 说明

### setPermissions(permissions)

设置用户权限列表。

- **参数**:
  - `permissions` (string[]): 用户权限数组
- **说明**: 通常在用户登录后调用，从接口获取权限数据并设置

```javascript
import { setPermissions } from 'hny-ui'

// 设置权限列表
setPermissions(['user:add', 'user:edit', 'user:delete', 'system:config'])

```

### getPermissions()

获取当前用户权限列表。

- **返回值**: `string[]` - 当前权限数组

```javascript
import { getPermissions } from 'hny-ui'

const permissions = getPermissions()
console.log(permissions) // ['user:add', 'user:edit', ...]
```

## 安装方式

### 方法一：通过插件方式全局安装所有自定义指令（推荐）

```javascript
import { directive, setPermissions } from 'hny-ui'

setPermissions(['user:add', 'user:edit', 'user:delete'])

app.use(directive)

```

### 方法二：单独引入并注册，组件库组件内部已引入并注册， 除非你单独需要使用这个自定义指令，否侧是不需要注册的，

```javascript
import { hasPermi, setPermissions } from 'hny-ui'

setPermissions(['user:add', 'user:edit', 'user:delete'])

app.directive('hasPermi', hasPermi)

```

## 使用示例

### 基础用法

```html
<template>
  <div>
    <!-- 单个权限判断 -->
    <el-button v-hasPermi="['user:add']">添加用户</el-button>
    
    <!-- 多个权限判断（满足其中一个即可显示）-->
    <el-button v-hasPermi="['user:edit', 'user:view']">编辑用户</el-button>
    
    <!-- 删除操作 -->
    <el-button type="danger" v-hasPermi="['user:delete']">删除用户</el-button>
  </div>
</template>
```

### 超级管理员权限

如果用户权限列表中包含 `*:*:*`，则所有元素都会显示：默认就是超级管理权限

```javascript
import { setPermissions } from 'hny-ui'

setPermissions(['*:*:*'])
```

```html
<template>
  <!-- 即使没有指定权限，超级管理员也能看到 -->
  <el-button v-hasPermi="['system:admin']">系统管理</el-button>
</template>
```

### 在表格操作列中使用

```javascript
<template>
  <el-table :data="userList">
    <el-table-column label="操作" width="200">
      <template #default="{ row }">
        <el-button 
          size="small" 
          v-hasPermi="['user:edit']"
          @click="handleEdit(row)"
        >
          编辑
        </el-button>
        <el-button 
          size="small" 
          type="danger" 
          v-hasPermi="['user:delete']"
          @click="handleDelete(row)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
```

### 动态权限更新

```javascript
<template>
  <div>
    <el-button v-hasPermi="['user:add']">添加用户</el-button>
    <el-button @click="updatePermissions">更新权限</el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { setPermissions } from 'hny-ui'

const updatePermissions = () => {
  // 模拟权限变化
  const newPermissions = ['user:add', 'user:edit']
  setPermissions(newPermissions)
}
</script>
```

### 结合 Pinia/Vuex 使用

```javascript
// store/modules/user.js
import { defineStore } from 'pinia'
import { setPermissions } from 'hny-ui'

export const useUserStore = defineStore('user', {
  state: () => ({
    permissions: []
  }),
  actions: {
    async getUserInfo() {
      // 从接口获取权限
      const response = await fetch('/api/user/info')
      const data = await response.json()
      
      // 更新 store
      this.permissions = data.permissions
      
      // 同步更新指令权限
      setPermissions(data.permissions)
    },
    
    logout() {
      this.permissions = []
      setPermissions([])
    }
  }
})
```
