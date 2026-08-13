import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Heading from "../../CommonComponent/Heading";
import { useNavigation, useTheme } from "@react-navigation/native";
import Paragraph from "../../CommonComponent/Paragraph";
import Button from "../../CommonComponent/Button";
import HorizontalPicker from "@vseslav/react-native-horizontal-picker";
import { Colors, Fonts } from "../../constants/theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import Toast from "react-native-toast-message";
import { UserContext } from "../../utils/userContext";
import AntDesign from "react-native-vector-icons/AntDesign";

const pickerData = Array.from({ length: 24 }, (_, i) => i + 1); // 1-24

const HealthQuestionaire = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { userData, setUserData } = useContext(UserContext);

  const [sleepIndex, setSleepIndex] = useState(0);
  const [waterIndex, setWaterIndex] = useState(0);
  const [energyIndex, setEnergyIndex] = useState(0);

  useEffect(() => {
    if (userData?.sleepHours) setSleepIndex(pickerData.indexOf(userData.sleepHours));
    if (userData?.waterIntakeLiters) setWaterIndex(pickerData.indexOf(userData.waterIntakeLiters));
    if (userData?.energyLevel) setEnergyIndex(userData.energyLevel - 1); // 1-based to 0-based
  }, [userData]);

  const renderItem = (item, index, selectedIndex) => (
    <View style={styles.pickerItem}>
      <Text style={[styles.pickerItemText, index === selectedIndex && styles.selectedPickerItemText]}>{item}</Text>
    </View>
  );

  const handleContinue = async () => {
    const sleepHours = pickerData[sleepIndex];
    const waterIntake = pickerData[waterIndex];
    const energy = energyIndex + 1;

    if (!sleepHours || !waterIntake || !energy) {
      Toast.show({
        type: "info",
        text1: "Incomplete",
        text2: "Please set your sleep, water, and energy levels.",
      });
      return;
    }

    const user = auth().currentUser;
    if (!user) {
      Toast.show({
        type: "error",
        text1: "User Error",
        text2: "Please log in again.",
      });
      return;
    }

    try {
      await firestore().collection("Users").doc(user.uid).update({
        sleepHours,
        waterIntakeLiters: waterIntake,
        energyLevel: energy,
      });

      setUserData((prev) => ({
        ...prev,
        sleepHours,
        waterIntakeLiters: waterIntake,
        energyLevel: energy,
      }));

      navigation.navigate("profileQuestionaire");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error saving data",
        text2: "Please try again later.",
      });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors.background }]}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()} style={{ position: "absolute", left: 20 }}>
          <AntDesign name="arrowleft" color={"white"} size={RFPercentage(3.1)} />
        </TouchableOpacity>
        <Heading title="Health" />
      </View>

      <View style={{ marginTop: RFPercentage(3) }}>
        <Paragraph title="How many hours do you sleep every night?" />
        <View style={styles.pickerWrapper}>
          <HorizontalPicker
            data={pickerData}
            renderItem={(item, index) => renderItem(item, index, sleepIndex)}
            itemWidth={80}
            onChange={(index) => setSleepIndex(index)}
            initialIndex={sleepIndex}
            snapToAlignment="center"
            // snapToInterval={100}
            decelerationRate="fast"
            contentContainerStyle={{
              paddingHorizontal: (Dimensions.get("window").width - 80) / 2,
            }}
          />
          <View style={styles.selectorLineRight} />
          <View style={styles.selectorLineLeft} />
        </View>

        <Paragraph title="How much water do you drink per day (L)?" />
        <View style={styles.pickerWrapper}>
          <HorizontalPicker
            data={pickerData}
            renderItem={(item, index) => renderItem(item, index, waterIndex)}
            itemWidth={80}
            onChange={(index) => setWaterIndex(index)}
            initialIndex={waterIndex}
            snapToAlignment="center"
            // snapToInterval={100}
            decelerationRate="fast"
            contentContainerStyle={{
              paddingHorizontal: (Dimensions.get("window").width - 80) / 2,
            }}
          />
          <View style={styles.selectorLineRight} />
          <View style={styles.selectorLineLeft} />
        </View>

        <Paragraph title="How are your energy levels? (1=Low, 5=High)" />
        <View style={styles.pickerWrapper}>
          <HorizontalPicker
            data={[1, 2, 3, 4, 5]}
            renderItem={(item, index) => renderItem(item, index, energyIndex)}
            itemWidth={80}
            onChange={(index) => setEnergyIndex(index)}
            initialIndex={energyIndex}
            snapToAlignment="center"
            // snapToInterval={100}
            decelerationRate="fast"
            contentContainerStyle={{
              paddingHorizontal: (Dimensions.get("window").width - 80) / 2,
            }}
          />
          <View style={styles.selectorLineRight} />
          <View style={styles.selectorLineLeft} />
        </View>
      </View>
      <View style={{ top: RFPercentage(1) }}>
        <Button title="Continue" onPress={handleContinue} />
      </View>
    </View>
  );
};

export default HealthQuestionaire;

const styles = StyleSheet.create({
  container: {
    paddingTop: RFPercentage(10),
    alignItems: "center",
    flex:1
  },
  pickerItem: {
    width: 80,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4E4E4E",
  },
  pickerItemText: {
    fontSize: 40,
    color: "#1E1E1E",
    fontFamily: Fonts.Bold,
  },
  selectedPickerItemText: {
    fontSize: 40,
    color: "white",
    fontFamily: Fonts.Bold,
  },
  pickerWrapper: {
    width: "100%",
    height: 70,
    backgroundColor: "#4E4E4E",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 50,
    position: "relative",
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
