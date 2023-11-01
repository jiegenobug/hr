import { getToken, setToken, removeToken } from "@/utils/auth"
import { login } from '@/api/user'
const state = {
    token: getToken() // 设置token为共享状态
}
const mutations = {
    setToken(state, token) {
        state.token = token // 将数据设置给vuex
        setToken(token) // 将数据同步给缓存
    },
    removeToken(state) {
        state.token = null // 将vuex的token数据置空
        removeToken() // 缓存同步置空
    }
}
const actions = {
    async login(context, data) {
        const result = await login(data)
        context.commit('setToken', result)
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}

