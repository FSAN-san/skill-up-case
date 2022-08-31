import axios, { AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders } from 'axios'
import { message } from 'antd'
import { sendBaseUrl } from '../../constant/url'

const config: AxiosRequestConfig = {
    // 根据项目代理填写
    baseURL: sendBaseUrl,
    timeout: 5000,
    headers: {
        'Content-type': 'application/json'
    }
}

const http = axios.create(config)

const beforeFilter = (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('cms-token')
    if (token) {
        (<AxiosRequestHeaders>config.headers)['cms-token'] = token
    }
    return config
}

const afterFilter = ({ status, data, statusText }: AxiosResponse) => {
    if (status !== 200) {
        message.error(statusText || '系统异常！')
        return Promise.reject(statusText)
    } else if (data.errCode !== 0) {
        message.error(data.message || '请求失败！')
        return Promise.reject(data.msg)
    }
    return data.data
}

// 请求拦截器
http.interceptors.request.use(beforeFilter)

// 响应拦截器
http.interceptors.response.use(afterFilter)

export default http

// 另一种写法：api中不拼接url，用多实例axios实现（推荐写法）
// const initApi = (...apis: AxiosInstance[]) => {
//     apis.forEach(api => {
//         api.interceptors.request.use(beforeFilter)
//         api.interceptors.response.use(afterFilter)
//     })
// }
//
// const userApi = axios.create({ baseURL: '/api/user' })
// const adminApi = axios.create({ baseURL: '/api/admin' })
// initApi(userApi, adminApi)
//
// export {
//     userApi,
//     adminApi
// }
