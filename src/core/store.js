import { createStore, applyMiddleware  } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import mySaga from 'saga'
import { routerMiddleware } from 'react-router-redux'
import { createBrowserHistory } from 'history'
import { composeWithDevTools } from 'redux-devtools-extension';

const routeMiddleware = routerMiddleware(createBrowserHistory())

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()


const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware, routeMiddleware))
)

// then run the saga
sagaMiddleware.run(mySaga)

export default store
