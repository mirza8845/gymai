import { StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainNavigator from "./Screens/Navigation/MainNavigation";
import { AuthProvider } from "./Screens/Navigation/AuthProvider";
import Toast from "react-native-toast-message";
import { toastConfig } from "./utils/toastConfig";
import { UserProvider } from "./utils/userContext";

const App = () => {
  const Stack = createNativeStackNavigator();

  const darkTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#000000",
      text: "#ffffff",
    },
  };

  return (
    <UserProvider>
      <NavigationContainer theme={darkTheme}>
        {/* <AuthStack/> */}
        <MainNavigator />
        <Toast config={toastConfig} />
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
