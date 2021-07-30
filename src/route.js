import Login from './modules/login/components/Login'
import Product from 'modules/product/components/Product'
import Cart from 'modules/cart/components/Cart'


const routes = [
    {
        path: '/',
        exact: true,
        component: () => <Product/>
    },
    {
        path: '/login',
        exact: true,
        component: () => <Login/>
    },
    {
        path: '/cart',
        exact: true,
        component: () => <Cart/>
    }
]

export default routes