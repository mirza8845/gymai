import React from "react";
import { View, Text, ScrollView, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme, useRoute, useNavigation } from "@react-navigation/native";
import menGym from "../../assets/images/man-gym.png";
import ExerciseBox from "../../CommonComponent/ExerciseBox";
import { Fonts } from "../../constants/theme";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RFPercentage } from "react-native-responsive-fontsize";

const PullPushDay = () => {
  const { colors } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { day, exercises } = route.params;

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" color={"white"} size={RFPercentage(4)} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>{day}</Text>
          <View style={{ width: RFPercentage(4) }} /> {/* Spacer for symmetry */}
        </View>

        {exercises?.length > 0 ? (
          exercises.map((exercise, index) => (
            <ExerciseBox
              key={index}
              title={exercise.name}
              tableHead={["Set", "Previous", "KG", "Reps"]}
              tableTitle={["1", "2"]}
              tableData={[
                ["--", "--", "--"],
                ["--", "--", "--"],
              ]}
              image={menGym}
              onPress={() =>
                navigation.navigate("WorkoutDetails", {
                  exercise: exercise,
                  day: day,
                })
              }
            />
          ))
        ) : (
          <Text style={[styles.noDataText, { color: colors.text }]}>No exercises for this day.</Text>
        )}

        <View style={styles.buttonRow}>
          <Pressable style={styles.addSetButton} onPress={() => navigation.navigate("AddExercise", { day })}>
            <Text style={styles.addSetText}>+ Add Exercise</Text>
          </Pressable>
          <Pressable style={styles.addSetButton}>
            <Text style={styles.addSetText}>Finish</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PullPushDay;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    fontFamily: Fonts.SemiBold,
  },
  addSetButton: {
    paddingVertical: 10,
  },
  addSetText: {
    fontSize: 20,
    color: "white",
    fontFamily: Fonts.SemiBold,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    paddingHorizontal: 10,
  },
  noDataText: {
    fontSize: 18,
    fontFamily: Fonts.Regular,
    textAlign: "center",
    marginTop: 40,
  },
});
