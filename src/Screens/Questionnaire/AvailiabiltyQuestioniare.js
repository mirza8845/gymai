import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Heading from "../../CommonComponent/Heading";
import { useNavigation, useTheme } from "@react-navigation/native";
import Paragraph from "../../CommonComponent/Paragraph";
import Option from "../../CommonComponent/Option";
import Button from "../../CommonComponent/Button";
import { RFPercentage } from "react-native-responsive-fontsize";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";
import { UserContext } from "../../utils/userContext";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Colors } from "../../constants/theme";

const availabilityOptions = ["1", "2", "3", "4", "5", "6", "7"];

const AvailiabiltyQuestioniare = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const { colors } = useTheme();
  const navigation = useNavigation();

  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    if (userData?.weeklyWorkoutCommitment) {
      setSelectedOption(userData.weeklyWorkoutCommitment);
    }
  }, [userData]);

  const handleContinue = async () => {
    if (!selectedOption) {
      Toast.show({
        type: "info",
        text1: "Select Workouts",
        text2: "Please select how many workouts you can commit to.",
      });
      return;
    }

    const currentUser = auth().currentUser;
    if (!currentUser) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "User not authenticated.",
      });
      return;
    }

    try {
      await firestore().collection("Users").doc(currentUser.uid).update({
        weeklyWorkoutCommitment: selectedOption,
      });

      setUserData((prev) => ({
        ...prev,
        weeklyWorkoutCommitment: selectedOption,
      }));

      navigation.navigate("modifications");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to update workout commitment.",
      });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors.background }]}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()} style={{ position: "absolute", left: 0 }}>
          <AntDesign name="arrowleft" color={"white"} size={RFPercentage(4)} />
        </TouchableOpacity>
        <Heading title={"Availability"} />
      </View>
      <Paragraph title="How many workouts can you commit to weekly?" />
      <View style={styles.availabilityOptions}>
        {availabilityOptions.map((opt, index) => (
          <Option key={index} label={opt} selected={selectedOption === opt} onPress={() => setSelectedOption(opt)} />
        ))}
      </View>
      <View style={{ top: RFPercentage(5) }}>
        <Button title="Continue" onPress={handleContinue} />
      </View>
    </View>
  );
};

export default AvailiabiltyQuestioniare;

const styles = StyleSheet.create({
  container: {
    paddingTop: RFPercentage(10),
    paddingHorizontal: RFPercentage(2),
    alignItems: "center",
    flex:1
  },
  availabilityOptions: {
    gap: 10,
    paddingTop: RFPercentage(6),
    alignItems:'center',
    marginTop:10
    // paddingHorizontal:RFPercentage(2)
  },
});
