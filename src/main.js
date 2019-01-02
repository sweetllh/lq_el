// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Cookies from 'js-cookie'

import router from './router'
import axios from 'axios'
import "babel-polyfill"

import ElementUI from 'element-ui'
import './assets/css/theme.scss'
//import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css'  //隐藏类
import '@/assets/css/basic.css' 

Vue.use(ElementUI);

Vue.config.productionTip = false
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
})
Vue.prototype.$clientHeight = document.documentElement.clientHeight || document.body.clientHeight
Vue.prototype.$axios = axios
Vue.prototype.$link = 'https://www.linkedsign.cn/server/'



new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
	//NProgress.start();
	let user = JSON.parse(sessionStorage.getItem("LQ-UserInfo"));
	//console.log(user,to.path)
	if (!user && to.path != '/login' && to.path != '/regist' && to.path != '/forget' && to.path != '/privacy' && to.path != '/commonPrivacy') {
	    next({ path: '/login' })
	} else {
	    next()
	}
})
