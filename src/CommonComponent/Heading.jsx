import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { Fonts } from "../constants/theme";
import { RFPercentage } from "react-native-responsive-fontsize";

const Heading = ({ title }) => {
  const { colors } = useTheme();
  return (
    <View>
      <Text style={[styles.heading, { color: colors.text }]}>{title}</Text>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  heading: {
    fontSize: RFPercentage(2.4),
    // fontWeight: '700',
    // marginBottom: 10,
    textAlign: "center",
    fontFamily: Fonts.Montserrat_Bold,
  },
});
