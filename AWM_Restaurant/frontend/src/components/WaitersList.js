import { changeSelectedObj } from './Utils.js';
import React, { Component } from "react";
import { render } from "react-dom";

class WaitersList extends Component {
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
    fetch("waiters")
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { error: response.status, placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(data => {
        this.setState(() => {
          if(data)
          {
            return {
                data: data['waiters'],
                loaded: true
            };
          }
        });
      });
  }

  render() {
    if(this.state.error === "")
    {
        return (
        <div>
          <ul className="w3-ul w3-xlarge">
            {this.state.data.map(waiters => {
              return (
                <li id={waiters.id} key={waiters.id}>
                  Waiter {waiters.id}, {waiters.username}:
                  <i id={"waiter_"+waiters.id}
                  className="far fa-check-circle w3-margin-left"
                  name="unselected_waiter"
                  style={{cursor: "pointer"}}
                  onClick={changeSelectedObj.bind(this, "waiter_"+waiters.id, "waiter")}>
                  </i>
                </li>
              );
            })}
          </ul>
        </div>
        );
    }
    else
    {
        return(
            <div>
            </div>
        )
    }
  }
}

export default WaitersList;
