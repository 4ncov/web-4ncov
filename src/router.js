import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './pages/home';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            title: '首页',
            icon: 'mdi-home'
        }
    }
];

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || '首页';
    next();
});

export default router;
