import { StyleSheet, Text, View } from "react-native";
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

const availabilityOptions = ["1", "2", "3", "4", "5", "6", "7"];

const AvailiabiltyQuestioniare = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const { colors } = useTheme();
  const navigation = useNavigation();

  const { userData, setUserData } = useContext(UserContext); // ✅ Use context

  // ✅ Prefill if available
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
      await firestore()
        .collection("Users")
        .doc(currentUser.uid)
        .update({
          weeklyWorkoutCommitment: selectedOption,
        });

      // ✅ Update context
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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Heading title="Availability" />
      <Paragraph title="How many workouts can you commit to weekly?" />
      <View style={styles.availabilityOptions}>
        {availabilityOptions.map((opt, index) => (
          <Option
            key={index}
            label={opt}
            selected={selectedOption === opt}
            onPress={() => setSelectedOption(opt)}
          />
        ))}
      </View>
      <View style={{ top: RFPercentage(2) }}>
        <Button title="Continue" onPress={handleContinue} />
      </View>
    </View>
  );
};

export default AvailiabiltyQuestioniare;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 80,
    paddingHorizontal: 35,
    justifyContent: "center",
  },
  availabilityOptions: {
    gap: 10,
    paddingTop: RFPercentage(4),
  },
});
