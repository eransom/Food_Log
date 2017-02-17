import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';
import base from '../config';
import '../App.css';
import {
  Button,
  Navbar,
  Container,
} from 'reactstrap';

class SignUp extends Component {

  constructor(){
      super()
      this.state = {
        userName: ""
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
      }, this.props.auth)
      console.log(this.email.value)
    }
      this.email.value = ''
      this.password.value = ''
    }


    // authStateChanged (error, user) {
    //      if (error) {
    //        console.log(error)
    //        alert('wrong password')
    //      } else if (user) {
    //        console.log(user.email)
    //            this.setState({
    //              username: user.email
    //            })
    //       hashHistory.push("/")
    //        }
    //      }
    render() {

      return (
        <div className="background-signup">
          <div className="login-wraper">
          <div className="head-title">Sign Up to <span className="blue">Food Log</span></div>

          <div className="body-inputs">
          <div>Email</div>
          <input className="login" ref={element => this.email = element}/>
          <div>Password</div>
          <input className="login" ref={element => this.password = element}/>
          <div>
          <Link to="/"><Button color="primary" bsStyle="success" onClick={this.signUp.bind(this)}>Register</Button></Link>
          </div>
          </div>
          <div className="bottom-signin">
          <h4 className="already-account">Already have an account?</h4>
          <Link to="/"><Button color="success" bsStyle="success" >Log In</Button></Link>
          </div>
          </div>
        </div>

      )
    }
  }

  export default SignUp;
