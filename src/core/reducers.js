import { combineReducers } from 'redux'
import loginReducer from 'modules/login/services/reducer/loginReducer'
import productReducer from 'modules/product/services/reducer/productReducer'
import messageReducer from 'common/reducers/messageReducer'
import { routerReducer } from 'react-router-redux'

export default combineReducers({
  	stateLogin: loginReducer,
  	stateProduct: productReducer,
  	stateMessage: messageReducer,
  	routing: routerReducer
})