import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import Button from "../../CommonComponent/Button";
import Option from "../../CommonComponent/Option";
import Heading from "../../CommonComponent/Heading";
import { Colors, Fonts } from "../../constants/theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import Toast from "react-native-toast-message";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { UserContext } from "../../utils/userContext";
import AntDesign from "react-native-vector-icons/AntDesign";

const goals = [
  "Strength Training",
  "Powerlifting",
  "Health",
  "Weight Loss",
  "Muscle Gain",
  "Body Recomposition",
  "General Fitness",
  "Athletic Performance",
];

const GoalsQuestionnaire = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const { userData, setUserData } = useContext(UserContext);

  const [selectedOption, setSelectedOption] = useState(null);
  const [goalNote, setGoalNote] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userData?.goal) setSelectedOption(userData.goal);
    if (userData?.goalNote) setGoalNote(userData.goalNote);
  }, [userData]);

  const handleContinue = async () => {
    if (!selectedOption) {
      Toast.show({
        type: "info",
        text1: "Select Goal",
        text2: "Please select a fitness goal to continue.",
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
      setLoading(true);
      await firestore().collection("Users").doc(currentUser.uid).update({
        goal: selectedOption,
        goalNote: goalNote.trim(),
      });

      setUserData((prev) => ({
        ...prev,
        goal: selectedOption,
        goalNote: goalNote.trim(),
      }));

      navigation.navigate("currentPhysique");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to update goal. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: Colors.background }]} contentContainerStyle={{paddingBottom:50}}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()} style={{ position: "absolute", left: 0 }}>
          <AntDesign name="arrowleft" color={"white"} size={RFPercentage(3.1)} />
        </TouchableOpacity>
        <Heading title="Your Goals" />
      </View>
      <Text style={[styles.subheading]}>What are you interested in?</Text>

      <View style={styles.goalsContainer}>
        {goals.map((opt, index) => (
          <Option key={index} label={opt} selected={selectedOption === opt} onPress={() => setSelectedOption(opt)} />
        ))}
      </View>

      <View style={{ top: RFPercentage(4) }}>
        <Button title="Continue" onPress={handleContinue} disabled={loading} loader={loading} />
      </View>
    </ScrollView>
  );
};

export default GoalsQuestionnaire;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: RFPercentage(2.8),
    paddingTop: RFPercentage(10),
  },
  goalNote: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    height: RFPercentage(25),
  },
  goalNoteInput: {
    fontSize: RFPercentage(2.2),
    color: "black",
    fontFamily: Fonts.Medium,
    textAlignVertical: "top",
    flex: 1,
  },
  subheading: {
    fontSize: RFPercentage(2),
    marginBottom: 30,
    textAlign: "center",
    fontFamily: Fonts.Montserrat_Regular,
    color: "rgba(255, 255, 255, 0.8)",
  },
  goalsContainer: {
    gap: 10,
    marginTop: RFPercentage(3),
    alignItems: "center",
  },
});
