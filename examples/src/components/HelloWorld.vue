<template>
    <div class="box" style="width: 100%; height: 835px;background-color: #f1f5f7;">
        <h-b-basicinfo 
            :tableData="tableData"
            :dictData="dictData"
            :total="100"
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
        </h-b-basicinfo>
    </div>
</template>
<script setup>

const tableData = ref([
    { id: 1, bridgeName: '桥梁1', bridgeType: '桥梁类型1', bridgeArea: '区域1', bridgePos: '桥梁位置1', bridgeLength: '100' },
    { id: 2, bridgeName: '桥梁2', bridgeType: '桥梁类型2', bridgeArea: '区域2', bridgePos: '桥梁位置2', bridgeLength: '200' },
    { id: 3, bridgeName: '桥梁3', bridgeType: '桥梁类型3', bridgeArea: '区域3', bridgePos: '桥梁位置3', bridgeLength: '300' },
])
const dictData = ref({
    bridgeTypeDict: [
        { label: '桥梁类型1', value: '1' },
        { label: '桥梁类型2', value: '2' },
        { label: '桥梁类型3', value: '3' },
    ],
    bridgeAreaDict: [
        { label: '区域1', value: '1' },
        { label: '区域2', value: '2' },
        { label: '区域3', value: '3' },
    ],
})
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