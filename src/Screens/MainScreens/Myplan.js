import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import WorkoutCard from "../../CommonComponent/WorkoutCard";
import CommonDropdown from "../../CommonComponent/CommonDropdown";
import { Fonts } from "../../constants/theme";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RFPercentage } from "react-native-responsive-fontsize";

const Myplan = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const workoutPlan = useSelector((state) => state.workout.workoutPlan);
  const loading = useSelector((state) => state.workout.loading);

  const renderWorkoutCards = () => {
    if (!workoutPlan?.weekly_split || !workoutPlan?.daily_workouts) return null;

    return workoutPlan.weekly_split.map((dayLabel, index) => {
      const dayKey = `Day ${index + 1}`;

      if (dayLabel.toLowerCase().includes("rest")) {
        return <WorkoutCard key={dayKey} title={dayLabel} description="Rest and recovery day" buttons={[]} />;
      }

      const exercises = workoutPlan.daily_workouts[dayKey];

      const description =
        exercises
          ?.slice(0, 3)
          .map((e) => e.name)
          .join(", ") + (exercises?.length > 3 ? "..." : "");

      return (
        <WorkoutCard
          key={dayKey}
          onCardPress={() =>
            navigation.navigate("PullPushDay", {
              day: dayKey,
              label: dayLabel,
              exercises,
            })
          }
          title={dayLabel}
          description={description}
          buttons={[
            {
              title: "Edit Routine",
              onPress: () => console.log("Edit"),
              backgroundColor: "#D9D9D9",
              padding: 3,
              accessibilityLabel: `Edit routine for ${dayLabel}`,
            },
            {
              title: "Save Routine",
              onPress: () => console.log("Save"),
              backgroundColor: "#DDFF94",
              padding: 3,
              accessibilityLabel: `Save routine for ${dayLabel}`,
            },
          ]}
        />
      );
    });
  };

  if (loading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea}>
          <ActivityIndicator size="large" color="#FFDD03" style={{ marginTop: 100 }} />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  if (!workoutPlan?.weekly_split || !workoutPlan?.daily_workouts) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: "absolute", left: 10, top: RFPercentage(-4) }}>
              <AntDesign name="arrowleft" color={"white"} size={RFPercentage(4)} />
            </TouchableOpacity>
            <Text style={[styles.headerText, { color: colors.text, textAlign: "center", marginTop: RFPercentage(3) }]}>Workout plan is unavailable. Please regenerate.</Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <View>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: "absolute", left: 10, top: RFPercentage(-4) }}>
              <AntDesign name="arrowleft" color={"white"} size={RFPercentage(4)} />
            </TouchableOpacity>
            <Text style={[styles.headerText, { color: colors.text, textAlign: "center", marginTop: RFPercentage(3) }]}>Here is your custom workout plan.</Text>
          </View>

          {renderWorkoutCards()}

          <View style={styles.dropdownSection}>
            {workoutPlan?.warmup?.length > 0 && <CommonDropdown text="Warm-up" data={workoutPlan.warmup} />}

            {workoutPlan?.cooldown?.length > 0 && <CommonDropdown text="Cool-down" data={workoutPlan.cooldown} />}

            <CommonDropdown text="Workout Guidelines" data={[workoutPlan?.notes || "No guidelines provided."]} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Myplan;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  headerText: {
    fontSize: 17,
    fontFamily: Fonts.SemiBold,
    marginBottom: 15,
  },
  dropdownSection: {
    paddingTop: 20,
  },
});
