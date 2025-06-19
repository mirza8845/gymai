import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import Heading from '../../CommonComponent/Heading';
import Paragraph from '../../CommonComponent/Paragraph';
import Option from '../../CommonComponent/Option';
import Button from '../../CommonComponent/Button';
import { RFPercentage } from 'react-native-responsive-fontsize';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';

const dietsOption = [
  'High in Protein',
  'High in Carbohydrates',
  'High in Fats',
  'High in fiber',
  'Balanced with a range of foods providing macro',
  'High in Ultra-processed foods',
  'Other'
];

const Diets = () => {
  const { colors } = useTheme();
  const [selectedOption, setSelectedOption] = useState(null);
  const navigation = useNavigation();

  const handleContinue = async () => {
    if (!selectedOption) {
      Toast.show({
        type: 'info',
        text1: 'Selection Required',
        text2: 'Please select a diet type to continue.',
      });
      return;
    }

    const currentUser = auth().currentUser;
    if (!currentUser) {
      Toast.show({
        type: 'error',
        text1: 'User Error',
        text2: 'User not authenticated.',
      });
      return;
    }

    try {
      await firestore().collection('Users').doc(currentUser.uid).update({
        currentDiet: selectedOption,
      });
      navigation.navigate('healthQuestionaire');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Database Error',
        text2: 'Failed to save diet info. Please try again.',
      });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Heading title="Diet" />
      <Paragraph title="How would you describe your current diet?" />
      <View style={{ paddingTop: RFPercentage(5), paddingBottom: 30, gap: 15 }}>
        {dietsOption.map((opt, index) => (
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

export default Diets;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 80,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
});
