import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import LinearGradient from "react-native-linear-gradient";
import CommonDropdown from "../../CommonComponent/CommonDropdown";
import { Colors, Fonts } from "../../constants/theme";
import { RFPercentage } from "react-native-responsive-fontsize";

const darkColors = {
  background: "#000000",
  primary: "#F34E3A",
  primaryLight: "#F17C3B",
  surface: "#000000",
  surfaceElevated: "#1A1A1A",
  primaryDark: "#D83A28",
  textPrimary: "#FFFFFF",
  textSecondary: "#888888",
  textMuted: "#666768",
  border: "#3C3C3C",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  gradientStart: "#F34E3A",
  gradientEnd: "#FF6B4A",
};

const Myplan = () => {
  const navigation = useNavigation();
  const workoutPlan = useSelector((state) => state.workout.workoutPlan);
  const loading = useSelector((state) => state.workout.loading);

  const renderWorkoutCards = () => {
    if (!workoutPlan?.weekly_split || !workoutPlan?.daily_workouts) return null;

    return workoutPlan.weekly_split.map((dayLabel, index) => {
      const dayKey = dayLabel.split(":")[0]?.trim() || `Day ${index + 1}`;
      const exercises = workoutPlan.daily_workouts[dayKey] || [];
      const isRest = dayLabel.toLowerCase().includes("rest");

      const exerciseNames = exercises
        .slice(0, 3)
        .map((e) => e.name)
        .join(", ");

      const description = exerciseNames + (exercises.length > 3 ? "..." : "");

      return (
        <LinearGradient
          key={dayKey}
          colors={["#1C1C1E", "#2C2C2E"]}
          style={styles.glassCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.cardHeader}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <MaterialCommunityIcons
                name={isRest ? "bed" : "dumbbell"}
                color={isRest ? "#fff" : darkColors.primary}
                size={20}
              />
              <Text style={styles.cardTitle}>{dayLabel}</Text>
            </View>

            {!isRest && exercises.length > 0 && (
              <TouchableOpacity
                style={styles.editButton}
                onPress={() =>
                  navigation.navigate("EditRoutineScreen", {
                    dayKey,
                    dayLabel,
                    exercises,
                  })
                }
              >
                <Text style={styles.editBtnText}>Edit</Text>
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.cardDesc}>
            {isRest
              ? "Rest and recovery day"
              : description || "No exercises scheduled"}
          </Text>

          {!isRest && exercises.length > 0 && (
            <TouchableOpacity
              style={styles.viewBtn}
              onPress={() =>
                navigation.navigate("PullPushDay", {
                  day: dayKey,
                  label: dayLabel,
                  exercises,
                })
              }
            >
              <Text style={styles.viewBtnText}>View Workout</Text>
            </TouchableOpacity>
          )}
        </LinearGradient>
      );
    });
  };

  if (loading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea}>
          <ActivityIndicator
            size="large"
            color={darkColors.primary}
            style={{ marginTop: 100 }}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  if (!workoutPlan?.weekly_split || !workoutPlan?.daily_workouts) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <AntDesign
                name="arrowleft"
                color={"white"}
                size={RFPercentage(4)}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>
              Workout plan is unavailable. Please regenerate.
            </Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  // Prepare data for dropdowns
  const warmupData = workoutPlan?.warmup?.map(
    (w) => `${w.name} - ${w.duration} (${w.type})`,
  );
  const cooldownData = workoutPlan?.cooldown?.map(
    (c) => `${c.name} - ${c.duration} (${c.type})`,
  );

  const guidelinesData = workoutPlan?.workout_guidelines
    ? [
        `Focus: ${workoutPlan.workout_guidelines.focus}`,
        `Frequency: ${workoutPlan.workout_guidelines.frequency}`,
        `Rest between sets: ${workoutPlan.workout_guidelines.rest_between_sets}`,
        `Rest between exercises: ${workoutPlan.workout_guidelines.rest_between_exercises}`,
        `Progression: ${workoutPlan.workout_guidelines.progression}`,
        `Intensity: ${workoutPlan.workout_guidelines.intensity}`,
        `Form: ${workoutPlan.workout_guidelines.form}`,
        `Warmup: ${workoutPlan.workout_guidelines.warmup}`,
        `Cooldown: ${workoutPlan.workout_guidelines.cooldown}`,
      ]
    : [];

  const nutritionData = workoutPlan?.nutrition
    ? [
        `Daily Calories: ${workoutPlan.nutrition.daily_calories} kcal`,
        `Protein: ${workoutPlan.nutrition.protein_g}g`,
        `Carbs: ${workoutPlan.nutrition.carbs_g}g`,
        `Fat: ${workoutPlan.nutrition.fat_g}g`,
        `Focus: ${workoutPlan.nutrition.focus}`,
        `Hydration: ${workoutPlan.nutrition.hydration}`,
        `Meal Timing: ${workoutPlan.nutrition.meal_timing}`,
      ]
    : [];

  const recoveryData = workoutPlan?.recovery
    ? [
        `Rest Days: ${workoutPlan.recovery.rest_days}`,
        `Active Recovery: ${workoutPlan.recovery.active_recovery?.join(", ")}`,
        `Sleep: ${workoutPlan.recovery.sleep?.target_hours} hours`,
        ...(workoutPlan.recovery.sleep?.tips || []),
        `Hydration: ${workoutPlan.recovery.hydration?.target_liters}L daily`,
        ...(workoutPlan.recovery.hydration?.tips || []),
      ]
    : [];

  return (
    <View style={styles.safeArea}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <AntDesign name="arrowleft" color={"white"} size={RFPercentage(3)} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Your Weekly Workout Plan</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Weekly Split</Text>
        {renderWorkoutCards()}

        <Text style={[styles.sectionTitle, { marginTop: 30 }]}>
          Workout Extras
        </Text>
        <View style={styles.dropdownSection}>
          {warmupData && warmupData.length > 0 && (
            <CommonDropdown text="Warm-up" data={warmupData} />
          )}
          {cooldownData && cooldownData.length > 0 && (
            <CommonDropdown text="Cool-down" data={cooldownData} />
          )}
          {guidelinesData.length > 0 && (
            <CommonDropdown text="Workout Guidelines" data={guidelinesData} />
          )}
          {nutritionData.length > 0 && (
            <CommonDropdown text="Nutrition Goals" data={nutritionData} />
          )}
          {recoveryData.length > 0 && (
            <CommonDropdown text="Recovery & Wellness" data={recoveryData} />
          )}
        </View>

        {/* Plan Info Footer */}
        <LinearGradient
          colors={["#1C1C1E", "#2C2C2E"]}
          style={styles.footerCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.footerHeader}>
            <MaterialCommunityIcons
              name="information"
              size={20}
              color={darkColors.primary}
            />
            <Text style={styles.footerTitle}>Plan Information</Text>
          </View>
          {workoutPlan?.goal && (
            <Text style={styles.footerText}>Goal: {workoutPlan.goal}</Text>
          )}

          {workoutPlan?.generatedAt && (
            <Text style={styles.footerText}>
              Generated:{" "}
              {new Date(workoutPlan.generatedAt).toLocaleDateString()}
            </Text>
          )}
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

export default Myplan;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: darkColors.background,
  },
  container: {
    paddingBottom: 30,
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
  },
  headerWrapper: {
    marginTop: RFPercentage(9),
    alignItems: "center",
    width: "90%",
    position: "relative",
    alignSelf: "center",
  },
  backButton: {
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 1,
  },
  headerText: {
    fontSize: RFPercentage(2.2),
    fontFamily: Fonts.Montserrat_SemiBold,
    color: "#fff",
    textAlign: "center",
  },
  profileCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderColor: "#2E2E2E",
    borderWidth: 1,
  },
  profileTitle: {
    fontSize: RFPercentage(1.8),
    fontFamily: Fonts.Montserrat_SemiBold,
    color: darkColors.primary,
    marginBottom: 12,
  },
  profileGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  profileItem: {
    width: "48%",
    marginBottom: 10,
  },
  profileLabel: {
    fontSize: RFPercentage(1.4),
    fontFamily: Fonts.Montserrat_Regular,
    color: darkColors.textSecondary,
    marginBottom: 2,
  },
  profileValue: {
    fontSize: RFPercentage(1.6),
    fontFamily: Fonts.Montserrat_SemiBold,
    color: "#fff",
  },
  sectionTitle: {
    fontSize: RFPercentage(2),
    fontFamily: Fonts.Montserrat_SemiBold,
    color: "#fff",
    marginBottom: 12,
    width: "100%",
    marginTop: 10,
  },
  glassCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#000",
    borderColor: "#2E2E2E",
    borderWidth: 1,
    elevation: 4,
    width: "100%",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: RFPercentage(2.2),
    fontFamily: Fonts.Montserrat_SemiBold,
    color: "#fff",
  },
  cardDesc: {
    fontSize: RFPercentage(1.5),
    fontFamily: Fonts.Montserrat_Regular,
    color: "#ccc",
    marginTop: 8,
    marginBottom: 8,
  },
  editButton: {
    backgroundColor: darkColors.primary,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  editBtnText: {
    color: "white",
    fontSize: 12,
    fontFamily: Fonts.Montserrat_Medium,
  },
  viewBtn: {
    marginTop: 12,
    alignSelf: "flex-start",
    backgroundColor: "transparent",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: darkColors.primary,
  },
  viewBtnText: {
    fontSize: 12,
    color: darkColors.primary,
    fontFamily: Fonts.Montserrat_Bold,
  },
  exerciseCard: {
    backgroundColor: "#1A1A1C",
    borderRadius: 12,
    padding: 12,
    marginVertical: 6,
  },
  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  exerciseName: {
    fontSize: RFPercentage(1.6),
    fontFamily: Fonts.Montserrat_Medium,
    color: "#fff",
    flex: 1,
  },
  exerciseSetsReps: {
    fontSize: RFPercentage(1.4),
    fontFamily: Fonts.Montserrat_SemiBold,
    color: darkColors.primary,
    marginLeft: 8,
  },
  exerciseDetails: {
    marginTop: 4,
  },
  exerciseDetail: {
    fontSize: RFPercentage(1.3),
    fontFamily: Fonts.Montserrat_Regular,
    color: "#ccc",
    marginTop: 2,
    lineHeight: 16,
  },
  exerciseNotes: {
    fontSize: RFPercentage(1.3),
    fontFamily: Fonts.Montserrat_Regular,
    color: darkColors.warning,
    marginTop: 4,
    fontStyle: "italic",
    lineHeight: 16,
  },
  detailLabel: {
    color: darkColors.textSecondary,
    fontFamily: Fonts.Montserrat_Medium,
  },
  dropdownSection: {
    paddingBottom: 20,
    width: "100%",
  },
  footerCard: {
    borderRadius: 16,
    padding: 16,
    // marginTop: 20,
    borderColor: "#2E2E2E",
    borderWidth: 1,
    marginBottom:20
  },
  footerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  footerTitle: {
    fontSize: RFPercentage(1.8),
    fontFamily: Fonts.Montserrat_SemiBold,
    color: "#fff",
    marginLeft: 8,
  },
  footerText: {
    fontSize: RFPercentage(1.4),
    fontFamily: Fonts.Montserrat_Regular,
    color: "#ccc",
    marginBottom: 6,
  },
});
