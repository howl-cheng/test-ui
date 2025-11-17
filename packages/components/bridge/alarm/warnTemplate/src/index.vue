<template>
  <div :class="ns.b()">
    <div :class="ns.b('header')">
      <el-form :class="ns.e('form')" ref="queryRef" :model="queryParams" :inline="true">
        <el-form-item label="模板名称" prop="templateName">
          <el-input v-model="queryParams.templateName" placeholder="请输入模板名称" clearable />
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
          <el-button v-hasPermi="['alarm:warnTemplate:query']" type="primary" icon="Search" @click="handleSearch">查询</el-button>
          <el-button v-hasPermi="['alarm:warnTemplate:query']" icon="Refresh" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div :class="ns.b('content')" v-resizeH="true">
      <div :class="ns.b('content-operation')">
        <el-button type="primary" icon="Plus" @click="handleAdd">新增</el-button>
      </div>
      <div :class="ns.b('content-table')">
        <el-table :data="tableList" style="width: 100%; height: calc(100% - 0.5rem)" empty-text="暂无数据">
          <el-table-column prop="templateName" label="模板名称" align="center"/>
          <el-table-column prop="sign" label="签名" align="center">
            <template #default="scope">
              <h-dicts :options="warn_notice_sign" :value="scope.row.sign" />
            </template>
          </el-table-column>
          <el-table-column prop="content" label="模板内容" align="center"></el-table-column>
          <el-table-column prop="createName" label="操作人" align="center"/>
          <el-table-column prop="createTime" label="操作时间" align="center"/>
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
              <el-button v-hasPermi="['alarm:warnTemplate:query']" icon="View" circle @click="handleView(scope.row)"></el-button>
              <el-button v-hasPermi="['alarm:warnTemplate:edit']" icon="Edit" circle @click="handleEdit(scope.row)"></el-button>
              <el-button v-hasPermi="['alarm:warnTemplate:remove']" icon="Delete" circle @click="handleDelete(scope.row)"></el-button>
              <slot name="operation" :row="scope.row"></slot>
            </template>
          </el-table-column>
        </el-table>
        <div :class="ns.b('pagination')">
          <el-pagination hide-on-single-page background layout="sizes, prev, pager, next" :total="total" @change="handlePageChange"/>
        </div>
      </div>
    </div>
    <el-drawer v-model="viewVisible" title="预警推送配置详情" size="40%">
      <el-descriptions border :column="2">
        <el-descriptions-item label="模板名称">{{ rowData?.templateName }}</el-descriptions-item>
        <el-descriptions-item label="签名">
          <h-dicts :options="warn_notice_sign" :value="rowData?.sign" />
        </el-descriptions-item>
        <el-descriptions-item label="模板内容" span="2">{{ rowData?.content }}</el-descriptions-item>
        <el-descriptions-item label="操作人">{{ rowData?.createName }}</el-descriptions-item>
        <el-descriptions-item label="操作时间">{{ rowData?.createTime }}</el-descriptions-item>
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
    <el-dialog v-model="addVisible" title="新增预警推送配置" width="380" destroy-on-close>
      <el-form :class="ns.e('form')" ref="addFormRef" :model="addFormData" :inline="true" :rules="addFormRules" label-width="auto">
        <el-form-item label="模板名称" prop="templateName"> 
          <el-input v-model="addFormData.templateName" placeholder="请输入模板名称" clearable />
        </el-form-item>
        <el-form-item label="签名" prop="sign">
          <el-select v-model="addFormData.sign" placeholder="请选择签名" clearable>
            <el-option v-for="item in warn_notice_sign" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="可插入数据">
          <el-card>
            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
              <el-button
                v-for="item in warn_notice_item"
                :key="item.value"
                type="primary"
                style="margin-left: 0px;"
                size="small"
                @click="handleInsert(item.value)">{{ item.label }}</el-button>
            </div>
          </el-card>
        </el-form-item>
        <el-form-item label="模板内容" prop="content">
          <el-input id="content" v-model="addFormData.content" :rows="5" type="textarea" placeholder="请输入模板内容" />
        </el-form-item>
        <el-form-item v-for="field in fields" :key="field.prop" :label="field.label" :prop="field.prop" >
          <template v-if="field.type === 'select' && field.isRequired">
            <el-select v-model="addFormData[field.prop as keyof typeof addFormData]" :placeholder="`请选择${field.label}`" clearable>
              <el-option v-for="item in field.options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </template>
          <template v-else-if="field.type === 'input' && field.isRequired">
            <el-input v-model="addFormData[field.prop as keyof typeof addFormData]" :placeholder="`请输入${field.label}`" clearable />
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
    name: "h-b-warnTemplate",
  }
</script>
<script lang="ts" setup>
import HDicts from '../../../../basis/dicts' 
import { ref, } from 'vue'
import type { Directive } from 'vue'

import { ElMessageBox, ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from "element-plus"

import { useNamespace, useDict } from "../../../../../hooks"
import { hasPermi, resizeH } from "../../../../../directive"
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
  templateId: string | null
  templateName: string | null
  sign: string | null
  content: string | null | undefined
  createName: string | null
  createTime: string | null
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
  dicts: () => ['warn_notice_sign', 'warn_notice_item'],
  methods: () => [],
  fields: () => []
})
const emits = defineEmits(['search', 'reset', 'delete', 'addSubmit', 'editSubmit', 'export', 'pageChange'])


const vHasPermi = hasPermi as Directive<HTMLElement, any>
const vResizeH = resizeH as Directive<HTMLElement, any>
const ns = useNamespace('b-page')
const { warn_notice_sign, warn_notice_item } = useDict(props.dicts || [])
const queryRef = ref<FormInstance>()
const queryParams = ref<{ 
  templateName: string | null,
  pageNum: number,
  pageSize: number
}>({ 
  templateName: null,
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
  templateId: null,
  templateName: null,
  sign: null,
  content: null,
  createName: null,
  createTime: null
})
const addFormRules = ref<FormRules>({
  templateName: [{ required: true, message: '请输入模板名称', trigger: 'blur' }],
  sign: [{ required: true, message: '请选择签名', trigger: 'change' }],
  content: [{ required: true, message: '请输入模板内容', trigger: 'blur' }],
  ...props.fields.reduce((acc: FormRules, field: Field) => {
    if (field.isRequired) {
      acc[field.prop as keyof typeof acc] = [{ required: true, message: `请选择 ${field.label}`, trigger: 'change' }]
    }
    return acc
  }, {} as FormRules),
})

const handleInsert = (item: string) => {
  console.log(item)
  const content = document.getElementById('content') as HTMLTextAreaElement
  if (content) {
    const startText = addFormData.value.content?.slice(0, content.selectionStart) || ''
    const endText = addFormData.value.content?.slice(content.selectionEnd) || ''
    addFormData.value.content = startText + item + endText
  }
}


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
  ElMessageBox.confirm('确定删除预警该推送配置吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    if (props.methods.includes('delete')) {
      emits('delete', row)
    } else {
      delApi(row.templateId as string).then((res: any) => {
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