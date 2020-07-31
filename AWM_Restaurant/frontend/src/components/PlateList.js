import React, { Component } from "react";
import { render } from "react-dom";

class PlateList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading"
    };
  }

  componentDidMount() {
    fetch("plates")
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
            data: data['plates'],
            loaded: true
          };
        });
      });
  }

  render() {
    return (
    this.state.data.map(plate => {
          return (
          <>
            <h1 ><b>{plate.name}</b> <span className="w3-right w3-tag w3-dark-grey w3-round">${plate.price}</span></h1>
            <p className="w3-text-grey">{plate.description}</p>
            <hr></hr>
          </>
          );
        })
    );
  }
}

export default PlateList;

const container = document.getElementById("customPlates");
render(<PlateList />, container);
