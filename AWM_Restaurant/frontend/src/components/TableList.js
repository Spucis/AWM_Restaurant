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

  render() {
    return (
    <div>
        Available tables:
      <ul>
        {this.state.data.map(table => {
          return (
            <li key={table.number}>
              Table {table.number}
            </li>
          );
        })}
      </ul>
    </div>
    );
  }
}

export default TableList;

const container = document.getElementById("tables");
render(<TableList />, container);
