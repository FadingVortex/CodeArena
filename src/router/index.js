import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store/index.js';
import routes from './routerInfomation.js'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

// 守护进程，在每个路由请求之前检查路由请求
router.beforeEach((to, form) => {
    console.log(to);
    const haveToken = store.getters['User/isLogin'];
    console.log(haveToken);
    if (to.path === '/login') {
        // 返回一个路由对象，即换一个路由对象
        if (haveToken === true) return { name: 'HomeFrame' };
        return true;
    } else if (to.meta.requireAuth === true) {
        if (haveToken === true) return true;
        else return { name: 'LoginView' };
    } else return true;
});

export default router;
