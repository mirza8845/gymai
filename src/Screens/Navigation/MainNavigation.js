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
import Onboarding from "../Onboarding";
import Login from "../Login";
import SignUp from "../SignUp";
import IntroQuestionnaire from "../Questionnaire/IntroQuestionnaire";
import GenderQuestionnaire from "../Questionnaire/GenderQuestionnaire";
import AgeQuestionnaire from "../Questionnaire/AgeQuestionnaire";
import HeightQuestionnaire from "../Questionnaire/HeightQuestionnaire";
import GoalsQuestionnaire from "../Questionnaire/GoalsQuestionnaire";
import CurrentPhysique from "../Questionnaire/CurrentPhysique";
import GymExperience from "../Questionnaire/GymExperience";
import AvailiabiltyQuestioniare from "../Questionnaire/AvailiabiltyQuestioniare";
import Modifications from "../Questionnaire/Modifications";
import AvailableEquipment from "../Questionnaire/AvailableEquipment";
import Challenges from "../Questionnaire/Challenges";
import DietaryPreferences from "../Questionnaire/DietaryPreferences";
import Diets from "../Questionnaire/Diets";
import HealthQuestionaire from "../Questionnaire/HealthQuestionaire";
import ProfileQuestionaire from "../Questionnaire/ProfileQuestionaire";
import WorkoutGenerating from "../Questionnaire/WorkoutGenerating";
import ForgetPassword from "../ForgetPassword";
import Decider from "./Decider";
import TodaysFocusScreen from "../MainScreens/TodaysFocusScreen";
import HydrationTrackerScreen from "../MainScreens/HydrationTrackerScreen";
import EquipmentWorkoutsScreen from "../MainScreens/EquipmentWorkoutsScreen";
import FormTipsLibraryScreen from "../MainScreens/FormTipsLibraryScreen";
import StartSingleExerciseScreen from "../MainScreens/StartSingleExerciseScreen";
import StartFullWorkoutScreen from "../MainScreens/StartFullWorkoutScreen";
import SettingsScreen from "../MainScreens/Settings";
import HelpScreen from "../MainScreens/Help";
import TermsOfServiceScreen from "../MainScreens/TermsOfServiceScreen";
import PrivacyPolicyScreen from "../MainScreens/PrivacyPolicyScreen";
import ManualWorkout from "../Questionnaire/ManualWorkout";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <Stack.Navigator
        initialRouteName="Decider"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Decider" component={Decider} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signup" component={SignUp} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen
          name="introQuestionnaire"
          component={IntroQuestionnaire}
        />
        <Stack.Screen
          name="genderQuestionnaire"
          component={GenderQuestionnaire}
        />
        <Stack.Screen name="ageQuestionnaire" component={AgeQuestionnaire} />
        <Stack.Screen
          name="heightQuestionnaire"
          component={HeightQuestionnaire}
        />
        <Stack.Screen
          name="goalsQuestionnaire"
          component={GoalsQuestionnaire}
        />
        <Stack.Screen name="currentPhysique" component={CurrentPhysique} />
        <Stack.Screen name="gymExperience" component={GymExperience} />
        <Stack.Screen
          name="availiabiltyQuestioniare"
          component={AvailiabiltyQuestioniare}
        />
        <Stack.Screen name="modifications" component={Modifications} />
        <Stack.Screen
          name="availableEquipment"
          component={AvailableEquipment}
        />
        <Stack.Screen name="challenges" component={Challenges} />
        <Stack.Screen
          name="dietaryPreferences"
          component={DietaryPreferences}
        />
        <Stack.Screen name="diets" component={Diets} />
        <Stack.Screen
          name="healthQuestionaire"
          component={HealthQuestionaire}
        />
        <Stack.Screen
          name="profileQuestionaire"
          component={ProfileQuestionaire}
        />
        <Stack.Screen name="WorkoutGenerating" component={WorkoutGenerating} />
        <Stack.Screen name="Tabs" component={Homestack} />
        <Stack.Screen name="MyPlan" component={Myplan} />
        <Stack.Screen name="EditRoutineScreen" component={EditRoutineScreen} />
        <Stack.Screen name="PullPushDay" component={PullPushDay} />
        <Stack.Screen name="WorkoutDetails" component={WorkoutDetails} />
        <Stack.Screen
          name="StartWorkoutScreen"
          component={StartWorkoutScreen}
        />
        <Stack.Screen name="AddRoutineScreen" component={AddRoutineScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="AddExercise" component={AddExercise} />
        <Stack.Screen name="ExerciseForm" component={ExerciseForm} />
        <Stack.Screen name="SaveRoutineDate" component={SaveRoutineDate} />
        <Stack.Screen name="TodaysFocusScreen" component={TodaysFocusScreen} />
        <Stack.Screen
          name="HydrationTrackerScreen"
          component={HydrationTrackerScreen}
        />
        <Stack.Screen
          name="EquipmentWorkoutsScreen"
          component={EquipmentWorkoutsScreen}
        />
        <Stack.Screen
          name="FormTipsLibraryScreen"
          component={FormTipsLibraryScreen}
        />
        <Stack.Screen
          name="StartSingleExerciseScreen"
          component={StartSingleExerciseScreen}
        />
        <Stack.Screen
          name="StartFullWorkoutScreen"
          component={StartFullWorkoutScreen}
        />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="HelpScreen" component={HelpScreen} />
        <Stack.Screen
          name="TermsOfServiceScreen"
          component={TermsOfServiceScreen}
        />
        <Stack.Screen
          name="PrivacyPolicyScreen"
          component={PrivacyPolicyScreen}
        />
                <Stack.Screen name="ManualWorkout" component={ManualWorkout} />

      </Stack.Navigator>
    </>
  );
};

export default MainNavigator;
