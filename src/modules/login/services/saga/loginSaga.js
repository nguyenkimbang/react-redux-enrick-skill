import { call, put } from 'redux-saga/effects'
import * as actions from 'config/actions'
import {doLoginApi} from 'modules/login/services/api/LoginApi'
import { push } from 'react-router-redux'

// worker Saga: Login into System
function* doLogin(action) {
   try {
      const response = yield call(doLoginApi, action.payload.loginInfo);
      if (response && response.token) {
         localStorage.setItem('token', response.token);
         yield put({type: actions.SUCCESS, successInfo: {
            type: 'login',
            message: ''
         }});
         yield put(push('/'));
         yield put({type: actions.LOGIN_SUCCESS});
         return
      }
      yield put({type: actions.ERROR, errorInfo: {
         type: 'login',
         message: response.reason
      }});
      yield put({type: actions.LOGIN_FAILED});
   } catch (e) {
      yield put({type: actions.LOGIN_FAILED, message: e.message});
   }
}

export default {
   doLogin
};
