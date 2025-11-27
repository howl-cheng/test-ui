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


