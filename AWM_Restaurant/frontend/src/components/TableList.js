import React, { Component } from "react";
import { render } from "react-dom";

class TableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading"
    };
  }

  componentDidMount() {
    fetch("tables")
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
            data: data['tables'],
            loaded: true
          };
        });
      });
  }

  changeSelectedTable(id){
    var x = document.getElementById(id);
    if (x.className.indexOf("far") == -1) { //far non trovato; far=non selezionato; fas=selezionato
      x.className = x.className.replace("fas", "far");
      x.style = "cursor: pointer;";
      x.setAttribute("name","unselected_table");
      x.setAttribute("title", "Click to select this table for your order.");
    } else {
      x.className = x.className.replace("far", "fas");
      x.style = "cursor: pointer; color: green;";
      x.setAttribute("name","selected_table");
      x.setAttribute("title", "Click to deselect this table.")
    }
  }

  render() {
    return (
      <ul class="w3-ul w3-xlarge">
        {this.state.data.map(table => {
          return (

            <li id={"table_"+table.number} key={table.number}>
              Table {table.number}
              <i id={"table_"+table.number+"_check"}
              className="far fa-check-circle w3-margin-left"
              name="unselected_table"
              style={{cursor: "pointer"}}
              onClick={this.changeSelectedTable.bind(this,"table_"+table.number+"_check")}>
              </i>
            </li>


          );
        })}
          </ul>
    );
  }
}

export default TableList;

const container = document.getElementById("tables");
render(<TableList />, container);
