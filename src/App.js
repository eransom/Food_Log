import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';
import base from './config';
import logo from './img/logo.png';
import socialmedia from './img/social-icons.png';
import './App.css';
import {
 Button,
 Navbar,
 Container,
} from 'reactstrap';

class App extends Component {

 constructor(){
   super()
   this.state = {
     user: {},
     uid: "",
     email: "",
     password: ""
   }
 }

 // signUp(e) {
 //       e.preventDefault()
 //       var password = this.password.value
 //     if (password.length < 6) {
 //      alert('Password must be 6 or more characters')
 //     } else {
 //      base.createUser({
 //         email: this.email.value,
 //         password: this.password.value
 //       }, this.authStateChanged.bind(this))
 //       console.log(this.email.value)
 //     }
 //       this.email.value = ''
 //       this.password.value = ''
 //     }



   signOut(){
     base.unauth()
     hashHistory.push("/")
     console.log('signed out: ')
   }

   authStateChanged (error, user) {
        if (error) {
          console.log(error)
          alert('wrong password')
        } else if (user) {
          console.log(user.email)
              this.setState({
                user: user.email,
                uid: user.uid
              })
              base.post(`users/${user.uid}`, {
               data: {
                 email: this.state.user,
               }
             });
           //  base.post(`users/${user.uid}/meals/${user.date}/foodItems`, {
          }
          hashHistory.push("/foodSearch")
        }
 render() {

   return (
     <div className="App">
     <div className="background">
     <div className="navbar-inner">
     <img src={logo} className="App-logo" alt="logo" />
     <span className="slogan">Keep track of what you eat</span>
     </div>
    {this.props.children && React.cloneElement(this.props.children, { user: this.state.user, uid: this.state.uid, onSignOut: this.signOut.bind(this)})}
     <footer className="navbar-fixed-bottom">
     <span className="social-media">
     <img src={socialmedia} className="social-media" alt="social-media" />
     </span>

     </footer>
     </div>
     </div>
   );
 }
}

export default App;
