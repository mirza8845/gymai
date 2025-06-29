import React, { useContext } from "react";
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
import { ActivityIndicator, View } from "react-native"; // loader

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
  ];
  return requiredFields.every((field) => user[field]);
};

const MainNavigator = () => {
  const { userData } = useContext(UserContext);

  if (userData === null) {
    // Still loading user data
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FFDD03" />
      </View>
    );
  }

  const isComplete = isProfileComplete(userData);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isComplete ? (
        <Stack.Screen name="Tabs" component={Homestack} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}

      {/* Shared Screens */}
      <Stack.Screen name="MyPlan" component={Myplan} />
      <Stack.Screen name="PullPushDay" component={PullPushDay} />
      <Stack.Screen name="WorkoutDetails" component={WorkoutDetails} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="AddExercise" component={AddExercise} />
      <Stack.Screen name="ExerciseForm" component={ExerciseForm} />
      <Stack.Screen name="SaveRoutineDate" component={SaveRoutineDate} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
