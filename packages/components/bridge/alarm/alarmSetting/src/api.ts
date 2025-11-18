
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
export function listStructureApi(query: any) {
  return request({
    url: '/basics/structure/structureInfo/list',
    method: 'get',
    params: query
  })
}

