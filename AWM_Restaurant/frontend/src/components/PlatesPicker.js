import React, { Component } from "react";
import { render } from "react-dom";
import NumericInput from 'react-numeric-input';
import { ChangeObjValue } from './Utils.js';

class PlatesPicker extends Component {
    constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: 1,
      loaded: false,
    };
  }

    handleChange(new_value) {
        this.setState({value: new_value});
    }

    render() {
        return(
            <NumericInput
            mobile="auto"
            className="formControl"
            value={this.state.value}
            onChange={ChangeObjValue.bind(this)
            min={1}
            max={30}
            size={1}
            />
        )
    }
};

export default PlatesPicker;
