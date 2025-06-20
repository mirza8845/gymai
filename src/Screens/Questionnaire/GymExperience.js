import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Heading from "../../CommonComponent/Heading";
import { useNavigation, useTheme } from "@react-navigation/native";
import Button from "../../CommonComponent/Button";
import { Fonts } from "../../constants/theme";
import Option from "../../CommonComponent/Option";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import Toast from "react-native-toast-message";
import { UserContext } from "../../utils/userContext";


const availabilityOptions = [
  "Complete Novice",
  "Beginner",
  "Intermediate",
  "Advance",
];

const GymExperience = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const { userData, setUserData } = useContext(UserContext); // ✅ Access userData and setUserData
  const [selectedOption, setSelectedOption] = useState(null);

  // ✅ Prefill if userData has gymExperience
  useEffect(() => {
    if (userData?.gymExperience) {
      setSelectedOption(userData.gymExperience);
    }
  }, [userData]);

  const handleContinue = async () => {
    if (!selectedOption) {
      Toast.show({
        type: "info",
        text1: "Select Experience",
        text2: "Please select your gym experience to continue.",
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
          gymExperience: selectedOption,
        });

      // ✅ Update context
      setUserData((prev) => ({
        ...prev,
        gymExperience: selectedOption,
      }));

      navigation.navigate("availiabiltyQuestioniare");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to update gym experience.",
      });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Heading title="Gym Experience" />
      <View style={styles.optionsContainer}>
        {availabilityOptions.map((opt, index) => (
          <Option
            key={index}
            label={opt}
            selected={selectedOption === opt}
            onPress={() => setSelectedOption(opt)}
          />
        ))}
      </View>
      <Button title="Continue" onPress={handleContinue} />
    </View>
  );
};

export default GymExperience;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  optionsContainer: {
    gap: 15,
    marginVertical: 120,
    alignItems: "center",
  },
});
