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
          <>
            <h1 id={"plate_"+plate.code}><b>{plate.name}</b>
            <i  id={"plate_"+plate.code+"_check"}
                name="unselected_plate"
                className="far fa-check-circle w3-margin-left"
                onClick={ObjSelection.bind(this,"plate_"+plate.code+"_check", "plate")}
                title="Click to select this plate for your order."
                style={{cursor: "pointer"}}
                value={1}
                >
            </i>
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
