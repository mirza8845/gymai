import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/AntDesign";
import { UserContext } from "../../utils/userContext";
import WorkoutCard from "../../CommonComponent/WorkoutCard";
import gymImg from "../../assets/images/gym.png";
import WomenGym from "../../assets/images/womangym.png";
import MenGym from "../../assets/images/mengym.png";
import { Fonts } from "../../constants/theme";
import DoubleCard from "../../CommonComponent/DoubleCard";
import { generateWorkoutPlan } from "../../services/generateWorkoutPlan";
import { useDispatch, useSelector } from "react-redux";
import { setWorkoutPlan } from "../../redux/Actions";

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
  const { userData } = useContext(UserContext);
  const dispatch = useDispatch();
  const workoutPlan = useSelector((state) => state.workout.workoutPlan);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWorkoutPlan();
  }, []);

  const getWorkoutPlan = async () => {
    try {
      setLoading(true);
      const plan = await generateWorkoutPlan(userData);
      dispatch(setWorkoutPlan(plan));
    } catch (error) {
      console.log("Workout plan error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Find first non-rest workout day
  const firstWorkoutDay = workoutPlan?.weekly_split?.find(
    (day) => !day.toLowerCase().includes("rest")
  );
  const workoutDayKey = firstWorkoutDay?.split(":")[0]?.trim(); // e.g., "Day 1"
  const firstDayExercises = workoutPlan?.daily_workouts?.[workoutDayKey];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.greetingText}>Hi, {userData?.name}</Text>

          {loading ? (
            <ActivityIndicator size="large" color="#FFDD03" style={{ marginTop: 30 }} />
          ) : workoutPlan?.weekly_split ? (
            <>
              <Text style={[styles.descriptionText, { color: colors.text }]}>
                {`Your Personalised ${userData?.weeklyWorkoutCommitment}-Day Workout Plan is Ready! You'll follow a weekly routine including: ${workoutPlan?.weekly_split?.join(
                  ", "
                )}. Discover your exercises, warm-up tips, and cool-down steps to train smarter!`}
              </Text>

              <TouchableOpacity
                style={styles.planButton}
                onPress={() => navigation.navigate("MyPlan")}
              >
                <Text style={styles.planButtonText}>My Plan</Text>
              </TouchableOpacity>

              <Text style={styles.sectionTitle}>Next Workout</Text>

              {firstDayExercises ? (
                <WorkoutCard
                  title={firstWorkoutDay?.split(":")[1]?.trim() || "Workout"}
                  description={firstDayExercises
                    .map((ex) => ex.name)
                    .slice(0, 2)
                    .join(", ") + "..."}
                  button="Start now"
                />
              ) : (
                <Text style={{ color: colors.text }}>Rest day or workout not available.</Text>
              )}
            </>
          ) : (
            <Text style={[styles.descriptionText, { color: colors.text }]}>
              Failed to generate workout plan. Please try again later.
            </Text>
          )}

          <Text style={styles.sectionTitle}>Discover</Text>

          <View style={styles.imageCardContainer}>
            <View style={styles.textBlock}>
              <Text style={styles.cardTitle}>Myth Busters</Text>
              <Text style={{ color: "black", fontFamily: Fonts.Regular }}>
                Popular fitness myths debunked!
              </Text>
            </View>
            <Image source={gymImg} style={styles.cardImage} resizeMode="contain" />
          </View>

          <FlatList
            data={data}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <DoubleCard leftItem={item.leftItem} rightItem={item.rightItem} />
            )}
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
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollContainer: {
    width: "90%",
    alignSelf: "center",
    paddingVertical: 40,
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
  },
  textBlock: {
    width: "50%",
    left: 15,
  },
  cardTitle: {
    fontSize: 18,
    color: "#000",
    fontFamily: Fonts.SemiBold,
  },
  cardImage: {
    width: 180,
    height: 180,
  },
  doubleCardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  doubleCard: {
    width: "48%",
    overflow: "hidden",
  },
  doubleCardImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardInfoBox: {
    borderWidth: 1,
    borderLeftColor: "white",
    borderRightColor: "white",
    borderBottomColor: "white",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  doubleCardTitle: {
    fontSize: 15,
    fontWeight: "400",
    marginBottom: 6,
  },
  metaInfo: {
    fontSize: 13,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
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
  },
  seeMoreBtnText: {
    fontSize: 18,
    color: "black",
    fontFamily: Fonts.SemiBold,
  },
});
