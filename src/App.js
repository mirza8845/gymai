import { StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import MainNavigator from "./screens/Navigation/MainNavigation";
import Toast from "react-native-toast-message";
import { toastConfig } from "./utils/toastConfig";
import { UserProvider } from "./utils/userContext";
import { Provider } from "react-redux";
import store from "./redux/store";
import 'react-native-get-random-values';

const App = () => {

  const darkTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#000000",
      text: "#ffffff",
    },
  };

  return (
    <Provider store={store}>
      <UserProvider>
        <NavigationContainer theme={darkTheme}>
          <MainNavigator />
          <Toast config={toastConfig} />
        </NavigationContainer>
      </UserProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
