// import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
// import React from "react";
// import AntDesign from "react-native-vector-icons/AntDesign";
// import { useTheme } from "@react-navigation/native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Fonts } from "../../constants/theme";

// const AddExercise = ({ navigation }) => {
//   const { colors } = useTheme();

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <View style={styles.headerContainer}>
//           <Pressable style={styles.addExerciseButton} onPress={() => navigation.navigate("ExerciseForm")}>
//             <Text style={styles.addExerciseText}>+ Add Exercise</Text>
//           </Pressable>

//           <View style={styles.dateInfo}>
//             <Text style={[styles.dateText, { color: colors.text }]}>June 09</Text>
//             <View style={styles.timeInfo}>
//               <AntDesign name="clockcircle" size={17} color={colors.text} />
//               <Text style={[styles.timeText, { color: colors.text }]}>25 Mins</Text>
//             </View>
//           </View>
//         </View>
//       </ScrollView>

//       <View style={styles.footer}>
//         <Text style={styles.discardText}>Discard Workout</Text>
//         <Text style={styles.finishText}>Finish</Text>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default AddExercise;

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#000",
//   },
//   scrollContainer: {
//     paddingHorizontal: 20,
//     paddingVertical: 30,
//     flexGrow: 1,
//   },
//   headerContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//   },
//   addExerciseButton: {
//     paddingTop: 10,
//   },
//   addExerciseText: {
//     fontSize: 20,
//     color: "white",
//     // fontWeight: '600',
//     fontFamily: Fonts.SemiBold,
//   },
//   dateInfo: {
//     gap: 3,
//     alignItems: "flex-end",
//   },
//   dateText: {
//     fontSize: 16,
//     fontFamily: Fonts.Medium,
//   },
//   timeInfo: {
//     flexDirection: "row",
//     gap: 5,
//     alignItems: "center",
//   },
//   timeText: {
//     fontSize: 17,
//     fontFamily: Fonts.Medium,
//   },
//   footer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 20,
//     paddingVertical: 50,
//   },
//   discardText: {
//     color: "#FF0000",
//     fontSize: 18,
//     fontFamily: Fonts.SemiBold,
//   },
//   finishText: {
//     color: "white",
//     fontSize: 18,
//     fontFamily: Fonts.Medium,
//   },
// });

import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useNavigation, useRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { Fonts } from "../../constants/theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import AntDesign from "react-native-vector-icons/AntDesign";

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
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: "absolute", left: 0, top: 0, zIndex:999 }}>
        <AntDesign name="arrowleft" color={"white"} size={RFPercentage(4)} />
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

      <TouchableOpacity style={styles.button} onPress={handleAddExercise}>
        <Text style={styles.buttonText}>Add Exercise</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddExerciseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: Fonts.SemiBold,
    color: "#fff",
    marginBottom: 30,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    color: "rgba(255, 255, 255,1)",
    marginBottom: 6,
    fontFamily: Fonts.Medium,
  },
  input: {
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    fontFamily: Fonts.Medium,
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
});
