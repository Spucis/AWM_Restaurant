import React, { Component } from "react";
import { render } from "react-dom";

class OrderNumberButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
    };
  }

   sendCode(){
        // Retrieve Data for POST
        var txtInput = document.getElementById("OrderNumberInput");

        const csrftoken = Cookies.get('csrftoken');

        var obj = { orderCode: txtInput.getAttribute("value")};
		var json_obj = JSON.stringify(obj);

        var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function()
		{
			if (xhr.readyState === 4)
			{
			    if(xhr.status === 200)
			    {
                    var resp = JSON.parse(xhr.response);
                    if(resp['id'] > 0)
                    {
                        var numInputOrder = document.getElementById("numInputOrder");
                        numInputOrder.setAttribute("value", resp['id']);
                        var customPlates = document.getElementById("customPlates");
                        customPlates.style = "display: block"
                        const container = document.getElementById("inbtnjsonResp");
                        var info = "Update the Order "+txtInput.getAttribute("value");
                        render(info, container);
                    }
                    else
                    {
                        const container = document.getElementById("inbtnjsonResp");
                        var info = "The number entered does not corrispond to any Order"
                        render(info, container);
                    }
			    }
			    else
			    {
			        console.warn("Error while retrieving data for the order")
			        const container = document.getElementById("inbtnjsonResp");
                    var info = "Error while retrieving data for the order"
                    render(info, container);
			    }
			}
		}

		xhr.open("POST", "/restaurant/orders", true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.setRequestHeader("X-CSRFToken", csrftoken)
		xhr.send(json_obj);
   }

  render() {
    return (
        <button
            id="numInputOrder"
            onClick={this.sendCode.bind(this)}
            className="w3-button w3-border"
            value={-1}
        >
        Send Code!
        </button>
    );
  }
}

export default OrderNumberButton;
