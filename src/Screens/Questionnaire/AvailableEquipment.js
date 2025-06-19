import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import Heading from "../../CommonComponent/Heading";
import Paragraph from "../../CommonComponent/Paragraph";
import Button from "../../CommonComponent/Button";
import DoubleButton from "../../CommonComponent/DoubleButton";
import { RFPercentage } from "react-native-responsive-fontsize";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import Toast from "react-native-toast-message";

const equipmentOptions = [
  "Everything",
  "Nothing",
  "Cable machine",
  "Smith machine",
  "Squat rack",
  "Back extension",
  "Dumbells",
  "Barbell",
  "Pull up/Dip bars",
  "Back machines",
  "Leg machines",
  "Other",
];

const AvailableEquipment = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [selectedEquipment, setSelectedEquipment] = useState([]);

  const toggleEquipment = (item) => {
    setSelectedEquipment((prev) => (prev.includes(item) ? prev.filter((eq) => eq !== item) : [...prev, item]));
  };

  const handleContinue = async () => {
    if (!selectedEquipment) {
      Toast.show({
        type: "info",
        text1: "Select",
        text2: "Please select your available equipment.",
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
        availableEquipment: selectedEquipment,
      });

      navigation.navigate("challenges");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to update equipment list.",
      });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Heading title="Available equipment" />
      <Paragraph title="What equipment do you have access to? You can start with nothing!" />

      <View style={{ gap: 2, paddingTop: 50, paddingBottom: 100, left: RFPercentage(2) }}>
        {equipmentOptions.map((title, index) => (
          <DoubleButton key={index} title={title} selected={selectedEquipment.includes(title)} onPress={() => toggleEquipment(title)} />
        ))}
      </View>

      <Button title="Continue" onPress={handleContinue} />
    </View>
  );
};

export default AvailableEquipment;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 80,
    paddingHorizontal: 25,
    justifyContent: "center",
  },
});
