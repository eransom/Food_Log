import React, { Component } from 'react';
import { Link } from 'react-router'
import '../App.css';
import {
 Button,
 // Navbar,
 // Container,
} from 'reactstrap';


class LogIn extends Component {



  render() {
    return (
      <div>
        <div className="container">
          <div className="login-wraper">
            <div className="head-title">Sign in to <span className="blue">Food Log</span></div>
            <div className="body">
              <div>Email</div>
              <input className="login" ref={element => this.email = element}/>
              <div>Password</div>
              <input className="login" ref={element => this.password = element}/>
              <div className="footer">
                <span>
                  <Button color="success" className="button-login" bsStyle="success" onClick={this.props.onLogin}>Login</Button>
                </span>
                <span>
                  <Link to="signUp"><Button color="primary" className="second-button-login" bsStyle="success">Register</Button></Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LogIn
