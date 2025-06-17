import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import gymImg from "../../assets/images/womantrainingworkoutgym.png";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation, useTheme } from "@react-navigation/native";
import Button from "../../CommonComponent/Button";
import { Fonts } from "../../constants/theme";
import img3 from "../../assets/images/img3.jpg";
import { RFPercentage } from "react-native-responsive-fontsize";

const IntroQuestionnaire = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <View style={[styles.screenContainer, { backgroundColor: colors.background }]}>
      <Image source={img3} style={styles.headerImage} />

      <View style={styles.contentWrapper}>
        <View style={styles.metaInfoRow}>
          <Text style={[styles.metaText, { color: colors.text }]}>12 Questions</Text>
          <Text style={[styles.metaText, { color: colors.text }]}>
            <Icon name="clockcircleo" size={20} color={colors.text} /> 3 Minutes
          </Text>
        </View>

        <Text style={[styles.primaryMessage, { color: colors.text }]}>You can skip any questions along the way.</Text>
        <Text style={[styles.secondaryMessage, { color: colors.text }]}>The more you answer, the more personalised your results will be!</Text>
        <View style={{marginTop:RFPercentage(4)}}>
          <Button title="Next" onPress={() => navigation.navigate("genderQuestionnaire")} />
        </View>
      </View>
    </View>
  );
};

export default IntroQuestionnaire;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  headerImage: {
    width: "100%",
    height: "60%",
    resizeMode: "contain",
  },
  contentWrapper: {
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  metaInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metaText: {
    fontSize: 16,
    // fontWeight:500,
    letterSpacing: 0.5,
    fontFamily: Fonts.Medium,
  },
  primaryMessage: {
    fontSize: RFPercentage(2.3),
    // fontWeight: 500,
    paddingVertical: 30,
    fontFamily: Fonts.Medium,
  },
  secondaryMessage: {
    fontSize: RFPercentage(2.3),
    // fontWeight:500,
    fontFamily: Fonts.Medium,
  },
});
