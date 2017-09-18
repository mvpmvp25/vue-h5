import App from '../App'

const testlogin = r => require.ensure([], () => r(require('../page/testlogin/testlogin')), 'testlogin')

export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        //地址为空时跳转home页面
        {
            path: '',
            redirect: '/testlogin'
        },
        
        // 测试-登陆页
        {
            path: '/testlogin',
            component: testlogin
        },
      
    ]
}]