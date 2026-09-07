import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import Heading from "../../CommonComponent/Heading";
import Paragraph from "../../CommonComponent/Paragraph";
import Button from "../../CommonComponent/Button";
import DoubleButton from "../../CommonComponent/DoubleButton";
import { RFPercentage } from "react-native-responsive-fontsize";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import Toast from "react-native-toast-message";
import { UserContext } from "../../utils/userContext";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Colors } from "../../constants/theme";

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
  const { userData, setUserData } = useContext(UserContext);
  const [selectedEquipment, setSelectedEquipment] = useState([]);

  useEffect(() => {
    if (userData?.availableEquipment) {
      setSelectedEquipment(userData.availableEquipment);
    }
  }, [userData]);

  const toggleEquipment = (item) => {
    setSelectedEquipment((prev) => {
      // If selecting "Everything"
      if (item === "Everything") {
        if (prev.includes("Everything")) {
          // Deselect "Everything" - clear all selections
          return [];
        } else {
          // Select "Everything" - select all options except "Nothing"
          const allExceptNothing = equipmentOptions.filter(
            (opt) => opt !== "Nothing" && opt !== "Everything",
          );
          return ["Everything", ...allExceptNothing];
        }
      }

      // If selecting "Nothing"
      if (item === "Nothing") {
        if (prev.includes("Nothing")) {
          // Deselect "Nothing"
          return prev.filter((eq) => eq !== "Nothing");
        } else {
          // Select "Nothing" - clear all other selections
          return ["Nothing"];
        }
      }

      // If selecting other options
      if (prev.includes("Nothing")) {
        // If "Nothing" is selected, clear it when selecting other options
        const newSelection = prev.filter((eq) => eq !== "Nothing");
        return newSelection.includes(item)
          ? newSelection.filter((eq) => eq !== item)
          : [...newSelection, item];
      }

      if (prev.includes("Everything")) {
        // If "Everything" is selected, deselect it when modifying other selections
        const newSelection = prev.filter((eq) => eq !== "Everything");
        return newSelection.includes(item)
          ? newSelection.filter((eq) => eq !== item)
          : [...newSelection, item];
      }

      // Normal toggle for other items
      return prev.includes(item)
        ? prev.filter((eq) => eq !== item)
        : [...prev, item];
    });
  };

  const handleContinue = async () => {
    if (selectedEquipment.length === 0) {
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
      setUserData((prev) => ({
        ...prev,
        availableEquipment: selectedEquipment,
      }));

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
    <View style={[styles.container, { backgroundColor: Colors.background }]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", left: 0 }}
        >
          <AntDesign
            name="arrowleft"
            color={"white"}
            size={RFPercentage(3.1)}
          />
        </TouchableOpacity>
        <Heading title="Available equipment" />
      </View>

      <Paragraph title="What equipment do you have access to? You can start with nothing!" />

      <ScrollView
        style={{
          gap: 12,
          paddingTop: 60,
          paddingBottom: 60,
          left: RFPercentage(4),
        }}
      >
        {equipmentOptions.map((title, index) => (
          <DoubleButton
            key={index}
            title={title}
            selected={selectedEquipment.includes(title)}
            onPress={() => toggleEquipment(title)}
          />
        ))}
      </ScrollView>
      <View style={{ bottom: RFPercentage(5) }}>
        <Button title="Continue" onPress={handleContinue} />
      </View>
    </View>
  );
};

export default AvailableEquipment;

const styles = StyleSheet.create({
  container: {
    paddingTop: RFPercentage(10),
    paddingHorizontal: RFPercentage(2.8),
    // alignItems: "center",
    flex: 1,
  },
});
