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
                this.props.navigation.navigate('Details',{ order_code: this.props.order_code });
			}
		}

		xhr.open("PUT", "http://192.168.1.33:8000/restaurant/m/order", true);
		xhr.setRequestHeader("Content-type", "application/json");
		//xhr.setRequestHeader("X-CSRFToken", csrftoken)
		xhr.send(json_obj);
   }

  updateOrder(){
    // MAKE THE UPDATED ORDER THEN USE PUT TO THE SERVER
    var current_order = this.props.order

    this.sendPUT({"order_id": this.props.order_code, "plates": current_order})
  }

  render() {
    return (
    <Button title="Update Order" onPress={() => {this.updateOrder();

                                                 }} />
    );
  }
}

export default UpdateButton;
