import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';
import base from '../config';
import '../App.css';
import {
  Button,
  Navbar,
  Container,
} from 'reactstrap';

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

    // authStateChanged (error, user) {
    //  if (error) {
    //    console.log(error)
    //    alert('wrong password')
    //  } else if (user) {
    //    console.log(user.email)
    //        this.setState({
    //          user: user.email,
    //          uid: user.uid
    //        })
    //        base.post(`users/${user.uid}`, {
    //         data: {
    //           email: this.state.user,
    //         }
    //       });
    //     //  base.post(`users/${user.uid}/meals/${user.date}/foodItems`, {
    //    }
    //    hashHistory.push("/foodSearch")
    //  }

    render() {

      return (
        <div className="background-signin">
        <div className="login-wraper">
        <div className="head-title">Sign in to <span className="blue">FOOD LOG</span></div>
        <div className="body-inputs">
        <div>Email</div>
        <input className="login" ref={element => this.email = element}/>
        <div>Password</div>
        <input className="login" ref={element => this.password = element}/>
        <div>
        <Link to="foodSearch"><Button color="success" bsStyle="success" onClick={this.signIn.bind(this)}>Log In</Button></Link>
        </div>
        </div>
        <div className="bottom-signin">
        <h4 className="noAccount">Dont have an account yet?</h4>
        <Link to="signUp"><Button color="primary" bsStyle="success">Register</Button></Link>
        </div>
        </div>

        </div>

      )
    }
  }

  export default SignIn;
