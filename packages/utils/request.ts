import axios from 'axios'

let requestParams = {
  baseURL: '/dev-api',
  timeout: 80000,
  clientId: '',
  token: '',
}

export const setRequestParams = (params: any) => {
  requestParams = {
    ...requestParams,
    ...params,
  }
}

export const tansParams = (params: any) => {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    var part = encodeURIComponent(propName) + '='
    if (value !== null && value !== '' && typeof value !== 'undefined') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== '' && typeof value[key] !== 'undefined') {
            let params = propName + '[' + key + ']'
            var subPart = encodeURIComponent(params) + '='
            result += subPart + encodeURIComponent(value[key]) + '&'
          }
        }
      } else {
        result += part + encodeURIComponent(value) + '&'
      }
    }
  }
  return result
}

export const request = axios.create({
    baseURL: requestParams.baseURL, // 所有的请求地址前缀部分
    timeout: requestParams.timeout,
})

// request拦截器
request.interceptors.request.use((config: any) => {
    // 添加token
    let token = requestParams.token
    let clientid = requestParams.clientId
    if (token) {
        config.headers["Authorization"] = "Bearer " + token
    }
    if (clientid) {
        config.headers["clientid"] = clientid
    }
    // get请求映射params参数
    if (config.method === 'get' && config.params) {
        let url = config.url + '?' + tansParams(config.params)
        config.params = {}
        config.url = url.slice(0, -1)
    }

    return config
}, error => {
    return Promise.reject(error)
})

// response 拦截器
request.interceptors.response.use((response: any) => {
    let code = response.data.code || 200
    if (code >= 200 && code < 300) {
        return Promise.resolve(response.data)
    } else if (code === 401) {
        // 跳转登录页 清除用户信息
        // logOut()
        return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
    } else if (code === 500) {
        // 报错弹窗提示
        return Promise.reject(new Error(response.data.message))
    } else {
        // 其他问题
        return Promise.reject('error')
    }
}, error => {
  console.log(error)
    return Promise.reject(error)
})