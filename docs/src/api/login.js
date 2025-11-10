import request from '@/request/index.js'
// 登录接口
export const loginApi = (data) => {
  return request({
    url: '/auth/login',
    method: 'post',
    data: data
  })
}