import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  Switch,
  BrowserRouter
} from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';  
import configureStore from './store';
import App from './App';
import reportWebVitals from './reportWebVitals'; 

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const store = configureStore(); 

ReactDOM.render((
  <Provider store={store}>  
   <BrowserRouter>
    <Switch>
      <Route path="/" name="product" component={App}/>
    </Switch>
  </BrowserRouter>
   
   </Provider>
), document.getElementById('root'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); 
  