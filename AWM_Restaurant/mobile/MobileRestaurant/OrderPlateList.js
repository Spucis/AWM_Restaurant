import React, { Component } from "react";
import {FlatList, ActivityIndicator, Text, View, Button} from 'react-native';
import Plate from './Plate';

class PlateList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      csrf_token: '',
      isLoading: true,
    };
  }

  send_post(){
  // Retrieve Data for POST
  // CONTROLLARE: PROBABILMENTE BISOGNA ANDARE SU ORDER E NON ORDERS
        var txtInput = document.getElementById("OrderNumberInput");
        console.log(txtInput.getAttribute("value"))
        var obj = { orderCode: txtInput.getAttribute("value")};
		var json_obj = JSON.stringify(obj);

        var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = (e) =>
		{
			if (xhr.readyState === 4)
			{
			    var resp = JSON.parse(xhr.response);
			    if(xhr.status == 200)
			    {
			        var response = JSON.parse(xhr.responseText)
			        var plates = response['plates']

                    this.setState({isLoading: false, data: plates})

			    }
			    else
			    {

                    const container = document.getElementById("orderNumberErrors");
                    var info = "The number entered does not corrispond to any Order"
                    console.log(info)
                    //render(info, container);
			    }
			}
		}

		xhr.open("POST", "http://127.0.0.1:8000/restaurant/m/order", true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.setRequestHeader("X-CSRFToken", this.state.csrf_token)
		xhr.send(json_obj);
  }
  componentDidMount() {

        var request = new XMLHttpRequest();
request.onreadystatechange = (e) => {
  if (request.readyState !== 4) {
    return;
  }

  if (request.status === 200) {
    console.log('success csrf token', JSON.parse(request.responseText));
    this.setState({csrf_token: JSON.parse(request.responseText)['csrf_token']})
    this.send_post()
  } else {
    console.warn('error retieving the CSRF token');
  }
};

request.open('GET', 'http://127.0.0.1:8000/restaurant/csrftoken');
request.setRequestHeader("Content-Type", "application/json");
request.send();



  }


  render() {
  const { data, isLoading } = this.state;
  console.log(this.state)
    return (

    <View style={{ flex: 1, padding: 24 }}>
        {isLoading ? <ActivityIndicator/> : (
            <FlatList
            id='OrderPlatesList'
            data={data}
            renderItem={({ item }) => (
              <Plate item={item} ordered={true}/>
            )}
          />
        )}
    </View>
    );
  }
}

export default PlateList;
