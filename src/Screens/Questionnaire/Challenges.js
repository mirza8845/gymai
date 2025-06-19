import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import Heading from '../../CommonComponent/Heading';
import Paragraph from '../../CommonComponent/Paragraph';
import Option from '../../CommonComponent/Option';
import Button from '../../CommonComponent/Button';
import { RFPercentage } from 'react-native-responsive-fontsize';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';

const Challenges = () => {
  const challengesOption = [
    'Not knowing what to do',
    'Lack of motivation & consistency',
    'Equipment limitations',
    'Lack of confidence in the gym',
    'Limited time or busy schedule',
    'Lack of results from past program',
    'Other',
  ];

  const { colors } = useTheme();
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleContinue = async () => {
    if (!selectedOption) {
      Toast.show({
        type: 'info',
        text1: 'Select Challenge',
        text2: 'Please select one challenge to proceed.',
      });
      return;
    }

    const currentUser = auth().currentUser;
    if (!currentUser) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'User not authenticated.',
      });
      return;
    }

    try {
      await firestore()
        .collection('Users')
        .doc(currentUser.uid)
        .update({
          fitnessChallenge: selectedOption,
        });
      navigation.navigate('dietaryPreferences');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update challenge.',
      });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Heading title="Challenges" />
      <Paragraph title="What challenges do you face when it comes to fitness training?" />
      <View style={{ gap: 13, paddingTop: RFPercentage(4), paddingBottom: 20 }}>
        {challengesOption.map((opt, index) => (
          <Option
            key={index}
            label={opt}
            selected={selectedOption === opt}
            onPress={() => setSelectedOption(opt)}
          />
        ))}
      </View>
      <Button title="Continue" onPress={handleContinue} />
    </View>
  );
};

export default Challenges;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 80,
    paddingHorizontal: 27,
    justifyContent: 'center',
  },
});
