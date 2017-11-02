import {
	RECORD_TOKEN,
	GET_VERSION
} from './mutation-types.js'

import { setStore, getStore } from '../config/mUtils'

//import {localapi, proapi} from 'src/config/env'

export default {

	// 记录用户信息
	[RECORD_TOKEN](state, res) {
		setStore('token', res.token);
	},

	// 获取最新版本信息
	[GET_VERSION](state, res) {
		state.appVersion = res.bankCardbinlistBean.bankName;
	}

}