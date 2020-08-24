import React, { Component } from "react";
import { render } from "react-dom";
import OrdersList from "./OrdersList";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      placeholder: "Loading"
    };
  }

  render() {
    return (
        <OrdersList
         id="OrdersList"
        />
    );
  }
}

export default Orders;

const container = document.getElementById("orders");
render(<Orders />, container);
