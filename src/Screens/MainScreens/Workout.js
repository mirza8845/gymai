import React from "react";
import { View, Text, Pressable, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import WorkoutCard from "../../CommonComponent/WorkoutCard";
import TipCard from "./TipCard";
import { Fonts } from "../../constants/theme";

const Workout = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const workoutPlan = useSelector((state) => state.workout.workoutPlan);
  const loading = workoutPlan === null;

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FFDD03" />
      </View>
    );
  }

  if (!workoutPlan) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: colors.text }}>Workout plan not found.</Text>
      </View>
    );
  }

  const renderRoutineCards = () =>
    workoutPlan.weekly_split.map((dayLabel, idx) => {
      const dayKey = `Day ${idx + 1}`;
      const isRestDay = dayLabel.toLowerCase().includes("rest");
      const exercises = workoutPlan.daily_workouts?.[dayKey] ?? [];

      const description = isRestDay
        ? "Take full rest and allow your muscles to recover."
        : exercises
            .slice(0, 3)
            .map((e) => e.name)
            .join(", ") + (exercises.length > 3 ? "..." : "");

      return (
        <WorkoutCard
          key={dayKey}
          title={dayLabel}
          description={description}
          button={!isRestDay ? "Start now" : null}
          onPress={
            !isRestDay
              ? () =>
                  navigation.navigate("PullPushDay", {
                    day: dayKey,
                    label: dayLabel,
                    exercises,
                  })
              : undefined
          }
        />
      );
    });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={[styles.header, { backgroundColor: colors.card, color: "black" }]}>Track My Progress</Text>

          <Pressable onPress={() => navigation.navigate("StartWorkoutScreen")}>
            <Text style={[styles.startWorkoutButton, { color: colors.text }]}>+ Start New Workout</Text>
          </Pressable>

          <View style={styles.routineHeader}>
            <Text style={[styles.routineTitle, { color: colors.text }]}>My Routines</Text>
            <Pressable onPress={() => navigation.navigate("AddRoutineScreen")}>
              <Text style={[styles.addRoutine, { color: colors.text }]}>+ Add new routine</Text>
            </Pressable>
          </View>

          {renderRoutineCards()}

          <Text style={[styles.tipsTitle, { color: colors.text }]}>Tips & Tricks</Text>

          <TipCard color="#DDFF94">{workoutPlan.notes}</TipCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Workout;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 30, paddingVertical: 30 },
  header: {
    fontSize: 20,
    margin: 10,
    padding: 10,
    textAlign: "center",
    borderRadius: 30,
    fontFamily: Fonts.SemiBold,
  },
  startWorkoutButton: {
    fontSize: 20,
    letterSpacing: 2,
    paddingBottom: 30,
    paddingTop: 10,
    fontFamily: Fonts.SemiBold,
  },
  routineHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  routineTitle: { fontSize: 17, fontFamily: Fonts.Medium },
  addRoutine: { fontSize: 17, fontFamily: Fonts.Medium },
  tipsTitle: {
    fontSize: 25,
    paddingTop: 30,
    paddingBottom: 10,
    fontFamily: Fonts.SemiBold,
  },
});
