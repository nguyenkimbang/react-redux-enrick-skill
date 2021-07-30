import * as apiUtils from  'common/apiUtils'

export const orderApi = (params={}) => {
	return apiUtils.post('order', params).then(result => {
		return result;
	})
}
