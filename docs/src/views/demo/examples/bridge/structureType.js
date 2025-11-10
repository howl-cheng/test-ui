export default `
<template>
   <h-b-structuretype 
    :tableData="tableData"
    @search="handleSearch"
    @reset="handleReset"
    @delete="handleDelete"
    @addSubmit="handleAddSubmit"
    @editSubmit="handleEditSubmit"
    @export="handleExport"
  />
</template>
<script setup>
  import { ref } from 'vue'
  const tableData = ref([
    { id: 1, structureName: '构建1', structureType: '构建类型1', structureCode: '构建编码1' },
    { id: 2, structureName: '构建2', structureType: '构建类型2', structureCode: '构建编码2' },
    { id: 3, structureName: '构建3', structureType: '构建类型3', structureCode: '构建编码3' },
  ])
  const handleSearch = (queryParams) => {
    console.log(queryParams)
  }
  const handleReset = () => {
    console.log('handleReset')
  }
  const handleDelete = (row) => {
    console.log(row)
  }
  const handleBack = () => {
    console.log('handleBack')
  }
  const handleAddSubmit = (addFormData) => {
    console.log(addFormData)
  }
  const handleEditSubmit = (editFormData) => {
    console.log(editFormData)      
  }
  const handleExport = (queryParams) => {
    console.log(queryParams)
  }
</script>
`