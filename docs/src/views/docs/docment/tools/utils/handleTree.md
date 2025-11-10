# handleTree(数组转树)

`handleTree` 是一个用于将平铺的数组结构转换为树形结构的工具函数。它通过 `id` 和 `parentId` 字段建立父子关系，生成嵌套的树形数据。

## 功能说明

- ✅ 将平铺数组转换为树形结构
- ✅ 支持自定义字段名（id、parentId、children）
- ✅ 自动识别根节点（parentId 不存在的节点）
- ✅ 递归构建多层级树形结构
- ✅ 保留原始数据的所有属性

## 参数说明

### data

- **类型**: `Array`
- **必填**: 是
- **说明**: 要转换的平铺数组，每个元素必须包含 `id` 和 `parentId` 字段（或自定义字段名）

### id

- **类型**: `string`
- **默认值**: `'id'`
- **说明**: 指定数组中用于标识唯一节点的字段名

### parentId

- **类型**: `string`
- **默认值**: `'parentId'`
- **说明**: 指定数组中用于标识父节点的字段名

### children

- **类型**: `string`
- **默认值**: `'children'`
- **说明**: 指定生成的树形结构中子节点数组的字段名

## 返回值

- **类型**: `Array`
- **说明**: 转换后的树形结构数组，包含所有根节点及其子节点

## 使用示例

### 基础用法

```javascript
import { handleTree } from 'hny-ui/utils'

// 平铺的数组数据
const data = [
  { id: 1, name: '部门A', parentId: null },
  { id: 2, name: '部门B', parentId: null },
  { id: 3, name: '部门A1', parentId: 1 },
  { id: 4, name: '部门A2', parentId: 1 },
  { id: 5, name: '部门B1', parentId: 2 },
  { id: 6, name: '部门A1-1', parentId: 3 }
]

// 转换为树形结构
const tree = handleTree(data)

// 输出结果:
// [
//   {
//     id: 1,
//     name: '部门A',
//     parentId: null,
//     children: [
//       {
//         id: 3,
//         name: '部门A1',
//         parentId: 1,
//         children: [
//           {
//             id: 6,
//             name: '部门A1-1',
//             parentId: 3,
//             children: []
//           }
//         ]
//       },
//       {
//         id: 4,
//         name: '部门A2',
//         parentId: 1,
//         children: []
//       }
//     ]
//   },
//   {
//     id: 2,
//     name: '部门B',
//     parentId: null,
//     children: [
//       {
//         id: 5,
//         name: '部门B1',
//         parentId: 2,
//         children: []
//       }
//     ]
//   }
// ]
```

### 自定义字段名

```javascript
// 使用自定义字段名
const data = [
  { code: '001', name: '根节点1', pid: null },
  { code: '002', name: '根节点2', pid: null },
  { code: '003', name: '子节点1', pid: '001' },
  { code: '004', name: '子节点2', pid: '001' }
]

// 指定自定义字段名
const tree = handleTree(data, 'code', 'pid', 'childList')

// 输出结果:
// [
//   {
//     code: '001',
//     name: '根节点1',
//     pid: null,
//     childList: [
//       { code: '003', name: '子节点1', pid: '001', childList: [] },
//       { code: '004', name: '子节点2', pid: '001', childList: [] }
//     ]
//   },
//   {
//     code: '002',
//     name: '根节点2',
//     pid: null,
//     childList: []
//   }
// ]
```

### 菜单树结构

```javascript
// 菜单数据
const menuData = [
  { menuId: 1, menuName: '首页', parentMenuId: 0 },
  { menuId: 2, menuName: '系统管理', parentMenuId: 0 },
  { menuId: 3, menuName: '用户管理', parentMenuId: 2 },
  { menuId: 4, menuName: '角色管理', parentMenuId: 2 },
  { menuId: 5, menuName: '权限管理', parentMenuId: 2 }
]

// 转换为菜单树
const menuTree = handleTree(menuData, 'menuId', 'parentMenuId', 'children')

// 输出结果:
// [
//   {
//     menuId: 1,
//     menuName: '首页',
//     parentMenuId: 0,
//     children: []
//   },
//   {
//     menuId: 2,
//     menuName: '系统管理',
//     parentMenuId: 0,
//     children: [
//       { menuId: 3, menuName: '用户管理', parentMenuId: 2, children: [] },
//       { menuId: 4, menuName: '角色管理', parentMenuId: 2, children: [] },
//       { menuId: 5, menuName: '权限管理', parentMenuId: 2, children: [] }
//     ]
//   }
// ]
```

### 部门组织架构

```javascript
// 部门数据
const deptData = [
  { deptId: 1, deptName: '总公司', parentDeptId: null },
  { deptId: 2, deptName: '技术部', parentDeptId: 1 },
  { deptId: 3, deptName: '市场部', parentDeptId: 1 },
  { deptId: 4, deptName: '前端组', parentDeptId: 2 },
  { deptId: 5, deptName: '后端组', parentDeptId: 2 },
  { deptId: 6, deptName: '销售组', parentDeptId: 3 }
]

const deptTree = handleTree(deptData, 'deptId', 'parentDeptId', 'children')

// 生成的树形结构可用于渲染组织架构树组件
```

## 源代码

```javascript
export function handleTree(data, id, parentId, children) {
  let config = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children'
  };

  var childrenListMap = {};
  var nodeIds = {};
  var tree = [];

  for (let d of data) {
    let parentId = d[config.parentId];
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = [];
    }
    nodeIds[d[config.id]] = d;
    childrenListMap[parentId].push(d);
  }

  for (let d of data) {
    let parentId = d[config.parentId];
    if (nodeIds[parentId] == null) {
      tree.push(d);
    }
  }

  for (let t of tree) {
    adaptToChildrenList(t);
  }

  function adaptToChildrenList(o) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]];
    }
    if (o[config.childrenList]) {
      for (let c of o[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  }
  return tree;
}
```

## 常见问题

### Q: 转换后的树形结构中没有子节点？

A: 检查以下几点：
- 确保数据的 `parentId` 值与对应节点的 `id` 值匹配
- 确保根节点的 `parentId` 值在所有节点的 `id` 中不存在
- 检查字段名是否正确（是否使用了自定义字段名）

### Q: 如何处理 parentId 为 0 的根节点？

A: `handleTree` 会自动将 `parentId` 为 `0` 的节点识别为根节点（因为它在 `nodeIds` 中找不到对应的节点）。如果你的根节点 `parentId` 是 `0`，确保数据中没有 `id` 为 `0` 的节点。

### Q: 如何保留其他字段？

A: `handleTree` 会保留原始数据对象的所有属性，包括除 `id`、`parentId` 和 `children` 之外的其他字段。

## 相关函数

- [parseTime](./timeParse) - 时间格式化函数
