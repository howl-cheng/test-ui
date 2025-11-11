<template>
  <div :class="ns.b()">
    <div :class="ns.b('header')">
      <el-form :class="ns.e('form')" ref="queryRef" :model="queryParams" :inline="true">
        <el-form-item label="桥梁名称" prop="bridgeName">
          <el-input v-model="queryParams.bridgeName" placeholder="请输入桥梁名称" clearable/>
        </el-form-item>
        <el-form-item label="桥梁类型" prop="bridgeType">
          <el-select v-model="queryParams.bridgeType" placeholder="请选择桥梁类型" clearable>
            <el-option v-for="item in dictData.bridgeTypeDict" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="所属区域" prop="bridgeArea">
          <el-select v-model="queryParams.bridgeArea" placeholder="请选择所属区域" clearable>
            <el-option v-for="item in dictData.bridgeAreaDict" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item prop="bridgeName">
          <el-button v-hasPermi="['bridge:basicInfo:search']" type="primary" icon="Search" @click="handleSearch">查询</el-button>
          <el-button v-hasPermi="['bridge:basicInfo:reset']" icon="Refresh" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div :class="ns.b('content')" v-resizeH="true">
      <div :class="ns.b('content-operation')">
        <el-button type="primary" icon="Plus" @click="handleAdd">新增</el-button>
        <el-button icon="Download" @click="handleExport">导出</el-button>
      </div>
      <div :class="ns.b('content-table')">
        <el-table :data="tableData" style="width: 100%; height: calc(100% - 0.5rem)" empty-text="暂无数据">
          <el-table-column prop="bridgeName" label="桥梁名称" align="center"/>
          <el-table-column prop="bridgeType" label="桥梁类型" align="center"/>
          <el-table-column prop="bridgeArea" label="所属区域" align="center"/>
          <el-table-column prop="bridgePos" label="桥梁位置" align="center"/>
          <el-table-column prop="bridgeLength" label="桥梁长度" align="center"/>
          <el-table-column label="操作" align="center">
            <template #default="scope">
              <el-button v-hasPermi="['bridge:basicInfo:view']" icon="View" circle @click="handleView(scope.row)"></el-button>
              <el-button v-hasPermi="['bridge:basicInfo:edit']" icon="Edit" circle @click="handleEdit(scope.row)"></el-button>
              <el-button v-hasPermi="['bridge:basicInfo:delete']" icon="Delete" circle @click="handleDelete(scope.row)"></el-button>
              <slot name="operation" :row="scope.row"></slot>
            </template>
          </el-table-column>
        </el-table>
        <div :class="ns.b('pagination')">
          <el-pagination hide-on-single-page background layout="sizes, prev, pager, next" :total="total" @change="handlePageChange"/>
        </div>
      </div>
    </div>
    <el-dialog v-model="viewVisible" title="桥梁详情" width="50%">
      <el-descriptions border :column="2">
        <el-descriptions-item label="桥梁名称">{{ rowData?.bridgeName }}</el-descriptions-item>
        <el-descriptions-item label="桥梁类型">{{ rowData?.bridgeType }}</el-descriptions-item>
        <el-descriptions-item label="所属区域">{{ rowData?.bridgeArea }}</el-descriptions-item>
        <el-descriptions-item label="桥梁位置">{{ rowData?.bridgePos }}</el-descriptions-item>
        <el-descriptions-item label="桥梁长度">{{ rowData?.bridgeLength }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
    <el-dialog v-model="addVisible" title="新增桥梁" width="40%">
      <el-form :class="ns.e('form')" ref="addFormRef" :model="addFormData" :inline="true" :rules="addFormRules" label-width="auto">
        <el-form-item label="桥梁名称" prop="bridgeName"> 
          <el-input v-model="addFormData.bridgeName" placeholder="请输入桥梁名称" />
        </el-form-item>
        <el-form-item label="桥梁类型" prop="bridgeType">
          <el-select v-model="addFormData.bridgeType" placeholder="请选择桥梁类型" clearable>
            <el-option v-for="item in dictData.bridgeTypeDict" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="所属区域" prop="bridgeArea">
          <el-select v-model="addFormData.bridgeArea" placeholder="请选择所属区域">
            <el-option v-for="item in dictData.bridgeAreaDict" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="桥梁位置" prop="bridgePos">
          <el-input v-model="addFormData.bridgePos" placeholder="请输入桥梁位置" />
        </el-form-item>
        <el-form-item label="桥梁长度" prop="bridgeLength"> 
          <el-input v-model="addFormData.bridgeLength" placeholder="请输入桥梁长度" />
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
  import { hasPermi, resizeH } from "../../../../directive"
  export default { 
    name: "h-b-basicinfo",
    directives: {
      hasPermi, 
      resizeH
    }
  }
</script>
<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import { useNamespace } from "../../../../hooks"
import type { FormInstance, FormRules } from "element-plus"

type TableData = {
  bridgeName: string | null
  bridgeType: string | null
  bridgeArea: string | null
  bridgePos: string | null
  bridgeLength: string | null
}
type DictArray = {
  label: string,
  value: string
}
const ns = useNamespace('b-page')

withDefaults(defineProps<{
  tableData: Array<TableData>
  total: number,
  dictData: {
    bridgeTypeDict: Array<DictArray>
    bridgeAreaDict: Array<DictArray>
  }
}>(), { 
  tableData: () => [],
  total: 0,
  dictData: () => ({
    bridgeTypeDict: [],
    bridgeAreaDict: []
  })
})
const emits = defineEmits(['search', 'reset', 'delete', 'addSubmit', 'editSubmit', 'export', 'pageChange'])
const queryRef = ref<FormInstance>()
const queryParams = ref<{ 
  bridgeName: string | null,
  bridgeType: string | null,
  bridgeArea: string | null,
  page: number,
  pageSize: number
}>({ 
  bridgeName: null,
  bridgeType: null,
  bridgeArea: null,
  page: 1, 
  pageSize: 10,
})
const viewVisible = ref<boolean>(false)
const rowData = ref<TableData>()
const handleType = ref<string>('add')
const addVisible = ref<boolean>(false)
const addFormRef = ref<FormInstance>()
const addFormData = ref<TableData>({ 
  bridgeName: null,
  bridgeType: null,
  bridgeArea: null,
  bridgePos: null,
  bridgeLength: null
})
const addFormRules = ref<FormRules>({
  bridgeName: [{ required: true, message: '请输入桥梁名称', trigger: 'blur' }],
  bridgeType: [{ required: true, message: '请输入桥梁类型', trigger: 'blur' }],
  bridgePos: [{ required: true, message: '请输入桥梁位置', trigger: 'blur' }],
  bridgeLength: [{ required: true, message: '请输入桥梁长度', trigger: 'blur' }],
})
const handleSearch = () => {
  queryParams.value.page = 1
  emits('search', queryParams.value)
}
const handleReset = () => {
  queryParams.value.page = 1
  queryRef.value?.resetFields()
  emits('reset')
}
const handleDelete = (row: TableData) => {
  ElMessageBox.confirm('确定删除该桥梁吗？', '提示', {
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
  addFormData.value = { bridgeName: null, bridgeType: null, bridgeArea: null, bridgePos: null, bridgeLength: null }
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
const handlePageChange = (page: number, pageSize: number) => {
  queryParams.value.page = page
  queryParams.value.pageSize = pageSize
  emits('pageChange', queryParams.value)
}
</script>