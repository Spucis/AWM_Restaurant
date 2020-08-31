import React, { Component } from "react";
import { render } from "react-dom";
import {FlatList, ActivityIndicator, Text, View, Button} from 'react-native';

class UpdateButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
    };
    this.updateOrder = this.updateOrder.bind(this)
    this.sendPUT = this.sendPUT.bind(this)
  }

   sendPUT(obj)
   {
        //const csrftoken = Cookies.get('csrftoken');
		var json_obj = JSON.stringify(obj);

        var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = (e) =>
		{
			if (xhr.readyState === 4)
			{
			    var resp = JSON.parse(xhr.response);
			    console.log("RISPOSTA PUT UPDATE ORDER")
			    console.log(resp.resp)
			    this.props.navigation.navigate('Home');
                this.props.navigation.navigate('Details');
			}
		}

		xhr.open("PUT", "http://127.0.0.1:8000/restaurant/m/order", true);
		xhr.setRequestHeader("Content-type", "application/json");
		//xhr.setRequestHeader("X-CSRFToken", csrftoken)
		xhr.send(json_obj);
   }

  updateOrder(){
  // MAKE THE UPDATED ORDER THEN USE PUT TO THE SERVER
  var current_order = this.props.order
  var txtInput = document.getElementById("OrderNumberInput");
  var order_id = txtInput.value
  console.log("DIZIONARIO IN UPDATE ORDER")
    console.log(current_order)
    var value
    for(var idx in current_order){
        if(current_order.hasOwnProperty(idx)){
            console.log("INDEX "+idx)
            console.log(current_order[idx])

            value = document.getElementById(idx+'_pad').value
            current_order[idx] += +value
        }
    }
    console.log(current_order)
    console.log("FINE UPDATE ORDER")

    this.sendPUT({"order_id": order_id, "plates": current_order})
  }

  render() {
    return (
    <Button title="Update Order" onPress={() => {this.updateOrder();

                                                 }} />
    );
  }
}

export default UpdateButton;
