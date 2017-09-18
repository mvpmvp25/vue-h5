import fetch from '../config/fetch'
//import {getStore} from '../config/mUtils'

/**
 * 测试接口
 */

export const testApi = () => fetch('/info', {
	type: 'u1006'
});

/**
 * 获取用户信息
 */

export const getUser = () => fetch('/user', {
	//user_id: getStore('user_id')
	user_id: "895455"
});