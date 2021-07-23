import * as apiUtils from  'common/apiUtils'

export const loadProductData = () => {
	return apiUtils.get('products').then(result => {
		return result;
	})
}