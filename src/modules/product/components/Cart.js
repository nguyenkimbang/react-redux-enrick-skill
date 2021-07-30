import React from 'react'
import {connect} from 'react-redux'
import { withRouter } from "react-router"
import shoppingCartIcon from 'assets/images/shopping-cart.svg'
import 'assets/css/shopping_cart.css';



class Cart extends React.Component {

  render () {
  	return (
  		<div className="w-100">
  			<div className="cart">
  				<div className="cart-wrapper">
  					<img className="cart-icon" src={shoppingCartIcon} alt="shopping cart" onClick={() => this.props.history.push('cart')}/>
  					<span className="cart-quantity">{this.props.carts.length}</span>
  				</div>
  			</div>
  		</div>
  	)
  }
}

const mapStateToProp = currentState => {
	return {
		carts: [...currentState.cart.list]
	}
}

export default connect(mapStateToProp)(withRouter(Cart));
