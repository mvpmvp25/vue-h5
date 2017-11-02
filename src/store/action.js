import {
	getAppVersion
} from '../service/testGetData'
import {
	GET_VERSION
} from './mutation-types.js'

export default {

		async getVersion({
			commit,
			state
		}) {
			let res = await getAppVersion();
			commit(GET_VERSION, res)
		}
	
}