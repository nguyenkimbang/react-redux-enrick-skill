import * as apiUtils from  'common/apiUtils'

export const doLoginApi = (loginInfo) => {
	return apiUtils.postUnAuth('login', {...loginInfo}, {}).then(result => {
		return result;
	})
}