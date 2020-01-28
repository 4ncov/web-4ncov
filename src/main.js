import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import home from './pages/home.vue';

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
    render: h => h(home)
}).$mount('#app');
