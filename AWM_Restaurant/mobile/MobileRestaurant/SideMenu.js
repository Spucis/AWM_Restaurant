import React, { Component } from "react";
import {FlatList, ActivityIndicator, Text, View, Button} from 'react-native';

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.style = {
                    fontSize: 25,
                    color: 'black',
                 }
    this.state = {
        active: false,
    };
  }

  clickSidemenu(){
  if (this.state.active){

    this.style = {
                    fontSize: 25,
                    color: 'black',
                 }
    this.setState({active: false})
  }else{

    this.style = {
                    fontSize: 25,
                    color: 'black',
                 }
    this.setState({active: true})
  }
  }


  render() {
  return (
  null
        //<Text style={this.style} onClick={this.clickSidemenu.bind(this)}>{this.state.active?'☓':'☰'}</Text>
  );
  }
}

export default SideMenu;