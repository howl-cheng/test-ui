
import { request } from '../../../../../utils/request'

export const listApi = (params: any) => {
  return request({
    url: 'basics/alarm/warnNoticeTemplate/list',
    method: 'get',
    params
  })
}

export const addApi = (data: any) => {
  return request({
    url: 'basics/alarm/warnNoticeTemplate',
    method: 'post',
    data
  })
}

export const delApi = (id: string) => {
  return request({
    url: 'basics/alarm/warnNoticeTemplate/' + id,
    method: 'delete'
  })
}

export const editApi = (data: any) => {
  return request({
    url: 'basics/alarm/warnNoticeTemplate',
    method: 'put',
    data
  })
}
