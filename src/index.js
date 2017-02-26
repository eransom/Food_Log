import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import App from './App';
import SignUp from './components/signUp.js'
import SignIn from './components/signIn.js'
import FoodSearch from './components/foodSearch.js'
import CalorieBudget from './components/calorieBudget.js'
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} >
      <IndexRoute component={SignIn}></IndexRoute>
      <Route path="signUp" component={SignUp}/>
      <Route path="calorieBudget" component={CalorieBudget}/>
      <Route path="foodSearch" component={FoodSearch}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
