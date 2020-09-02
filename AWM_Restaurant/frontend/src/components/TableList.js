import React, { Component } from "react";
import { render } from "react-dom";
import DatePicker from 'react-datepicker'
import Calendar from "./Calendar";
import PrenTableButton from "./PrenTableButton";
import WaitersList from "./WaitersList";
import SeatsPicker from "./SeatsPicker"
import { changeSelectedObj } from './Utils.js';
import 'react-datepicker/dist/react-datepicker.css'

class TableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: "",
      date: new Date(),
      loaded: false,
      placeholder: "Loading"
    };
  }

  componentDidMount() {
    fetch("tables")
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
                data: data['tables'],
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
            {this.state.data.map(table => {
              return (
                <li id={"table_"+table.number} key={table.number}>
                  Table {table.number}
                  <i id={"table_"+table.number+"_check"}
                  className="far fa-check-circle w3-margin-left"
                  name="unselected_table"
                  style={{cursor: "pointer"}}
                  onClick={changeSelectedObj.bind(this, "table_"+table.number+"_check", "table")}>
                  </i>
                </li>
              );
            })}
            <div>
                <Calendar/>
            </div>
            <div>
                Seats:<SeatsPicker/>
            </div>
            <div>
                <WaitersList />
            </div>
            <div>
                <PrenTableButton />
            </div>
            <div
                id="jsonResp"
                style={{color: "green"}}>
            </div>
          </ul>
        </div>
        );
    }
    else{
        return(
            <div>
                You are not logged in!
            </div>
        )
    }
  }
}

export default TableList;

const container = document.getElementById("tables");
render(<TableList />, container);
