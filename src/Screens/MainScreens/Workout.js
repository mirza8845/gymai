// Aesthetic Workout Progress Screen with Scrollable Day Selector & Circular Stats

import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RFPercentage } from "react-native-responsive-fontsize";
import CircularProgress from "react-native-circular-progress-indicator";

import WorkoutCard from "../../CommonComponent/WorkoutCard";
import TipCard from "./TipCard";
import { Fonts } from "../../constants/theme";

const dummyStats = [
  {
    day: "Mon",
    calories: 320,
    steps: 5000,
    heartRate: 89,
    duration: "45m",
  },
  {
    day: "Tue",
    calories: 420,
    steps: 6200,
    heartRate: 95,
    duration: "50m",
  },
  {
    day: "Wed",
    calories: 280,
    steps: 4200,
    heartRate: 87,
    duration: "30m",
  },
];

const Workout = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const workoutPlan = useSelector((state) => state.workout.workoutPlan);
  const loading = workoutPlan === null;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedStats = dummyStats[selectedIndex];

  const renderRoutineCards = () =>
    workoutPlan.weekly_split.map((dayLabel, idx) => {
      const dayKey = `Day ${idx + 1}`;
      const isRestDay = dayLabel.toLowerCase().includes("rest");
      const exercises = workoutPlan.daily_workouts?.[dayKey] ?? [];
      const description = isRestDay
        ? "Take full rest and allow your muscles to recover."
        : exercises.map((e) => e.name).slice(0, 3).join(", ") + (exercises.length > 3 ? "..." : "");

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

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FFDD03" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={[styles.header, { backgroundColor: colors.card, color: "black" }]}>Track My Progress</Text>

          <FlatList
            horizontal
            data={dummyStats}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => setSelectedIndex(index)}
                style={[styles.dayChip, selectedIndex === index && styles.activeDayChip]}
              >
                <Text style={{ color: selectedIndex === index ? "#000" : "#fff" }}>{item.day}</Text>
              </Pressable>
            )}
            contentContainerStyle={{ marginBottom: 20 }}
            showsHorizontalScrollIndicator={false}
          />

         <View style={styles.statSection}>
  {/* Calories Bar on Top */}
  <View style={styles.centerAlign}>
    <CircularProgress
      value={selectedStats.calories}
      radius={70}
      maxValue={500}
      title="Calories"
      activeStrokeColor="#F34E3A"
      inActiveStrokeColor="#333"
      titleColor="#fff"
      titleStyle={{ fontFamily: Fonts.Medium, fontSize: 14 }}
      valueSuffix=" kcal"
      valueStyle={{ color: '#fff', fontSize: 16 }}
    />
  </View>

  {/* Other Stats Below */}
  <View style={styles.rowWrap}>
    <CircularProgress
      value={selectedStats.steps}
      radius={50}
      maxValue={10000}
      title="Steps"
      activeStrokeColor="#FF9800"
      inActiveStrokeColor="#333"
      titleColor="#fff"
      titleStyle={{ fontFamily: Fonts.Medium, fontSize: 12 }}
      valueSuffix=""
      valueStyle={{ color: '#fff', fontSize: 14 }}
    />
    <CircularProgress
      value={selectedStats.heartRate}
      radius={50}
      maxValue={150}
      title="Heart"
      activeStrokeColor="#E91E63"
      inActiveStrokeColor="#333"
      titleColor="#fff"
      titleStyle={{ fontFamily: Fonts.Medium, fontSize: 12 }}
      valueSuffix=" bpm"
      valueStyle={{ color: '#fff', fontSize: 14 }}
    />
    <CircularProgress
      value={parseInt(selectedStats.duration)}
      radius={50}
      maxValue={60}
      title="Duration"
      activeStrokeColor="#3F51B5"
      inActiveStrokeColor="#333"
      titleColor="#fff"
      titleStyle={{ fontFamily: Fonts.Medium, fontSize: 12 }}
      valueSuffix=" min"
      valueStyle={{ color: '#fff', fontSize: 14 }}
    />
  </View>
</View>


          <Text style={[styles.tipsTitle, { color: colors.text }]}>Tips & Tricks</Text>
          <TipCard color="#DDFF94">{workoutPlan.notes}</TipCard>

          <Text style={[styles.tipsTitle, { color: colors.text }]}>My Routines</Text>
          {renderRoutineCards()}
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
  statSection: {
  alignItems: "center",
  marginBottom: 30,
},
centerAlign: {
  alignItems: "center",
  marginBottom: 25,
},
rowWrap: {
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
  paddingHorizontal: 10,
},

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tipsTitle: {
    fontSize: 25,
    paddingTop: 30,
    paddingBottom: 10,
    fontFamily: Fonts.SemiBold,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  statText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: Fonts.Medium,
    marginBottom: 10,
  },
  dayChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#1C1C1E",
    marginRight: 10,
  },
  activeDayChip: {
    backgroundColor: "#FFDD03",
  },
});
