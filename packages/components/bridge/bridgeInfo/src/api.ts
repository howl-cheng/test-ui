import { request } from '../../../../utils/request'

export const listApi = (params: any) => {
  return request({
    url: '/basics/structure/bridgeInfo/list',
    method: 'get',
    params
  })
}

export const addApi = (data: any) => {
  return request({
    url: '/basics/structure/bridgeInfo',
    method: 'post',
    data
  })
}

export const delApi = (id: string) => {
  return request({
    url: '/basics/structure/bridgeInfo/' + id,
    method: 'delete'
  })
}

export const editApi = (data: any) => {
  return request({
    url: '/basics/structure/bridgeInfo',
    method: 'put',
    data
  })
}