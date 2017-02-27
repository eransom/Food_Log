import React, { Component } from 'react';
import base from '../config'

class CalorieBudget extends Component {

  constructor() {
    super()
    this.state = {
      budget: 0
    }
  }

  componentDidMount() {
    base.syncState(`users/${this.props.uid}/calorieBudget`, {
      context: this,
      state: 'budget'
    })
    console.log('CalorieGoal is: ', this.state.budget)
  }

  

  render () {
    return(
      <div>
        {this.props.children && React.cloneElement(this.props.children, { budget: this.state.budget })}
      </div>
    )
  }
}

export default CalorieBudget
