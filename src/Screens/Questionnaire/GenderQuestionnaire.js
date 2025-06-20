import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import maleImg from "../../assets/images/Bot-Gender-Male.png";
import femaleImg from "../../assets/images/Bot-Gender-Female.png";
import Button from "../../CommonComponent/Button";
import Heading from "../../CommonComponent/Heading";
import { Fonts } from "../../constants/theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";
import { UserContext } from "../../utils/userContext";
import MaterialDesignIcons from "react-native-vector-icons/MaterialDesignIcons";

const GenderQuestionnaire = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const { userData, setUserData } = useContext(UserContext); // 👈 use context
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);

  // 👇 Pre-fill gender if available
  useEffect(() => {
    if (userData?.gender) {
      setGender(userData.gender);
    }
  }, [userData]);

  const handleContinue = async () => {
    if (!gender) {
      Toast.show({
        type: "info",
        text1: "Select Gender",
        text2: "Please select your gender to continue.",
      });
      return;
    }

    try {
      setLoading(true);
      const currentUser = auth().currentUser;
      if (!currentUser) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "User not authenticated.",
        });
        return;
      }

      // 👇 Update gender in Firestore
      await firestore().collection("Users").doc(currentUser.uid).update({ gender });

      // 👇 Update context state
      setUserData((prev) => ({ ...prev, gender }));

      navigation.navigate("ageQuestionnaire");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to update gender. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.screen}>
      <Heading title="What’s Your Gender" />

      <View style={styles.genderOptionsContainer}>
        <TouchableOpacity style={[styles.genderOption, { backgroundColor: gender === "Male" ? "white" : "transparent" }]} onPress={() => setGender("Male")}>
          <MaterialDesignIcons name="gender-male" color={gender === "Male" ? "black" : "white"} size={RFPercentage(8)} />
        </TouchableOpacity>
        <Text style={[styles.genderLabel, { color: colors.text }]}>Male</Text>

        <TouchableOpacity style={[styles.genderOption, { backgroundColor: gender === "Female" ? "white" : "transparent" }]} onPress={() => setGender("Female")}>
          <MaterialDesignIcons name="gender-female" color={gender === "Female" ? "black" : "white"} size={RFPercentage(8)} />
        </TouchableOpacity>
        <Text style={[styles.genderLabel, { color: colors.text }]}>Female</Text>

        <TouchableOpacity onPress={() => setGender("Other")}>
          <Text style={[styles.other, { color: colors.text }]}>Other</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: RFPercentage(3) }}>
        <Text style={[styles.other, { color: colors.text }]}>Selected Gender: {gender ? gender : "None"}</Text>
      </View>

      <View style={{ marginTop: RFPercentage(7) }}>
        <Button title="Continue" onPress={handleContinue} loader={loading} disbaled={loading} />
      </View>
    </View>
  );
};

export default GenderQuestionnaire;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 50,
    paddingTop: RFPercentage(8),
  },
  genderOptionsContainer: {
    marginTop: RFPercentage(3),
    justifyContent: "center",
    alignItems: "center",
  },
  genderOption: {
    alignItems: "center",
    marginTop: RFPercentage(2.5),
    width: RFPercentage(13),
    height: RFPercentage(13),
    borderRadius: RFPercentage(100),
    borderWidth: 1,
    borderColor: "grey",
    justifyContent: "center",
  },
  genderImage: {
    width: 150,
    height: 150,
  },
  genderLabel: {
    fontSize: RFPercentage(2.3),
    marginTop: 8,
    fontFamily: Fonts.Medium,
  },
  other: {
    paddingTop: 20,
    fontFamily: Fonts.Regular,
  },
});
