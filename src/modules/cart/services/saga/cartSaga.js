import { call, put } from 'redux-saga/effects'
import * as actions from 'config/actions'
import { orderApi } from 'modules/cart/services/api/cartApi'
import rootMessage from 'core/messages'
import { toast } from 'react-toastify';
// import { push } from 'react-router-redux'

// worker Saga: Login into System
function* order(action) {
   try {
      const response = yield call(orderApi, action.data);
      if (response && parseInt(response.code) === 200) {
         yield put({type: actions.CART_ORDER_SUCCESS, productInfo: response.result});
         toast(rootMessage.cart.ORDER_CART_SUCCESS);
         return
      }
      yield put({type: actions.CART_ORDER_FAILED});
   } catch (e) {
      yield put({type: actions.CART_ORDER_FAILED, message: e.message});
   }
}
const sagaOrderFn = {
   order
}
export default sagaOrderFn;
