import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Heading from '../../CommonComponent/Heading';
import { useNavigation, useTheme } from '@react-navigation/native';
import Paragraph from '../../CommonComponent/Paragraph';
import Button from '../../CommonComponent/Button';
import Img from '../../assets/images/currentphysique.png';
import { Fonts } from '../../constants/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';

const CurrentPhysique = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [hasTitleChanged, setHasTitleChanged] = useState(false);
  const [title, setTitle] = useState('Current Physique');
  const [para, setPara] = useState('Select the body composition that represents you');

  const [currentPhysique, setCurrentPhysique] = useState(null);
  const [goalPhysique, setGoalPhysique] = useState(null);

  const currentOptions = ['Skinny', 'Weak', 'Bulky', 'Fatty'];
  const goalOptions = ['Slim', 'Average', 'Athletic', 'Overweight'];
  const displayOptions = hasTitleChanged ? goalOptions : currentOptions;

  const handleContinue = async () => {
    if (!hasTitleChanged) {
      if (!currentPhysique) {
        Toast.show({
          type: 'info',
          text1: 'Select Current Physique',
          text2: 'Please select your current body type.',
        });
        return;
      }

      setTitle('Physique Goal');
      setPara('Select the body composition that you want to achieve');
      setHasTitleChanged(true);
    } else {
      if (!goalPhysique) {
        Toast.show({
          type: 'info',
          text1: 'Select Goal Physique',
          text2: 'Please select your goal body type.',
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
        await firestore().collection('Users').doc(currentUser.uid).update({
          currentPhysique,
          goalPhysique,
        });

        navigation.navigate('gymExperience');
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to update physique data.',
        });
      }
    }
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <Heading title={title} />
      <Paragraph title={para} />

      <View style={styles.previewPlaceholder}>
        <Image source={Img} style={styles.image} />
        <View style={styles.redDot} />

        {displayOptions.map((option, index) => {
          const positions = [
            { top: '20%', left: '15%' },
            { top: '20%', right: '15%' },
            { bottom: '20%', left: '15%' },
            { bottom: '20%', right: '15%' },
          ];

          const isSelected =
            (!hasTitleChanged && currentPhysique === option) ||
            (hasTitleChanged && goalPhysique === option);

          return (
            <TouchableOpacity
              key={index}
              onPress={() =>
                hasTitleChanged
                  ? setGoalPhysique(option)
                  : setCurrentPhysique(option)
              }
              style={[
                styles.optionButton,
                positions[index],
                { backgroundColor: isSelected ? '#ddd' : 'transparent' },
              ]}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Button title="Continue" onPress={handleContinue} />
    </View>
  );
};

export default CurrentPhysique;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
  previewPlaceholder: {
    backgroundColor: 'white',
    width: '100%',
    height: 300,
    marginBottom: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  redDot: {
    position: 'absolute',
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 10,
    top: '47%',
    left: '47%',
  },
  optionButton: {
    position: 'absolute',
    padding: 8,
    borderRadius: 8,
  },
  optionText: {
    fontSize: RFPercentage(2.6),
    fontFamily: Fonts.SemiBold,
    color: 'black',
  },
});
