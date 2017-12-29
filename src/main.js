// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import '@/assets/css/reset.css'
import '@/assets/css/animate.css'
import '@/assets/css/icons/icomoon/styles.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/js/login';
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import * as filters from './filters'
import qs from 'qs';
import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'
axios.interceptors.request.use((config) => {
  config.data = qs.stringify(config.data);
  return config;
}, function(error) {
  return Promise.reject(error);
});


// 遍历所有导出的过滤器并添加到全局过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
})
Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  filters,
  template: '<App/>',
  components: { App }
});
