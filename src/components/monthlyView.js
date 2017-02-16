import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';
import base from '../config';
import '../App.css';
import {
  Button,
  Navbar,
  Container,
} from 'reactstrap';

class MonthlyView extends Component {

  constructor(){
      super()
      this.state = {
        userName: ""
    }
  }

    render() {

      return (
        <div className="calendar">
        </div>


      )
    }
  }

  export default MonthlyView;
