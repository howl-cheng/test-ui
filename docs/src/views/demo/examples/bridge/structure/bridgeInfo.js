export default `
<template>
  <h-b-bridgeInfo
    :fields="fields"
    :methods="['delete']"
    @delete="handleDelete"
  >
    <template #operation="{ row }">
      <!-- 自定义操作按钮 -->
     <el-button icon="Check" circle @click="handleCheck(row)"></el-button>
    </template>
  </h-b-bridgeInfo>
</template>
<script setup>
  import { ref } from 'vue'
  // 拓展字段
  const fields = ref([
    {
      label: '养护单位',
      prop: 'maintenanceUnit',
      placeholder: '请选择养护单位',
      type: 'select',
      isRequired: true,
      isSearch: true,
      options: [
        { label: '养护单位1', value: '1' },
        { label: '养护单位2', value: '2' },
      ],
    }
  ])
  // 自定义操作按钮
  const handleCheck = (row) => {
    console.log(row)
  }
  // 使用自定义删除事件
  const handleDelete = (row) => {
    console.log(row)
  }
</script>
`