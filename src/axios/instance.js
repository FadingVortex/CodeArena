import axios from 'axios';
import baseConfig from './baseConfig'
import router from "@/router/index.js"

// js 文件不能使用useRouter

const instance = axios.create({ ...baseConfig });
// 设置请求拦截器
instance.interceptors.request.use(
    (config) => {
        let token = localStorage.getItem('myvue_login_token');
        if (token) {
            config.headers.token = token;
        } else router.push({ name: 'LoginView' });
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 设置响应拦截器
instance.interceptors.response.use(
    (response) => {
        if (response.data.code >= 200) return response.data;
        // 用户名或密码错误，返回登陆页面
        else if (response.data.code === -1) router.push('/login');
        else return Promise.reject(response.data);
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;

