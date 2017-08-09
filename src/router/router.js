import App from '../App.vue'

export default [{
    path: '/',
    component: App,
    children: [{
        path: '',
        component: r => require.ensure([], () => r(require('../page/home/index.vue')), 'home')
    }, {
        path: '/item',
        component: r => require.ensure([], () => r(require('../page/item/index.vue')), 'item')
    }, {
        path: '/score',
        component: r => require.ensure([], () => r(require('../page/score/index.vue')), 'score')
    }]
}]