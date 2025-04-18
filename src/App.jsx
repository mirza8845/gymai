import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Splash from '../MyApp/Screens/Splash'
import Onboarding from './Screens/Onboarding'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './Screens/Login'

const App = () => {
  const Stack = createNativeStackNavigator();
  const DarkTheme = {
    dark: true,
    colors: {
      background: '#000000',
      text: '#ffffff',
      card: '#121212',
      border: '#333333',
      primary: '#ffffff',
      notification: '#ff453a',
    },
  };

  return (
    <NavigationContainer >
        {/* <Splash/> */}
        <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen name="Onboarding" component={Onboarding} options={{headerShown:false}} />
        <Stack.Screen name="login" component={Login} options={{headerShown:false}} />

        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})