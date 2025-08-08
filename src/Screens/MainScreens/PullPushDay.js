import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView, Image } from "react-native";
import { useTheme, useRoute, useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RFPercentage } from "react-native-responsive-fontsize";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";
import { Colors, Fonts } from "../../constants/theme";
import LinearGradient from "react-native-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { setWorkoutPlan } from "../../redux/Actions";

const PullPushDay = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { day, label, exercises } = route.params;
  const dispatch = useDispatch();
  const workoutPlan = useSelector((state) => state.workout.workoutPlan);

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

      // Update Redux
      const updatedPlan = {
        ...workoutPlan,
        daily_workouts: {
          ...workoutPlan.daily_workouts,
          [day]: updatedExercises,
        },
      };
      dispatch(setWorkoutPlan(updatedPlan));

      Toast.show({
        type: "success",
        text1: "Exercise removed",
        text2: "Exercise removed successfully!",
      });
    } catch (error) {
      console.error("Error removing exercise:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
    }
  };

  const handleFinishWorkout = async () => {
    try {
      const uid = auth().currentUser.uid;
      const docRef = firestore().collection("workouts").doc(uid);
      const doc = await docRef.get();
      if (!doc.exists) throw new Error("Workout plan not found");

      const currentPlan = doc.data().plan;
      const dayNumber = parseInt(day.split(" ")[1]);

      const updatedSplit = currentPlan.weekly_split.filter((_, index) => index + 1 !== dayNumber);

      const updates = {
        [`plan.daily_workouts.${day}`]: firestore.FieldValue.delete(),
        "plan.weekly_split": updatedSplit,
      };

      await docRef.update(updates);

      // Update Redux
      const { [day]: removed, ...restWorkouts } = workoutPlan.daily_workouts;
      const updatedPlan = {
        ...workoutPlan,
        daily_workouts: restWorkouts,
        weekly_split: updatedSplit,
      };
      dispatch(setWorkoutPlan(updatedPlan));

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
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: "absolute", left: 0 }}>
            <AntDesign name="arrowleft" color="#fff" size={RFPercentage(3)} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{label || day}</Text>
          <View style={{ width: RFPercentage(3) }} />
        </View>

        {/* Exercises */}
        {exercises?.length > 0 ? (
          exercises.map((exercise, index) => (
            <LinearGradient key={index} colors={["rgba(58, 52, 43, 0.6)", "rgba(55, 47, 36, 0.2)"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.exerciseCard}>
              {/* Exercise Image */}
              <Image source={require("../../assets/images/pul-up.jpg")} style={styles.exerciseImage} resizeMode="cover" />
              {/* {exercise.imageUrl ? (
                <Image
                  source={{ uri: exercise.imageUrl }}
                  style={styles.exerciseImage}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Text style={{ color: "#aaa", fontSize: 12 }}>No Image</Text>
                </View>
              )} */}

              {/* Text & Tap */}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("WorkoutDetails", {
                    exercise,
                    day,
                  })
                }
                style={styles.exerciseContent}
              >
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseSubText}>Tap for details</Text>
              </TouchableOpacity>

              {/* Remove */}
              <TouchableOpacity onPress={() => handleRemoveExercise(index)} style={styles.removeBtn}>
                <AntDesign name="delete" size={20} color="#fff" />
              </TouchableOpacity>
            </LinearGradient>
          ))
        ) : (
          <View style={styles.noDataContainer}>
            <AntDesign name="frowno" size={40} color="gray" />
            <Text style={styles.noDataText}>No exercises for this day</Text>
            <Text style={styles.suggestionText}>Try adding some to get started</Text>
          </View>
        )}

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: Colors.primary }]} onPress={() => navigation.navigate("AddExercise", { day })}>
            <Text style={styles.btnText}>+ Add Exercise</Text>
          </TouchableOpacity>

          {exercises?.length > 0 && (
            <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: "#333", marginHorizontal: 14 }]} onPress={handleFinishWorkout}>
              <Text style={styles.btnText}>Finish</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PullPushDay;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    paddingTop: RFPercentage(8),
    paddingBottom: RFPercentage(10),
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    width: "100%",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontFamily: Fonts.Montserrat_SemiBold,
  },
  exerciseCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1C1C1E",
    // padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    height: 90,
  },
  exerciseImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginRight: 12,
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  exerciseContent: {
    flex: 1,
  },
  exerciseName: {
    color: "#fff",
    fontSize: 16,
    fontFamily: Fonts.Montserrat_Medium,
  },
  exerciseSubText: {
    color: "gray",
    fontSize: 14,
    marginTop: 4,
    fontFamily: Fonts.Montserrat_Regular,
  },
  removeBtn: {
    backgroundColor: "#333",
    padding: 8,
    borderRadius: 50,
    right: 15,
  },
  noDataContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  noDataText: {
    fontSize: 18,
    color: "gray",
    marginTop: 15,
    fontFamily: Fonts.Montserrat_Medium,
  },
  suggestionText: {
    color: "#777",
    fontSize: 14,
    marginTop: 5,
    fontFamily: Fonts.Montserrat_Regular,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
    width: "85%",
  },
  primaryBtn: {
    borderRadius: RFPercentage(100),
    alignItems: "center",
    width: RFPercentage(19),
    height: RFPercentage(5.6),
    justifyContent: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 15,
    fontFamily: Fonts.Montserrat_Medium,
  },
});
