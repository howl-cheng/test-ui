<template>
    <div class="box" style="width: 100%; height: 835px;background-color: #f1f5f7;">
        <h-b-bridgeInfo
            :methods="['export']"
            @search="handleSearch"
            @reset="handleReset" 
            @delete="handleDelete"
            @addSubmit="handleAddSubmit"
            @editSubmit="handleEditSubmit"
            @export="handleExport"
            @pageChange="handlePageChange"
        >
            <!-- <template #operation="{ row }">
                <el-button icon="Check" circle @click="handleCheck(row)"></el-button>
            </template> -->
        </h-b-bridgeInfo>
    </div>
</template>
<script setup>
// :tableData="tableData"
// :total="total"
// :dictData="dictData"
const tableData = ref([
    { id: 1, structureName: '桥梁1', bridgeScale: '桥梁类型1', belongingArea: '区域1', location: '桥梁位置1', maintenanceType: '100', maintenanceLevel: '养护等级1' },
    { id: 2, structureName: '桥梁2', bridgeScale: '桥梁类型2', belongingArea: '区域2', location: '桥梁位置2', maintenanceType: '200', maintenanceLevel: '养护等级2' },
    { id: 3, structureName: '桥梁3', bridgeScale: '桥梁类型3', belongingArea: '区域3', location: '桥梁位置3', maintenanceType: '300', maintenanceLevel: '养护等级3' },
])
const dictData = ref({
    bridgeScaleDict: [
        { label: '桥梁类型1', value: '1' },
        { label: '桥梁类型2', value: '2' },
        { label: '桥梁类型3', value: '3' },
    ],
    belongingAreaDict: [
        { label: '区域1', value: '1' },
        { label: '区域2', value: '2' },
        { label: '区域3', value: '3' },
    ],
    maintenanceTypeDict: [
        { label: '养护类别1', value: '1' },
        { label: '养护类别2', value: '2' },
        { label: '养护类别3', value: '3' },
    ],
    maintenanceLevelDict: [
        { label: '养护等级1', value: '1' },
        { label: '养护等级2', value: '2' },
        { label: '养护等级3', value: '3' },
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