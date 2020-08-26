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


function HomeScreen({navigation}) {
  return (
  <View style={styles.container}>

      <Text>Open up App.js to start working on your app!</Text>
      <Text> Prova APP! </Text>
      <TextInput
      id="OrderNumberInput"
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      onChangeText={text => onChangeText(text)}
      value={"CIAO ZIO"}
    />
      <Button
        title="Go to Details page"
        onPress={() => navigation.navigate('Details')}
      />

      <PlateList />
      <StatusBar style="auto"/>
  </View>
  );
}

function DetailsScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Details window</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
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
