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
        <div className="w3-row">
            <span className="w3-xxlarge">{"Insert here the order Code. If you don't have one" }<a className="w3-button w3-border w3-margin-left" href="#reserve_table">create it</a></span>
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
