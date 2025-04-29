import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import Button from '../../CommonComponent/Button';
import Option from '../../CommonComponent/Option';
import Heading from '../../CommonComponent/Heading';

const goals = ['Aesthetics','Strength training', 'Powerlifting', 'Health'];

const GoalsQuestionnaire = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null); 

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Heading title="Goals" />
      <Text style={[styles.subheading, { color: colors.text }]}>
        What are you interested in?
      </Text>

      <View style={styles.goalsContainer}>
        {goals.map((opt, index) => (
          <Option
            key={index}
            label={opt}
            selected={selectedOption === opt}
            onPress={() => setSelectedOption(opt)}
          />
        ))}

        <View style={styles.goalNote}>
          <Text style={styles.goalNoteText}>Tell us more about your goals...</Text>
        </View>
      </View>

      <Button title="Continue" onPress={() => navigation.navigate('currentPhysique')} />
    </View>
  );
};

export default GoalsQuestionnaire;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 80,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  subheading: {
    fontSize: 20,
    fontWeight: '200',
    marginBottom: 30,
    textAlign: 'center',
  },
  goalsContainer: {
    gap: 12,
  },
  goalOption: {
    width: '100%',
    height: 55,
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  goalText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
  goalIcon: {
    width: 24,
    height: 24,
  },
  goalNote: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 16,
    minHeight: 220,
    justifyContent: 'flex-start',
  },
  goalNoteText: {
    fontSize: 18,
    color: 'black',
  },
});
