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
import { Fonts } from "../../constants/theme";

import { useFocusEffect } from "@react-navigation/native";

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
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.greetingText}>Hi, {fullName}</Text>

          {loading ? (
            <ActivityIndicator size="large" color="#FFDD03" style={{ marginTop: 30 }} />
          ) : workoutPlan?.weekly_split ? (
            <>
              <Text style={[styles.descriptionText, { color: colors.text }]}>
                {`Your Personalized ${weeklyWorkoutCommitment}-Day Workout Plan is Ready! You'll follow a weekly routine including: ${workoutPlan?.weekly_split?.join(
                  ", "
                )}. Discover your exercises, warm‑up tips, and cool‑down steps to train smarter!`}
              </Text>

              <TouchableOpacity style={styles.planButton} onPress={() => navigation.navigate("MyPlan")}>
                <Text style={styles.planButtonText}>My Plan</Text>
              </TouchableOpacity>

              <Text style={styles.sectionTitle}>Next Workout</Text>

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
                <Text style={{ color: colors.text }}>Rest day or workout not available.</Text>
              )}
            </>
          ) : (
            <>
              <Text style={[styles.descriptionText, { color: colors.text }]}>You have no saved workout plan. Finish your profile and generate a plan first.</Text>
            </>
          )}

          {/* Discover Section */}
          <Text style={styles.sectionTitle}>Discover</Text>

          <View style={styles.imageCardContainer}>
            <View style={styles.textBlock}>
              <Text style={styles.cardTitle}>Myth Busters</Text>
              <Text style={{ color: "black", fontFamily: Fonts.Regular }}>Popular fitness myths debunked!</Text>
            </View>
            <Image source={gymImg} style={styles.cardImage} resizeMode="contain" />
          </View>

          <FlatList
            data={data}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => <DoubleCard leftItem={item.leftItem} rightItem={item.rightItem} />}
            contentContainerStyle={{ paddingBottom: 40 }}
          />

          <TouchableOpacity style={styles.seeMoreBtn}>
            <Text style={styles.seeMoreBtnText}>See More</Text>
          </TouchableOpacity>
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
    paddingVertical: 40,
    paddingBottom: 80,
  },
  greetingText: {
    color: "#FFDD03",
    fontSize: 24,
    marginBottom: 20,
    fontFamily: Fonts.SemiBold,
  },
  descriptionText: {
    fontSize: 17,
    lineHeight: 23,
    letterSpacing: 1,
    fontFamily: Fonts.Regular,
  },
  planButton: {
    width: "40%",
    height: 45,
    borderRadius: 25,
    backgroundColor: "#FFDD03",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    alignSelf: "center",
  },
  planButtonText: {
    fontSize: 18,
    color: "black",
    fontFamily: Fonts.SemiBold,
    top: 2,
  },
  sectionTitle: {
    fontSize: 20,
    color: "#ffffff",
    marginTop: 30,
    marginBottom: 10,
    fontFamily: Fonts.SemiBold,
  },
  imageCardContainer: {
    height: 130,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
    paddingHorizontal: 15,
  },
  textBlock: { width: "50%" },
  cardTitle: { fontSize: 18, color: "#000", fontFamily: Fonts.SemiBold },
  cardImage: { width: 180, height: 180 },
  seeMoreBtn: {
    width: "35%",
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffff",
    borderWidth: 1,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    marginTop: 20,
  },
  seeMoreBtnText: { fontSize: 18, color: "black", fontFamily: Fonts.SemiBold },
});
