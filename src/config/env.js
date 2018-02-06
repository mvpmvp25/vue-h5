/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */

let baseUrl = '';
let routerMode = 'hash'; // hash模式可以本地运行build出来的项目(直接打开index.html) history模式需要服务器
let imgBaseUrl = 'http://images.cangdu.org/';

if(process.env.NODE_ENV == 'development') {
	baseUrl = "http://testjsjk.jieshunpay.cn:18114/";
} else if(process.env.NODE_ENV == 'production') {
	// baseUrl = 'http://cangdu.org:8001';
	baseUrl = 'http://www.xxxxx.com/production/api';
}

export {
	baseUrl,
	routerMode,
	imgBaseUrl,
}