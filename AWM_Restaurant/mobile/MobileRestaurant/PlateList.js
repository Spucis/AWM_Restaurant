import React, { Component } from "react";
import {FlatList, ActivityIndicator, Text, View, Button} from 'react-native';
import Plate from './Plate';

class PlateList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    /*
    const Frisbee = require('frisbee');
    let res = 0;

    // create a new instance of Frisbee
    const api = new Frisbee({
      //baseURI: 'http://localhost:8000/', // optional
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    api.get("https://localhost:8000/restaurant/plates",{
    mode: "no-cors",
    raw: true,
    })
    .then((response) => {
        response.json()
    })
      .then((json) => {
        this.setState({ data: json.plates });
        console.log(json.plates);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
      */
      var request = new XMLHttpRequest();
request.onreadystatechange = (e) => {
  if (request.readyState !== 4) {
    return;
  }

  if (request.status === 200) {
    console.log('success', JSON.parse(request.responseText));
    this.setState({data: JSON.parse(request.responseText).plates, isLoading: false})
  } else {
    console.warn('error');
  }
};

request.open('GET', 'http://127.0.0.1:8000/restaurant/plates');
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
            data={data}
            renderItem={({ item }) => (
              <Plate item={item} />
            )}
          />
        )}
        <Button title="Click to order!" onPress={() => console.log("PREMUTO!")}/>
      </View>
    );
  }
}

export default PlateList;
