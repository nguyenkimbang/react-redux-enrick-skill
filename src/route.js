import Login from './modules/login/components/Login';
import StudyRedux from './components/demo_redux/StudyRedux';
import Product from 'modules/product/components/Product';


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
        path: '/demo-redux',
        exact: true,
        component: () => <StudyRedux/>
    }
]

export default routes