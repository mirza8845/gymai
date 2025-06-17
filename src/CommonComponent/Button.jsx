import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Fonts } from "../constants/theme";

const Button = ({ title, onPress }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={[styles.text, { color: colors.text }]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: RFPercentage(22),
    height: RFPercentage(6),
    borderRadius: RFPercentage(6),
    backgroundColor: "rgba(255, 255, 255, 0.09)",
    borderColor: "rgba(255, 255, 255, 1)",
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 20,
    alignSelf: "center",
  },
  text: {
    fontSize: RFPercentage(2),
    fontFamily:Fonts.Medium
  },
});
