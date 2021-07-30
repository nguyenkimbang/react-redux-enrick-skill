import { combineReducers } from 'redux'
import loginReducer from 'modules/login/services/reducer/loginReducer'
import productReducer from 'modules/product/services/reducer/productReducer'
import cartReducer from 'modules/cart/services/reducer/cartReducer'
import messageReducer from 'common/reducers/messageReducer'
import { routerReducer } from 'react-router-redux'

export default combineReducers({
  	stateLogin: loginReducer,
  	stateProduct: productReducer,
  	cart: cartReducer,
  	stateMessage: messageReducer,
  	routing: routerReducer
})