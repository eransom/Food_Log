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
        userName: "",
        value:
    }
  }

signUp(e) {
      e.preventDefault()
      var password = this.password.value
    if (password.length < 6) {
     alert('Password must be 6 or more characters')
    } else {
     base.createUser({
        email: this.email.value,
        password: this.password.value
      }, this.authStateChanged.bind(this))
      console.log(this.email.value)
    }
      this.email.value = ''
      this.password.value = ''
    }


    authStateChanged (error, user) {
      if (error) {
        console.log(error)
        alert('wrong password')
      } else if (user) {
        console.log(user.email)
            this.setState({
              userName: user.email
            })
        hashHistory.push("/foodSearch")
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
