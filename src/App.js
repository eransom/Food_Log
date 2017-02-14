import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import base from './config';
import './App.css';
import { Link } from 'react-router';
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

 signIn(e) {
     e.preventDefault()
     base.authWithPassword({
      email: this.email.value,
      password: this.password.value
    }, this.authStateChanged.bind(this)).catch(err => console.error(err))
     console.log('Logged in as: ',)
     base.auth().onAuthStateChanged((user) => {
  if (user) {
    this.setState({
      uid: user.uid
    })
    console.log(user.uid);
  }
});
 }

   signOut(){
     base.unauth()
     console.log('signed out: ')
   }

   authStateChanged (error, user) {
     if (error) {
       console.log(error)
       alert('wrong password')
     } else if (user) {
       console.log(user.email)
           this.setState({
             users: user.email,
             uid: user.uid
           })
           base.post(`users`, {
            data: {
              name: "Moa",
              username: "test",
              uid: this.state.uid
            }
          });
       hashHistory.push("/foodSearch")
       }
   }

 render() {

   return (
     <div className="App">
     <div className="navbar-inner">
     <img className="brand" src= {('/src/img/logo3.png')}/>
     </div>

     <div className="container">
     <div className="login-wraper">
     <div className="head-title">Sign in to <span className="blue">Food Log</span></div>

     <div className="body">
     <div>Email</div>
     <input className="login" ref={element => this.email = element}/>
     <div>Password</div>
     <input className="login" ref={element => this.password = element}/>
     <div className="footer">
     <Button color="success" className="button-login" bsStyle="success" onClick={this.signIn.bind(this)}>Login</Button>
     </div>
       </div>
       </div>
     </div>
     <footer className="navbar-fixed-bottom">
     <h2>Dont have an account yet?</h2>
     {this.props.children}
     <Link to="signUp"><Button color="primary" className="second-button-login" bsStyle="success"  >Register</Button></Link>
     </footer>

     </div>
   );
 }
}

export default App;
