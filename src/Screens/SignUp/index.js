import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import Button from "../../CommonComponent/Button";
import Heading from "../../CommonComponent/Heading";
import CommonInput from "../../CommonComponent/CommonInput";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Fonts } from "../../constants/theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import * as yup from "yup";
import { Formik } from "formik";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUp = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  let validationSchema = yup.object({
    name: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Passwords must match"),
  });

  const handleSignUp = async (values) => {
    if (values.name && values.email && values.password && values.confirmPassword) {
      setLoading(true);
      try {
        const userCredential = await auth().createUserWithEmailAndPassword(values.email, values.password);
        const user = userCredential.user;

        const userData = {
          name: values.name,
          email: values.email,
          uid: user.uid,
          profile: null,
          createdAt: firestore.FieldValue.serverTimestamp(),
        };

        await firestore().collection("Users").doc(user.uid).set(userData);
        await AsyncStorage.setItem("email", values.email);
        await AsyncStorage.setItem("password", values.password);

        Toast.show({
          type: "success",
          text1: "Sign Up",
          text2: "User registered successfully",
        });
        navigation.navigate("introQuestionnaire");
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Sign Up Failed",
          text2: error.message || "Something went wrong",
        });
      } finally {
        setLoading(false);
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Missing Fields",
        text2: "Please fill all required fields",
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.innerContainer}>
            <View style={{ marginTop: RFPercentage(5) }}>
              <Heading title="Create Account" />
            </View>

            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => handleSignUp(values)}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <>
                  <View style={styles.inputView}>
                    <CommonInput
                      label="Full name"
                      placeholder="Enter Your Full Name"
                      value={values.name}
                      onChangeText={handleChange("name")}
                      handleBlur={handleBlur("name")}
                    />
                    {touched.name && errors.name && (
                      <View style={{}}>
                        <Text style={{ color: "red", fontFamily: Fonts.Regular, fontSize:RFPercentage(1.6) }}>{errors.name}</Text>
                      </View>
                    )}

                    <CommonInput
                      label="Email"
                      placeholder="example@email.com"
                      value={values.email}
                      onChangeText={handleChange("email")}
                      handleBlur={handleBlur("email")}
                    />
                    {touched.email && errors.email && (
                      <View style={{ }}>
                        <Text style={{ color: "red", fontFamily: Fonts.Regular, fontSize:RFPercentage(1.6) }}>{errors.email}</Text>
                      </View>
                    )}

                    <CommonInput
                      label="Password"
                      placeholder="Enter Password"
                      secureTextEntry={true}
                      value={values.password}
                      onChangeText={handleChange("password")}
                      handleBlur={handleBlur("password")}
                    />
                    {touched.password && errors.password && (
                      <View style={{  }}>
                        <Text style={{ color: "red", fontFamily: Fonts.Regular , fontSize:RFPercentage(1.6)}}>{errors.password}</Text>
                      </View>
                    )}

                    <CommonInput
                      label="Confirm Password"
                      placeholder="Repeat Password"
                      secureTextEntry={true}
                      value={values.confirmPassword}
                      onChangeText={handleChange("confirmPassword")}
                      handleBlur={handleBlur("confirmPassword")}
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                      <View style={{ }}>
                        <Text style={{ color: "red", fontFamily: Fonts.Regular,fontSize:RFPercentage(1.6) }}>{errors.confirmPassword}</Text>
                      </View>
                    )}

                    <TouchableOpacity style={styles.forgotWrapper}>
                      <Text style={[styles.forgotAndSignUpText, { color: colors.text }]}>
                        By continuing, you agree to{"\n"}
                        <Text style={{ fontFamily: Fonts.Medium }}>Terms of Use and Privacy Policy.</Text>
                      </Text>
                    </TouchableOpacity>

                    <View style={{ marginTop: RFPercentage(1.5) }}>
                      <Button title="Sign Up" onPress={handleSubmit} loader={loading} disbaled={loading} />
                    </View>
                  </View>
                </>
              )}
            </Formik>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("login")}>
            <Text style={[styles.signupBtn, { color: colors.text }]}>Already have an account? Log in</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  inputView: {
    width: "90%",
    marginTop: RFPercentage(3),
  },
  forgotWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: RFPercentage(4),
  },
  forgotAndSignUpText: {
    fontSize: RFPercentage(1.5),
    width: "70%",
    fontFamily: Fonts.Regular,
    textAlign: "center",
  },
  signupBtn: {
    textAlign: "center",
    fontSize: RFPercentage(1.6),
    fontFamily: Fonts.Regular,
    marginTop: RFPercentage(3),
  },
});
