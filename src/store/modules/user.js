import { getToken, setToken, removeToken } from "@/utils/auth"
import { getUserInfo, login } from '@/api/user'
const state = {
    token: getToken(), // 设置token为共享状态
    userInfo: {}, // 定义一个空对象，而不是null
}
const mutations = {
    setToken(state, token) {
        state.token = token // 将数据设置给vuex
        setToken(token) // 将数据同步给缓存
    },
    removeToken(state) {
        state.token = null // 将vuex的token数据置空
        removeToken() // 缓存同步置空
    },
    setUserInfo(state, payload) {
        state.userInfo = payload
    },
    removeUserInfo(state) {
        state.userInfo = {}
    }
}
const actions = {
    async login(context, data) {
        const result = await login(data)
        context.commit('setToken', result)
    },
    async getUserInfo(context) {
        const result = await getUserInfo()
        context.commit('setUserInfo', result)
        return result // 这里的return为后期做权限的时候埋下伏笔
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}

