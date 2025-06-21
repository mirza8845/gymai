import { Pressable, StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState, useContext, useEffect, useCallback } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import HorizontalPicker from "@vseslav/react-native-horizontal-picker";
import { RulerPicker } from "react-native-ruler-view";
import Button from "../../CommonComponent/Button";
import Heading from "../../CommonComponent/Heading";
import { Fonts } from "../../constants/theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";
import { UserContext } from "../../utils/userContext";

const AgeQuestionnaire = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const ageOptions = Array.from({ length: 100 }, (_, i) => i + 1);

  const { userData, setUserData } = useContext(UserContext);

  const [selectedAgeIndex, setSelectedAgeIndex] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState(0);
  const [unit, setUnit] = useState("kg");
  const [loading, setLoading] = useState(false);

  console.log(selectedAgeIndex)

  // Pre-fill values from context
  useEffect(() => {
    if (userData?.age) {
      const index = ageOptions.findIndex((item) => item === userData.age);
      if (index !== -1) setSelectedAgeIndex(index);
    }

    if (userData?.weight) {
      const weightStr = userData.weight.toString();
      const unitType = weightStr.includes("LB") ? "LB" : "kg";
      const numberPart = parseInt(weightStr);
      setUnit(unitType);
      setSelectedWeight(numberPart || 0);
    }
  }, [userData]);

  const handleContinue = async () => {
    const age = ageOptions[selectedAgeIndex];
    const weight = selectedWeight;

    if (!age || !weight) {
      Toast.show({
        type: "info",
        text1: "Incomplete",
        text2: "Please select both age and weight.",
      });
      return;
    }

    const currentUser = auth().currentUser;
    if (!currentUser) {
      Toast.show({
        type: "error",
        text1: "Not Authenticated",
      });
      return;
    }

    try {
      setLoading(true);
      await firestore()
        .collection("Users")
        .doc(currentUser.uid)
        .update({
          age,
          weight: `${weight}${unit}`,
        });

      setUserData((prev) => ({
        ...prev,
        age,
        weight: `${weight}${unit}`,
      }));

      navigation.navigate("heightQuestionnaire");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error updating",
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const renderItem = useCallback(
    (item, index) => (
      <View style={styles.pickerItem}>
        <Text style={[styles.pickerItemText, index === selectedAgeIndex && styles.selectedPickerItemText]}>{item}</Text>
      </View>
    ),
    [selectedAgeIndex]
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Heading title="Age" />

      <View style={styles.pickerWrapper}>
        <HorizontalPicker
          data={ageOptions}
          renderItem={renderItem}
          itemWidth={80}
          snapToAlignment="center"
          decelerationRate="normal"
          onChange={(index) => setSelectedAgeIndex(index)}
          initialIndex={selectedAgeIndex}
          contentContainerStyle={{
            paddingHorizontal: (Dimensions.get("window").width - 80) / 2,
          }}
          showsHorizontalScrollIndicator={false}
        />
        <View style={styles.selectorLineLeft} />
        <View style={styles.selectorLineRight} />
      </View>

      <Text style={[styles.heading, { color: colors.text }]}>Weight</Text>

      <View style={styles.weightToggle}>
        <Pressable onPress={() => setUnit("kg")}>
          <Text style={[styles.unitText, unit === "kg" && { color: "black", fontWeight: "bold" }]}>KG</Text>
        </Pressable>

        <View style={styles.verticalDivider} />

        <Pressable onPress={() => setUnit("LB")}>
          <Text style={[styles.unitText, unit === "LB" && { color: "black", fontWeight: "bold" }]}>LB</Text>
        </Pressable>
      </View>

      <RulerPicker
        unit={unit}
        min={0}
        max={600}
        step={1}
        width={500}
        indicatorHeight={80}
        height={50}
        showLabels={true}
        value={selectedWeight}
        containerStyle={{
          backgroundColor: "#4E4E4E",
          borderRadius: 5,
          padding: 10,
        }}
        theme={{
          indicatorColor: "white",
          shortStepColor: "white",
          longStepColor: "white",
          textColor: "white",
          backgroundColor: "black",
          fontSize: 10,
          fontFamily: Fonts.SemiBold,
        }}
        onValueChange={(val) => setSelectedWeight(val)}
        animationConfig={{
          springConfig: {
            tension: 40,
            friction: 7,
          },
        }}
      />

      <Button title="Continue" onPress={handleContinue} loader={loading} disbaled={loading} />
    </View>
  );
};

export default AgeQuestionnaire;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop:RFPercentage(5)
  },
  pickerWrapper: {
    width: "100%",
    height: 70,
    backgroundColor: "#4E4E4E",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    position: "relative",
  },
  pickerItem: {
    width: 80, // must match itemWidth
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4E4E4E",
  },
  pickerItemText: {
    fontSize: 40,
    color: "#1E1E1E",
    fontWeight: "bold",
  },
  selectedPickerItemText: {
    fontSize: 40,
    color: "white",
    fontWeight: "bold",
  },
  heading: {
    fontSize: RFPercentage(3),
    marginBottom: 10,
    textAlign: "center",
    fontFamily: Fonts.SemiBold,
    paddingTop: 30,
  },
  weightToggle: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 250,
    height: 40,
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 50,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    margin: 20,
  },
  unitText: {
    color: "gray",
    fontSize: 20,
    fontFamily: Fonts.Bold,
  },
  verticalDivider: {
    width: 2,
    height: 20,
    backgroundColor: "black",
    marginHorizontal: 10,
  },
  selectorLineLeft: {
    position: "absolute",
    left: Dimensions.get("window").width / 2 - 50,
    height: 90,
    width: 2,
    backgroundColor: "white",
  },
  selectorLineRight: {
    position: "absolute",
    right: Dimensions.get("window").width / 2 - 50,
    height: 90,
    width: 2,
    backgroundColor: "white",
  },
});
