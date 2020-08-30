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
  <Text style={this.props.ordered ? styles.plate_ordered : styles.plate_new}
        key={this.props.item.code}
        onClick={this.plateClick.bind(this,this.props.item)}>
        {this.props.item.name} | {this.props.item.price}€</Text>
  );
  }
}

const styles = {
plate_ordered: {
    flex: 1,
    padding: 15,
    color: 'green',
    fontSize: 25,
},
plate_new: {
    flex: 1,
    padding: 15,
    color: 'blue',
    fontSize: 25,
    cursor: 'pointer',
},
}
export default Plate;