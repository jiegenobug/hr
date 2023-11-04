// 导出社保的路由规则
import Layout from '@/layout'
export default {
    // 路由规则
    path: '/social',
    name: 'social', // 给一级路由加一个name属性，做权限的时候会用到
    component: Layout,
    children: [
        {
            path: '', // 这里置空，表示二级路由的默认路由
            component: () => import('@/views/social'),
            // 路由元信息，可以放任何内容
            meta: {
                title: '社保', // 左侧导航的文字
            }
        }
    ]
}
