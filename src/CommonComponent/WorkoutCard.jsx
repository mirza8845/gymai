import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Colors, Fonts } from "../constants/theme";
import { RFPercentage } from "react-native-responsive-fontsize";

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
                    backgroundColor: btn.backgroundColor || "#D9D9D9",
                    // height: btn.height,
                    // padding: btn.padding,
                    marginTop: index === 0 ? 0 : 10,
                  },
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
    paddingHorizontal: RFPercentage(1.7),
    backgroundColor: "#080808",
    borderRadius: 21,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  textContainer: {
    width: "67%",
  },
  workoutTitle: {
    fontSize: 18,
    // fontWeight: '600',
    fontFamily: Fonts.SemiBold,
    color: Colors.white,
  },
  workoutDescription: {
   color: Colors.white,
    fontSize: 14,
    marginTop: 4,
    fontFamily: Fonts.Regular,
  },
  rightContent: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: "100%",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  timeText: {
    marginLeft: 5,
    fontSize: 14,
    color: "black",
  },
  startWorkoutButton: {
    width: RFPercentage(13),
    height: RFPercentage(4),
    borderRadius: 20,
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    justifyContent: "center",
  },
  startWorkoutButtonText: {
    fontSize: 12,
    color: "#000",
    fontFamily: Fonts.SemiBold,
  },
  multiButtonContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
