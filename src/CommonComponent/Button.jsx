import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Fonts } from "../constants/theme";

const Button = ({ title, onPress, disbaled, loader }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={onPress} disabled={disbaled}>
      {loader ? (
        <>
          <ActivityIndicator size="small" color={"white"} />
        </>
      ) : (
        <>
          <Text style={[styles.text, { color: colors.text }]}>{title}</Text>
        </>
      )}
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
    fontFamily: Fonts.Medium,
  },
});
