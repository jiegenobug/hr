import request from '@/utils/request'
// 获取组织架构数据
export const getDepartments = () => {
    return request({
        url: '/company/department',
        method: 'GET'
    })
}