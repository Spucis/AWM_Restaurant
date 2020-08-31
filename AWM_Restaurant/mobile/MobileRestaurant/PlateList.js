import React, { Component } from "react";
import {FlatList, ActivityIndicator, Text, TextInput, View, Button} from 'react-native';
import Plate from './Plate';
import UpdateButton from './UpdateButton'

class PlateList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      // MAPPING plate_code: quantity
      current_order: {},
      isLoading: true,
    };
    this.onClickPlate = this.onClickPlate.bind(this)
  }

  initOrder(){
    console.log("INIT ORDER...")
    console.log(this.state.data)
    var curr_order = {}
    for (var plate_idx in this.state.data){
        curr_order[this.state.data[plate_idx].code] = 0
    }
    this.setState({current_order: curr_order})
    console.log(this.state.current_order)
  }

  componentDidMount() {

      var request = new XMLHttpRequest();
request.onreadystatechange = (e) => {
  if (request.readyState !== 4) {
    return;
  }

  if (request.status === 200) {
    //console.log('success', JSON.parse(request.responseText));
    this.setState({data: JSON.parse(request.responseText).plates, isLoading: false})
    this.initOrder()
  } else {
    console.warn('error');
  }
};

request.open('GET', 'http://127.0.0.1:8000/restaurant/plates');
request.setRequestHeader("Content-Type", "application/json");
request.send();


  }

  // INVECE CHE FARLO SUL SINGOLO PIATTO, implementare una funzione che scorra tutti i piatti e i pad e crei l'ordine?
  onClickPlate(item, value){
    console.log("RECEIVED")
    console.log(item)
    console.log(value)

    var curr_order = this.state.current_order
                        // operatore unario '+' converte in numero.
    curr_order[item.code] += +value
    this.setState({current_order: curr_order})
    console.log("UPDATED ORDER:")
    console.log(this.state.current_order)
  }
  render() {
  const { data, isLoading } = this.state;
  //console.log(this.state)
    return (

    <View style={{ flex: 1, padding: 24 }}
            id='PlatesList'>
        {isLoading ? <ActivityIndicator/> : (
        <>
            <FlatList
            data={data}
            renderItem={({ item }) => (
              <Plate item={item} ordered={false} clicked={false} onClick={this.onClickPlate}/>

            )}
          />

        <UpdateButton title="Update Order" navigation={this.props.navigation} order={this.state.current_order}/>
        </>
        )}
    </View>
    );
  }
}

export default PlateList;
