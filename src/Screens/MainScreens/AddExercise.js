import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useNavigation, useRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { Colors, Fonts } from "../../constants/theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import AntDesign from "react-native-vector-icons/AntDesign";
import LinearGradient from "react-native-linear-gradient";

const AddExerciseScreen = () => {
  const [name, setName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [equipment, setEquipment] = useState("");
  const [properForm, setProperForm] = useState("");
  const [tips, setTips] = useState("");
  const [mistakes, setMistakes] = useState("");

  const navigation = useNavigation();
  const route = useRoute();
  const { day } = route.params; // e.g. "Day 1"

  const handleAddExercise = async () => {
    if (!name || !sets || !reps) {
      Alert.alert("Missing Info", "Please fill required fields.");
      return;
    }

    try {
      const uid = auth().currentUser.uid;
      const workoutRef = firestore().collection("workouts").doc(uid);
      const doc = await workoutRef.get();

      if (!doc.exists) throw new Error("Workout plan not found");

      const currentPlan = doc.data().plan;

      const newExercise = {
        name,
        sets: parseInt(sets),
        reps,
        equipment,
        muscles_targeted: [],
        image_prompt: "",
        proper_form: properForm ? properForm.split(",").map((item) => item.trim()) : [],
        tips_and_tricks: tips ? tips.split(",").map((item) => item.trim()) : [],
        common_mistakes: mistakes ? mistakes.split(",").map((item) => item.trim()) : [],
      };

      const existingExercises = currentPlan.daily_workouts?.[day] || [];
      const updatedExercises = [...existingExercises, newExercise];

      await workoutRef.set(
        {
          [`plan.daily_workouts.${day}`]: updatedExercises,
        },
        { merge: true }
      );

      Toast.show({ type: "success", text1: "Exercise added!" });
      navigation.goBack();
    } catch (err) {
      console.error("Error adding exercise:", err);
      Toast.show({ type: "error", text1: "Failed to add", text2: err.message });
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: RFPercentage(5) }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: "absolute", left: 0, top: 0, zIndex: 999 }}>
        <AntDesign name="arrowleft" color={"white"} size={RFPercentage(3)} />
      </TouchableOpacity>
      <Text style={styles.title}>Add Custom Exercise</Text>

      <Text style={styles.label}>Exercise Name *</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="e.g. Dumbbell Press" placeholderTextColor={"grey"} />

      <Text style={styles.label}>Sets *</Text>
      <TextInput style={styles.input} value={sets} onChangeText={setSets} keyboardType="numeric" placeholder="e.g. 4" placeholderTextColor={"grey"} />

      <Text style={styles.label}>Reps *</Text>
      <TextInput style={styles.input} value={reps} onChangeText={setReps} placeholder="e.g. 10-12" placeholderTextColor={"grey"} />

      <Text style={styles.label}>Equipment</Text>
      <TextInput style={styles.input} value={equipment} onChangeText={setEquipment} placeholder="e.g. Barbell" placeholderTextColor={"grey"} />

      <Text style={styles.label}>Proper Form (comma-separated)</Text>
      <TextInput style={styles.input} value={properForm} onChangeText={setProperForm} placeholder="e.g. Keep back straight, Engage core" multiline placeholderTextColor={"grey"} />

      <Text style={styles.label}>Tips and Tricks (comma-separated)</Text>
      <TextInput style={styles.input} value={tips} onChangeText={setTips} placeholder="e.g. Use full range, Control tempo" multiline placeholderTextColor={"grey"} />

      <Text style={styles.label}>Common Mistakes (comma-separated)</Text>
      <TextInput style={styles.input} value={mistakes} onChangeText={setMistakes} placeholder="e.g. Arching back, Rushing reps" multiline placeholderTextColor={"grey"} />

      <TouchableOpacity onPress={handleAddExercise} style={styles.saveButton}>
        <LinearGradient colors={[Colors.primary, Colors.primary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradientButton}>
          <Text style={styles.saveText}>Save Routine</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddExerciseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.Montserrat_SemiBold,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "rgba(255, 255, 255,1)",
    marginBottom: 6,
    fontFamily: Fonts.Montserrat_Medium,
  },
  input: {
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    fontFamily: Fonts.Montserrat_Medium,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "rgb(104, 102, 102)",
    color: "white",
  },
  button: {
    backgroundColor: "#A6ECFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontFamily: Fonts.Bold,
    fontSize: 16,
  },
  saveButton: {
    borderRadius: 12,
    overflow: "hidden",
    marginTop: RFPercentage(1),
  },
  gradientButton: {
    paddingVertical: RFPercentage(2),
    paddingHorizontal: RFPercentage(4),
    alignItems: "center",
    borderRadius: 12,
  },
  saveText: {
    fontSize: RFPercentage(2),
    fontFamily: Fonts.Montserrat_SemiBold,
    color: "white", // darker text on light gradient
  },
});
