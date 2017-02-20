import React, { Component } from 'react-router';
import base from '../config'

class CalorieBudget extends Component {
  constructor(){
    super()
    this.state = {
      budget: 0
    }
  }



  render () {
    return(
      <div>
        <h1>Set Your Calorie Limit</h1>
        <input/>
      </div>
    )
  }
}
