import React, { Component } from "react";
import { render } from "react-dom";

class PrenTableButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
    };
  }

   makePren(){

        // Retrieve Data for POST
        var table = document.getElementsByName("selected_table");
        var waiter = document.getElementsByName("selected_waiter");
        var calendar = document.getElementById("DatePicker");
        var seats = document.getElementById("SeatsPicker");

        // Retrieve Data id to identify Data in the DB
        var table_code = table[0].parentElement.id.slice("table_".length);
        var waiter_code = waiter[0].id.slice("waiter_".length);

        const csrftoken = Cookies.get('csrftoken');

        var obj = { table : table_code, waiter : waiter_code, date : calendar.value, seats: seats.value};
		var json_obj = JSON.stringify(obj);

        var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function()
		{
			if (xhr.readyState === 4)
			{
			    var resp = JSON.parse(xhr.response);
				const container = document.getElementById("jsonResp");
                render(resp['resp'], container);

			}
		}

		xhr.open("POST", "/restaurant/order", true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.setRequestHeader("X-CSRFToken", csrftoken)
		xhr.send(json_obj);
   }

  render() {
    return (
        <button
            id="prnTblOrder"
            onClick={this.makePren.bind(this)}
            className="w3-button w3-center"
        >
        RESERVE NOW!
        </button>
    );
  }
}

export default PrenTableButton;
