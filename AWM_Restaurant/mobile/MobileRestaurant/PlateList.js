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
    this.updateCurrentOrder = this.updateCurrentOrder.bind(this)
  }

  initOrder(){
    var curr_order = {}
    for (var plate_idx in this.state.data){
        curr_order[this.state.data[plate_idx].code] = 0
    }
    this.setState({current_order: curr_order})
  }

  componentDidMount() {

    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {
        this.setState({data: JSON.parse(request.responseText).plates, isLoading: false})
        this.initOrder()
      } else {
        console.warn('error while getting the plates');
      }
    };

    request.open('GET', "http://"+this.props.ip_address+"/restaurant/plates");
    request.setRequestHeader("Content-Type", "application/json");
    request.send();


  }

  //Deprecated
  onClickPlate(item, value){
    console.log("RECEIVED")
    /*
    console.log(item)
    console.log(value)

    var curr_order = this.state.current_order
                        // operatore unario '+' converte in numero.
    curr_order[item.code] += +value
    this.setState({current_order: curr_order})
    console.log("UPDATED ORDER:")
    console.log(this.state.current_order)
    */
  }



  updateCurrentOrder(text, id){
    var curr_order = this.state.current_order
    curr_order[id] = +text
    this.setState({ current_order: curr_order })

  }


  render() {
    const { data, isLoading } = this.state;
    return (
        <View style={{ flex: 1, padding: 6 }}
              id='PlatesList'>
            {isLoading ? <ActivityIndicator/> : (
            <>
                <FlatList
                    data={data}
                    key={'plates_flatlist'}
                    keyExtractor={item => "Item_code"+item.code.toString()}
                    renderItem={({ item }) => (
                      <>
                          <Plate
                              key={item.code+'_plate'}
                              id={item.code+'_plateID'}
                              item={item}
                              ordered={false}
                              clicked={false}
                              onClick={this.onClickPlate}
                          />
                          <Text>Click to select the quantity:</Text>
                          <TextInput
                              style={{borderWidth: 3, borderColor: "blue", padding: 5}}
                              keyboardType='number-pad'
                              key={item.code+'_pad'}
                              id={item.code+'_padID'}
                              onChangeText={(text) => {
                                                          this.updateCurrentOrder(text, item.code);
                                                      }}
                          />
                      </>
                )}
                />
                <Text style={{marginTop: 12}}>Then click to update your order!</Text>
                <UpdateButton
                    key={'UpdateButton'}
                    title="Update Order"
                    navigation={this.props.navigation}
                    route={this.props.route}
                    order={this.state.current_order}
                    order_code={this.props.order_code}
                    ip_address={this.props.ip_address}
                />
            </>
            )}
        </View>
    );
  }
}

export default PlateList;
