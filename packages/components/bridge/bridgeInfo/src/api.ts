import { request } from '../../../../utils/request'

export const bridgeListApi = (query: any) => {
  return request({
    url: '/basics/structure/bridgeInfo/list',
    method: 'get',
    params: query
  })
}