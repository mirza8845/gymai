import { StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import React, { useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import Button from "../../CommonComponent/Button";
import Heading from "../../CommonComponent/Heading";
import CommonInput from "../../CommonComponent/CommonInput";
import auth from "@react-native-firebase/auth";
import { Fonts } from "../../constants/theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import * as yup from "yup";
import { Formik } from "formik";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ForgetPassword = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const validationSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
  });

  const handleNext = async (values) => {
    if (values.email) {
      setLoading(true);
      try {
        await auth().sendPasswordResetEmail(values.email);
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Reset password link sent to your email.",
        });
        navigation.navigate("login");
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Error in sending link",
        });
      } finally {
        setLoading(false);
      }
    } else {
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }} keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 50}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          <View style={styles.innerContainer}>
            <View style={{ marginTop: RFPercentage(10) }}>
              <Heading title="Reset Password" />
              <Text style={{ color: "white", fontFamily: Fonts.Medium, textAlign: "center" }}>Reset Password link is sent to your email!</Text>
            </View>

            <Formik initialValues={{ email: "" }} validationSchema={validationSchema} onSubmit={handleNext}>
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <>
                  <View style={styles.inputView}>
                    <CommonInput label="Email" placeholder="Enter email" value={values.email} onChangeText={handleChange("email")} handleBlur={handleBlur("email")} />
                    {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                    <View style={{ marginTop: RFPercentage(10) }}>
                      <Button title="Send Link" onPress={handleSubmit} loader={loading} disbaled={loading} />
                    </View>
                  </View>
                </>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "space-between",
    paddingVertical: 20,
  },
  innerContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    // backgroundColor:'red'
  },
  inputView: {
    width: "90%",
    marginTop: RFPercentage(3),
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
    marginTop: 6,
    // marginBottom: 20,
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
    marginTop: RFPercentage(3),
  },
  loginText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: Fonts.Medium,
  },
  signupBtn: {
    textAlign: "center",
    fontSize: RFPercentage(1.6),
    fontFamily: Fonts.Regular,
    marginTop: RFPercentage(2),
  },
  errorText: {
    fontSize: 13,
    top: 3,
    fontFamily: Fonts.Regular,
    color: "red",
  },
});
