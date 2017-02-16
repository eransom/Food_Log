import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import App from './App';
import LogIn from './components/logIn.js'
import FoodSearch from './components/foodSearch.js'
import SignUp from './components/signUp.js'
import WeeklyView from './components/weeklyView.js'
import './index.css';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} >
      <IndexRoute component={LogIn}/>
      <Route path="signUp" component={SignUp}/>
      <Route path="foodSearch" component={FoodSearch} />
      <Route path="weeklyView" component={WeeklyView} />
    </Route>
  </Router>,
  document.getElementById('root')
);
