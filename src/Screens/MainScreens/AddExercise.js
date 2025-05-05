import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddExercise = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Pressable style={styles.addExerciseButton} onPress={() => navigation.navigate('ExerciseForm')}>
            <Text style={styles.addExerciseText}>+ Add Exercise</Text>
          </Pressable>

          <View style={styles.dateInfo}>
            <Text style={[styles.dateText, { color: colors.text }]}>June 09</Text>
            <View style={styles.timeInfo}>
              <AntDesign name="clockcircle" size={17} color={colors.text} />
              <Text style={[styles.timeText, { color: colors.text }]}>25 Mins</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.discardText}>Discard Workout</Text>
        <Text style={styles.finishText}>Finish</Text>
      </View>
    </SafeAreaView>
  );
};

export default AddExercise;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000', 
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  addExerciseButton: {
    paddingTop: 10,
  },
  addExerciseText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },
  dateInfo: {
    gap: 3,
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: 16,
  },
  timeInfo: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 17,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  discardText: {
    color: '#FF0000',
    fontSize: 18,
    fontWeight: '500',
  },
  finishText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
});
