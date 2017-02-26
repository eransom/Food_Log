import React, { Component } from 'react'
import DayPicker from 'react-day-picker'
import "../DayPicker.css"

class Calendar extends Component {
  constructor(props) {
    super(props)
    this.handleDayClick = this.handleDayClick.bind(this)
  }

  state = {
    selectedDay: null,
  }

  handleDayClick(day, {selected}) {
    this.setState({
      selectedDay: day
    })
  }

  render(){
    const { selectedDay } = this.state
    return(
      <div id="calendar">
        <DayPicker
          onDayClick={ this.handleDayClick }
          selectedDays={ selectedDay }
        />
      </div>
    )
  }
}

export default Calendar
