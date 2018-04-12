import React from 'react';
import ReactDOM from 'react-dom';
import 'styles/index.scss';
import { App } from 'layout';
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
