import * as actions from 'config/actions'
export const productListAction = (params = {}) => {
	return {type: actions.GET_PRODUCT_LIST, payload: {params}}
};

export const productDetailAction = (productId) => {
	return {type: actions.GET_PRODUCT_DETAIL, payload: {productId}}
};

export const productShowDetailAction = (productId) => {
	return {type: actions.SHOW_PRODUCT_DETAIL_MODAL}
};

export const productHiedeDetailAction = (productId) => {
	return {type: actions.HIDE_PRODUCT_DETAIL_MODAL}
};