import * as actions from 'config/actions'
export const addCartAction = (product) => {
	return {type: actions.ADD_CART, product}
};

export const editCartItemAction = (data) => {
	return {type: actions.EDIT_CART_ITEM, data}
};

export const removeCartItemAction = (product_id) => {
	return {type: actions.REMOVE_CART_ITEM, product_id}
};

export const order = (data) => {
	return {type: actions.ORDER_CART, data}
};
