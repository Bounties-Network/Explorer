import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware
} from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { ThemeProvider } from 'emotion-theming';
import theme from './theme';
import { BigNumber } from 'bignumber.js';
import { reducers, sagaWatchers } from 'public-modules';
import explorerSagas from './sagas';
import baseReducers from './reducers';
import { App } from 'layout';
import 'styles/index.scss';
import 'styles/flexboxgrid.css';
import 'styles/Toastify.scss';

// common locale data
import 'intl/locale-data/jsonp/en.js';
// add locales here

//add supported moment locales here
// import 'moment/locale/hr.js';

// never return number formated as exponential
BigNumber.config({ EXPONENTIAL_AT: 1e9 });

const history = createHistory();
const middleware = routerMiddleware(history);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    router: routerReducer,
    form: formReducer,
    ...reducers,
    ...baseReducers
  }),
  composeEnhancers(applyMiddleware(middleware, sagaMiddleware))
);

[...sagaWatchers, ...explorerSagas].map(saga =>
  sagaMiddleware.run(saga, store.dispatch)
);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);
