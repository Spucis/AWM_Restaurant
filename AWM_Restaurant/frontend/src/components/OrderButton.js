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

  componentDidMount() {
    /*fetch("orders")
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
            data: data['orders'],
            loaded: true
          };
        });
      });*/
  }


   makeOrder(){
        var plates = document.getElementsByName("selected_plate");
        //console.log(plates);
        var plate_codes = [];
        var plate_list = [];
        
        for (var i=0;i< plates.length;i++){
            var toCutStart = "plate_".length; //find the length of the start of the string
            var toCutEnd = "_check".length;
            //console.log(plates[i]);
            var plate_code = plates[i].parentElement.id.slice(toCutStart);//, toCutEnd); //retrieve the id (something like "plate_0") and cut the
                                                          //initial part
            // solo per provare la funzionalità..
            // i codici sono dentro plate_codes, in basso.
            plate_list.push("".
                             concat(plate_code.toString(),
                             " - ",
                             plates[i].parentElement.firstElementChild.innerText));

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

const container = document.getElementById("orderButton");
render(<OrderButton />, container);
