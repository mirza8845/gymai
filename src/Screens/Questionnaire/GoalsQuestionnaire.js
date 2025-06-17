import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import Button from "../../CommonComponent/Button";
import Option from "../../CommonComponent/Option";
import Heading from "../../CommonComponent/Heading";
import { Fonts } from "../../constants/theme";
import { RFPercentage } from "react-native-responsive-fontsize";

const goals = ["Aesthetics", "Strength training", "Powerlifting", "Health"];

const GoalsQuestionnaire = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Heading title="Goals" />
      <Text style={[styles.subheading]}>What are you interested in?</Text>

      <View style={styles.goalsContainer}>
        {goals.map((opt, index) => (
          <Option key={index} label={opt} selected={selectedOption === opt} onPress={() => setSelectedOption(opt)} />
        ))}

        <View style={styles.goalNote}>
          <Text style={styles.goalNoteText}>Tell us more about your goals...</Text>
        </View>
      </View>
      <View style={{top:RFPercentage(4)}}>
        <Button title="Continue" onPress={() => navigation.navigate("currentPhysique")} />
      </View>
    </View>
  );
};

export default GoalsQuestionnaire;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 80,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  subheading: {
    fontSize: RFPercentage(2),
    // fontWeight: '200',
    marginBottom: 30,
    textAlign: "center",
    fontFamily: Fonts.Regular,
    color:'rgba(255, 255, 255, 0.8)'
  },
  goalsContainer: {
    gap: 12,
  },
  goalOption: {
    width: "100%",
    height: 55,
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 20,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  goalText: {
    fontSize: 18,
    fontWeight: "500",
    color: "black",
  },
  goalIcon: {
    width: 24,
    height: 24,
  },
  goalNote: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    height: RFPercentage(25),
  },
  goalNoteText: {
    fontSize: RFPercentage(2.2),
    color: "black",
    fontFamily: Fonts.Medium,
  },
});
