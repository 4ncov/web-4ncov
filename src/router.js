import Vue from 'vue'
import VueRouter from 'vue-router'
import requiredMaterials from './pages/requiredMaterials.vue'
import suppliedMaterials from './pages/suppliedMaterials.vue'
import realTimeData from './pages/realTimeData'
import requiredMaterialOverview from './pages/requiredMaterialsOverview'
import suppliedMaterialOverview from './pages/suppliedMaterialsOverview'
import Login from './pages/login'
import Register from './pages/register'
import forgetPassword from './pages/forgetPassword'
import featureToggle from './utils/FeatureToggle'
import UserService from './services/user'

Vue.use(VueRouter)

const routes = [
    { path: '', redirect: featureToggle ? '/real-time-data' : '/required-materials-overview' },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录'
        },
        component: Login,
        props: {
            redirectTo: ''
        }
    },
    {
        path: '/register',
        name: 'Register',
        meta: {
            title: '注册'
        },
        component: Register,
        props: {
            redirectTo: ''
        }
    },
    {
        path: '/forget-pwd',
        name: 'forget-pwd',
        meta: {
            title: '忘记密码'
        },
        component: forgetPassword
    },
    {
        path: '/required-materials',
        name: 'required-materials',
        meta: {
            title: '提交物资寻求',
            auth: true
        },
        component: requiredMaterials
    },
    {
        path: '/supplied-materials',
        name: 'supplied-materials',
        meta: {
            title: '提交物资供应',
            auth: true
        },
        component: suppliedMaterials
    },
    {
        path: '/real-time-data',
        name: 'real-time-data',
        meta: {
            title: '实时数据'
        },
        component: realTimeData
    },
    {
        path: '/required-materials-overview',
        name: 'required-materials-overview',
        meta: {
            title: '物资寻求'
        },
        component: requiredMaterialOverview
    },
    {
        path: '/supplied-materials-overview',
        name: 'supplied-materials-overview',
        meta: {
            title: '物资供应'
        },
        component: suppliedMaterialOverview
    },
    // 其他页面一律跳回主页实时数据，有404可以加个TODO:
    { path: '*', redirect: featureToggle ? '/real-time-data' : '/required-materials-overview' }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || '首页'
    // 以下的权限检测仅支持单层路由,
    // 如果需要做到组件层面的权限检测请递归一下
    if (to.meta.auth) {
        if (UserService.isLogin()) {
            next()
        } else {
            next({ path: `/login?redirectTo=${to.path}`, replace: true })
        }
    } else {
        next()
    }
})

export default router
