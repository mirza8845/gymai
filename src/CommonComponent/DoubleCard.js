// components/DoubleCard.js
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useTheme } from "@react-navigation/native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Fonts } from "../constants/theme";

const DoubleCard = ({ leftItem, rightItem }) => {
  const { colors } = useTheme();

  const renderCard = (item) => (
    <View style={styles.doubleCard}>
      <Image source={item.image} style={styles.doubleCardImage} />
      <View style={[styles.cardInfoBox]}>
        <Text style={[styles.doubleCardTitle, { color: colors.text }]}>{item.title}</Text>
        <Text style={[styles.metaInfo, { color: colors.text }]}>
          <Icon name="clockcircleo" size={12} color={colors.text} /> {item.duration}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.doubleCardRow}>
      {renderCard(leftItem)}
      {renderCard(rightItem)}
    </View>
  );
};

export default DoubleCard;

const styles = StyleSheet.create({
  doubleCardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  doubleCard: {
    width: "48%",
    overflow: "hidden",
    height:RFPercentage(40),
  },
  doubleCardImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardInfoBox: {
    borderWidth: 1,
    borderLeftColor: "white",
    borderRightColor: "white",
    borderBottomColor: "white",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  doubleCardTitle: {
    fontSize: 15,
    marginBottom: 6,
    fontFamily:Fonts.Medium
  },
  metaInfo: {
    fontSize: 13,
    letterSpacing: 0.5,
    fontFamily:Fonts.Medium
  },
});
