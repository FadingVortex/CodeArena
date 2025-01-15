import axios from 'axios';
import baseConfig from './baseConfig'
import router from "@/router/index.js"
import store from "@/store/index.js"

// js 文件不能使用useRouter

const instance = axios.create({ ...baseConfig });
// 设置请求拦截器
instance.interceptors.request.use(
    (config) => {
        let token = localStorage.getItem('myvue_login_token');
        if (token) {
            // config.headers.token = token;
            config.headers['Authorization'] = `Bearer ${token}`;
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
        if ((200 <= response.data.code && response.data.code < 400) || response.data.code === -2) {
            return response.data; // 用户名或密码错误，返回登陆页面
        }
        else if (response.data.code === -1) router.push('/login');
        else if(response.data.code === 401) {
            console.log(store === undefined);
            store.commit('User/clearToken');
            // 弹出提示框
            ElMessageBox.confirm(response.data.msg, '登录失效', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                // 确认后跳转到登录页
                setTimeout(() => {
                    router.push('/login'); 
                }, 200);
            }).catch(() => {
                // 如果点击取消，也可以跳转或者做其他处理
                router.replace('/login');
            });
        } else if(response.data.code === 403) {
            //没有权限
            // 弹出提示框
            ElMessageBox.alert(response.data.msg, '权限不足', {
                confirmButtonText: '关闭',
                type: 'warning',
            });
        }
        return Promise.reject(response.data);
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;

