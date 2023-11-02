import router from '@/router'
import store from '@/store'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

const whiteList = ["/login", "/404"]
router.beforeEach((to, from, next) => {
    nProgress.start() // 开启进度条
    if (store.getters.token) {
        if (to.path === '/login') {
            next('/')
        } else {
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