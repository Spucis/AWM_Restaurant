import React, { Component } from "react";
import { render } from "react-dom";
import NumericInput from 'react-numeric-input';

{/* Test di valore non negativo */}

class TableAdder extends Component {
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
            onChange={this.handleChange.bind(this)}
            id="TableAdder_number"
            size={ 4 }
            />
        )
    }
};

export default TableAdder;
