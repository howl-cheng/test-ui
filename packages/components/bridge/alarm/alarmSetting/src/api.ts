
import { request } from '../../../../../utils/request'

export const listApi = (params: any) => {
  return request({
    url: 'basics/alarm/alarmSetting/list',
    method: 'get',
    params
  })
}
// 数字量，字符串
export function numberDetailsApi(tagId: string) {
  return request({
    url: 'basics/alarm/alarmSetting/getNumber/' + tagId,
    method: 'get'
  })
}
// 模拟量
export function analogDetailsApi(tagId: string) {
  return request({
    url: 'basics/alarm/alarmSetting/getAnalog/' + tagId,
    method: 'get'
  })
}

export function settingNumberApi(data: any) {
  return request({
    url: 'basics/alarm/alarmSetting/settingNumber',
    method: 'put',
    data: data
  })
}

export function multiSwitchAlarmApi(data: any) {
  return request({
    url: 'basics/alarm/alarmSetting/batchSwitch',
    method: 'post',
    data: data
  })
}
export function allSwitchAlarmApi(data: any) {
  return request({
    url: 'basics/alarm/alarmSetting/allSwitch',
    method: 'post',
    data: data
  })
}
export function listStructureApi(query: any) {
  return request({
    url: '/basics/structure/structureInfo/list',
    method: 'get',
    params: query
  })
}

export function listTagTypeApi() {
  return request({
    url: '/basics/device/tagType/list',
    method: 'get',
  })
}
