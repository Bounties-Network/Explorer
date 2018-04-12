import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware
} from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import 'styles/index.scss';
import { reducers, sagaWatchers } from 'public-modules';
import { App } from 'layout';
import registerServiceWorker from './registerServiceWorker';

const history = createHistory();
const middleware = routerMiddleware(history);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    router: routerReducer,
    ...reducers
  }),
  composeEnhancers(applyMiddleware(middleware, sagaMiddleware))
);

sagaWatchers.map(saga => sagaMiddleware.run(saga));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
