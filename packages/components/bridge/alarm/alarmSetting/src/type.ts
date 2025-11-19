export interface TableData {
  tagId: string | null
  structureName: string | null
  structureType: string | null
  tagName: string | null
  tagTypeName: string | null
  valueType: string | null
  alarmFlag: string | null
  standard: string | null
}

export interface NumberDetails {
  tagId: string | null
  standard: string | null
  alarmFlag: string | null
  numberValueList: {
    alarmLevel: string | null,
    alarmValue: string | null,
    alarmValueFlag: string | null,
    createBy?: number | null,
    createDept?: number | null,
    createTime?: string | null,
    delFlag?: string | null,
    remark?: string | null,
    settingId?: string | null,
    tagId?: string | null,
    tenantId?: string | null,
    updateBy?: number | null,
    updateTime?: string | null
  }[] | null
}

export interface Field {
  label: string
  prop: string
  placeholder: string
  type: string
  isRequired: boolean
  isSearch: boolean
  options: Array<any>
}

export interface FormRules {
  alarmLevel: Array<any>
  alarmValue: Array<any>
}