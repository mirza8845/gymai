import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors, Fonts } from "../constants/theme";
import { RFPercentage } from "react-native-responsive-fontsize";

const Option = ({ label, selected, onPress }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.container} onPress={onPress}>
      <Text style={[styles.text, { color: selected ? "white" : "#555555" }]}>{label.length > 30 ? label.substring(0, 30) + "..." : label}</Text>
      <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>{selected && <View style={styles.radioInner} />}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 46,
    backgroundColor: "#080808",
    borderRadius: 30,
    paddingHorizontal: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: RFPercentage(2),
    color: "#555555",
    width: "70%",
    paddingLeft: 20,
    fontFamily: Fonts.Montserrat_Medium,
  },
  radioOuter: {
    width: 26,
    height: 26,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#555555",
    alignItems: "center",
    justifyContent: "center",
    right: 5,
  },
  radioOuterSelected: {
    borderColor: Colors.primary,
  },
  radioInner: {
    width: 15,
    height: 15,
    borderRadius: 18,
    backgroundColor: Colors.primary,
  },
});

export default Option;
