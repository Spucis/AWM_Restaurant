import React, { Component } from "react";
import { render } from "react-dom";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      loaded: false,
    };
  }

  handleChange = date => {
        this.setState({
          date: date
        });
  };

  render() {
    return (
      <ul className="w3-ul w3-xlarge">
      <DatePicker
        selected={this.state.date}
        onChange={this.handleChange}
        dateFormat='MM/dd/yyyy'
        showTimeSelect
        timeFormat='HH:mm'
        timeIntervals={30}
        id="DatePicker"
      />
      </ul>
    );
  }
}

export default Calendar;
