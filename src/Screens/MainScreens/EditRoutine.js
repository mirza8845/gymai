import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";
import { Fonts } from "../../constants/theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import AntDesign from "react-native-vector-icons/AntDesign";

const EditRoutineScreen = ({ route, navigation }) => {
  const { dayKey, dayLabel, exercises } = route.params;
  const [editedExercises, setEditedExercises] = useState(exercises);

  const updateExerciseField = (index, field, value) => {
    const updated = [...editedExercises];
    updated[index][field] = value;
    setEditedExercises(updated);
  };

  const handleSave = async () => {
    try {
      const uid = auth().currentUser.uid;

      await firestore()
        .collection("workouts")
        .doc(uid)
        .set(
          {
            [`plan.daily_workouts.${dayKey}`]: editedExercises,
          },
          { merge: true }
        );

      Toast.show({
        type: "success",
        text1: `${dayLabel} updated!`,
        text2: "Work routine successfully updated!",
      });

      navigation.goBack();
    } catch (err) {
      console.error(err);
      Toast.show({
        type: "error",
        text1: "Error saving routine",
        text2: err.message,
      });
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: RFPercentage(5) }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: "absolute", left: 0, top: 0 , zIndex:999}}>
        <AntDesign name="arrowleft" color={"white"} size={RFPercentage(4)} />
      </TouchableOpacity>
      <Text style={styles.header}>{dayLabel}</Text>

      {editedExercises.map((exercise, index) => (
        <View key={index} style={styles.exerciseCard}>
          <Text style={styles.exerciseTitle}>{`Exercise ${index + 1}: ${exercise.name}`}</Text>

          <Text style={styles.label}>Exercise Name</Text>
          <TextInput style={styles.input} value={exercise.name} onChangeText={(text) => updateExerciseField(index, "name", text)} placeholder="Exercise Name" />

          <Text style={styles.label}>Sets</Text>
          <TextInput style={styles.input} value={exercise.sets.toString()} onChangeText={(text) => updateExerciseField(index, "sets", parseInt(text))} placeholder="Sets" keyboardType="numeric" />

          <Text style={styles.label}>Reps</Text>
          <TextInput style={styles.input} value={exercise.reps} onChangeText={(text) => updateExerciseField(index, "reps", text)} placeholder="Reps" />

          <Text style={styles.label}>Equipment</Text>
          <TextInput style={styles.input} value={exercise.equipment} onChangeText={(text) => updateExerciseField(index, "equipment", text)} placeholder="Equipment" />
        </View>
      ))}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save Routine</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditRoutineScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#000",
  },
  header: {
    color: "#fff",
    fontSize: 22,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: Fonts.Bold,
  },
  label: {
    color: "#ccc",
    marginBottom: 4,
    fontSize: 13,
    fontFamily: Fonts.Medium,
  },

  exerciseCard: {
    backgroundColor: "#222",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  exerciseTitle: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
    fontFamily: Fonts.SemiBold,
  },
  input: {
    backgroundColor: "transparent",
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    fontFamily: Fonts.Medium,
    borderWidth:1,
    borderColor:'grey',
    color:'white'
  },
  saveButton: {
    backgroundColor: "#DDFF94",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  saveText: {
    fontSize: 16,
    fontFamily: Fonts.Bold,
  },
});
