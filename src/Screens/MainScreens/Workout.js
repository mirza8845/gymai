import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import WorkoutCard from '../../CommonComponent/WorkoutCard'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@react-navigation/native'

const Workout = () => {
  const { colors } = useTheme()
  return (
    <SafeAreaView >
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.header}>Track My Progress</Text>

          <Pressable>
            <Text style={[styles.startWorkoutButton, { color: colors.text }]}>+ Start New Workout</Text>
          </Pressable>

          <View style={styles.routineHeader}>
            <Text style={[styles.routineTitle, { color: colors.text }]}>My Routines</Text>
            <Pressable>
              <Text style={[styles.addRoutine, , { color: colors.text }]}>+ Add new routine</Text>
            </Pressable>
          </View>

          <WorkoutCard
            title="Push"
            description="Bench press, shoulder press, l..."
            button="Start now"
          />
          <WorkoutCard
            title="Pull"
            description="Pullups, face pull, Seated Row..."
            button="Start now"
          />
          <WorkoutCard
            title="Legs"
            description="Barbell squat, Seated leg curl..."
            button="Start now"
          />

          <Text style={[styles.tipsTitle, { color: colors.text }]}>Tips & Tricks</Text>

          <Text style={[styles.tipCard, styles.tipGreen]}>
            Progressive Overload:{"\n\n"}Increase weight, reps, or form intensity over time. This should be the aim of every session as it’s essential for building strength and muscle!
          </Text>

          <Text style={[styles.tipCard, styles.tipRed]}>
            Rest Times:{"\n\n"}Rest long enough to push your hardest on the next set—typically at least 2–3 minutes. If you're still fatigued, rest a bit longer!
          </Text>

          <Text style={[styles.tipCard, styles.tipBlue]}>
            Volume:{"\n\n"}Optimal weekly training volume per muscle is 4–10 sets when training close to failure. More than this adds unnecessary fatigue without extra benefit.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Workout

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  header: {
    fontSize: 30,
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    textAlign: 'center',
    borderRadius: 30,
    fontWeight: 'bold',
  },
  startWorkoutButton: {
    fontSize: 20,
    letterSpacing: 2,
    paddingBottom: 30,
    paddingTop: 10,
  },
  routineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  routineTitle: {
    fontSize: 17,
  },
  addRoutine: {
    fontSize: 17,
  },
  tipsTitle: {
    fontSize: 25,
    paddingTop: 30,
    paddingBottom: 10,
    fontWeight: 'bold',
  },
  tipCard: {
    fontSize: 17,
    padding: 25,
    borderRadius: 20,
    letterSpacing: 1,
    marginVertical: 10,
  },
  tipGreen: {
    backgroundColor: '#DDFF94',
  },
  tipRed: {
    backgroundColor: '#FF8A8A',
  },
  tipBlue: {
    backgroundColor: '#A6ECFF',
  },
})
