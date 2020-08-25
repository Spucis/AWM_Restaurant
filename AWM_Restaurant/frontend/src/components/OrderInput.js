import React, { Component } from "react";
import { render } from "react-dom";
import OrderNumberInput from "./OrderNumberInput"
import OrderNumberButton from "./OrderNumberButton"

class OrderInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading"
    };
  }

  render() {
      return (
        <div>
          <ul
            id="inbtnjsonResp"
            style={{color: "green"}}>
          </ul>
          <ul>
            <OrderNumberInput/>
            <OrderNumberButton/>
          </ul>
        </div>
      );
  }
}

export default OrderInput;

const container = document.getElementById("orderCode");
render(<OrderInput />, container);

