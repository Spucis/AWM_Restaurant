import React, { Component } from "react";
import { render } from "react-dom";

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading"
    };
  }

  componentDidMount() {
    fetch("orders")
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(data => {
        this.setState(() => {
          return {
            data: data['orders'],
            loaded: true
          };
        });
      });
  }

  render() {
    return (
    <div>
        Available orders:
      <ul>
        {this.state.data.map(order => {
          return (
            <li key={order.id}>
              Order {order.id}, {order.client.username}, Table {order.table}:
              <ul>
              {order.plates.map(plate => {
                return (
                <li key={plate.code}>
                {plate.name} --- ${plate.price}
                </li>
                );
              })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
    );
  }
}

export default OrderList;

const container = document.getElementById("orders");
render(<OrderList />, container);