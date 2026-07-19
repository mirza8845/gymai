import React, { useContext, useEffect } from 'react';
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
  const { userData, loading } = useContext(UserContext);

  useEffect(() => {
    if (loading) return; // still fetching, wait

    const decide = async () => {
      const current = auth().currentUser;

      if (!current) {
        navigation.replace('login');
        return;
      }

      if (!isProfileComplete(userData)) {
        navigation.replace('introQuestionnaire');
        return;
      }

      try {
        const doc = await firestore().collection('workouts').doc(current.uid).get();
        if (doc.exists) {
          navigation.replace('Tabs');
        } else {
          navigation.replace('Onboarding');
        }
      } catch (error) {
        console.log("🔥 error in Decider:", error);
        navigation.replace('Onboarding');
      }
    };

    decide();
  }, [loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return null;
};

export default Decider;
