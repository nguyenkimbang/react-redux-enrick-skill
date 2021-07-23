import routes from './route'
import Header from './components/common/Header'
import './assets/css/global.css'
import { Router, Route } from "react-router-dom"
import {Provider} from 'react-redux'
import store from './core/store'
import { createBrowserHistory } from 'history'
import { syncHistoryWithStore } from 'react-router-redux'

const history = syncHistoryWithStore(createBrowserHistory(), store)

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Header/>
        {routes.map((route, index) => {
            return <Route key={index} path={route.path} exact={route.exact} component={route.component}/>
        })}
      </Router>
    </Provider>
  );
}

export default App;
