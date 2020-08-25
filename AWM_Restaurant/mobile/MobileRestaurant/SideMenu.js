import React, { Component } from "react";
import {FlatList, ActivityIndicator, Text, View, Button} from 'react-native';

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
        active: true,
    };
  }

  clickSidemenu(){
  if (this.state.active){


    setState({active: false})
  }else{


    setState({active: true})
  }
  }


  render() {
  return (
        <Text style={{fontSize: 25}} onClick={this.clickSidemenu.bind(this)}>☰</Text>
  );
  }
}

export default SideMenu;