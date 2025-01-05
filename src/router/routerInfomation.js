/**
 * @fileoverview 路由配置文件
 * 
 * 该文件用于配置Vue.js应用的路由信息，包括路由路径、对应的组件、路由元信息等。
 * 主要功能包括：
 * 1. 定义路由规则，将URL路径映射到相应的Vue组件。
 * 
 * @module router/index
 * @requires vue-router
 * @requires @/views/practice/ThinkFrame.vue
 * @requires @/views/practice/HomeHard.vue
 * @requires @/views/practice/HomeSoft.vue
 * @requires @/views/Test.vue
 * @requires @/layout/HomeFrame.vue
 * @requires @/home/LoginView.vue
 * @requires @/home/registerView.vue
 * @requires @/store/index.js
 */


import LoginView from '../home/LoginView.vue';

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

export default routes;
