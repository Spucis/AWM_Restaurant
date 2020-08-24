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
  }

  handleChange(new_value){
        this.setState({value: new_value});
  }

  render() {
      return (
        <div>
            Insert here the order Code. If you dont have one, create it.
            <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange.bind(this)}
            />
        </div>
      );
  }
}

export default OrderNumberInput;

const container = document.getElementById("orderCode");
render(<OrderNumberInput />, container);

