import React, { Component } from 'react';
import '../App.css';

class LogIn extends Component {


  render() {
    return (
      <div>
        <h1 className="foodLogHeader">Food Log</h1>
        <input ref={element => this.email.value = element} placeholder="Email Address"/>
        <input ref={element => this.password.value = element} placeholder="Password"/>
        <button onClick={this.props.signIn} className="log-in">Log In</button>
        <button onClick={this.props.signUp}>Sign Up</button>
      </div>
    )
  }
}

export default LogIn
