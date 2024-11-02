import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../home/LoginView.vue';
import store from '@/store/index.js';

const childrenHomeFrame = [
    {
        path: '/course/think/home',
        component: () => import('@/views/practice/think/ThinkFrame.vue'),
        name: 'ThinkFrame',
        mata: { requireAuth: true },
    },
    {
        path: '/course/hard/home',
        component: () => import('@/views/practice/HomeHard.vue'),
        name: 'HomeHard',
        mata: { requireAuth: true },
    },
    {
        path: '/course/soft/home',
        component: () => import('@/views/practice/HomeSoft.vue'),
        name: 'HomeSoft',
        mata: { requireAuth: true },
    },
    {
        path: '/test',
        component: () => import('@/views/Test.vue'),
        name: 'Test',
        meta: { requireAuth: true },
    },
];

const routes = [
    {
        path: '/login',
        // 常态地导入
        component: LoginView,
        name: 'LoginView',
        meta: {
            requireAuth: true,
            myname: 'hello',
        },
    },
    {
        path: '/',
        // 动态地导入
        component: () => import('@/layout/HomeFrame.vue'),
        name: 'HomeFrame',
        meta: {
            requireAuth: true,
        },
        children: childrenHomeFrame,
    },
    {
        path: '/register',
        component: () => import('@/home/registerView.vue'),
        meta: {
            requireAuth: false,
        },
    },
];

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
