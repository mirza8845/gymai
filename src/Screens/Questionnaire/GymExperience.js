import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Heading from '../../CommonComponent/Heading';
import { useNavigation, useTheme } from '@react-navigation/native';
import Button from '../../CommonComponent/Button';

const GymExperience = () => {
  const { colors } = useTheme();
  const navigation = useNavigation()

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Heading title="Gym Experience" />
      <View style={styles.optionsContainer}>
        <Text style={styles.optionText}>Complete Novice</Text>
        <Text style={styles.optionText}>Beginner</Text>
        <Text style={styles.optionText}>Intermediate</Text>
        <Text style={styles.optionText}>Advance</Text>
      </View>
      <Button title="Continue" onPress={()=>navigation.navigate('availiabiltyQuestioniare')}/>
    </View>
  );
};

export default GymExperience;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 80,
    paddingHorizontal:60
  },
  optionsContainer: {
    gap: 15,
    marginVertical: 120,
    alignItems: 'center',
  },
  
  optionText: {
    fontSize: 18,
    fontWeight: 500,
    color: 'black', 
    backgroundColor:'white',
    width: '100%',
    height: 55,
    borderRadius: 30,
    marginBottom: 10,
    justifyContent: 'center',
    textAlign:'center',
    paddingTop:13  },
});
