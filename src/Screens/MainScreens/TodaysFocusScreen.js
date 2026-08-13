import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const { width } = Dimensions.get("window");

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

const TodaysFocusScreen = ({ route, navigation }) => {
  const workoutPlan =
    useSelector((state) => state.workout.workoutPlan) ||
    route.params?.workoutPlan;

  const today = route.params?.day || "Day 1";
  const dailyWorkouts = workoutPlan?.daily_workouts?.[today] || [];
  const nutrition = workoutPlan?.nutrition || {};
  const warmup = workoutPlan?.warmup || [];
  const cooldown = workoutPlan?.cooldown || [];
  const recovery = workoutPlan?.recovery || {};
  const workoutGuidelines = workoutPlan?.workout_guidelines || {};

  // Get user profile info
  const userProfile = workoutPlan?.userProfile || {};
  const { name, goal, experience } = userProfile;

  const renderExerciseItem = (item, index) => (
    <LinearGradient
      colors={["#000000", "#1A1A1A"]}
      style={styles.exerciseCard}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.exerciseHeader}>
        <View style={styles.exerciseNumber}>
          <Text style={styles.exerciseNumberText}>{index + 1}</Text>
        </View>
        <View style={styles.exerciseInfo}>
          <Text style={styles.exerciseName}>{item.name}</Text>
          <Text style={styles.exerciseEquipment}>{item.equipment}</Text>
          <Text style={styles.exerciseTarget}>Target: {item.target}</Text>
        </View>
        <View style={styles.exerciseSets}>
          <Text style={styles.setsText}>
            {item.workoutDetails?.sets || 3} sets
          </Text>
          <Text style={styles.repsText}>
            {item.workoutDetails?.reps || "8-12"} reps
          </Text>
          {item.workoutDetails?.notes && (
            <Text style={styles.exerciseNotes}>
              {item.workoutDetails.notes}
            </Text>
          )}
        </View>
      </View>
    </LinearGradient>
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Today's Focus</Text>
        <Text style={styles.subtitle}>
          {today} • {dailyWorkouts.length} exercises •
          {dailyWorkouts.reduce(
            (acc, ex) => acc + (ex.workoutDetails?.sets || 3),
            0,
          )}{" "}
          sets
        </Text>
        {goal && <Text style={styles.goalText}>Goal: {goal}</Text>}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Workout Guidelines */}
        {Object.keys(workoutGuidelines).length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <LinearGradient
                colors={[darkColors.primary, darkColors.primaryLight]}
                style={styles.sectionIcon}
              >
                <Ionicons name="bulb" size={20} color="#fff" />
              </LinearGradient>
              <Text style={styles.sectionTitle}>Workout Guidelines</Text>
            </View>
            <LinearGradient
              colors={["#000000", "#1A1A1A"]}
              style={styles.guidelinesCard}
            >
              {workoutGuidelines.focus && (
                <View style={styles.guidelineItem}>
                  <Ionicons name="flag" size={16} color={darkColors.primary} />
                  <Text style={styles.guidelineText}>
                    Focus: {workoutGuidelines.focus}
                  </Text>
                </View>
              )}
              {workoutGuidelines.intensity && (
                <View style={styles.guidelineItem}>
                  <FontAwesome5
                    name="fire"
                    size={14}
                    color={darkColors.primary}
                  />
                  <Text style={styles.guidelineText}>
                    Intensity: {workoutGuidelines.intensity}
                  </Text>
                </View>
              )}
              {workoutGuidelines.form && (
                <View style={styles.guidelineItem}>
                  <Ionicons name="body" size={16} color={darkColors.primary} />
                  <Text style={styles.guidelineText}>
                    Form: {workoutGuidelines.form}
                  </Text>
                </View>
              )}
              {workoutGuidelines.rest_between_sets && (
                <View style={styles.guidelineItem}>
                  <Ionicons name="time" size={16} color={darkColors.primary} />
                  <Text style={styles.guidelineText}>
                    Rest between sets: {workoutGuidelines.rest_between_sets}
                  </Text>
                </View>
              )}
              {workoutGuidelines.progression && (
                <View style={styles.guidelineItem}>
                  <FontAwesome5
                    name="chart-line"
                    size={14}
                    color={darkColors.primary}
                  />
                  <Text style={styles.guidelineText}>
                    Progression: {workoutGuidelines.progression}
                  </Text>
                </View>
              )}
            </LinearGradient>
          </View>
        )}

        {/* Warmup Section */}
        {warmup.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <LinearGradient
                colors={[darkColors.primary, darkColors.primaryLight]}
                style={styles.sectionIcon}
              >
                <Ionicons name="flash" size={20} color="#fff" />
              </LinearGradient>
              <Text style={styles.sectionTitle}>
                Warmup ({warmup.length} exercises)
              </Text>
            </View>
            <LinearGradient
              colors={["#000000", "#1A1A1A"]}
              style={styles.warmupCard}
            >
              {warmup.map((item, index) => (
                <View key={index} style={styles.warmupItem}>
                  <View style={styles.warmupTypeBadge}>
                    <Text style={styles.warmupTypeText}>{item.type}</Text>
                  </View>
                  <Text style={styles.warmupText}>{item.name}</Text>
                  <Text style={styles.warmupDuration}>{item.duration}</Text>
                </View>
              ))}
            </LinearGradient>
          </View>
        )}

        {/* Workout Exercises */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <LinearGradient
              colors={[darkColors.primary, darkColors.primaryLight]}
              style={styles.sectionIcon}
            >
              <FontAwesome5 name="dumbbell" size={16} color="#fff" />
            </LinearGradient>
            <Text style={styles.sectionTitle}>Workout Exercises</Text>
          </View>

          {dailyWorkouts.length > 0 ? (
            <View style={styles.exercisesContainer}>
              {dailyWorkouts.map((item, index) => (
                <React.Fragment key={item.id || index}>
                  {renderExerciseItem(item, index)}
                  {index < dailyWorkouts.length - 1 && (
                    <View style={styles.exerciseDivider} />
                  )}
                </React.Fragment>
              ))}
            </View>
          ) : (
            <LinearGradient
              colors={["#000000", "#1A1A1A"]}
              style={styles.emptyCard}
            >
              <Ionicons
                name="barbell-outline"
                size={40}
                color={darkColors.textSecondary}
              />
              <Text style={styles.emptyText}>
                No workouts scheduled for today
              </Text>
              <Text style={styles.emptySubtext}>Enjoy your rest day!</Text>
            </LinearGradient>
          )}
        </View>

        {/* Cooldown Section */}
        {cooldown.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <LinearGradient
                colors={[darkColors.primary, darkColors.primaryLight]}
                style={styles.sectionIcon}
              >
                <Ionicons name="water-outline" size={20} color="#fff" />
              </LinearGradient>
              <Text style={styles.sectionTitle}>
                Cooldown ({cooldown.length} exercises)
              </Text>
            </View>
            <LinearGradient
              colors={["#000000", "#1A1A1A"]}
              style={styles.warmupCard}
            >
              {cooldown.map((item, index) => (
                <View key={index} style={styles.warmupItem}>
                  <View style={styles.warmupTypeBadge}>
                    <Text style={styles.warmupTypeText}>{item.type}</Text>
                  </View>
                  <Text style={styles.warmupText}>{item.name}</Text>
                  <Text style={styles.warmupDuration}>{item.duration}</Text>
                </View>
              ))}
            </LinearGradient>
          </View>
        )}

        {/* Nutrition Summary */}
        {Object.keys(nutrition).length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <LinearGradient
                colors={[darkColors.primary, darkColors.primaryLight]}
                style={styles.sectionIcon}
              >
                <Ionicons name="restaurant" size={20} color="#fff" />
              </LinearGradient>
              <Text style={styles.sectionTitle}>Daily Nutrition</Text>
            </View>

            <LinearGradient
              colors={["#000000", "#1A1A1A"]}
              style={styles.nutritionCard}
            >
              <View style={styles.nutritionHeader}>
                <View style={{ width: "60%" }}>
                  <Text style={styles.nutritionCalories}>
                    {nutrition.daily_calories} kcal
                  </Text>
                  <Text style={styles.nutritionFocus}>{nutrition.focus}</Text>
                  <Text style={styles.nutritionMealTiming}>
                    {nutrition.meal_timing}
                  </Text>
                </View>
                <LinearGradient
                  colors={[darkColors.primary, darkColors.primaryLight]}
                  style={styles.calorieBadge}
                >
                  <Text style={styles.calorieText}>Target</Text>
                </LinearGradient>
              </View>

              <View style={styles.macrosContainer}>
                <View style={styles.macroItem}>
                  <Text style={styles.macroValue}>{nutrition.protein_g}g</Text>
                  <Text style={styles.macroLabel}>Protein</Text>
                </View>
                <View style={styles.macroDivider} />
                <View style={styles.macroItem}>
                  <Text style={styles.macroValue}>{nutrition.carbs_g}g</Text>
                  <Text style={styles.macroLabel}>Carbs</Text>
                </View>
                <View style={styles.macroDivider} />
                <View style={styles.macroItem}>
                  <Text style={styles.macroValue}>{nutrition.fat_g}g</Text>
                  <Text style={styles.macroLabel}>Fat</Text>
                </View>
              </View>

              {nutrition.hydration && (
                <View style={styles.hydrationRow}>
                  <Ionicons name="water" size={16} color={darkColors.primary} />
                  <Text style={styles.hydrationText}>
                    Hydration: {nutrition.hydration}
                  </Text>
                </View>
              )}
            </LinearGradient>
          </View>
        )}

        {/* Recovery Tips */}
        {Object.keys(recovery).length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <LinearGradient
                colors={[darkColors.primary, darkColors.primaryLight]}
                style={styles.sectionIcon}
              >
                <Ionicons name="bed" size={20} color="#fff" />
              </LinearGradient>
              <Text style={styles.sectionTitle}>Recovery Tips</Text>
            </View>

            <LinearGradient
              colors={["#000000", "#1A1A1A"]}
              style={styles.recoveryCard}
            >
              {recovery.sleep && (
                <>
                  <View style={styles.recoveryRow}>
                    <Ionicons
                      name="moon"
                      size={16}
                      color={darkColors.primary}
                    />
                    <Text style={styles.recoveryTitle}>
                      Sleep: {recovery.sleep.target_hours} hours
                    </Text>
                  </View>
                  {recovery.sleep.tips?.map((tip, index) => (
                    <Text key={index} style={styles.recoveryTip}>
                      • {tip}
                    </Text>
                  ))}
                </>
              )}

              {recovery.hydration && (
                <>
                  <View style={styles.recoveryRow}>
                    <Ionicons
                      name="water"
                      size={16}
                      color={darkColors.primary}
                    />
                    <Text style={styles.recoveryTitle}>
                      Hydration: {recovery.hydration.target_liters}L daily
                    </Text>
                  </View>
                  {recovery.hydration.tips?.map((tip, index) => (
                    <Text key={index} style={styles.recoveryTip}>
                      • {tip}
                    </Text>
                  ))}
                </>
              )}

              {recovery.active_recovery &&
                recovery.active_recovery.length > 0 && (
                  <>
                    <View style={styles.recoveryRow}>
                      <Ionicons
                        name="walk"
                        size={16}
                        color={darkColors.primary}
                      />
                      <Text style={styles.recoveryTitle}>Active Recovery</Text>
                    </View>
                    {recovery.active_recovery.map((activity, index) => (
                      <Text key={index} style={styles.recoveryTip}>
                        • {activity}
                      </Text>
                    ))}
                  </>
                )}

              {recovery.rest_days && (
                <>
                  <View style={styles.recoveryRow}>
                    <Ionicons
                      name="calendar"
                      size={16}
                      color={darkColors.primary}
                    />
                    <Text style={styles.recoveryTitle}>Rest Days</Text>
                  </View>
                  <Text style={styles.recoveryTip}>• {recovery.rest_days}</Text>
                </>
              )}
            </LinearGradient>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkColors.background,
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  header: {
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: darkColors.border,
  },
  title: {
    color: darkColors.textPrimary,
    fontSize: 24,
    fontFamily: "Montserrat-Bold",
    marginBottom: 4,
  },
  subtitle: {
    color: darkColors.textSecondary,
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
    marginBottom: 8,
  },
  goalText: {
    color: darkColors.primary,
    fontSize: 14,
    fontFamily: "Montserrat-SemiBold",
    fontStyle: "italic",
    marginBottom: 10,
  },
  section: {
    marginTop: 24,
    // backgroundColor:"red",
    paddingHorizontal: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  sectionTitle: {
    color: darkColors.textPrimary,
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
    flex: 1,
  },
  startWorkoutButton: {
    marginLeft: "auto",
  },
  startButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Montserrat-Bold",
    marginLeft: 6,
  },
  profileCard: {
    borderRadius: 20,
    padding: 20,
    shadowColor: "#6D6D6D",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  profileRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  profileLabel: {
    color: darkColors.textSecondary,
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
  },
  profileValue: {
    color: darkColors.textPrimary,
    fontSize: 14,
    fontFamily: "Montserrat-SemiBold",
  },
  guidelinesCard: {
    borderRadius: 20,
    padding: 20,
    shadowColor: "#6D6D6D",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  guidelineItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  guidelineText: {
    color: darkColors.textPrimary,
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
    marginLeft: 12,
    flex: 1,
  },
  exercisesContainer: {
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#6D6D6D",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  exerciseCard: {
    padding: 20,
  },
  exerciseHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  exerciseNumber: {
    width: 32,
    height: 32,
    borderRadius: 100,
    backgroundColor: "rgba(47, 45, 45, 1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  exerciseNumberText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Montserrat-Bold",
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    color: darkColors.textPrimary,
    fontSize: 14,
    fontFamily: "Montserrat-Bold",
    marginBottom: 4,
  },
  exerciseEquipment: {
    color: darkColors.textSecondary,
    fontSize: 12,
    fontFamily: "Montserrat-Medium",
    marginBottom: 2,
  },
  exerciseTarget: {
    color: darkColors.primary,
    fontSize: 11,
    fontFamily: "Montserrat-Medium",
  },
  exerciseSets: {
    alignItems: "flex-end",
  },
  setsText: {
    color: darkColors.textPrimary,
    fontSize: 14,
    fontFamily: "Montserrat-Bold",
    marginBottom: 2,
  },
  repsText: {
    color: darkColors.textSecondary,
    fontSize: 12,
    fontFamily: "Montserrat-Medium",
    marginBottom: 4,
  },
  exerciseNotes: {
    color: darkColors.primary,
    fontSize: 10,
    fontFamily: "Montserrat-Medium",
    fontStyle: "italic",
    maxWidth: 100,
    textAlign: "right",
  },
  exerciseDivider: {
    height: 1,
    backgroundColor: darkColors.border,
  },
  warmupCard: {
    borderRadius: 20,
    padding: 20,
    shadowColor: "#6D6D6D",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  warmupItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  warmupTypeBadge: {
    backgroundColor: "rgba(243, 78, 58, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 10,
  },
  warmupTypeText: {
    color: darkColors.primary,
    fontSize: 10,
    fontFamily: "Montserrat-Medium",
    textTransform: "uppercase",
  },
  warmupText: {
    color: darkColors.textPrimary,
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
    flex: 1,
  },
  warmupDuration: {
    color: darkColors.textSecondary,
    fontSize: 12,
    fontFamily: "Montserrat-Medium",
  },
  nutritionCard: {
    borderRadius: 20,
    padding: 20,
    shadowColor: "#6D6D6D",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  nutritionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  nutritionCalories: {
    color: darkColors.textPrimary,
    fontSize: 20,
    fontFamily: "Montserrat-Bold",
    marginBottom: 4,
  },
  nutritionFocus: {
    color: darkColors.textSecondary,
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
    marginBottom: 4,
  },
  nutritionMealTiming: {
    color: darkColors.textSecondary,
    fontSize: 12,
    fontFamily: "Montserrat-Regular",
  },
  calorieBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  calorieText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Montserrat-Bold",
  },
  macrosContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  macroItem: {
    flex: 1,
    alignItems: "center",
  },
  macroValue: {
    color: darkColors.textPrimary,
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
    marginBottom: 4,
  },
  macroLabel: {
    color: darkColors.textSecondary,
    fontSize: 12,
    fontFamily: "Montserrat-Medium",
  },
  macroDivider: {
    width: 1,
    backgroundColor: darkColors.border,
  },
  hydrationRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  hydrationText: {
    color: darkColors.textPrimary,
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
    marginLeft: 10,
  },
  recoveryCard: {
    borderRadius: 20,
    padding: 20,
    shadowColor: "#6D6D6D",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  recoveryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  recoveryTitle: {
    color: darkColors.textPrimary,
    fontSize: 14,
    fontFamily: "Montserrat-Bold",
    marginLeft: 10,
  },
  recoveryTip: {
    color: darkColors.textSecondary,
    fontSize: 13,
    fontFamily: "Montserrat-Regular",
    marginLeft: 26,
    marginBottom: 6,
    lineHeight: 18,
  },
  emptyCard: {
    borderRadius: 20,
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6D6D6D",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  emptyText: {
    color: darkColors.textPrimary,
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
    marginTop: 12,
    textAlign: "center",
  },
  emptySubtext: {
    color: darkColors.textSecondary,
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
    marginTop: 4,
    textAlign: "center",
  },
});

export default TodaysFocusScreen;
