import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {createStore, applyMiddleware} from 'redux'
import reducer from './store/reducer'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk';

axios.defaults.baseURL = 'http://localhost:8000/api/v1/';

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
