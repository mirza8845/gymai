import React, { useContext, useEffect , useState} from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../utils/userContext';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Colors } from '../../constants/theme';

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

const Decider = () => {
  const navigation = useNavigation();
  const { userData, loading: userLoading } = useContext(UserContext); // Get loading state
  const [checking, setChecking] = useState(true);

  console.log('userData...............', userData);
  console.log('userLoading............', userLoading);

  useEffect(() => {
   

    const decide = async () => {
      const current = auth().currentUser;

      // 🔸 If user not logged in → go to login
      if (!current) {
        console.log('No current user, navigating to login');
        navigation.replace('Onboarding');
        return;
      }

      // 🔸 If user data is completely missing → go to Onboarding
      if (!userData) {
        console.log('No user data, navigating to Onboarding');
        navigation.replace('Onboarding');
        return;
      }

      // 🔸 If user data is incomplete → go to intro questionnaire
      if (!isProfileComplete(userData)) {
        console.log('Profile incomplete, navigating to introQuestionnaire');
        navigation.replace('introQuestionnaire');
        return;
      }

      try {
        // 🔸 Check if user has workout document
        console.log('Checking workout plan...');
        const doc = await firestore().collection('workouts').doc(current.uid).get();
        console.log("doc..........",doc.data)
        if (doc.exists) {
          console.log('Workout plan exists, navigating to Tabs');
          navigation.replace('Tabs');
        } else {
          console.log('No workout plan, navigating to Onboarding');
          navigation.replace('Onboarding');
        }
      } catch (error) {
        console.log("🔥 error in Decider:", error);
        navigation.replace('Onboarding');
      }
    };

    decide();
  }, [userData, userLoading]); // Add userLoading to dependencies

  // Show loading if still checking OR user data is still loading
  if (checking || userLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return null;
};

export default Decider;