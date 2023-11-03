import router from '@/router'
import store from '@/store'
import { getUserInfo } from './store/modules/user'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

const whiteList = ["/login", "/404"]
router.beforeEach(async (to, from, next) => {
    nProgress.start() // 开启进度条
    if (store.getters.token) {
        if (to.path === '/login') {
            next('/')
        } else {
            if (!store.getters.userId) {
                await store.dispatch('user/getUserInfo')
            }
            next()
        }
    } else {
        if (whiteList.includes(to.path)) {
            next()
        } else {
            next('/login')
        }
    }
    nProgress.done() // 关闭进度条

})

router.afterEach(() => {
    nProgress.done() // 关闭进度条
})