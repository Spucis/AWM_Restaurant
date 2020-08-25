import React, { Component } from "react";
import { render } from "react-dom";

class OrderNumberInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: "",
      loaded: false,
      placeholder: "Loading"
    };

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event){
    this.setState({value: event.target.value});
  }

  render() {
      return (
        <div>
            Insert here the order Code. If you dont have one, create it.
            <input
                id="OrderNumberInput"
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
            />
        </div>
      );
  }
}

export default OrderNumberInput;
