import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import Heading from "../../CommonComponent/Heading";
import Paragraph from "../../CommonComponent/Paragraph";
import Option from "../../CommonComponent/Option";
import Button from "../../CommonComponent/Button";
import { RFPercentage } from "react-native-responsive-fontsize";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import Toast from "react-native-toast-message";
import { UserContext } from "../../utils/userContext";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Colors } from "../../constants/theme";

const dietsOption = ["High in Protein", "High in Carbohydrates", "High in Fats", "High in fiber", "Balanced with a range of foods providing macro", "High in Ultra-processed foods", "Other"];

const Diets = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { userData, setUserData } = useContext(UserContext);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (userData?.currentDiet) setSelectedOption(userData.currentDiet);
  }, [userData]);

  const handleContinue = async () => {
    if (!selectedOption) {
      Toast.show({
        type: "info",
        text1: "Selection Required",
        text2: "Please select a diet type to continue.",
      });
      return;
    }

    const currentUser = auth().currentUser;
    if (!currentUser) {
      Toast.show({
        type: "error",
        text1: "User Error",
        text2: "User not authenticated.",
      });
      return;
    }

    try {
      await firestore().collection("Users").doc(currentUser.uid).update({
        currentDiet: selectedOption,
      });

      setUserData((prev) => ({
        ...prev,
        currentDiet: selectedOption,
      }));

      navigation.navigate("healthQuestionaire");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Database Error",
        text2: "Failed to save diet info. Please try again.",
      });
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: Colors.background }]} keyboardShouldPersistTaps="handled">
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%" }}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()} style={{ position: "absolute", left: 0 }}>
            <AntDesign name="arrowleft" color={"white"} size={RFPercentage(3.1)} />
          </TouchableOpacity>
          <Heading title="Your Diet" />
        </View>
        <Paragraph title="How would you describe your current diet?" />
        <View style={{ paddingTop: RFPercentage(6), paddingBottom: 30, gap: 12, }}>
          {dietsOption.map((opt, index) => (
            <Option key={index} label={opt} selected={selectedOption === opt} onPress={() => setSelectedOption(opt)} />
          ))}
        </View>
        <Button title="Continue" onPress={handleContinue} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Diets;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: RFPercentage(10),
    paddingHorizontal: RFPercentage(2.8),
    alignItems: "center",
  },
});
