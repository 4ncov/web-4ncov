import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import home from './pages/home.vue'
import LyTab from 'ly-tab'

Vue.use(ElementUI)
Vue.use(LyTab)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(home)
}).$mount('#app')
