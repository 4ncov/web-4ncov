import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui'
import requiredMaterials from './pages/requiredMaterials.vue'
import suppliedMaterials from './pages/suppliedMaterials.vue'
import realTimeData from './pages/realTimeData'
import requiredMaterialOverview from './pages/requiredMaterialsOverview'
import suppliedMaterialOverview from './pages/suppliedMaterialsOverview'
import contactForm from './pages/contactForm'
import Login from './pages/login'
import Register from './pages/register'
import forgetPassword from './pages/forgetPassword'
import personalView from './pages/personalView'
import myDetail from './pages/myDetail'
import myMaterials from './pages/myMaterials'
import editMaterial from './pages/editMaterial'
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
        component: forgetPassword,
        redirect: featureToggle || '/required-materials-overview'
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
        component: realTimeData,
        redirect: featureToggle || '/required-materials-overview'
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
    {
        path: '/me',
        name: 'me',
        meta: {
            title: '我的',
            auth: true
        },
        component: personalView
    },
    {
        path: '/me/detail',
        name: 'MyDetail',
        meta: {
            title: '我的详情',
            auth: true
        },
        component: myDetail
    },
    {
        path: '/me/required-materials',
        name: 'MyRequiredMaterials',
        meta: { title: '我的寻求', auth: true },
        component: myMaterials
    },
    {
        path: '/me/supplied-materials',
        name: 'MySuppliedMaterials',
        meta: { title: '我的捐赠', auth: true },
        component: myMaterials
    },
    {
        path: '/required-materials/:id',
        name: 'EditRequiredMaterial',
        meta: { title: '编辑寻求', auth: true },
        component: editMaterial
    },
    {
        path: '/supplied-materials/:id',
        name: 'EditSuppliedMaterial',
        meta: { title: '编辑供应', auth: true },
        component: editMaterial
    },
    {
        path: '/contact-us',
        name: 'contact-us',
        meta: {
            title: '联系我们',
            auth: true
        },
        component: contactForm
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
            Message.warning('您还未登录，请先登录！')
            next({ path: `/login?redirectTo=${to.path}`, replace: true })
        }
    } else {
        next()
    }
})

export default router
