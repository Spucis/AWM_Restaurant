import React, { Component } from "react";
import { render } from "react-dom";
import PlatesList from "./PlateList";
import UpdateOrderButton from "./UpdateOrderButton";

class Plates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      placeholder: "Loading"
    };
  }

  render() {
    return (
        <div>
            <PlatesList
             id="PlatesList"
            />
            <UpdateOrderButton/>
        </div>
    );
  }
}

export default Plates;

const container = document.getElementById("customPlates");
render(<Plates />, container);
