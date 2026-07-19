import React, { useEffect, useContext, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { generateWorkoutPlan } from "../../services/generateWorkoutPlan";
import { setWorkoutPlan } from "../../redux/Actions";
import { UserContext } from "../../utils/userContext";
import { Colors, Fonts } from "../../constants/theme";

const WorkoutGenerating = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const createWorkoutPlan = async () => {
      const user = auth().currentUser;
      if (!user) {
        Toast.show({ type: "error", text1: "Error", text2: "User not logged in" });
        return;
      }

      // Guard: ensure userData is loaded before calling AI
      if (!userData || !userData.fullName) {
        Toast.show({ type: "error", text1: "Error", text2: "User profile not loaded. Please go back and try again." });
        setLoading(false);
        return;
      }

      try {
        const uid = user.uid;
        const weekStart = new Date();
        weekStart.setHours(0, 0, 0, 0);

        const workoutPlan = await generateWorkoutPlan(userData);

        // Save to Firestore
        await firestore()
          .collection("workouts")
          .doc(uid)
          .set({
            weekStart: firestore.Timestamp.fromDate(weekStart),
            plan: workoutPlan,
            createdAt: firestore.FieldValue.serverTimestamp(),
          });

        // Also hydrate Redux immediately so Home screen has it without a refetch
        dispatch(setWorkoutPlan(workoutPlan));

        Toast.show({ type: "success", text1: "Workout Plan Ready", text2: "Redirecting..." });
        navigation.reset({
          index: 0,
          routes: [{ name: "Tabs" }],
        });
      } catch (error) {
        console.error("Workout generation failed:", error);
        Toast.show({ type: "error", text1: "Generation Failed", text2: error.message || "Could not generate plan. Please try again." });
      } finally {
        setLoading(false);
      }
    };

    createWorkoutPlan();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Creating your personalized workout plan...</Text>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

export default WorkoutGenerating;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: Colors.background,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 20,
    color: "white",
    fontFamily: Fonts.Montserrat_SemiBold,
  },
});
