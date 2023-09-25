// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPage from './Mainpage';
import VendorList from './VendorList';
import ProductDetailScreen from "./ProductDetailsScreen";
import Introduction from './Introduction';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="Introduction" component={Introduction} options={{headerShown:false}} />
        <Stack.Screen name="SignIn" component={SignIn} options={{headerShown:false}} />
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}} /> 
        <Stack.Screen name="MainPage" component={MainPage} options={{headerShown:false}} />
        <Stack.Screen name="VendorList" component={VendorList} options={{headerShown:true}} />
        <Stack.Screen name="ProductDetails" component={ProductDetailScreen} options={{headerShown:false}}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;