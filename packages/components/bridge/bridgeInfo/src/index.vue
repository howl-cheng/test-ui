<template>
  <div :class="ns.b()">
    <div :class="ns.b('header')">
      <el-form :class="ns.e('form')" ref="queryRef" :model="queryParams" :inline="true">
        <el-form-item label="桥梁名称" prop="structureName">
          <el-input v-model="queryParams.structureName" placeholder="请输入桥梁名称" clearable/>
        </el-form-item>
        <el-form-item label="所属区域" prop="belongingArea">
          <el-select v-model="queryParams.belongingArea" placeholder="请选择所属区域" clearable>
            <el-option v-for="item in belonging_area" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="桥梁类型" prop="bridgeScale">
          <el-select v-model="queryParams.bridgeScale" placeholder="请选择桥梁类型" clearable>
            <el-option v-for="item in bridge_scale" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="养护类别" prop="maintenanceType">
          <el-select v-model="queryParams.maintenanceType" placeholder="请选择养护类别" clearable>
            <el-option v-for="item in bridge_maintenance_type" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="养护等级" prop="maintenanceLevel">
          <el-select v-model="queryParams.maintenanceLevel" placeholder="请选择养护等级" clearable>
            <el-option v-for="item in bridge_maintenance_level" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item v-for="field in fields" :key="field.prop" :label="field.label" :prop="field.prop">
          <template v-if="field.type === 'select' && field.isSearch">
            <el-select v-model="queryParams[field.prop as keyof typeof queryParams]" :placeholder="`请选择${field.label}`" clearable>
              <el-option v-for="item in field.options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </template>
          <template v-else-if="field.type === 'input' && field.isSearch">
            <el-input v-model="queryParams[field.prop as keyof typeof queryParams]" :placeholder="`请输入${field.label}`" clearable />
          </template>
        </el-form-item>
        <el-form-item>
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
        <el-table :data="tableList" style="width: 100%; height: calc(100% - 0.5rem)" empty-text="暂无数据">
          <el-table-column prop="structureName" label="桥梁名称" align="center"/>
          <el-table-column prop="bridgeScale" label="桥梁类型" align="center">
            <template #default="scope">
              <h-dicts :options="bridge_scale" :value="scope.row.bridgeScale" />
            </template>
          </el-table-column>
          <el-table-column prop="belongingArea" label="所属区域" align="center">
            <template #default="scope">
              <h-dicts :options="belonging_area" :value="scope.row.belongingArea" />
            </template>
          </el-table-column>
          <el-table-column prop="location" label="桥梁位置" align="center"/>
          <el-table-column prop="maintenanceType" label="养护类别" align="center">
            <template #default="scope">
              <h-dicts :options="bridge_maintenance_type" :value="scope.row.maintenanceType" />
            </template>
          </el-table-column>
          <el-table-column prop="maintenanceLevel" label="养护等级" align="center">
            <template #default="scope">
              <h-dicts :options="bridge_maintenance_level" :value="scope.row.maintenanceLevel" />
            </template>
          </el-table-column>
          <el-table-column v-for="field in fields" :key="field.prop" :label="field.label" align="center">
            <template #default="scope">
              <template v-if="field.type === 'select'">
                <h-dicts :options="field.options" :value="scope.row[field.prop as keyof typeof scope.row]" />
              </template>
              <template v-else-if="field.type === 'input'">
                {{ scope.row[field.prop] }}
              </template>
            </template>
          </el-table-column>
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
    <el-drawer v-model="viewVisible" title="桥梁详情" size="40%">
      <el-descriptions border :column="2">
        <el-descriptions-item label="桥梁名称">{{ rowData?.structureName }}</el-descriptions-item>
        <el-descriptions-item label="桥梁类型">{{ rowData?.bridgeScale }}</el-descriptions-item>
        <el-descriptions-item label="所属区域">{{ rowData?.belongingArea }}</el-descriptions-item>
        <el-descriptions-item label="桥梁位置">{{ rowData?.location }}</el-descriptions-item>
        <el-descriptions-item label="养护类别">{{ rowData?.maintenanceType }}</el-descriptions-item>
        <el-descriptions-item label="养护等级">{{ rowData?.maintenanceLevel }}</el-descriptions-item>
        <el-descriptions-item v-for="field in fields" :key="field.prop" :label="field.label">
          <template v-if="field.type === 'select'">
            <h-dicts :options="field.options" :value="rowData?.[field.prop as keyof typeof rowData]" />
          </template>
          <template v-else-if="field.type === 'input'">
            {{ rowData?.[field.prop as keyof typeof rowData] }}
          </template>
        </el-descriptions-item>
      </el-descriptions>
    </el-drawer>
    <el-dialog v-model="addVisible" title="新增桥梁" width="34%" destroy-on-close>
      <el-form :class="ns.e('form')" ref="addFormRef" :model="addFormData" :inline="true" :rules="addFormRules" label-width="auto">
        <el-form-item label="桥梁名称" prop="structureName"> 
          <el-input v-model="addFormData.structureName" placeholder="请输入桥梁名称" />
        </el-form-item>
        <el-form-item label="桥梁类型" prop="bridgeScale">
          <el-select v-model="addFormData.bridgeScale" placeholder="请选择桥梁类型" clearable>
            <el-option v-for="item in bridge_scale" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="所属区域" prop="belongingArea">
          <el-select v-model="addFormData.belongingArea" placeholder="请选择所属区域">
            <el-option v-for="item in belonging_area" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="桥梁位置" prop="location">
          <el-input v-model="addFormData.location" placeholder="请输入桥梁位置" />
        </el-form-item>
        <el-form-item label="养护类别" prop="maintenanceType">
          <el-select v-model="addFormData.maintenanceType" placeholder="请选择养护类别">
            <el-option v-for="item in bridge_maintenance_type" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="养护等级" prop="maintenanceLevel">
          <el-select v-model="addFormData.maintenanceLevel" placeholder="请选择养护等级">
            <el-option v-for="item in bridge_maintenance_level" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item v-for="field in fields" :key="field.prop" :label="field.label" :prop="field.prop" >
          <template v-if="field.type === 'select' && field.isRequired">
            <el-select v-model="addFormData[field.prop as keyof typeof addFormData]" :placeholder="`请选择 ${field.label}`" clearable>
              <el-option v-for="item in field.options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </template>
          <template v-else-if="field.type === 'input' && field.isRequired">
            <el-input v-model="addFormData[field.prop as keyof typeof addFormData]" :placeholder="`请输入 ${field.label}`" clearable />
          </template>
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
  export default { 
    name: "h-b-bridgeInfo",
  }
</script>
<script lang="ts" setup>
import HDicts from '../../../basis/dicts' 
import { ref } from 'vue'
import type { Directive } from 'vue'

import { ElMessageBox, ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from "element-plus"

import { useNamespace, useDict } from "../../../../hooks"
import { hasPermi, resizeH } from "../../../../directive"
import { listApi, addApi, delApi, editApi } from './api'

type Field = {
  label: string
  prop: string
  placeholder: string
  type: string
  isRequired: boolean
  isSearch: boolean
  options: Array<any>
}
type TableData = {
  structureId: string | null,
  structureName: string | null
  bridgeScale: string | null
  belongingArea: string | null
  location: string | null
  maintenanceType: string | null
  maintenanceLevel: string | null
}
const props = withDefaults(defineProps<{
  tableData?: Array<TableData>
  total?: number,
  dicts?: Array<string>
  methods?: Array<string>
  fields?: Array<Field>
}>(), {
  tableData: () => [],
  total: 0,
  dicts: () => ['belonging_area', 'bridge_scale', 'bridge_maintenance_type', 'bridge_maintenance_level'],
  methods: () => [],
  fields: () => []
})
const emits = defineEmits(['search', 'reset', 'delete', 'addSubmit', 'editSubmit', 'export', 'pageChange'])



const vHasPermi = hasPermi as Directive<HTMLElement, any>
const vResizeH = resizeH as Directive<HTMLElement, any>
const ns = useNamespace('b-page')
const { belonging_area, bridge_scale, bridge_maintenance_type, bridge_maintenance_level } = useDict(props.dicts || [])

const queryRef = ref<FormInstance>()
const queryParams = ref<{ 
  structureName: string | null,
  bridgeScale: string | null,
  belongingArea: string | null,
  maintenanceType: string | null,
  maintenanceLevel: string | null,
  pageNum: number,
  pageSize: number
}>({ 
  structureName: null,
  bridgeScale: null,
  belongingArea: null,
  maintenanceType: null,
  maintenanceLevel: null,
  pageNum: 1, 
  pageSize: 10,
})
const tableList = ref<Array<TableData>>([])
const total = ref<number>(0)
const handleType = ref<string>('add')
const viewVisible = ref<boolean>(false)
const rowData = ref<TableData>()
const addVisible = ref<boolean>(false)
const addFormRef = ref<FormInstance>()
const addFormData = ref<TableData>({
  structureId: null,
  structureName: null,
  bridgeScale: null,
  belongingArea: null,
  location: null,
  maintenanceType: null,
  maintenanceLevel: null
})
const addFormRules = ref<FormRules>({
  structureName: [{ required: true, message: '请输入桥梁名称', trigger: 'blur' }],
  bridgeScale: [{ required: true, message: '请选择桥梁类型', trigger: 'change' }],
  belongingArea: [{ required: true, message: '请选择所属区域', trigger: 'change' }],
  location: [{ required: true, message: '请输入桥梁位置', trigger: 'blur' }],
  maintenanceType: [{ required: true, message: '请选择养护类别', trigger: 'change' }],
  maintenanceLevel: [{ required: true, message: '请选择养护等级', trigger: 'change' }],
  ...props.fields.reduce((acc: FormRules, field: Field) => {
    if (field.isRequired) {
      acc[field.prop as keyof typeof acc] = [{ required: true, message: `请选择 ${field.label}`, trigger: 'change' }]
    }
    return acc
  }, {} as FormRules),
})

const handleSearch = () => {
  queryParams.value.pageNum = 1
  if (props.methods.includes('search')) {
    emits('search', queryParams.value)
  } else {
    getBridgeList()
  }
}
const handleReset = () => {
  queryParams.value.pageNum = 1
  queryRef.value?.resetFields()
  if (props.methods.includes('reset')) {
    emits('reset')
  } else {
    getBridgeList()
  }
}
const handleDelete = (row: TableData) => {
  ElMessageBox.confirm('确定删除该桥梁吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    if (props.methods.includes('delete')) {
      emits('delete', row)
    } else {
      delApi(row.structureId as string).then((res: any) => {
        if (res.code === 200) {
          getBridgeList()
          ElMessage.success('删除成功')
        }
      })
    }
  }).catch(() => {})
}
const handleView = (row: TableData) => {
  rowData.value = row
  viewVisible.value = true
}
const handleAdd = () => {
  addFormData.value = {} as TableData
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
        if (props.methods.includes('addSubmit')) {
          emits('addSubmit', addFormData.value)
        } else {
          addApi(addFormData.value).then((res: any) => {
            if (res.code === 200) {
              getBridgeList()
              ElMessage.success('新增成功')
            }
          })
        }
      } else {
        if (props.methods.includes('editSubmit')) {
          emits('editSubmit', addFormData.value)
        } else {
          editApi(addFormData.value).then((res: any) => {
            if (res.code === 200) {
              getBridgeList()
              ElMessage.success('编辑成功')
            }
          })
        }
      }
      addVisible.value = false
    }
  })
}
const handleExport = () => {
  emits('export', queryParams.value)
}
const handlePageChange = (page: number, pageSize: number) => {
  queryParams.value.pageNum = page
  queryParams.value.pageSize = pageSize
  if (props.methods.includes('pageChange')) {
    emits('pageChange', queryParams.value)
  } else {
    getBridgeList()
  }
}

// 数据接收，如果有传入的tableData 则使用传入的数据，否则请求接口获取数据
const getBridgeList = async () => {
  if (props.tableData.length > 0 ) {
    tableList.value = props.tableData
    total.value = props.total
  } else {
    const res: any = await listApi(queryParams.value)
    if (res.code === 200) {
      tableList.value = res.rows
      total.value = res.total
    }
  }
}
getBridgeList()
</script>