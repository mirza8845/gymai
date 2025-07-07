import React, { useEffect, useContext, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";
import { generateWorkoutPlan } from "../../services/generateWorkoutPlan";
import { UserContext } from "../../utils/userContext";
import { Colors, Fonts } from "../../constants/theme";

const WorkoutGenerating = () => {
  const navigation = useNavigation();
  const { userData } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const createWorkoutPlan = async () => {
      const user = auth().currentUser;
      if (!user) {
        Toast.show({ type: "error", text1: "Error", text2: "User not logged in" });
        return;
      }

      try {
        const uid = user.uid;
        const weekStart = new Date();
        weekStart.setHours(0, 0, 0, 0);

        const workoutPlan = await generateWorkoutPlan(userData);

        await firestore()
          .collection("workouts")
          .doc(uid)
          .set({
            weekStart: firestore.Timestamp.fromDate(weekStart),
            plan: workoutPlan,
            createdAt: firestore.FieldValue.serverTimestamp(),
          });

        Toast.show({ type: "success", text1: "Workout Plan Ready", text2: "Redirecting..." });
        navigation.navigate("Tabs");
      } catch (error) {
        console.error("Workout generation failed:", error);
        Toast.show({ type: "error", text1: "Error", text2: "Could not generate plan" });
      } finally {
        setLoading(false);
      }
    };

    createWorkoutPlan();
  }, []);

  return (
    <View style={styles.container}>
      {/* <Image source={loadingGif} style={styles.image} resizeMode="contain" /> */}
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
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});
