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

// import axios from 'axios'
// export const login1 = (data) => {
//     return (axios.post('/login',data));
// }