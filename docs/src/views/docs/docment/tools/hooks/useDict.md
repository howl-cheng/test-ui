# useDict(命名空间)

`useDict` 是一个用于批量获取字典options的hooks

### 入参

- **类型**: `array`
- **必填**: 是
- **说明**: 字典参数组成的数组
- **示例**: ['structure_type', 'tag_value_type', 'alarm_level']

### 返回值

返回一个对象:

```javascript
const { structure_type, tag_value_type, alarm_level } = useDict(dicts || [])
```

### 源码
```javascript
export const useDict = (dicts: string[]) => {
  let dictStore = ref<Record<string, any>>({})
  dicts.forEach((dict) => {
    dictStore.value[dict] = []
    dictsApi(dict).then((res: any) => {
      dictStore.value[dict] = res.data.map((item: any) => ({
        label: item.dictLabel,
        value: item.dictValue
      }))
    })
  })
  return toRefs(dictStore.value)
}
```

