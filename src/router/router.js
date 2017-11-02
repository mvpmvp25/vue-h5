import App from '../App'

const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const personal = r => require.ensure([], () => r(require('../page/personal/personal')), 'personal')

export default [{
	path: '/',
	component: App, //顶层路由，对应index.html
	children: [ //二级路由。对应App.vue
		//地址为空时跳转home页面
		{
			path: '',
			redirect: '/login'
		},
		// 登陆
		{
			path: '/login',
			component: login
		},
		// 个人中心
		{
			path: '/personal',
			component: personal
		},

	]
}]