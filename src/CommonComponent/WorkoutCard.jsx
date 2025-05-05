import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const WorkoutCard = ({ title, description, time, button, onPress, buttons = [], onCardPress }) => {
  return (
    <Pressable style={styles.workoutCardContainer} onPress={onCardPress}>
      {/* Left Content */}
      <View style={styles.textContainer}>
        <Text style={styles.workoutTitle}>{title}</Text>
        <Text style={styles.workoutDescription}>{description}</Text>
      </View>

      {/* Right Content: Button or Time */}
      <View style={styles.rightContent}>
        {time && (
          <View style={styles.timeContainer}>
            <AntDesign name="clockcircle" size={17} color="#000" />
            <Text style={styles.timeText}>{time}</Text>
          </View>
        )}

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
      </View>
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
  textContainer: {
    width: '67%',
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  workoutDescription: {
    color: 'black',
    fontSize: 14,
    marginTop: 4,
  },
  rightContent: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '100%',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  timeText: {
    marginLeft: 5,
    fontSize: 14,
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
