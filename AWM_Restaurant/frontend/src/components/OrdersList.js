import React, { Component } from "react";
import { render } from "react-dom";

class OrdersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: "",
      loaded: false,
      placeholder: "Loading"
    };
  }

  componentDidMount() {
    fetch("orders")
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { data: {'orders': "" }, error: response.status, placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(data => {
        this.setState(() => {
           if(data){
                return {
                data: data['orders'],
                loaded: true
           }
          };
        });
      });
  }

  render() {
    if(this.state.error === "")
    {
        return (
        <div>
            <ul>
                <button
                    id="refreshOrders"
                    onClick={this.componentDidMount.bind(this)}
                    className="w3-button w3-center"
                >
                Refresh Your Orders!
                </button>
            </ul>
            Available orders:
            <ul>
            {this.state.data.map(order => {
              return (
                <li key={order.id}>
                  Order {order.id}, {order.client.username} {order.password}
                  <ul>
                  Table {order.table}, Waiter: {order.waiter.username}:
                  <ul>
                  {order.pds.map(pd => {
                    return (
                    <li key={pd.id}>
                    {pd.plate.name} --- ${pd.plate.price} --- N: {pd.quantity}
                    </li>
                    );
                  })}
                  </ul>
                  </ul>
                </li>
              );
            })}
            </ul>
        </div>
        );
    }
    else if(this.state.error == 403)
    {
            return(
        <div>
            You are not logged in!
        </div>
        )
    }
  }
}

export default OrdersList;
