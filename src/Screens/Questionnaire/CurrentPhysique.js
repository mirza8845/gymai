import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Heading from '../../CommonComponent/Heading';
import { useNavigation, useTheme } from '@react-navigation/native';
import Paragraph from '../../CommonComponent/Paragraph';
import male from '../../assets/images/Male.png';
import female from '../../assets/images/female.png';
import Button from '../../CommonComponent/Button';

const CurrentPhysique = () => {
  const { colors } = useTheme();
  const navigation = useNavigation()

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <Heading title="Current Physique" />
      <Paragraph title="Select the body composition that represents you" />

      <View style={styles.bodyOptionsContainer}>
        <Image source={female} style={styles.bodyImage} />
        <Image source={male} style={styles.bodyImage} />
      </View>

      <View style={styles.previewPlaceholder} />

      <Button title="Continue" onPress={()=>navigation.navigate('gymExperience')}/>
    </View>
  );
};

export default CurrentPhysique;


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // paddingVertical: 30,
    justifyContent: 'center',
  },
  bodyOptionsContainer: {
    flexDirection: 'row-reverse',
    marginTop: 20,
  },
  bodyImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  previewPlaceholder: {
    backgroundColor: 'white',
    width: '100%',
    height: 300,
    marginBottom: 100,
    borderRadius: 10,
  },
});
