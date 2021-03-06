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
      error: '',
    };
  }

  send_post(){
  // Retrieve Data for POST
        var obj = { orderCode: this.props.order_code};
		var json_obj = JSON.stringify(obj);
        var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = (e) =>
		{
			if (xhr.readyState === 4)
			{
			    if(xhr.status >= 200 && xhr.status < 300)
			    {
			        var resp = JSON.parse(xhr.response);
			        var order = resp['order']
                    this.setState({isLoading: false, data: order})
			    }
			    else
			    {
                    this.setState({
                        isLoading: false,
                        data: [],
                        error: "The number entered does not correspond to any Order"
                    })
                    console.warn(this.state.error)
			    }
			}
		}

		xhr.open("POST", "http://"+this.props.ip_address+"/restaurant/m/order", true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(json_obj);
  }
  componentDidMount() {
  /*
  }
    var request = new XMLHttpRequest();

    request.onreadystatechange = (e) => {
        if (request.readyState !== 4) {
            return;
        }

        if (request.status === 200) {
            this.setState({csrf_token: JSON.parse(request.responseText)['csrf_token']})
            this.send_post()
        } else {
            console.warn('Error retrieving the CSRF token');
        }
    };

    request.open('GET', "http://"+this.props.ip_address+"/restaurant/csrftoken');
    request.setRequestHeader("Content-Type", "application/json");
    request.send();
    */

    this.send_post()

  }


  render() {
  const { data, isLoading } = this.state;
    return (
    <View key="View_Orderplatelist" style={{ flex: 1.2, padding: 6 }}>
        {isLoading ? <ActivityIndicator/> : (
            <FlatList
            id='OrderPlatesList'
            data={data.pds}
            key="OrderPlateListKey"
            keyExtractor={(item) => "Item_"+(item.plate.code).toString() }
            renderItem={({ item }) => (
              <Plate key={"orderedPlateComponent_"+item.plate.code.toString()} item={item} ordered={true}/>
            )}
          />
        )}
    </View>
    );
  }
}

export default PlateList;
