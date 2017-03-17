import React, { Component } from 'react';
import { Link } from 'react-router';
import base from '../config';
import '../App.css';
import {Button} from 'reactstrap';

class SignIn extends Component {

  constructor(){
      super()
      this.state = {
        userName: ""
    }
  }

  signIn(e) {
      e.preventDefault()
      base.authWithPassword({
       email: this.email.value,
       password: this.password.value
     }, this.props.auth).catch(err => console.error(err))
      console.log('Logged in as: ',)
  }


  render() {

    return (
      <div className="background-signin">
        <div className="login-wraper">
          <div className="head-title">Sign in to <span className="blue">FOOD LOG</span></div>
          <div className="body-inputs">
          <div>Email</div>
          <input className="login" ref={element => this.email = element}/>
          <div>Password</div>
          <input className="login" type="password" ref={element => this.password = element}/>
          <div>
          <Button color="success" onClick={this.signIn.bind(this)}>Log In</Button>
          </div>
          </div>
          <div className="bottom-signin">
          <h4 className="noAccount">Dont have an account yet?</h4>
          <Link to="signUp"><Button color="primary">Register</Button></Link>
          </div>
        </div>
      </div>
    )
  }
}

  export default SignIn;
