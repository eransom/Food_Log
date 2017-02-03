import React, { Component } from 'react';
// import MealList from './mealList'
import { Link } from 'react-router';
import base from './config'
import './App.css';

class App extends Component {

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
              userName: user.email
            })
          }
        }

  render() {

    return (
      <div className="App">
        <h1>Food Log</h1>
        <input ref={element => this.email = element} placeholder="Email Address"/>
        <input ref={element => this.password = element} placeholder="Password"/>
        <button onClick={this.signIn.bind(this)}  className="log-in"><Link to="foodSearch">Login</Link></button>
        <button onClick={this.signUp.bind(this)}>Sign Up</button>

        <br />
        <br />
      </div>
    );
  }
}

export default App;
