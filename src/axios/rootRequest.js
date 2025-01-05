/**
 * 处理来自LoginView页面的请求
 */

import instance from '@/axios/instance.js'


export const login = (data) => {
    return instance({
        url: '/login',
        method: 'post',
        data
    })
}


export const register = (data) => {
    return instance({
        url: '/register',
        method: 'post',
        data
    })
}
