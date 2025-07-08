import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList, ActivityIndicator } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

import { UserContext } from "../../utils/userContext";
import { setWorkoutPlan } from "../../redux/Actions";
import WorkoutCard from "../../CommonComponent/WorkoutCard";
import DoubleCard from "../../CommonComponent/DoubleCard";

import gymImg from "../../assets/images/gym.png";
import WomenGym from "../../assets/images/womangym.png";
import MenGym from "../../assets/images/mengym.png";
import { Colors, Fonts } from "../../constants/theme";

import { useFocusEffect } from "@react-navigation/native";
import { RFPercentage } from "react-native-responsive-fontsize";

const data = [
  {
    leftItem: {
      image: WomenGym,
      title: "When Should I Stretch?",
      duration: "5 Minutes",
    },
    rightItem: {
      image: MenGym,
      title: "Split squats vs lunges",
      duration: "3 Minutes",
    },
  },
];

const Home = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { userData } = useContext(UserContext);
  const { fullName, weeklyWorkoutCommitment } = userData || {};

  const workoutPlan = useSelector((state) => state.workout.workoutPlan);
  const [loading, setLoading] = useState(true);

  const fetchWorkoutPlan = useCallback(async () => {
    try {
      setLoading(true);
      const user = auth().currentUser;
      if (!user) return;

      const doc = await firestore().collection("workouts").doc(user.uid).get();

      if (doc.exists) {
        const planInDb = doc.data().plan;
        dispatch(setWorkoutPlan(planInDb));
      } else {
        console.log("No workout plan found in DB");
      }
    } catch (err) {
      console.log("Workout plan fetch error:", err.message);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      fetchWorkoutPlan();
    }, [fetchWorkoutPlan])
  );

  const { workoutDayKey, firstDayExercises, firstWorkoutDay } = useMemo(() => {
    const firstDay = workoutPlan?.weekly_split?.find((day) => !day.toLowerCase().includes("rest"));
    const key = firstDay?.split(":")[0]?.trim();
    return {
      workoutDayKey: key,
      firstWorkoutDay: firstDay,
      firstDayExercises: workoutPlan?.daily_workouts?.[key],
    };
  }, [workoutPlan]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.safeArea, { backgroundColor: Colors.background }]}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View>
              <Text style={styles.greetingText}>Hi, {fullName}</Text>
              <Text style={styles.subGreeting}>Welcome back! Let's hit your goals 💥</Text>
            </View>
            <Image
              source={require("../../assets/images/noDp.png")}
              resizeMode="contain"
              style={{ width: RFPercentage(7), height: RFPercentage(7), borderWidth: 1.5, borderColor: Colors.primary, borderRadius: 100 }}
            />
          </View>

          {loading ? (
            <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 30 }} />
          ) : workoutPlan?.weekly_split ? (
            <>
              <View style={styles.planCard}>
                <Text style={styles.planTitle}>Your {weeklyWorkoutCommitment}-Day Plan</Text>
                <Text style={styles.planSubtitle}>{workoutPlan.weekly_split.join(" • ")}</Text>

                <TouchableOpacity style={styles.planButton} onPress={() => navigation.navigate("MyPlan")}>
                  <Text style={styles.planButtonText}>View Plan</Text>
                </TouchableOpacity>
              </View>
              <View style={{ width: "100%" }}>
                <Text style={styles.sectionTitle}>Today's Workout</Text>
              </View>

              {firstDayExercises ? (
                <WorkoutCard
                  title={firstWorkoutDay?.split(":")[1]?.trim() || "Workout"}
                  description={
                    firstDayExercises
                      .map((ex) => ex.name)
                      .slice(0, 2)
                      .join(", ") + "..."
                  }
                  button="Start now"
                  onPress={() =>
                    navigation.navigate("WorkoutDetails", {
                      day: workoutDayKey,
                      exercises: firstDayExercises,
                    })
                  }
                />
              ) : (
                <Text style={styles.restText}>Rest day or workout not available.</Text>
              )}

              <View style={{ width: "100%" }}>
                <Text style={styles.sectionTitle}>Quick Reads</Text>
                <FlatList data={data} keyExtractor={(item, index) => index.toString()} horizontal renderItem={({ item }) => <DoubleCard {...item} />} showsHorizontalScrollIndicator={false} />
              </View>
            </>
          ) : (
            <Text style={styles.descriptionText}>You have no saved workout plan. Finish your profile and generate a plan first.</Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollContainer: {
    width: "90%",
    alignSelf: "center",
    paddingVertical: 50,
    alignItems: "center",
  },
  header: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  greetingText: {
    color: Colors.primary,
    fontSize: 24,
    fontFamily: Fonts.Montserrat_SemiBold,
  },
  subGreeting: {
    color: "#777",
    fontSize: 14,
    fontFamily: Fonts.Montserrat_Regular,
    marginTop: 4,
  },
  planCard: {
    backgroundColor: "#080808",
    padding: 20,
    borderRadius: 16,
    marginVertical: 10,
    elevation: 3,
  },
  planTitle: {
    color: "#fff",
    fontSize: 18,
    fontFamily: Fonts.Montserrat_SemiBold,
  },
  planSubtitle: {
    color: "#ccc",
    fontSize: 14,
    marginVertical: 10,
    fontFamily: Fonts.Montserrat_Regular,
    lineHeight: 20,
  },
  planButton: {
    backgroundColor: "transparent",
    paddingVertical: 8,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    width: RFPercentage(18),
    alignSelf: "center",
  },
  planButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontFamily: Fonts.Montserrat_SemiBold,
  },
  sectionTitle: {
    fontSize: 20,
    color: Colors.white,
    marginTop: 20,
    fontFamily: Fonts.Montserrat_SemiBold,
  },
  descriptionText: {
    fontSize: 16,
    color: "#666",
    fontFamily: Fonts.Montserrat_Regular,
    marginTop: 10,
  },
  restText: {
    fontSize: 16,
    color: "#999",
    fontFamily: Fonts.Montserrat_Regular,
    marginTop: 10,
  },
});
