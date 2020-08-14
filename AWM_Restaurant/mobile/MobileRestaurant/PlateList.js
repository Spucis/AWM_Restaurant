import React, { Component } from "react";
import {FlatList, ActivityIndicator, Text, View, } from 'react-native';

class PlateList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
    };
  }

  componentDidMount() {
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
    api.get("http://localhost:8000/restaurant/plates",{
    mode: "cors",
    raw: true,
    })
    .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json.plates });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
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
              <Text key={item.code}>{item.name}, {item.price}</Text>
            )}
          />
        )}
      </View>
    );
  }
}

export default PlateList;