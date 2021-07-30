export const handleLogout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('customerInfo');
	localStorage.removeItem('cart');
}

export const removeCartStorage = () => {
	localStorage.removeItem('cart');
}