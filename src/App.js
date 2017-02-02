import React, { Component } from 'react';
import FoodSearch from './foodSearch'
// import MealList from './mealList'
import base from './config'
import './App.css';

class App extends Component {

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
        <button onClick={this.signIn.bind(this)} className="log-in">Login</button>
        <button onClick={this.signUp.bind(this)}>Sign Up</button>
        <button onClick={this.signOut.bind(this)} className="log-in">Sign Out</button>
        <br />
        <br />
        <FoodSearch />
      </div>
    );
  }
}

export default App;
