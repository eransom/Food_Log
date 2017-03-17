import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import base from './config';
import logo from './img/logo.png';
import socialmedia from './img/social-icons.png';
import './App.css';

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
          }
          base.fetch(`users/${user.uid}`, {
           context: this,
           then(data){
             if(data === null) {
               base.post(`users/${user.uid}`, {
                 data: {
                   email: this.state.user
                 }
               })
             } else {
               base.update(`users/${user.uid}`, {
                 data: {
                   email: this.state.user
                 }
               })
             }
           }
         })
       hashHistory.push("mealList")
      }



 render() {
   return (
     <div className="App">
       <div className="background">
         <div className="navbar-inner">
           <img src={logo} className="App-logo" alt="logo" />
           <span className="slogan">Keep track of what you eat</span>
         </div>
        {this.props.children && React.cloneElement(this.props.children, { auth: this.authStateChanged.bind(this), user: this.state.user, uid: this.state.uid, onSignOut: this.signOut.bind(this)})}
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
