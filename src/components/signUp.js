import React, { Component } from 'react';
import { Link } from 'react-router';
import base from '../config';
import '../App.css';
import {Button} from 'reactstrap';

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
    }
      this.email.value = ''
      this.password.value = ''
    }

    render() {

      return (
        <div className="background-signup">
          <div className="login-wraper">
          <div className="head-title">Sign Up to <span className="blue">Food Log</span></div>
          <div className="body-inputs">
          <div>Email</div>
          <input className="login" ref={element => this.email = element}/>
          <div>Password</div>
          <input className="login" type="password" ref={element => this.password = element}/>
          <div>
          <Button color="primary" onClick={this.signUp.bind(this)}>Register</Button>
          </div>
          </div>
          <div className="bottom-signin">
          <h4 className="already-account">Already have an account?</h4>
          <Link to="/"><Button color="success">Log In</Button></Link>
          </div>
          </div>
        </div>

      )
    }
  }

  export default SignUp;
