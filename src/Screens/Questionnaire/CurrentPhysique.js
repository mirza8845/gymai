import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Heading from '../../CommonComponent/Heading';
import { useNavigation, useTheme } from '@react-navigation/native';
import Paragraph from '../../CommonComponent/Paragraph';
import Button from '../../CommonComponent/Button';
import Img from '../../assets/images/currentphysique.png';

const CurrentPhysique = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  
  const [hasTitleChanged, setHasTitleChanged] = useState(false);
  const [title, setTitle] = useState('Current Physique');
  const [para, setPara] = useState('Select the body composition that represents you');

  const currentOptions = ['Skinny', 'Weak', 'Bulky', 'Fatty'];
  const goalOptions = ['Slim', 'Average', 'Athletic', 'Overweight'];
  const displayOptions = hasTitleChanged ? goalOptions : currentOptions;

  const handleContinue = () => {
    if (!hasTitleChanged) {
      setTitle('Physique goal');
      setPara('Select the body composition that you want to achieve');
      setHasTitleChanged(true);
    } else {
      navigation.navigate('gymExperience');
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

          return (
            <Text key={index} style={[styles.optionText, positions[index]]}>
              {option}
            </Text>
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
  optionText: {
    position: 'absolute',
    fontSize: 25,
    fontWeight: '700',
    color: 'black',
  },
});
