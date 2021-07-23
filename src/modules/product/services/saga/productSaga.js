import { call, put } from 'redux-saga/effects'
import * as actions from 'config/actions'
import { loadProductData } from 'modules/product/services/api/productApi'
import { push } from 'react-router-redux'

// worker Saga: Login into System
function* getProductList(action) {
   try {
      const response = yield call(loadProductData);
      if (response && response.products) {
         yield put({type: actions.GET_PRODUCT_LIST_SUCCESS, product_list: [...response.products]});
         return
      }
      yield put({type: actions.GET_PRODUCT_LIST_FAILED});
   } catch (e) {
      yield put({type: actions.GET_PRODUCT_LIST_FAILED, message: e.message});
   }
}

export default {
   getProductList
};
