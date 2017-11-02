import fetch from '../config/fetch'
import { getStore } from '../config/mUtils'

/**
 * 测试接口
 */

export const sendLogin = (mobile, password) => fetch('app/rest/member/login/1.0', {
	mobile,
	password
}, "POST");

/**
 * 获取用户信息
 */

export const getUser = () => fetch('app/rest/getMemberInfo', {
	token: getStore('token')
});

/**
 * 获取最新版本信息
 */

export const getAppVersion = () => fetch('app/rest/getCardBinInfo', {
	bankCardNo: "622848"
});