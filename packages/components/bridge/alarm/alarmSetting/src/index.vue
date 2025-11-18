<template>
  <div :class="ns.b()">
    <div :class="ns.b('header')">
      <el-form :class="ns.e('form')" ref="queryRef" :model="queryParams" :inline="true">
        <el-form-item label="结构物类型" prop="structureType">
          <el-select v-model="queryParams.structureType" placeholder="请选择结构物类型" clearable @change="structureTypeChange">
            <el-option v-for="item in structure_type" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="结构物名称" prop="structureId">
          <el-select v-model="queryParams.structureId" placeholder="请选择结构物名称" clearable>
            <el-option v-for="item in structureList" :key="item.structureId" :label="item.structureName" :value="item.structureId" />
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
          <el-button v-hasPermi="['alarm:alarmSetting:query']" type="primary" icon="Search" @click="handleSearch">查询</el-button>
          <el-button v-hasPermi="['alarm:alarmSetting:query']" icon="Refresh" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div :class="ns.b('content')" v-resizeH="true">
      <div :class="ns.b('content-operation')">
        <el-button>批量开关</el-button>
        <el-button>全选开关</el-button>
      </div>
      <div :class="ns.b('content-table')">
        <el-table :data="tableList" style="width: 100%; height: calc(100% - 0.5rem)" empty-text="暂无数据">
          <el-table-column prop="structureName" label="结构物名称" align="center"/>
          <el-table-column prop="structureType" label="结构物类型" align="center">
            <template #default="scope">
              <h-dicts :options="structure_type" :value="scope.row.structureType" />
            </template>
          </el-table-column>
          <el-table-column prop="tagName" label="测点名称" align="center"></el-table-column>
          <el-table-column prop="tagTypeName" label="测点类型" align="center"/>
          <el-table-column prop="structureType" label="数值类型" align="center">
            <template #default="scope">
              <h-dicts :options="tag_value_type" :value="scope.row.valueType" />
            </template>
          </el-table-column>
          <el-table-column prop="alarmFlag" label="开启报警" align="center">
            <template #default="scope">
              <el-switch
                v-model="scope.row.alarmFlag"
                inline-prompt
                active-text="开"
                inactive-text="关"
                active-value="0"
                inactive-value="1"
              />
            </template>
          </el-table-column>
          <el-table-column label="参考标准" align="center" prop="standard" />
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
              <el-button v-hasPermi="['alarm:alarmSetting:query']" icon="View" circle @click="handleView(scope.row)"></el-button>
              <el-button v-hasPermi="['alarm:alarmSetting:setting']" icon="Setting" circle @click="handleSetting(scope.row)"></el-button>
              <slot name="operation" :row="scope.row"></slot>
            </template>
          </el-table-column>
        </el-table>
        <div :class="ns.b('pagination')">
          <el-pagination hide-on-single-page background layout="sizes, prev, pager, next" :total="total" @change="handlePageChange"/>
        </div>
      </div>
    </div>
    <!-- 数字量，字符串 -->
    <el-dialog v-model="numVisible" :title="numTitle" size="40%">
      <el-form :class="ns.e('form')" ref="numFormRef" :model="numFormData" :inline="true" :disabled="handleType === 'view'" label-width="auto">
        <el-divider>报警开关</el-divider>
        <el-form-item label="操作类型" prop="alarmFlag" :rules="[{ required: true, message: '开启报警不能为空', trigger: 'change' }]">
          <el-switch v-model="numFormData.alarmFlag" inline-prompt active-text="开" inactive-text="关" active-value="0" inactive-value="1" />
        </el-form-item>
        <el-divider>限值配置</el-divider>
        <el-button type="primary" icon="Plus" @click="handleAddNumberConfig">新增</el-button>
        <el-table :data="numFormData.numberValueList || []" ref="tableRef">
          <el-table-column label="报警级别" align="center" prop="alarmLevel">
            <template #header>
              <span>报警级别</span>
              <span style="color: red">*</span>
            </template>
            <template #default="scope">
              <el-select v-model="scope.row.alarmLevel" placeholder="请选择报警级别" clearable :disabled="scope.row.alarmValueFlag === '1'">
                <el-option v-for="dict in alarm_level" :key="dict.value" :label="dict.label" :value="dict.value"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="报警值" align="center" prop="alarmValue">
            <template #header>
              <span>报警值</span>
              <span style="color: red">*</span>
            </template>
            <template #default="scope">
              <el-input v-model="scope.row.alarmValue" placeholder="请输入报警值" clearable :disabled="scope.row.alarmValueFlag === '1'"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="是否开启" align="center" prop="alarmValueFlag">
            <template #header>
              <span>是否开启</span>
              <span style="color: red">*</span>
            </template>
            <template #default="scope">
              <el-switch v-model="scope.row.alarmValueFlag" inline-prompt active-text="×" inactive-text="√" active-value="0" inactive-value="1" />
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template #default="scope">
              <el-tooltip content="删除" placement="top">
                <el-button circle icon="Delete"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <el-divider>报警依据</el-divider>
        <el-form-item label="参考标准" prop="standard" style="width: 100%">
          <el-input v-model="numFormData.standard" type="textarea" placeholder="请输入参考标准" clearable />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
        <el-button @click="analogVisible = false">取消</el-button>
      </template>
    </el-dialog>
    <!-- 模拟量 -->
    <el-dialog v-model="analogVisible" title="模拟量配置" width="40%" destroy-on-close>
      <el-form :class="ns.e('form')" ref="analogFormRef" :model="analogFormData" :inline="true" label-width="auto">
       
      </el-form>
      <template #footer>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
        <el-button @click="analogVisible = false">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts"> 
  export default {
    name: "h-b-alarmSetting",
  }
</script>
<script lang="ts" setup>
import HDicts from '../../../../basis/dicts'
import { useNamespace, useDict } from "../../../../../hooks"
import { hasPermi, resizeH } from "../../../../../directive"
import { listApi, listStructureApi, numberDetailsApi, analogDetailsApi } from './api'
import type { NumberDetails, TableData, Field } from './type'
import { ref, } from 'vue'
import type { Directive } from 'vue'
import type { FormInstance } from "element-plus"
// import { ElMessageBox, ElMessage } from 'element-plus'


const props = withDefaults(defineProps<{
  tableData?: Array<TableData>
  total?: number,
  dicts?: Array<string>
  methods?: Array<string>
  fields?: Array<Field>
}>(), {
  tableData: () => [],
  total: 0,
  dicts: () => ['structure_type', 'tag_value_type', 'alarm_level'],
  methods: () => [],
  fields: () => []
})
const emits = defineEmits(['search', 'reset', 'delete', 'addSubmit', 'editSubmit', 'export', 'pageChange'])
const vHasPermi = hasPermi as Directive<HTMLElement, any>
const vResizeH = resizeH as Directive<HTMLElement, any>
const ns = useNamespace('b-page')
const { structure_type, tag_value_type, alarm_level } = useDict(props.dicts || [])
const queryRef = ref<FormInstance>()
const queryParams = ref<{
  structureId: string | null,
  structureType: string | null,
  pageNum: number,
  pageSize: number
}>({ 
  structureId: null,
  structureType: null,
  pageNum: 1,
  pageSize: 10,
})
const structureList = ref<Array<any>>([])
const tableList = ref<Array<TableData>>([])
const total = ref<number>(0)

const numVisible = ref<boolean>(false)
const numTitle = ref<string>('模拟量配置')
const numFormRef = ref<FormInstance>()
const numFormData = ref<Partial<NumberDetails>>({})

const analogVisible = ref<boolean>(false)
const analogFormRef = ref<FormInstance>()
const analogFormData = ref({})

const rowData = ref<TableData>()
const handleType = ref<string>('view')

const handleAddNumberConfig = () => {
  numFormData.value.numberValueList?.push({
    alarmLevel: null,
    alarmValue: null,
    alarmValueFlag: null,
  })
}

const structureTypeChange = (val: string) => {
  listStructureApi({ structureType: val }).then((res: any) => {
    if (res.code === 200) {
      structureList.value = res.rows || []
    }
  })
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
const handleView = (row: TableData) => {
  rowData.value = row
  handleType.value = 'view'
  getDetails(row)

}
const handleSetting = (row: TableData) => {
  rowData.value = row
  handleType.value = 'setting'
  getDetails(row)
}

const getDetails = (row: TableData) => {
  if (row.valueType === '1' || row.valueType === '3') {
    numTitle.value = row.valueType === '1' ? '数字量配置' : '字符串配置'
    getNumberDetails(row)
  } else {
    getAnalogDetails(row)
  }
}

// 获取数字量，字符串详情
const getNumberDetails = (row: TableData) => {
  numberDetailsApi(row.tagId as string).then((res: any) => {
    if (res.code === 200) {
      numFormData.value = res.data
      numVisible.value = true
    }
  })
}
// 获取模拟量详情
const getAnalogDetails = (row: TableData) => {
  analogDetailsApi(row.tagId as string).then((res: any) => {
    if (res.code === 200) {
      analogFormData.value = res.data
      analogVisible.value = true
    }
  })
}

const handleSubmit = () => {
  analogFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      console.log(numFormData.value)
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
  if (props.tableData.length > 0) {
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