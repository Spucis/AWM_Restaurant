import React, { Component } from "react";
import { render } from "react-dom";
import DatePicker from 'react-datepicker'
import Calendar from "./Calendar";
import PrenTableButton from "./PrenTableButton";
import WaitersList from "./WaitersList";
import SeatsPicker from "./SeatsPicker";
import TableAdder from "./TableAdder";
import { changeSelectedObj } from './Utils.js';
import 'react-datepicker/dist/react-datepicker.css';

class TableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      user: {},
      error: "",
      date: new Date(),
      loaded: false,
      placeholder: "Loading"
    };
    this.delete_table = this.delete_table.bind(this)
    this.add_table = this.add_table.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
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
                user: data['user'],
                loaded: true
            };
          }

        });
      });
  }

  delete_table(table_number){

    const csrftoken = Cookies.get('csrftoken');
    var json_obj = JSON.stringify({"table_number": table_number});

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === 4)
        {
            var resp = JSON.parse(xhr.response)
            if(xhr.status === 200)
            {
                console.log("Table "+table_number+" deleted.")
            }
            else
            {
                console.log("Error while trying to delete table "+table_number+".")
            }
        }
    }

    xhr.open("DELETE", "/restaurant/table", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("X-CSRFToken", csrftoken)
    xhr.send(json_obj);
    this.componentDidMount()

  }

  add_table(table_number){
    const csrftoken = Cookies.get('csrftoken');
    var json_obj = JSON.stringify({"table_number": table_number, "from_ajax": true});

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === 4)
        {
            var resp = JSON.parse(xhr.response)
            if(xhr.status !== 200)
            {
                console.log("Error while trying to add table "+table_number+".")
            }
        }
    }

    xhr.open("POST", "/restaurant/table", true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("X-CSRFToken", csrftoken)
    xhr.send(json_obj);
    this.componentDidMount()
  }

  render() {
    var tablesPerRow = 6
    var numTables = this.state.data.length
    var tableCount = 0

    console.log("NUM TABLES: "+numTables)
    if( this.state.loaded && this.state.error === "" )
    {
        return (
        <ul className="w3-ul w3-border">

          {this.state.user.permissions.includes("add_table")?
          <li>
          <div id="table_adder_block" >
            Add table: <TableAdder />
            <span
                id="table_adder_add"
                className="far fa-check-square w3-margin-left"
                style={{color: 'green'}}
                onClick={() => { this.add_table(document.getElementById("TableAdder_number").value) }}
                onMouseEnter={(element) => {document.getElementById(element.target.id).setAttribute('class', "fas fa-check-square w3-margin-left");
                                            document.getElementById(element.target.id).setAttribute('style', "color: green; cursor: pointer;");
                                            }}
                onMouseLeave={(element) => {document.getElementById(element.target.id).setAttribute('class', "far fa-check-square w3-margin-left");
                                            document.getElementById(element.target.id).setAttribute('style', "color: green;");
                                           }}
                ></span>
          </div>
          </li>
          :
          <div></div>
          }
          <li>
          <div className="w3-xlarge w3-container w3-row">
            {this.state.data.map(table => {
              return (

                <div id={"table_"+table.number} key={table.number} className="w3-container w3-col m3 l2 w3-padding w3-xlarge w3-hover-gray w3-center" style={{cursor: 'default'}}>
                  <span className="w3-text-amber" ><strong>Table {table.number}</strong></span>
                  <i id={"table_"+table.number+"_check"}
                  className="far fa-check-circle w3-margin-left"
                  name="unselected_table"
                  style={{cursor: "pointer"}}
                  title="Click to select this table!"
                  onClick={changeSelectedObj.bind(this, "table_"+table.number+"_check", "table")}>
                  </i>
                  {
                  this.state.user['permissions'].includes("delete_table")
                    ?<span
                      id={"table_"+table.number+"_delete"}
                      className="far fa-times-circle"
                      style={{color: 'red'}}
                      onMouseEnter={(element) => {document.getElementById(element.target.id).setAttribute('class', "fas fa-times-circle");
                                                    document.getElementById(element.target.id).setAttribute('style', "color: red; cursor: pointer;");
                                                    }}
                      onMouseLeave={(element) => {document.getElementById(element.target.id).setAttribute('class', "far fa-times-circle");
                                                    document.getElementById(element.target.id).setAttribute('style', "color: red;");
                                                   }}
                      onClick={() => {this.delete_table(table.number)}}
                      ></span>
                    :<span></span>
                  }
                </div>
              );
            })}
          </div>
          </li>
          <li>
          <div className="w3-container w3-margin w3-row">
            <div className="w3-cell w3-col m6 l6">
                <Calendar/>
            </div>
            <div className="w3-cell w3-padding w3-col m6 l6">
                Seats: <SeatsPicker/>
            </div>
          </div>
          </li>
          <li>
          <div className="w3-margin w3-row">
              <WaitersList />
          </div>
          </li>
          <li>
          <div>
            <div className="w3-margin">
                <PrenTableButton />
            </div>
            <div
                id="jsonResp"
                style={{color: "green"}}>
            </div>
          </div>
          </li>
        </ul>
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
