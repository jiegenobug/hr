import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import { getTimeStamp } from './auth'
import router from '@/router'

const TimeOut = 3600 // 超时时间,秒

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000 // 设置超时时间
}) // 创建一个axios的实例
// 请求拦截器
service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            if (IsCheckTimeOut()) { // 如果token超时
                store.dispatch('user/logout')
                router.push('/login')
                return Promise.reject(new Error('token超时了'))
            }
            config.headers['Authorization'] = `Bearer ${store.getters.token}`

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
    if (error.response && error.response.data && error.response.data.code === 10002) {
        // 当等于10002的时候，表示后端告诉我token超时了
        store.dispatch('user/logout') // 调用退出登录，删除token
        router.push('/login')
    } else {
        Message.error(error.message) // 提示错误信息
    }
    return Promise.reject(error) // 返回执行错误 让当前的执行链跳出成功 直接进入catch
})

function IsCheckTimeOut() {
    const currentTimeStamp = Date.now();
    return (currentTimeStamp - getTimeStamp()) / 1000 > TimeOut
}
export default service // 导出axios实例
