import * as actions from 'config/actions'
const stateLogin = {
  loginSuccess: false
}


export default function loginReducer(state = stateLogin, action) {
  state.loginSuccess = false;
  if (action.type === actions.LOGIN_SUCCESS) {
    state.loginSuccess = true;
  }

  return {...state};
}