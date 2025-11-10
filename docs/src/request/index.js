import axios from 'axios'
import { userStore } from '@/store'
import { tansParams } from '@/utils/common.js'



// 创建axios实例
const request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API, // 所有的请求地址前缀部分
    timeout: 80000,
})
// request拦截器
request.interceptors.request.use(config => {
    // 添加token
    let token = userStore().token
    if (token) {
        config.headers["Authorization"] = "Bearer " + token
    }
    // get请求映射params参数
    if (config.method === 'get' && config.params) {
        let url = config.url + '?' + tansParams(config.params)
        config.params = {}
        config.url = url.slice(0, -1)
    }

    return config
}, error => {
    Promise.reject(error)
})

// response 拦截器
request.interceptors.response.use(response => {
    let code = response.data.code || 200
    if (code >= 200 && code < 300) {
        return Promise.resolve(response.data)
    } else if (code === 401) {
        // 跳转登录页 清除用户信息
        // logOut()
        return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
    } else if (code === 500) {
        // 报错弹窗提示
        // return Promise.reject(new Error(msg))
    } else {
        // 其他问题
        return Promise.reject('error')
    }
}, error => {
    return Promise.reject(error)
})

export default request