import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Fonts } from "../constants/theme";
import { RFPercentage } from "react-native-responsive-fontsize";

const CommonInput = ({ label, placeholder, value, onChangeText, secureTextEntry = false , handleBlur, editable=true}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <TextInput style={styles.input} placeholder={placeholder} placeholderTextColor="gray" value={value} onChangeText={onChangeText} secureTextEntry={secureTextEntry}  onBlur={handleBlur} editable={editable} />
    </View>
  );
};

export default CommonInput;

const styles = StyleSheet.create({
  inputContainer: {
    // marginBottom: 12,
    marginTop:RFPercentage(1.8)
  },
  label: {
    fontSize: 14,
    marginTop: 10,
    fontFamily: Fonts.Medium,
  },
  input: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 10,
    backgroundColor: "white",
    color: "black",
    fontFamily: Fonts.Regular,
    fontSize: RFPercentage(1.8),
    paddingHorizontal:RFPercentage(2)
  },
});
