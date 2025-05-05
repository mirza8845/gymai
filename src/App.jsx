import { StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainNavigator from './Screens/Navigation/MainNavigation'
import { AuthProvider } from './Screens/Navigation/AuthProvider'

const App = () => {
  const Stack = createNativeStackNavigator();

  const darkTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#000000',
      text: '#ffffff',
    },
  };

  return (
    <NavigationContainer theme={darkTheme}>
      {/* <AuthStack/> */}
     <MainNavigator/>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
