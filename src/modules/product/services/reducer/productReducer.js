import * as actions from 'config/actions'
const stateProduct = {
  products: []
}


export default function loginReducer(state = stateProduct, action) {
  if (action.type === actions.GET_PRODUCT_LIST_SUCCESS) {
    state.products = action.product_list;
  }

  return {...state};
}