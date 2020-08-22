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

  changePlateSelection(id){
    var x = document.getElementById(id);
    if (x.className.indexOf("far") == -1) { //far non trovato; far=non selezionato; fas=selezionato
      x.className = x.className.replace("fas", "far");
      x.style = "cursor: pointer;";
      x.setAttribute("name","unselected_plate");
      x.setAttribute("title", "Click to select this plate for your order.");
    } else {
      x.className = x.className.replace("far", "fas");
      x.style = "cursor: pointer; color: green;";
      x.setAttribute("name","selected_plate");
      x.setAttribute("title", "Click to delete this plate from your order.")
    }
  }

  render() {
    return (
    this.state.data.map(plate => {
          return (
          <>
            <h1 id={"plate_"+plate.code}><b>{plate.name}</b>
            <i  id={"plate_"+plate.code+"_check"}
                name="unselected_plate"
                className="far fa-check-circle w3-margin-left"
                onClick={this.changePlateSelection.bind(this,"plate_"+plate.code+"_check")}
                title="Click to select this plate for your order."
                style={{cursor: "pointer"}}
                >
            </i>
            <span className="w3-right w3-tag w3-dark-grey w3-round">${plate.price}</span></h1>
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
