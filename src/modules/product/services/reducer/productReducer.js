import { combineReducers } from 'redux'
import * as actions from 'config/actions'
const stateProduct = {
  list: [],
  totalItem: 0
}
const stateProductDetail = {
  productDetail: null
}

const stateProductDetailModal = {
  show: false
}


function productReducer(state = stateProduct, action) {
  if (action.type === actions.GET_PRODUCT_LIST_SUCCESS) {
    const productInfo = {
      list: action.productInfo.data,
      totalItem: action.productInfo.totalItem
    };
    state = productInfo;
    return {...productInfo};
  }

  if (action.type === actions.GET_PRODUCT_LIST_FAILED) {
    const productInfo = {
      list: [],
      totalItem: 0
    };
    state = productInfo;
    return {...productInfo};
  }

  return {...state};
}

function productDetailReducer(state = stateProductDetail, action) {
  if (action.type === actions.GET_PRODUCT_DETAIL_SUCCESS) {
    state.productDetail = action.productInfo;
  }

  if (action.type === actions.UPDATE_PRODUCT_DETAIL) {
    state.productDetail = action.productInfo;
  }

  if (action.type === actions.GET_PRODUCT_DETAIL_FAILED) {
    return null;
  }

  return {...state.productDetail};
}

function productDetailModalReducer(state = stateProductDetailModal, action) {
  if (action.type === actions.SHOW_PRODUCT_DETAIL_MODAL) {
    return {show: true};
  }

  if (action.type === actions.HIDE_PRODUCT_DETAIL_MODAL) {
    return {show: false};
  }

  return {...state};
}

export default combineReducers({
  product: productReducer,
  productDetail: productDetailReducer,
  modal: productDetailModalReducer
})
