import { call, put } from 'redux-saga/effects'
import * as actions from 'config/actions'
import { loadProductData, getProductDetail as getProductDetailApi } from 'modules/product/services/api/productApi'
// import { push } from 'react-router-redux'

// worker Saga: Login into System
function* getProductList(action) {
   try {
      const response = yield call(loadProductData, action.payload.params);
      if (response && parseInt(response.code) === 200) {
         yield put({type: actions.GET_PRODUCT_LIST_SUCCESS, productInfo: response.result});
         return
      }
      yield put({type: actions.GET_PRODUCT_LIST_FAILED});
   } catch (e) {
      yield put({type: actions.GET_PRODUCT_LIST_FAILED, message: e.message});
   }
}

function* getProductDetail(action) {
   try {
      const response = yield call(getProductDetailApi, action.payload.productId);
      if (response && parseInt(response.code) === 200) {
         yield put({type: actions.GET_PRODUCT_DETAIL_SUCCESS, productInfo: response.result});
         return
      }
      yield put({type: actions.GET_PRODUCT_DETAIL_FAILED});
   } catch (e) {
      yield put({type: actions.GET_PRODUCT_DETAIL_FAILED, message: e.message});
   }
}

const sageFn = {
   getProductList,
   getProductDetail
};

export default sageFn;
