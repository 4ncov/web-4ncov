import Vue from 'vue'
import VueRouter from 'vue-router'
import realTimeData from './pages/realTimeData'
import supplyDemand from './pages/supplyDemand'

Vue.use(VueRouter)

const routes = [
  { path: '', redirect: '/real-time-data' },
  {
    path: '/real-time-data',
    name: 'real-time-data',
    meta: {
      title: '实时数据'
    },
    component: realTimeData
  },
  {
    path: '/supply-demand',
    name: 'supply-demand',
    meta: {
      title: '物资寻求'
    },
    component: supplyDemand
  },
  // 其他页面一律跳回主页实时数据，有404可以加个TODO:
  { path: '*', redirect: '/real-time-data' }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '首页'
  next()
})

export default router
