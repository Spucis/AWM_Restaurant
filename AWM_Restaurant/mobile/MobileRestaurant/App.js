import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {
    FlatList, ActivityIndicator, StyleSheet, Text, View, Button,
    ScrollView,
    RefreshControl,
    SafeAreaView, TextInput } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PlateList from './PlateList';
import SideMenu from './SideMenu';
import OrderPlateList from './OrderPlateList'
import UpdateButton from './UpdateButton'

function HomeScreen({navigation}) {
 const [value, onChangeText] = React.useState('');
  return (
  <View style={styles.container}>

      <Text>Order number</Text>
      <TextInput
      id="OrderNumberInput"
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => onChangeText(text)}
      value={value}
    />
      <Button
        title="Go to Order"
        onPress={() => navigation.navigate('Details')}
      />


      <StatusBar style="auto"/>
  </View>
  );
}

function DetailsScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20}}>Your order {document.getElementById("OrderNumberInput").getAttribute("value")} </Text>
      <Text style={{fontSize: 20}}>plates:</Text>
      <Text id='orderNumberErrors'></Text>
      <OrderPlateList />
      <Text style={{fontSize: 20}}>Menu plates list:</Text>
      <PlateList navigation={navigation}/>

      <Button title="Go back" onPress={() => navigation.goBack()} />
      <StatusBar style="auto"/>
  </View>
  );
}

const Stack = createStackNavigator();



function App() {


return(
<>
  <NavigationContainer style={styles.container}>
  <SideMenu />
      <Stack.Navigator initialRouteName="Home" >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
  </NavigationContainer>
</>
 );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
