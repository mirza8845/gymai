import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Fonts } from "../constants/theme";
import { RFPercentage } from "react-native-responsive-fontsize";

const Option = ({ label, selected, onPress }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{label.length > 30 ? label.substring(0, 30) + "..." : label}</Text>
      <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>{selected && <View style={styles.radioInner} />}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: RFPercentage(2),
    // fontWeight: '500',
    color: "black",
    width: "70%",
    paddingLeft: 20,
    fontFamily: Fonts.Medium,
  },
  radioOuter: {
    width: 30,
    height: 30,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterSelected: {
    borderColor: "black",
  },
  radioInner: {
    width: 18,
    height: 18,
    borderRadius: 18,
    backgroundColor: "black",
  },
});

export default Option;
