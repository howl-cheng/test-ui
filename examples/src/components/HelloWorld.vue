<template>
    <div style="width: 100%; height: 835px;background-color: #f1f5f7;">
        <h-b-roadInfo
            :methods="['export']"
            @search="handleSearch"
            @reset="handleReset" 
            @delete="handleDelete"
            @addSubmit="handleAddSubmit"
            @editSubmit="handleEditSubmit"
            @export="handleExport"
            @pageChange="handlePageChange"
        >
            <template #operation="{ row }">
                <el-button icon="Check" circle @click="handleCheck(row)"></el-button>
            </template>
        </h-b-roadInfo>
    </div>
</template>
<script setup>

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

// 对外暴露的方法 搜索、重置、删除、新增、编辑、导出、分页
const handleSearch = (queryParams) => {
    console.log(queryParams)
}
const handleReset = () => {
    console.log('handleReset')
}
const handleDelete = (row) => {
    console.log(row)
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
const handlePageChange = (queryParams) => {
    console.log(queryParams)
}
const handleCheck = (row) => {
    console.log(row)
}
</script>