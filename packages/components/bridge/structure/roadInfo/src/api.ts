import { request } from '../../../../../utils/request'

export const listApi = (params: any) => {
  return request({
    url: '/basics/structure/roadInfo/list',
    method: 'get',
    params
  })
}

export const addApi = (data: any) => {
  return request({
    url: '/basics/structure/roadInfo',
    method: 'post',
    data
  })
}

export const delApi = (id: string) => {
  return request({
    url: '/basics/structure/roadInfo/' + id,
    method: 'delete'
  })
}

export const editApi = (data: any) => {
  return request({
    url: '/basics/structure/roadInfo',
    method: 'put',
    data
  })
}