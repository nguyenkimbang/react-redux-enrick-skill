import { combineReducers } from 'redux'
import * as actions from 'config/actions'
import * as commonMethod from 'utils/commonMethod'
import moment from 'moment'
const cartItemDefault = {
  quantity: 0,
  product_id: null,
  product_name: null,
  price: 0,
  required_date: null
}

let carts = {};

function handleCart (state = [], action) {
  const userId = commonMethod.getCustomerId();
  if (! userId) {
    return [...state];
  }
  state = getCartOfUser(userId);
  switch (action.type) {
    case actions.ADD_CART:
      state = addItemToCart([...state], action.product);
      break;
    case actions.EDIT_CART_ITEM:
      state = editCartItem([...state], action.data);
      break;
    case actions.REMOVE_CART_ITEM:
      state = removeCartItem([...state], action.product_id);
      break;
    case actions.CART_ORDER_SUCCESS:
      state = [];
      commonMethod.removeCartStorage()
      break;
    default:
      return [...state];
  }
  if (action.type !== actions.CART_ORDER_SUCCESS && state.length > 0) {
    carts[`u_${userId}`] = [...state];
    localStorage.setItem('cart', JSON.stringify(carts));
  } else if (state.length === 0) {
    commonMethod.removeCartStorage()
  }
  
  return [...state];
}

function addItemToCart(currentState, product) {
  let index = 0;
  const cartItem = [];
  for (var i = currentState.length - 1; i >= 0; i--) {
    if ('' + currentState[i].product_id === '' + product.product_id) {
      index = i;
      cartItem.push({...currentState[i]});
    }
  }

  if (cartItem.length > 0) {
    cartItem[0].quantity += 1;
    currentState[index] = cartItem[0];
  } else {
    currentState.push({
      ...cartItemDefault,
      product_name: product.product_name,
      product_id: product.product_id,
      price: product.list_price,
      quantity: 1,
      required_date: moment(new Date()).format('YYYY-MM-DD H:m:s')
    })
  }
  return [...currentState];
}

function editCartItem(currentState, dataUpdate) {
  let index = 0;
  const cartItemInfo = [];
  for (var i = currentState.length - 1; i >= 0; i--) {
    if ('' + currentState[i].product_id === '' + dataUpdate.product_id) {
      index = i;
      cartItemInfo.push({...currentState[i]});
    }
  }
  if (cartItemInfo.length > 0) {
    currentState[index] = {
      ...cartItemInfo[0]
    };
    if (dataUpdate.quantity) {
      currentState[index].quantity = dataUpdate.quantity
    }
    if (dataUpdate.required_date) {
      currentState[index].required_date = moment(dataUpdate.required_date).format('YYYY-MM-DD H:m:s')
    }
  }

  return [...currentState];
}

function removeCartItem(currentState, product_id) {
  for (let i = 0; i <= currentState.length - 1; i++) {
    if ('' + currentState[i].product_id === '' + product_id) {
      currentState.splice(i, 1);
    }
  }

  return [...currentState];
}

function getCartOfUser(userId) {
  carts = localStorage.getItem('cart');
  carts = carts ? JSON.parse(carts) : {};
  return (userId && carts[`u_${userId}`]) ? carts[`u_${userId}`] : [];
}

export default combineReducers({
  list: handleCart
})
