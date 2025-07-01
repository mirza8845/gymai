import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useTheme, useRoute } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Fonts } from "../../constants/theme";
import menGym from "../../assets/images/benchPress.png";

const WorkoutDetails = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { exercise, day } = route.params;

  const renderBulletList = (title, list = []) => {
    if (!list.length) return null;
    return (
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{title}</Text>
        {list.map((item, index) => (
          <Text key={index} style={[styles.bulletItem, { color: colors.text }]}>
            • {item}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <AntDesign name="arrowleft" size={RFPercentage(4)} color={colors.text} />
        </TouchableOpacity>

        <Text style={[styles.title, { color: colors.text }]}>{exercise?.name || "Exercise"}</Text>

        <View style={styles.dateContainer}>
          <AntDesign name="clockcircle" size={17} color={colors.text} />
          <Text style={styles.dateText}>{day || "Training Day"}</Text>
        </View>

        <Image source={menGym} style={styles.image} resizeMode="cover" />

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Reps & Sets</Text>
          <Text style={[styles.text, { color: colors.text }]}>
            {exercise?.sets || 3} Sets • {exercise?.reps || "10-12"} Reps
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Equipment</Text>
          <Text style={[styles.text, { color: colors.text }]}>{exercise?.equipment || "Bodyweight"}</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Muscles Targeted</Text>
          <Text style={[styles.text, { color: colors.text }]}>
            {exercise?.muscles_targeted?.join(", ") || "Full Body"}
          </Text>
        </View>

        {renderBulletList("Proper Form", exercise?.proper_form)}
        {renderBulletList("Tips & Tricks", exercise?.tips_and_tricks)}
        {renderBulletList("Common Mistakes", exercise?.common_mistakes)}
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkoutDetails;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollContainer: {
    padding: 26,
    paddingBottom: 40,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 10,
  },
  title: {
    fontSize: 25,
    fontFamily: Fonts.SemiBold,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginBottom: 20,
  },
  dateText: {
    fontSize: 14,
    color: "grey",
    fontFamily: Fonts.Regular,
  },
  image: {
    height: 200,
    width: "100%",
    borderRadius: 10,
    marginBottom: 30,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: Fonts.SemiBold,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    fontFamily: Fonts.Regular,
  },
  bulletItem: {
    fontSize: 15,
    fontFamily: Fonts.Regular,
    marginBottom: 6,
  },
});
