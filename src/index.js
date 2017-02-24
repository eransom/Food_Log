import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import App from './App';
import FoodSearch from './components/foodSearch.js'
import SignUp from './components/signUp.js'
import SignIn from './components/signIn.js'
import MonthlyView from './components/monthlyView.js'
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} >
      <IndexRoute component={SignIn}></IndexRoute>
      <Route path="signUp" component={SignUp}/>
      <Route path="foodSearch" component={FoodSearch}/>
      <Route path="monthlyView" component={MonthlyView}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
