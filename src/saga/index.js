import { takeEvery } from 'redux-saga/effects'
import * as actions from 'config/actions'
import LoginSaga from 'modules/login/services/saga/loginSaga'
import ProductSaga from 'modules/product/services/saga/productSaga'


/*
  Listen all action
*/
function* listenActions() {
  yield takeEvery(actions.DO_LOGIN, LoginSaga.doLogin);
  yield takeEvery(actions.GET_PRODUCT_LIST, ProductSaga.getProductList);
}

export default listenActions;