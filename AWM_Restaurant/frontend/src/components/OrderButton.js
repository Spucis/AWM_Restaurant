import React, { Component } from "react";
import { render } from "react-dom";

class OrderButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
    };
  }

   makeOrder(){
        var plates = document.getElementsByName("selected_plate");
        var plate_codes = [];
        var plate_list = [];
        
        for (var i=0;i< plates.length;i++){
            var toCutStart = "plate_".length;
            var toCutEnd = "_check".length;
            var plate_code = plates[i].parentElement.id.slice(toCutStart);

            plate_list.push("".
                             concat(plate_code.toString(),
                             " - ",
                             plates[i].parentElement.firstElementChild.innerText)
                            );
            plate_codes.push(plate_code);
        }

        this.setState({data: plate_codes});
        document.getElementById('order_plate_list').innerText = plate_list.join(", ");
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

export default OrderButton;
