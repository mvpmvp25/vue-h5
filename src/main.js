import Vue from 'vue'
//import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/index'
//import ajax from './config/ajax'
//import './style/common.scss'
//import './config/rem'

//new Vue({
//el: '#app',
//render: h => h(App)
//})

Vue.use(VueRouter)
const router = new VueRouter({
	routes
})

new Vue({
	router,
	store,
}).$mount('#app')