import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
import App from './App';
import FoodSearch from './components/foodSearch.js'
import SignUp from './components/signUp.js'
import './index.css';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} >
      <Route path="signUp" component={SignUp}/>
    </Route>
    <Route path="/foodSearch" component={FoodSearch} />
  </Router>,
  document.getElementById('root')
);
