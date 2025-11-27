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
        <el-form-item label="测点类型" prop="tagTypeId">
          <el-select v-model="queryParams.tagTypeId" placeholder="请选择测点类型" clearable>
            <el-option v-for="dict in tagTypeList" :key="dict.tagTypeId" :label="dict.tagTypeName" :value="dict.tagTypeId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数值类型" prop="valueType">
          <el-select v-model="queryParams.valueType" placeholder="请选择数值类型" clearable>
            <el-option v-for="item in tag_value_type" :key="item.value" :label="item.label" :value="item.value" />
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
        <el-button @click="switchAll('batch')" :disabled="selectIds.length === 0">批量开关</el-button>
        <el-button @click="switchAll('all')">全选开关</el-button>
      </div>
      <div :class="ns.b('content-table')">
        <el-table :data="tableList" style="width: 100%; height: calc(100% - 0.5rem)" empty-text="暂无数据" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />
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
                @change="changeAlarmFlag(scope.row)"
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
        <el-button type="primary" icon="Plus" @click="addNumberConfig">新增</el-button> 
        <el-table :data="filteredNumberList" ref="tableRef">
          <el-table-column label="报警级别" align="center" prop="alarmLevel">
            <template #header>
              <span>报警级别</span>
              <span style="color: red">*</span>
            </template>
            <template #default="scope">
              <el-form-item
                :prop="'numberValueList.' + scope.$index + '.alarmLevel'"
                :rules="scope.row.alarmValueFlag === '1' ? [] : numFormRules.alarmLevel"
                :inline-message="true"
              >
                <el-select v-model="scope.row.alarmLevel" placeholder="请选择报警级别" clearable :disabled="scope.row.alarmValueFlag === '1'">
                  <el-option v-for="dict in alarm_level" :key="dict.value" :label="dict.label" :value="dict.value"></el-option>
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="报警值" align="center" prop="alarmValue">
            <template #header>
              <span>报警值</span>
              <span style="color: red">*</span>
            </template>
            <template #default="scope">
              <el-form-item
                :prop="'numberValueList.' + scope.$index + '.alarmValue'"
                :rules="scope.row.alarmValueFlag === '1' ? [] : numFormRules.alarmValue"
                :inline-message="true"
              >
                <el-input v-model="scope.row.alarmValue" placeholder="请输入报警值" clearable :disabled="scope.row.alarmValueFlag === '1'"></el-input>
              </el-form-item>
              </template>
          </el-table-column>
          <el-table-column label="是否开启" align="center" prop="alarmValueFlag">
            <template #header>
              <span>是否开启</span>
              <span style="color: red">*</span>
            </template>
            <template #default="scope">
              <el-switch v-model="scope.row.alarmValueFlag" inline-prompt active-text="开" inactive-text="关" active-value="0" inactive-value="1" />
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template #default="scope">
              <el-tooltip content="删除" placement="top">
                <el-button circle icon="Delete" @click="deleteNumberConfig(scope.row, scope.$index)"></el-button>
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
        <el-button type="primary" @click="handleSubmit('num')">确定</el-button>
        <el-button @click="analogVisible = false">取消</el-button>
      </template>
    </el-dialog>
    <!-- 模拟量 -->
    <el-dialog v-model="analogVisible" title="模拟量配置" width="40%" destroy-on-close>
      <el-form :class="ns.e('form')" ref="analogFormRef" :model="analogFormData" :inline="true" label-width="auto"></el-form>
      <template #footer>
        <el-button type="primary" @click="handleSubmit('analog')">确定</el-button>
        <el-button @click="analogVisible = false">取消</el-button>
      </template>
    </el-dialog>
    <!-- 批量开关 -->
    <el-dialog v-model="switchVisible" :title="switchTitle" width="400" destroy-on-close>
      <label>操作类型：</label>
      <el-switch v-model="switchAlarmFlag" inline-prompt active-text="开" inactive-text="关" active-value="0" inactive-value="1" />
      <template #footer>
        <el-button type="primary" @click="switchSubmit()">确定</el-button>
        <el-button @click="switchVisible = false">取消</el-button>
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
import { listApi, listStructureApi, numberDetailsApi, analogDetailsApi, settingNumberApi, listTagTypeApi, multiSwitchAlarmApi, allSwitchAlarmApi} from './api'
import type { NumberDetails, TableData, Field, FormRules } from './type'
import { ref, computed } from 'vue'
import type { Directive } from 'vue'
import type { FormInstance } from "element-plus"
import { ElMessageBox, ElMessage } from 'element-plus'


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
  tagTypeId: string | null,
  valueType: string | null,
  pageNum: number,
  pageSize: number
}>({ 
  structureId: null,
  structureType: null,
  tagTypeId: null,
  valueType: null,
  pageNum: 1,
  pageSize: 10,
})
const structureList = ref<Array<any>>([])
const tagTypeList = ref<Array<any>>([])
const tableList = ref<Array<TableData>>([])
const total = ref<number>(0)
const selectIds = ref<string[]>([])

const numVisible = ref<boolean>(false)
const numTitle = ref<string>('模拟量配置')
const numFormRef = ref<FormInstance>()
const numFormData = ref<Partial<NumberDetails>>({})
const numFormRules = ref<FormRules>({
  alarmLevel: [{ required: true, message: '报警级别不能为空', trigger: 'change' }],
  alarmValue: [{ required: true, message: '报警值不能为空', trigger: 'blur' }]
})
const analogVisible = ref<boolean>(false)
const analogFormRef = ref<FormInstance>()
const analogFormData = ref({})

const switchVisible = ref<boolean>(false)
const switchTitle = ref<string>('全选开关')
const switchAlarmFlag = ref<string>('1')

const rowData = ref<TableData>()
const handleType = ref<string>('view')

const filteredNumberList = computed(() => {
  return numFormData.value.numberValueList?.filter((item: any) => item.delFlag !== '2') || []
})
const handleSelectionChange = (selection: Array<TableData>) => {
  selectIds.value = selection.map((item: TableData) => item.tagId as string)
}

const switchAll = (type: string) => {
  switchTitle.value = type === 'batch' ? '批量开关' : '全选开关'
  switchVisible.value = true
}
const switchSubmit = () => {
  if (switchTitle.value === '批量开关') {
    multiSwitchAlarmApi({ tagIds: selectIds.value, alarmFlag: switchAlarmFlag.value}).then((res: any) => {
      if (res.code === 200) {
        ElMessage.success('批量开关成功')
        switchVisible.value = false
        getList()
      }
    })
  } else {
    allSwitchAlarmApi({
      dto: {
        ...queryParams.value,
      },
      alarmFlag: switchAlarmFlag.value
    }).then((res: any) => {
      if (res.code === 200) {
        ElMessage.success('全选开关成功')
        switchVisible.value = false
        getList()
      }
    })
  }
}
const changeAlarmFlag = (row: TableData) => {
  let str = row.alarmFlag === '0' ? '开启' : '关闭'
  ElMessageBox.confirm(`确定要${str}报警吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    multiSwitchAlarmApi({ tagIds: [row.tagId], alarmFlag: row.alarmFlag}).then((res: any) => {
      if (res.code === 200) {
        ElMessage.success(`${str}报警成功`)
      } else {
        ElMessage.error(`${str}报警失败`)
        row.alarmFlag = row.alarmFlag === '0' ? '1' : '0'
      }
    }).catch(() => {
      row.alarmFlag = row.alarmFlag === '0' ? '1' : '0'
    })
  }).catch(() => {
    row.alarmFlag = row.alarmFlag === '0' ? '1' : '0'
  })
}


const addNumberConfig = () => {
  numFormData.value.numberValueList?.push({
    tagId: numFormData.value.tagId,
    alarmLevel: '',
    alarmValue: '',
    alarmValueFlag: '1',
    delFlag: '0'
  })
}
const deleteNumberConfig = (row: any, index: number) => {
  if (row.settingId) {
    row.delFlag = '2'
  } else {
    numFormData.value.numberValueList?.splice(index, 1)
  }
}

const structureTypeChange = (val: string) => {
  listStructureApi({ structureType: val }).then((res: any) => {
    if (res.code === 200) {
      structureList.value = res.rows || []
    }
  })
}
const getTagTypeList = () => {
  listTagTypeApi().then((res: any) => {
    if (res.code === 200) {
      tagTypeList.value = res.rows || []
    }
  })
}
const handleSearch = () => {
  queryParams.value.pageNum = 1
  if (props.methods.includes('search')) {
    emits('search', queryParams.value)
  } else {
    getList()
  }
}
const handleReset = () => {
  queryParams.value.pageNum = 1
  queryRef.value?.resetFields()
  if (props.methods.includes('reset')) {
    emits('reset')
  } else {
    getList()
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

const handleSubmit = (type: string) => {
  if (type === 'num') {
    numFormRef.value?.validate((valid: boolean) => {
      if (valid) {
        settingNumberApi(numFormData.value).then((res: any) => {
          if (res.code === 200) {
            getList()
            numVisible.value = false
          }
        })
      }
    })
  } else {
    analogFormRef.value?.validate((valid: boolean) => {
      if (valid) {
        console.log(analogFormData.value)
      }
    })
  }
}

const handlePageChange = (page: number, pageSize: number) => {
  queryParams.value.pageNum = page
  queryParams.value.pageSize = pageSize
  if (props.methods.includes('pageChange')) {
    emits('pageChange', queryParams.value)
  } else {
    getList()
  }
}

// 数据接收，如果有传入的tableData 则使用传入的数据，否则请求接口获取数据
const getList = async () => {
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
getList()
getTagTypeList()
</script>