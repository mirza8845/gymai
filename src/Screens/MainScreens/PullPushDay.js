import React from 'react'
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme, useRoute, useNavigation } from '@react-navigation/native'
import menGym from '../../assets/images/man-gym.png'
import ExerciseBox from '../../CommonComponent/ExerciseBox'

const exerciseData = {
  Push: [
    'Bench Press',
    'Shoulder Press',
    'Lateral Raises',
    'Incline Flys',
    'JM Press',
  ],
  Pull: [
    'Pullups',
    'Face Pull',
    'Preacher curl',
    'Seated row',
    'Iso-Lateral rows',
  ],
  Legs: [
    'Barbell Squats',
    'Seated Leg Curl',
    'Romanian Deadlifts',
    'Single leg extensions',
    'Calf Raises',
  ],
}

const PullPushDay = () => {
  const { colors } = useTheme()
  const route = useRoute()
  const { day } = route.params
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={[styles.title, { color: colors.text }]}>{day}</Text>
        
        {exerciseData[day].map((exercise, index) => (
          <ExerciseBox
            key={index}
            title={exercise}
            tableHead={['Set', 'Previous', 'KG', 'Reps']}
            tableTitle={['1', '2']}
            tableData={[
              ['40 x 6', '40', '6'],
              ['40 x 6', '40', '6'],
            ]}
            image={menGym}
            onPress={()=>navigation.navigate('WorkoutDetails')}
          />
        ))}
        
        <View style={{flexDirection:'row',justifyContent:'space-between',height:200}}>
          <Pressable style={styles.addSetButton} onPress={()=>navigation.navigate('AddExercise')}>
            <Text style={styles.addSetText}>+ Add Exercise</Text>
          </Pressable>
          <Pressable style={styles.addSetButton}>
            <Text style={styles.addSetText}>Finish</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default PullPushDay

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
    paddingTop: 30,
  },
  title: {
    fontSize: 25,
    marginBottom: 10,
  },
  addSetButton: {
    paddingTop: 10,
  },
  addSetText: {
    fontSize: 20,
    color:'white'
  },
})
