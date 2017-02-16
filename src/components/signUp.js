import React, { Component } from 'react'
import { Link } from 'react-router';
import '../App.css';
import { Button } from 'reactstrap';

class SignUp extends Component {

  render() {

    return (
      <div>
        <div className="container">
          <div className="login-wraper">
            <div className="head-title">Sign up for <span className="blue">Food Log</span></div>
            <div className="body">
              <div>Email</div>
              <input className="login" ref={element => this.email = element}/>
              <div>Password</div>
              <input className="login" ref={element => this.password = element}/>
              <div className="footer">
                <Link to="logIn"><Button color="primary" className="second-button-login" bsStyle="success" onClick={this.props.onSignUp}>Sign Up</Button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}




export default SignUp;
