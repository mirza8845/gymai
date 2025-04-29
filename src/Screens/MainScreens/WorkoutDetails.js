import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import BenchPress from '../../assets/images/benchPress.png'

const WorkoutDetails = () => {
  const { colors } = useTheme()
  
  const properForm = ['Setup: Lie flat on the bench with feet planted firmly on the ground.', 
                      'Grip: Hold the bar just wider than shoulder-width, wrists stacked over elbows.', 
                      'Shoulder Position: Retract your shoulder blades and keep a slight arch in your lower back.', 
                      'Bar Path: Lower the bar to your mid-chest with control, keeping elbows at a ~75-degree angle.', 
                      'Pressing: Drive through your feet, engage your chest, and push the bar.']

  const tipTrick = ['Leg Drive: Push your feet into the ground to create full-body tension.', 
                    'Breathing: Inhale as you lower the bar, exhale forcefully as you press up.', 
                    'Grip Strength: Squeeze the bar tightly to engage more muscles and stabilize the lift.', 
                    'Slow & Controlled Reps: Avoid bouncing the bar—lower it under control to maximize muscle engagement.', 
                    'Elbow Positioning: Keep elbows slightly tucked (not flared) to reduce shoulder strain.']

  const commonMistakes = [' 🚫 Lifting Feet Off the Ground – Loses stability and power. Keep feet planted.', 
                          '🚫 Flaring Elbows Too Wide – Increases shoulder strain; aim for a ~75-degree elbow angle.', 
                          '🚫 Pressing in a Straight Line Up – The bar should move slightly backward toward the shoulders for efficiency.', 
                          '🚫 Using Too Much Weight – Sacrificing form for heavier loads increases injury risk.']

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={[styles.title, { color: colors.text }]}>Bench Press</Text>
        <View style={styles.dateContainer}>
          <AntDesign name="clockcircle" size={17} style={{ color: colors.text }} />
          <Text style={[styles.dateText, { color: colors.text }]}>Published on September 15</Text>
        </View>
        <Image source={BenchPress} style={styles.image} />
        
        <Text style={[styles.sectionTitle, { color: colors.text }]}>🔹 Proper Form </Text>
        <FlatList
          data={properForm}
          renderItem={({ item, index }) => <Text style={[styles.text, { color: colors.text }]}>{index + 1}. {item}</Text>}
          keyExtractor={(item, index) => index.toString()} />
        
        <View style={styles.spacing} />

        <Text style={[styles.sectionTitle, { color: colors.text }]}>✅ Tips & Tricks</Text>
        <FlatList
          data={tipTrick}
          renderItem={({ item }) => <Text style={[styles.text, { color: colors.text }]}>• {item}</Text>}
          keyExtractor={(item, index) => index.toString()} />
        
        <View style={styles.spacing} />
        
        <Text style={[styles.sectionTitle, { color: colors.text }]}>⚠️ Common Mistakes</Text>
        <FlatList
          data={commonMistakes}
          renderItem={({ item }) => <Text style={[styles.text, { color: colors.text }]}>{item}</Text>}
          keyExtractor={(item, index) => index.toString()} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default WorkoutDetails

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  scrollContainer: {
    padding: 26,
    paddingTop: 30,
  },
  title: {
    fontSize: 25,
    marginBottom: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
  },
  image: {
    height: 200,
    width: '100%',
    marginVertical: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  spacing: {
    marginVertical: 20,
  },
})
