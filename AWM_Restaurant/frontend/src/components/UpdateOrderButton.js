import React, { Component } from "react";
import { render } from "react-dom";

class UpdateOrderButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
    };
  }

   sendPUT(obj, plate_list)
   {
        const csrftoken = Cookies.get('csrftoken');
		var json_obj = JSON.stringify(obj);

        var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function()
		{
			if (xhr.readyState === 4)
			{
			    var resp = JSON.parse(xhr.response);
			    // previous if(1)
			    if(xhr.status === 200)
			    {
			        document.getElementById('order_plate_list').innerText = plate_list.join(", ");
			    }
			    else
			    {
                    const container = document.getElementById("inbtnjsonResp");
                    var info = "The number entered does not corrispond to any Order"
                    render(info, container);
			    }
			}
		}

		xhr.open("PUT", "/restaurant/order", true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.setRequestHeader("X-CSRFToken", csrftoken)
		xhr.send(json_obj);
   }

   makeOrder(){

        {/* plate_obj: { "plate_code": "num_of_portions" }*/}
        var send_obj = {};
        var plate_obj = {};
        var plate_list = [];

        var plates = document.getElementsByName("selected_plate");
        var numInputOrder = document.getElementById("numInputOrder");
	    send_obj['order_id'] = numInputOrder.getAttribute("value");

        for (var i=0;i< plates.length;i++){
            var toCutStart = "plate_".length;
            var toCutEnd = "_check".length;
            var plate_code = plates[i].parentElement.id.slice(toCutStart);

            plate_list.push("".
                             concat(plate_code.toString(),
                             " - ",
                             plates[i].parentElement.firstElementChild.innerText)
                            );

            plate_obj[plate_code] = plates[i].getAttribute("value")
        }

        this.setState({data: plate_obj});

        send_obj['plates'] = plate_obj;
        this.sendPUT(send_obj, plate_list)
        console.log(send_obj)
   }

  render() {
    return (
    <button
        id="cmdOrder"
        onClick={this.makeOrder.bind(this)}
        className="w3-button w3-center"
    >
    ORDER NOW!
    </button>
    );
  }
}

export default UpdateOrderButton;
