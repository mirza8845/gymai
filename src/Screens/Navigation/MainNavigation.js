import React, { useContext, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homestack from "./Homestack";
import Myplan from "../MainScreens/Myplan";
import PullPushDay from "../MainScreens/PullPushDay";
import WorkoutDetails from "../MainScreens/WorkoutDetails";
import AuthStack from "./AuthStack";
import EditProfile from "../MainScreens/EditProfile";
import AddExercise from "../MainScreens/AddExercise";
import ExerciseForm from "../MainScreens/ExerciseForm";
import SaveRoutineDate from "../MainScreens/SaveRoutineDate";
import { UserContext } from "../../utils/userContext";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import Splash from "../Splash";
import EditRoutineScreen from "../MainScreens/EditRoutine";
import StartWorkoutScreen from "../MainScreens/StartNewWorkout";
import AddRoutineScreen from "../MainScreens/AddRoutine";
import { StatusBar } from "react-native";

const Stack = createNativeStackNavigator();

const isProfileComplete = (user) => {
  if (!user) return false;
  const requiredFields = [
    "age",
    "height",
    "weight",
    "gender",
    "availableEquipment",
    "currentDiet",
    "currentPhysique",
    "dietaryPreferences",
    "energyLevel",
    "fitnessChallenge",
    "foodAllergies",
    "goal",
    "goalPhysique",
    "gymExperience",
    "sleepHours",
    "waterIntakeLiters",
    "weeklyWorkoutCommitment",
    "fullName",
  ];
  return requiredFields.every((f) => user[f]);
};

const MainNavigator = () => {
  const { userData } = useContext(UserContext);

  const [planReady, setPlanReady] = useState(false);
  const [hasPlan, setHasPlan] = useState(false);

  const loadingUser = userData === null;
  const loadingPlan = !planReady;

  useEffect(() => {
    const checkPlan = async () => {
      const current = auth().currentUser;
      if (!current) {
        setPlanReady(true);
        return;
      }

      try {
        const snap = await firestore().collection("workouts").doc(current.uid).get();
        setHasPlan(snap.exists);
      } catch (err) {
        console.log("🔥 Plan check error:", err.message);
      } finally {
        setPlanReady(true);
      }
    };

    if (userData && isProfileComplete(userData)) {
      checkPlan();
    } else if (userData) {
      setPlanReady(true);
    }
  }, [userData]);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userData === null ? (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        ) : loadingPlan ? (
          <Stack.Screen name="Splash" component={Splash} />
        ) : isProfileComplete(userData) && hasPlan ? (
          <Stack.Screen name="Tabs" component={Homestack} />
        ) : (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}

        {/* Additional Screens */}
        <Stack.Screen name="MyPlan" component={Myplan} />
        <Stack.Screen name="EditRoutineScreen" component={EditRoutineScreen} />
        <Stack.Screen name="PullPushDay" component={PullPushDay} />
        <Stack.Screen name="WorkoutDetails" component={WorkoutDetails} />
        <Stack.Screen name="StartWorkoutScreen" component={StartWorkoutScreen} />
        <Stack.Screen name="AddRoutineScreen" component={AddRoutineScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="AddExercise" component={AddExercise} />
        <Stack.Screen name="ExerciseForm" component={ExerciseForm} />
        <Stack.Screen name="SaveRoutineDate" component={SaveRoutineDate} />
      </Stack.Navigator>
    </>
  );
};

export default MainNavigator;
