import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import LinearGradient from "react-native-linear-gradient";
import CommonDropdown from "../../CommonComponent/CommonDropdown";
import { Colors, Fonts } from "../../constants/theme";
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
      const exercises = workoutPlan.daily_workouts[dayKey];
      const isRest = dayLabel.toLowerCase().includes("rest");

      const description =
        exercises
          ?.slice(0, 3)
          .map((e) => e.name)
          .join(", ") + (exercises?.length > 3 ? "..." : "");

      return (
        <LinearGradient
          key={dayKey}
          colors={["#1C1C1E", "#2C2C2E"]}
          style={styles.glassCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.cardHeader}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <MaterialCommunityIcons
                name={isRest ? "bed" : "dumbbell"}
                color={isRest ? "#fff" : "#F07C3B"}
                size={20}
              />
              <Text style={styles.cardTitle}>{dayLabel}</Text>
            </View>

            {!isRest && (
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
            {isRest ? "Rest and recovery day" : description}
          </Text>

          {!isRest && (
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
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <AntDesign name="arrowleft" color={"white"} size={RFPercentage(4)} />
            </TouchableOpacity>
            <Text style={[styles.headerText, { color: colors.text }]}>
              Workout plan is unavailable. Please regenerate.
            </Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.headerWrapper}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <AntDesign name="arrowleft" color={"white"} size={RFPercentage(3)} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Your Weekly Workout Plan</Text>
          </View>

          <Text style={styles.sectionTitle}>Split Days</Text>
          {renderWorkoutCards()}

          <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Workout Extras</Text>
          <View style={styles.dropdownSection}>
            {workoutPlan?.warmup?.length > 0 && (
              <CommonDropdown text="Warm-up" data={workoutPlan.warmup} />
            )}
            {workoutPlan?.cooldown?.length > 0 && (
              <CommonDropdown text="Cool-down" data={workoutPlan.cooldown} />
            )}
            <CommonDropdown
              text="Workout Guidelines"
              data={[workoutPlan?.notes || "No guidelines provided."]}
            />
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
    backgroundColor: Colors.background,
  },
  container: {
    paddingBottom: 30,
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    marginTop:20
  },
  headerWrapper: {
    marginTop: RFPercentage(3),
    marginBottom: RFPercentage(3),
    alignItems: "center",
    width: "100%",
  },
  backButton: {
    position: "absolute",
    left: 0,
    top: 0,
  },
  headerText: {
    fontSize: RFPercentage(2.2),
    fontFamily: Fonts.Montserrat_SemiBold,
    color: "#fff",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: RFPercentage(2),
    fontFamily: Fonts.Montserrat_SemiBold,
    color: "white",
    marginBottom: 10,
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
    fontSize: RFPercentage(1.7),
    fontFamily: Fonts.Montserrat_Regular,
    color: "#ccc",
    marginTop: 6,
  },
  editButton: {
    backgroundColor: "#333",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 15,
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
    paddingVertical: 6,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "grey",
  },
  viewBtnText: {
    fontSize: 12,
    color: "#ccc",
    fontFamily: Fonts.Montserrat_Bold,
  },
  dropdownSection: {
    paddingBottom: 20,
    width: "100%",
  },
});
