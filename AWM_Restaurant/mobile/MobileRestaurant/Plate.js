import React, { Component } from "react";
import {FlatList, ActivityIndicator, Text, View, Button} from 'react-native';

class Plate extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  plateClick(item){
  console.log("Click on plate")
  console.log(item.code)
  console.log(item.name)
  }

  render() {
  return (
  <Text style={{flex: 1, padding: 5}} key={this.props.item.code} onClick={this.plateClick.bind(this,this.props.item)}>{this.props.item.name}, {this.props.item.price}</Text>
  );
  }
}

export default Plate;