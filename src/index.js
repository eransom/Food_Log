import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import App from './App';
import SignUp from './components/signUp.js'
import SignIn from './components/signIn.js'
import MealList from './components/mealList.js'
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} >
      <IndexRoute component={SignIn}></IndexRoute>
      <Route path="signUp" component={SignUp}/>
      <Route path="mealList" component={MealList}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
