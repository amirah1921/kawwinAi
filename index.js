import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppRegistry } from 'react-native';
import AppNavigator from './pages/AppNavigator';

export default function App() {
  return (
    <NavigationContainer>
      {/* Rest of your app code */}
    </NavigationContainer>
  );
}

AppRegistry.registerComponent('kawwinAi', () => AppNavigator);
