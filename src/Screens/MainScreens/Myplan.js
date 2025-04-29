import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import WorkoutCard from '../../CommonComponent/WorkoutCard';
import CommonDropdown from '../../CommonComponent/CommonDropdown';

const Myplan = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={[styles.headerText,{color:colors.text}]}>Here is your custom workout plan.</Text>

          <WorkoutCard
            onCardPress={() => navigation.navigate('PullPushDay',{day:'Push'})}
            title="Push"
            description="Bench press, shoulder press, l..."
            buttons={[
              { title: 'Edit Routine', onPress: () => console.log('Edit'), backgroundColor: '#D9D9D9', padding: 3 },
              { title: 'Save Routine', onPress: () => console.log('Save'), backgroundColor: '#DDFF94', padding: 3 },
            ]}
          />

          <WorkoutCard
            onCardPress={() => navigation.navigate('PullPushDay',{day:'Pull'})}
            title="Pull"
            description="Pullups, face pull, Seated Row..."
            buttons={[
              { title: 'Edit Routine', onPress: () => console.log('Edit'), backgroundColor: '#D9D9D9', padding: 3 },
              { title: 'Save Routine', onPress: () => console.log('Save'), backgroundColor: '#DDFF94', padding: 3 },
            ]}
          />

          <WorkoutCard
            onCardPress={() => navigation.navigate('PullPushDay',{day:'Legs'})}
            title="Legs"
            description="Barbell squat, Seated leg curl..."
            buttons={[
              { title: 'Edit Routine', onPress: () => console.log('Edit'), backgroundColor: '#D9D9D9', padding: 3 },
              { title: 'Save Routine', onPress: () => console.log('Save'), backgroundColor: '#DDFF94', padding: 3 },
            ]}
          />

          <View style={styles.dropdownSection}>
            <CommonDropdown text="Push Day" />
            <CommonDropdown text="Pull Day" />
            <CommonDropdown text="Leg Day" />
            <CommonDropdown text="Workout Guidelines" />
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Myplan;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000', 
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  headerText: {
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 15,
  },
  dropdownSection: {
    paddingTop: 20,
  },
});
