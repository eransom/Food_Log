import React, { Component } from 'react'
import DayPicker from 'react-day-picker'
import '../DayPicker.css'
// import base from '../config'
import Moment from 'moment'


class Calendar extends Component {

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.showCurrentDate = this.showCurrentDate.bind(this);
  }

  state = {
    value: Moment().format('MMMM Do, YYYY'), // The value of the input field
    month: new Date(), // The month to display in the calendar
  };

  componentDidUpdate(prevProp, prevState) {
    console.log('this.state.value is: ', this.state.value)
    console.log('prevState is: ', prevState.value)
    if(this.state.value != prevState.value) {
    this.props.userMealList(this.state.value)
    }
  }

  showCurrentDate() {
    this.daypicker.showMonth(this.state.month);
  }

  handleInputChange(e) {
    const { value } = e.target;

    // Change the current month only if the value entered by the user
    // is a valid date, according to the `MMMM Do, YYYY` format
    if (Moment(value, 'MMMM Do, YYYY', true).isValid()) {
      this.setState({
        month: Moment(value, 'MMMM Do, YYYY').toDate(),
        value,
      }, this.showCurrentDate);
    } else {
      this.setState({ value }, this.showCurrentDate);
    }
  }

  handleDayClick(day) {
    this.setState({
      value: Moment(day).format('MMMM Do, YYYY'),
      month: day,
    });
  }





  render() {
    const selectedDay = Moment(this.state.value, 'MMMM Do, YYYY', true).toDate();
    return (
      <div id="calendar">
        <p>
          <input
            type="text"
            value={ this.state.value }
            placeholder="YYYY-MM-DD"
            onChange={ this.handleInputChange }
            onFocus={ this.showCurrentDate }
          />
        </p>
        <DayPicker
          ref={ el => this.daypicker = el }
          initialMonth={ this.state.month }
          selectedDays={ selectedDay }
          onDayClick={ this.handleDayClick }
        />
      </div>
    );
  }

}
export default Calendar
