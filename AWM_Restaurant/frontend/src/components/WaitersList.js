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
        <div className="w3-col m3 l2">
          <div className="w3-container w3-xlarge">
            {this.state.data.map(waiters => {
              return (
                <div id={waiters.id} key={waiters.id} className="w3-cell w3-padding w3-hover-gray">
                  <span className="w3-text-amber"><strong>Waiter {waiters.id}</strong></span> ({waiters.username})
                  <i id={"waiter_"+waiters.id}
                  className="far fa-check-circle w3-margin-left"
                  name="unselected_waiter"
                  style={{cursor: "pointer"}}
                  onClick={changeSelectedObj.bind(this, "waiter_"+waiters.id, "waiter")}>
                  </i>
                </div>
              );
            })}
          </div>
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
