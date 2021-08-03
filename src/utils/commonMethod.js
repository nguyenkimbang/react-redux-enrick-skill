export const handleLogout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('customerInfo');
}

export const removeCartStorage = () => {
	const userId = getCustomerId();
	let carts = localStorage.getItem('cart');
	carts = carts ? JSON.parse(carts) : {};
	if (userId && carts[`u_${userId}`]) {
		delete carts[`u_${userId}`];
	}

	if (Object.keys(carts).length === 0) {
		localStorage.removeItem('cart');
	} else {
		localStorage.setItem('cart', JSON.stringify(carts));
	}
}

export const getCustomerId = () => {
	if (localStorage.getItem('customerInfo')) {
    const user = JSON.parse(localStorage.getItem('customerInfo'));
    return user['customer_id'];
  }

  return null;
}