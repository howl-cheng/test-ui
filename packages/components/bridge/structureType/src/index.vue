<template>
  <div :class="ns.b()">
    <div :class="ns.b('header')">
      <el-form ref="queryRef" :model="queryParams" :inline="true">
        <el-form-item label="构件名称" prop="structureName">
          <el-input v-model="queryParams.structureName" placeholder="请输入构件名称" />
        </el-form-item>
        <el-form-item prop="structureName">
          <el-button type="primary" icon="Search" @click="handleSearch">查询</el-button>
          <el-button icon="Refresh" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div :class="ns.b('content')">
      <div :class="ns.b('content-operation')">
        <el-button type="primary" icon="Plus" @click="handleAdd">新增</el-button>
        <el-button icon="Download" @click="handleExport">导出</el-button>
      </div>
      <div :class="ns.b('content-table')">
        <el-table :data="tableData" style="width: 100%" empty-text="暂无数据">
          <el-table-column prop="structureName" label="构件名称" align="center"/>
          <el-table-column prop="structureType" label="构件类型" align="center"/>
          <el-table-column prop="structureCode" label="构件编码" align="center" />
          <el-table-column label="操作" align="center">
            <template #default="scope">
              <el-button icon="View" circle @click="handleView(scope.row)"></el-button>
              <el-button icon="Edit" circle @click="handleEdit(scope.row)"></el-button>
              <el-button icon="Delete" circle @click="handleDelete(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog v-model="viewVisible" title="桥梁详情" width="50%">
      <el-descriptions border :column="2">
        <el-descriptions-item label="构建名称">{{ rowData?.structureName }}</el-descriptions-item>
        <el-descriptions-item label="构建类型">{{ rowData?.structureType }}</el-descriptions-item>
        <el-descriptions-item label="构建编码">{{ rowData?.structureCode }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
    <el-dialog v-model="addVisible" title="新增桥梁" width="50%">
      <el-form ref="addFormRef" :model="addFormData" :rules="addFormRules" label-width="100px" label-position="top">
        <el-form-item label="构件名称" prop="structureName"> 
          <el-input v-model="addFormData.structureName" placeholder="请输入构件名称" />
        </el-form-item>
        <el-form-item label="构件类型" prop="structureType">
          <el-input v-model="addFormData.structureType" placeholder="请输入构件类型" />
        </el-form-item>
        <el-form-item label="构件编码" prop="structureCode">
          <el-input v-model="addFormData.structureCode" placeholder="请输入构件编码" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
        <el-button @click="addVisible = false">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts"> 
  export default { name: "h-b-structuretype" }
  
</script>
<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import { useNamespace } from "../../../../hooks"
import type { FormInstance, FormRules } from "element-plus"

type TableData = {
  structureName: string | null
  structureType: string | null
  structureCode: string | null
}

const ns = useNamespace('b-page')

withDefaults(defineProps<{
  tableData: Array<TableData>
}>(), {
  tableData: () => []
})
const emits = defineEmits(['search', 'reset', 'delete', 'addSubmit', 'editSubmit', 'export'])
const queryRef = ref<FormInstance>()
const queryParams = ref<{ structureName: string | null }>({ structureName: null })
const viewVisible = ref<boolean>(false)
const rowData = ref<TableData>()
const handleType = ref<string>('add')
const addVisible = ref<boolean>(false)
const addFormRef = ref<FormInstance>()
const addFormData = ref<TableData>({ structureName: '', structureType: '', structureCode: '' })
const addFormRules = ref<FormRules>({
  structureName: [{ required: true, message: '请输入构件名称', trigger: 'blur' }],
  structureType: [{ required: true, message: '请输入构件类型', trigger: 'blur' }],
  structureCode: [{ required: true, message: '请输入构件编码', trigger: 'blur' }],
})
const handleSearch = () => {
  emits('search', queryParams.value)
}
const handleReset = () => {
  queryRef.value?.resetFields()
  emits('reset')
}
const handleDelete = (row: TableData) => {
  ElMessageBox.confirm('确定删除该构件吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    emits('delete', row)
  }).catch(() => {})
}
const handleView = (row: TableData) => {
  rowData.value = row
  viewVisible.value = true
}
const handleAdd = () => {
  addFormData.value = { structureName: '', structureType: '', structureCode: '' }
  handleType.value = 'add'
  addVisible.value = true
}
const handleEdit = (row: TableData) => {
  addFormData.value = { ...row }
  handleType.value = 'edit'
  addVisible.value = true
}

const handleSubmit = () => {
  addFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      if (handleType.value === 'add') {
        emits('addSubmit', addFormData.value)
      } else {
        emits('editSubmit', addFormData.value)
      }
      addVisible.value = false
    }
  })
}
const handleExport = () => {
  emits('export', queryParams.value)
}
</script>