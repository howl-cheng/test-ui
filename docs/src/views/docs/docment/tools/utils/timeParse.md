# parseTime(解析时间)

`parseTime` 是一个用于格式化时间戳或日期对象的工具函数，支持多种时间格式输入，并可自定义输出格式。

## 功能说明

- ✅ 支持多种时间格式输入（时间戳、Date 对象、日期字符串）
- ✅ 自定义格式化模式
- ✅ 自动处理 10 位时间戳（自动转换为毫秒）
- ✅ 支持星期几的中文显示
- ✅ 自动补零（月份、日期、小时、分钟、秒小于 10 时）

## 参数说明

### time

- **类型**: `string | number | Date | null | undefined`
- **说明**: 要格式化的时间
- **支持格式**:
  - 时间戳（10 位秒级或 13 位毫秒级）
  - Date 对象
  - 日期字符串（如 `"2023-12-25"` 或 `"2023-12-25T10:30:00.000Z"`）

### pattern

- **类型**: `string`
- **默认值**: `'{y}-{m}-{d} {h}:{i}:{s}'`
- **说明**: 格式化模式，使用花括号包裹占位符
- **占位符说明**:
  - `{y}` - 年份（4 位）
  - `{m}` - 月份（1-12）
  - `{d}` - 日期（1-31）
  - `{h}` - 小时（0-23）
  - `{i}` - 分钟（0-59）
  - `{s}` - 秒（0-59）
  - `{a}` - 星期几（日、一、二、三、四、五、六）

## 返回值

- **类型**: `string | null`
- **说明**: 格式化后的时间字符串，如果输入无效则返回 `null`

## 使用示例

### 基础用法

```javascript
import { parseTime } from 'hny-ui/utils'

// 使用默认格式（年-月-日 时:分:秒）
parseTime(new Date())
// 输出: "2023-12-25 10:30:45"

// 使用时间戳（13 位毫秒）
parseTime(1703482245000)
// 输出: "2023-12-25 10:30:45"

// 使用时间戳（10 位秒）
parseTime(1703482245)
// 输出: "2023-12-25 10:30:45"

// 使用日期字符串
parseTime('2023-12-25T10:30:45.000Z')
// 输出: "2023-12-25 10:30:45"

// 使用 Date 对象
parseTime(new Date('2023-12-25'))
// 输出: "2023-12-25 00:00:00"
```

### 自定义格式

```javascript
// 只显示日期
parseTime(new Date(), '{y}-{m}-{d}')
// 输出: "2023-12-25"

// 显示日期和星期
parseTime(new Date(), '{y}-{m}-{d} 星期{a}')
// 输出: "2023-12-25 星期一"

// 只显示时间
parseTime(new Date(), '{h}:{i}:{s}')
// 输出: "10:30:45"

// 中文格式
parseTime(new Date(), '{y}年{m}月{d}日 {h}时{i}分{s}秒')
// 输出: "2023年12月25日 10时30分45秒"

// 自定义分隔符
parseTime(new Date(), '{y}/{m}/{d} {h}:{i}:{s}')
// 输出: "2023/12/25 10:30:45"
```

### 异常处理

```javascript
// 空值返回 null
parseTime(null)
// 输出: null

parseTime(undefined)
// 输出: null

// 无参数返回 null
parseTime()
// 输出: null
```

## 源代码

```javascript
export function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    } else if (typeof time === 'string') {
      time = time.replace(new RegExp(/-/gm), '/').replace('T', ' ').replace(new RegExp(/\.[\d]{3}/gm), '');
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
```