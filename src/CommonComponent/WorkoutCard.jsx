import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const WorkoutCard = ({ title, description, button, onPress, buttons = [],onCardPress }) => {
  return (
    <Pressable style={styles.workoutCardContainer} onPress={onCardPress}>
      <View style={{ width: '67%' }}>
        <Text style={styles.workoutTitle}>{title}</Text>
        <Text style={styles.workoutDescription}>{description}</Text>
      </View>

      {button && (
        <TouchableOpacity style={styles.startWorkoutButton} onPress={onPress}>
          <Text style={styles.startWorkoutButtonText}>{button}</Text>
        </TouchableOpacity>
      )}

      {buttons.length > 0 && (
        <View style={styles.multiButtonContainer}>
          {buttons.map((btn, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.startWorkoutButton,
                {
                  backgroundColor: btn.backgroundColor || '#D9D9D9',
                  height: btn.height,
                  padding: btn.padding,
                  marginTop: index === 0 ? 0 : 10,
                }
              ]}
              onPress={btn.onPress}
            >
              <Text style={styles.startWorkoutButtonText}>{btn.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

    </Pressable>
  );
};

export default WorkoutCard;

const styles = StyleSheet.create({
  workoutCardContainer: {
    marginTop: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 21,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  workoutDescription: {
    color: 'black',
  },
  startWorkoutButton: {
    width: 110,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    elevation: 3,
  },
  startWorkoutButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  multiButtonContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

