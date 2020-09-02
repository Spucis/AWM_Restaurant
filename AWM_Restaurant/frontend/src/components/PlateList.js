import React, { Component } from "react";
import { render } from "react-dom";
import NumericInput from 'react-numeric-input';
import { ObjSelection } from './Utils.js';
import { ChangeObjValue } from './Utils.js';

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
          <div key={"plate_"+plate.code+"_key"}>
              <div className="w3-container">
                  <div className="w3-row">
                    <h1 id={"plate_"+plate.code} className="w3-left"><b className="w3-left">{plate.name}</b></h1>
                    <i  id={"plate_"+plate.code+"_check"}
                        name="unselected_plate"
                        className="far fa-check-circle w3-margin-left w3-left w3-margin-top w3-margin-right"
                        onClick={ObjSelection.bind(this,"plate_"+plate.code+"_check", "plate", "np_div_"+plate.code+"_check")}
                        title="Click to select this plate for your order."
                        style={{cursor: "pointer"}}
                        value={1}
                    >
                    </i>
                    <div id={"np_div_"+plate.code+"_check"} style={{display: "none", marginTop: 12}} className="w3-left">
                        <NumericInput
                            mobile="auto"
                            className="formControl"
                            id={"np_"+plate.code+"_check"}
                            value={1}
                            onChange={ChangeObjValue.bind(this, "plate_"+plate.code+"_check")}
                            min={1}
                            max={30}
                            size={ 1 }
                        />
                    </div>
                    <span className="w3-right w3-tag w3-dark-grey w3-round">${plate.price}</span>
                  </div>
                  <div className="w3-row">
                    <p className="w3-text-grey">{plate.description}</p>
                  </div>
              </div>
              <hr></hr>
          </div>
          );
        })
    );
  }
}

export default PlateList;
