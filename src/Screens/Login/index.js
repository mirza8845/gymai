import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import Button from "../../CommonComponent/Button";
import Heading from "../../CommonComponent/Heading";
import CommonInput from "../../CommonComponent/CommonInput";
import auth from "@react-native-firebase/auth";
import { Fonts } from "../../constants/theme";
import { RFPercentage } from "react-native-responsive-fontsize";

const Login = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in both fields.");
      return;
    }

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate("introQuestionnaire");
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Error", err.message);
      });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.innerContainer}>
        <View style={{ bottom: RFPercentage(3) }}>
          <Heading title="Welcome To GymAi" />
        </View>
        <View style={styles.inputView}>
          <CommonInput label="Email" placeholder="Enter email" value={email} onChangeText={setEmail} />
          <CommonInput label="Password" placeholder="Enter password" secureTextEntry value={password} onChangeText={setPassword} />

          <TouchableOpacity style={styles.forgotWrapper}>
            <Text style={[styles.forgotAndSignUpText, { color: colors.text }]}>Forgot Password?</Text>
          </TouchableOpacity>
          <View style={{marginTop:RFPercentage(3)}}>
            <Button title="Log In" onPress={handleLogin} />
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("signup")}>
        <Text style={[styles.signupBtn, { color: colors.text }]}>Don’t have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "space-between",
    paddingVertical: 20,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    // backgroundColor:'red'
  },
  inputView: {
    width: "90%",
    marginTop: 20,
    alignSelf: "center",
  },
  inputTitle: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 5,
  },
  inputText: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "white",
    color: "black",
  },
  forgotWrapper: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  forgotAndSignUpText: {
    fontSize: RFPercentage(1.7),
    fontFamily: Fonts.Medium,
  },
  loginBtn: {
    width: "60%",
    borderRadius: 20,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#383838",
    borderColor: "white",
    borderWidth: 1,
    alignSelf: "center",
    marginTop: 20,
  },
  loginText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: Fonts.Medium,
  },
  signupBtn: {
    textAlign: "center",
    fontSize: RFPercentage(1.8),
    fontFamily: Fonts.Regular,
    bottom:RFPercentage(2)
  },
  selectedText: {
    fontSize: 45,
    marginTop: 15,
    fontFamily: Fonts.Medium,
  },
});
