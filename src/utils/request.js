import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from './auth'
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000 // 设置超时时间
}) // 创建一个axios的实例
// 请求拦截器
service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['hrsaas-ihrm-token'] = getToken()
        }
        return config
    }, error => {
        console.log(error);
        return Promise.reject(error)
    }
)
// 响应拦截器
service.interceptors.response.use(response => {
    // axios 默认加了一层data
    const { success, message, data } = response.data
    if (success) {
        return data
    } else {
        Message.error(message)
        return Promise.reject(new Error(message))
    }
}, error => {
    Message.error(error.message) // 提示错误信息
    return Promise.reject(error) // 返回执行错误 让当前的执行链跳出成功 直接进入catch
})
export default service // 导出axios实例
