import React, { Component } from "react";
import {FlatList, ActivityIndicator, Text, TextInput, View, Button} from 'react-native';

class Plate extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  //deprecated
  plateClick(item){
    console.log("PLATE CLICKED")
    /*
      console.log("Click on plate")
      console.log(item.code)
      console.log(item.name)
      var value = document.getElementById(this.props.item.code+'_pad').value
      console.log("VALUE")
      console.log(value)
      console.log("SENDING UP THE STATE...")
      this.props.onClick(item, value)
      */
  }


  render() {
      if(this.props.ordered){
        return (
            <Text style={this.props.ordered ? styles.plate_ordered : styles.plate_new}
                  key={this.props.item.plate.code+'_ordered'}>

            {this.props.item.plate.name} | {this.props.item.plate.price}€ | Qt. {this.props.item.quantity}
            </Text>
        );
      }
      else{
          return(
            <Text key={'plate_'+this.props.item.code+'_text'} style={this.props.ordered ? styles.plate_ordered : styles.plate_new}
                key={this.props.item.code}
                id={this.props.item.code}
                onClick={this.plateClick.bind(this,this.props.item)}>
                {this.props.item.name} | {this.props.item.price}€
            </Text>

          );
      }

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
    //cursor: 'pointer', // not supported in mobile
},
}
export default Plate;