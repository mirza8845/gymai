import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import Heading from "../../CommonComponent/Heading";
import profileImg from "../../assets/images/noDp.png";
import EditIcon from "../../assets/svg/edit.svg";
import CommonInput from "../../CommonComponent/CommonInput";
import { Colors, Fonts } from "../../constants/theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import Toast from "react-native-toast-message";
import { UserContext } from "../../utils/userContext";
import axios from "axios";
import AntDesign from "react-native-vector-icons/AntDesign";
import { launchImageLibrary } from "react-native-image-picker";

const ProfileQuestionaire = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { userData, setUserData } = useContext(UserContext);

  const [fullName, setFullName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const [imageUri, setImageUri] = useState(null);

  const handleSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 1,
        selectionLimit: 1,
      },
      (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.errorCode) {
          console.log("Error: ", response.errorMessage);
        } else {
          const uri = response.assets?.[0]?.uri;
          setImageUri(uri);
        }
      }
    );
  };

  useEffect(() => {
    if (userData) {
      setFullName(userData.fullName || "");
      setNickname(userData.nickname || "");
      setEmail(auth().currentUser?.email || ""); // use Firebase Auth for email
      setMobile(userData.mobile || "");
    }
  }, [userData]);

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

    if (!fullName || !nickname || !mobile) {
      Toast.show({
        type: "info",
        text1: "Missing fields",
        text2: "Please fill out all fields.",
      });
      return;
    }

    try {
      const updatedInfo = { fullName, nickname, mobile };

      await firestore().collection("Users").doc(user.uid).update(updatedInfo);
      setUserData({ ...userData, ...updatedInfo });

      Toast.show({
        type: "success",
        text1: "Profile",
        text2: "Your profile has been saved successfully.",
      });

      navigation.navigate("WorkoutGenerating");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: Colors.background, flexGrow: 1 }]} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%" }}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()} style={{ position: "absolute", left: 20 }}>
            <AntDesign name="arrowleft" color={"white"} size={RFPercentage(4)} />
          </TouchableOpacity>
          <Heading title="Fill Your Profile" />
        </View>

        <View style={{ marginTop: RFPercentage(3), alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity
            onPress={handleSelectImage}
            style={[
              { borderWidth: 1.5, borderColor: Colors.primary, width: RFPercentage(19), height: RFPercentage(19), borderRadius: RFPercentage(100), alignItems: "center", justifyContent: "center" },
            ]}
          >
            <Image source={imageUri ? { uri: imageUri } : profileImg} style={styles.profileImg} />
            <View style={styles.editIcon}>
              <TouchableOpacity onPress={handleSelectImage}>
                <EditIcon width={16} height={16} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.formSection}>
          <CommonInput icon={require("../../assets/images/user.png")} placeholder="Enter Your Full Name" value={fullName} onChangeText={setFullName} />
          <CommonInput icon={require("../../assets/images/user.png")} placeholder="Enter your Nick name" value={nickname} onChangeText={setNickname} />
          <CommonInput icon={require("../../assets/images/mail.png")} placeholder="Enter your Email" value={email} editable={false} textInputStyle={{ color: "#888" }} />
          <CommonInput icon={require("../../assets/images/mail.png")} placeholder="Enter your Mobile Number" value={mobile} onChangeText={setMobile} />
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
    flexGrow: 1,
    paddingTop: RFPercentage(10),
    paddingBottom: 40, // Add some bottom padding
  },

  imageContainer: {
    alignSelf: "center",
    marginTop: 20,
    position: "relative",
  },
  profileImg: {
    width: RFPercentage(18),
    height: RFPercentage(18),
    borderRadius: RFPercentage(100),
  },
  editIcon: {
    position: "absolute",
    bottom: 10,
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
    // paddingHorizontal: 10,
  },
  button: {
    width: "40%",
    height: 50,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    alignSelf: "center",
  },
  btntext: {
    fontSize: RFPercentage(2.1),
    color: "white",
    fontFamily: Fonts.Montserrat_SemiBold,
  },
});
