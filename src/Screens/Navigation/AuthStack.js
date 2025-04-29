import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from '../Onboarding';
import Login from '../Login';
import SignUp from '../SignUp';
import IntroQuestionnaire from '../Questionnaire/IntroQuestionnaire';
import GenderQuestionnaire from '../Questionnaire/GenderQuestionnaire';
import AgeQuestionnaire from '../Questionnaire/AgeQuestionnaire';
import HeightQuestionnaire from '../Questionnaire/HeightQuestionnaire';
import GoalsQuestionnaire from '../Questionnaire/GoalsQuestionnaire';
import CurrentPhysique from '../Questionnaire/CurrentPhysique';
import GymExperience from '../Questionnaire/GymExperience';
import AvailiabiltyQuestioniare from '../Questionnaire/AvailiabiltyQuestioniare';
import Modifications from '../Questionnaire/Modifications';
import AvailableEquipment from '../Questionnaire/AvailableEquipment';
import Challenges from '../Questionnaire/Challenges';
import DietaryPreferences from '../Questionnaire/DietaryPreferences';
import Diets from '../Questionnaire/Diets';
import HealthQuestionaire from '../Questionnaire/HealthQuestionaire';
import ProfileQuestionaire from '../Questionnaire/ProfileQuestionaire';

const AuthStack = () => {
      const Stack = createNativeStackNavigator();
    
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}
            initialRouteName="Onboarding" >
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="signup" component={SignUp} />
            <Stack.Screen name="introQuestionnaire" component={IntroQuestionnaire} />
            <Stack.Screen name="genderQuestionnaire" component={GenderQuestionnaire} />
            <Stack.Screen name="ageQuestionnaire" component={AgeQuestionnaire} />
            <Stack.Screen name="heightQuestionnaire" component={HeightQuestionnaire} />
            <Stack.Screen name="goalsQuestionnaire" component={GoalsQuestionnaire} />
            <Stack.Screen name="currentPhysique" component={CurrentPhysique} />
            <Stack.Screen name="gymExperience" component={GymExperience} />
            <Stack.Screen name="availiabiltyQuestioniare" component={AvailiabiltyQuestioniare} />
            <Stack.Screen name="modifications" component={Modifications} />
            <Stack.Screen name="availableEquipment" component={AvailableEquipment} />
            <Stack.Screen name="challenges" component={Challenges} />
            <Stack.Screen name="dietaryPreferences" component={DietaryPreferences} />
            <Stack.Screen name="diets" component={Diets} />
            <Stack.Screen name="healthQuestionaire" component={HealthQuestionaire} />
            <Stack.Screen name="profileQuestionaire" component={ProfileQuestionaire} />
        </Stack.Navigator>
    )
}

export default AuthStack