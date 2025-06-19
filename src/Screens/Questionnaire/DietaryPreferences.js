import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Heading from "../../CommonComponent/Heading";
import { useNavigation, useTheme } from "@react-navigation/native";
import Paragraph from "../../CommonComponent/Paragraph";
import DoubleButton from "../../CommonComponent/DoubleButton";
import Button from "../../CommonComponent/Button";
import { Fonts } from "../../constants/theme";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import Toast from "react-native-toast-message";

const dietaryOptions = ["Vegetarian", "Vegan", "Gluten-Free", "Keto", "Paleo", "No preferences"];
const allergyOptions = ["Nuts", "Dairy", "Shellfish", "Eggs", "No allergies"];

const DietaryPreferences = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [selectedDietary, setSelectedDietary] = useState([]);
  const [selectedAllergies, setSelectedAllergies] = useState([]);

  const toggleSelection = (item, selectedList, setSelectedList) => {
    if (selectedList.includes(item)) {
      setSelectedList(selectedList.filter((i) => i !== item));
    } else {
      setSelectedList([...selectedList, item]);
    }
  };

  const handleContinue = async () => {
    if (!selectedDietary || !selectedAllergies) {
      Toast.show({
        type: "info",
        text1: "Please Select",
        text2: "Select your diet preferences.",
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
        dietaryPreferences: selectedDietary,
        foodAllergies: selectedAllergies,
      });
      navigation.navigate("diets");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to save dietary preferences.",
      });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Heading title="Dietary Preferences" />
      <View style={{ marginTop: 70, marginBottom: 60 }}>
        <Text style={[styles.paragraph, { color: colors.text }]}>What are your dietary preferences?</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            {dietaryOptions.slice(0, 3).map((item) => (
              <DoubleButton key={item} title={item} selected={selectedDietary.includes(item)} onPress={() => toggleSelection(item, selectedDietary, setSelectedDietary)} />
            ))}
          </View>
          <View>
            {dietaryOptions.slice(3).map((item) => (
              <DoubleButton key={item} title={item} selected={selectedDietary.includes(item)} onPress={() => toggleSelection(item, selectedDietary, setSelectedDietary)} />
            ))}
          </View>
        </View>
      </View>

      <View style={{ paddingBottom: 60 }}>
        <Text style={{ fontSize: 25, marginBottom: 10, color: "white", fontFamily: Fonts.Medium }}>Allergies</Text>
        <Text style={[styles.paragraph, { color: colors.text }]}>Do you have any food allergies we should know about?</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 80 }}>
          <View>
            {allergyOptions.slice(0, 3).map((item) => (
              <DoubleButton key={item} title={item} selected={selectedAllergies.includes(item)} onPress={() => toggleSelection(item, selectedAllergies, setSelectedAllergies)} />
            ))}
          </View>
          <View>
            {allergyOptions.slice(3).map((item) => (
              <DoubleButton key={item} title={item} selected={selectedAllergies.includes(item)} onPress={() => toggleSelection(item, selectedAllergies, setSelectedAllergies)} />
            ))}
          </View>
        </View>
      </View>

      <Button title="Continue" onPress={handleContinue} />
    </View>
  );
};

export default DietaryPreferences;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 80,
    paddingHorizontal: 25,
  },
  paragraph: {
    fontSize: 16,
    fontFamily: Fonts.Regular,
    paddingVertical: 8,
  },
});
