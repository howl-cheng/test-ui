import { request } from '../../../../utils/request'
export const dictsApi = (dict: string) => {
  return request({
    url: `/system/dict/data/type/${dict}`,
    method: 'get'
  })
}