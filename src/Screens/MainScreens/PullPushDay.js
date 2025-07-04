import React from "react";
import { View, Text, ScrollView, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme, useRoute, useNavigation } from "@react-navigation/native";
import menGym from "../../assets/images/man-gym.png";
import ExerciseBox from "../../CommonComponent/ExerciseBox";
import { Fonts } from "../../constants/theme";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RFPercentage } from "react-native-responsive-fontsize";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";

const PullPushDay = () => {
  const { colors } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { day, label, exercises } = route.params;

  const handleRemoveExercise = async (indexToRemove) => {
    try {
      const uid = auth().currentUser.uid;
      const docRef = firestore().collection("workouts").doc(uid);
      const doc = await docRef.get();
      if (!doc.exists) throw new Error("Workout plan not found");
      const currentPlan = doc.data().plan;
      const currentExercises = currentPlan.daily_workouts?.[day];
      if (!currentExercises) throw new Error("No exercises found for this day");
      const updatedExercises = currentExercises.filter((_, idx) => idx !== indexToRemove);
      await docRef.update({
        [`plan.daily_workouts.${day}`]: updatedExercises,
      });

      Toast.show({
        type: "success",
        text1 : 'Exercise remove',
        text2: "Exercise removed successfully!",
      });
      // navigation.goBack();
    } catch (error) {
      console.error("Error removing exercise:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} accessibilityLabel="Go back">
            <AntDesign name="arrowleft" color={"white"} size={RFPercentage(4)} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>{label || day}</Text>
          <View style={{ width: RFPercentage(4) }} />
        </View>

        {exercises?.length > 0 ? (
          exercises.map((exercise, index) => (
            <ExerciseBox
              key={exercise.name || index}
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
                  exercise,
                  day,
                })
              }
              onRemove={() => handleRemoveExercise(index)}
            />
          ))
        ) : (
          <Text style={[styles.noDataText, { color: colors.text }]}>No exercises for this day.</Text>
        )}

        <View style={styles.buttonRow}>
          <Pressable style={styles.addSetButton} onPress={() => navigation.navigate("AddExercise", { day })} accessibilityLabel="Add a new exercise">
            <Text style={styles.addSetText}>+ Add Exercise</Text>
          </Pressable>
          <Pressable
            style={styles.addSetButton}
            onPress={async () => {
              try {
                const uid = auth().currentUser.uid;
                const docRef = firestore().collection("workouts").doc(uid);
                const doc = await docRef.get();

                if (!doc.exists) throw new Error("Workout plan not found");

                const currentPlan = doc.data().plan;
                const updatedSplit = currentPlan.weekly_split.filter((item, index) => {
                  const currentDayKey = `Day ${index + 1}`;
                  return currentDayKey !== day;
                });

                const updates = {
                  [`plan.daily_workouts.${day}`]: firestore.FieldValue.delete(),
                  "plan.weekly_split": updatedSplit,
                };

                await docRef.update(updates);

                Toast.show({
                  type: "success",
                  text1: `${label || day} workout`,
                  text2: "Workout marked as completed!",
                });

                navigation.goBack();
              } catch (error) {
                console.error("Failed to mark workout as complete:", error);
                Toast.show({
                  type: "error",
                  text1: "Error removing workout",
                  text2: error.message,
                });
              }
            }}
            accessibilityLabel="Finish workout"
          >
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
    fontSize: 16,
    fontFamily: Fonts.Regular,
    textAlign: "center",
    marginTop: 40,
  },
});
