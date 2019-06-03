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
import { ThemeProvider } from 'styled-components';
//import theme from './theme.js';// Uncomment when ready to activate theme.js
import { BigNumber } from 'bignumber.js';
import { reducers, sagaWatchers } from 'public-modules';
import explorerSagas from './sagas';
import baseReducers from './reducers';
import { App } from 'layout';
import 'styles/index.scss';
import 'styles/flexboxgrid.css';
import 'styles/index.scss';
import 'fontAwesome';
import 'styles/Toastify.scss';
// common locale data
import 'intl/locale-data/jsonp/en.js';

// eslint-disable-next-line import/no-webpack-loader-syntax
const theme = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!./styles/variables.scss');

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
