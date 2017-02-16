import React, { Component } from 'react';
import base from './config';
import { hashHistory } from 'react-router';
import './App.css';

class App extends Component {

 constructor(){
   super()
   this.state = {
     user: {},
     uid: "",
     email: "",
     password: "",
     foodItems: []
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

 signIn(e) {
     e.preventDefault()
     base.authWithPassword({
      email: this.email.value,
      password: this.password.value
    }, this.authStateChanged.bind(this)).catch(err => console.error(err))
     console.log('Logged in as: ',)
 }

   signOut(e){
     e.preventDefault()
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
       <div className="navbar-inner">
         <img className="brand" src={('/src/img/logo3.png')} alt="Food Log Logo"/>
       </div>
       {this.props.children && React.cloneElement(this.props.children, {onLogin: this.signIn.bind(this), onSignUp: this.signUp.bind(this), onSignOut: this.signOut.bind(this)})}
       <footer className="navbar-fixed-bottom"></footer>
     </div>
   );
 }
}

export default App;
