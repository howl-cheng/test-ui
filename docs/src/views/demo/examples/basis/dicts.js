export default `<template>
  <h-dicts :options="dicts" :value="value" />
</template>
<script setup>
import { ref } from 'vue'
const dicts = ref([
  {
    label: '男',
    value: '1'
  },
  {
    label: '女',
    value: '2'
  }
])
const value = ref('1')
</script>
`