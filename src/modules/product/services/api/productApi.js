import * as apiUtils from  'common/apiUtils'

export const loadProductData = (params={}) => {
	return apiUtils.get('products', {}, params).then(result => {
		return result;
	})
}

export const getProductDetail = (productId) => {
	return apiUtils.get('products/' + productId).then(result => {
		return result;
	})
}