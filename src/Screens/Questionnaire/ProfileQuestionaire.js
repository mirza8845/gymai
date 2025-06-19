import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import Heading from "../../CommonComponent/Heading";
import profileImg from "../../assets/images/womanpic.png";
import EditIcon from "../../assets/svg/edit.svg";
import CommonInput from "../../CommonComponent/CommonInput";
import { Fonts } from "../../constants/theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import Toast from "react-native-toast-message";

const ProfileQuestionaire = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [fullName, setFullName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const handleStart = async () => {
    const user = auth().currentUser;
    if (!user) {
      Toast.show({
        type: "error",
        text1: "User not found",
        text2: "Please log in again.",
      });
      return;
    }

    if (!fullName || !nickname || !email || !mobile) {
      Toast.show({
        type: "info",
        text1: "Missing fields",
        text2: "Please fill out all fields.",
      });
      return;
    }

    try {
      await firestore().collection("Users").doc(user.uid).update({
        fullName,
        nickname,
        email,
        mobile,
      });

      Toast.show({
        type: "success",
        text1: "Profile",
        text2: "Your profile has been saved successfully.",
      });

      navigation.navigate("Tabs");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]} keyboardShouldPersistTaps="handled">
        <Heading title="Fill Your Profile" />

        <View style={styles.imageContainer}>
          <Image source={profileImg} style={styles.profileImg} />
          <View style={styles.editIcon}>
            <EditIcon width={16} height={16} />
          </View>
        </View>

        <View style={styles.formSection}>
          <CommonInput label="Full name" placeholder="Enter Your Full Name" value={fullName} onChangeText={setFullName} />
          <CommonInput label="Nickname" placeholder="Enter your Nick name" value={nickname} onChangeText={setNickname} />
          <CommonInput label="Email" placeholder="Enter your Email" value={email} onChangeText={setEmail} />
          <CommonInput label="Mobile Number" placeholder="Enter your Mobile Number" value={mobile} onChangeText={setMobile} />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.btntext}>Start</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProfileQuestionaire;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: RFPercentage(7),
  },
  imageContainer: {
    alignSelf: "center",
    marginTop: 20,
    position: "relative",
  },
  profileImg: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 5,
    backgroundColor: "white",
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  formSection: {
    width: "85%",
    alignSelf: "center",
    marginTop: 40,
    paddingHorizontal: 10,
  },
  button: {
    width: "40%",
    height: 50,
    borderRadius: 40,
    backgroundColor: "#FFDD03",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    alignSelf: "center",
  },
  btntext: {
    fontSize: RFPercentage(2.6),
    color: "black",
    fontFamily: Fonts.SemiBold,
  },
});
