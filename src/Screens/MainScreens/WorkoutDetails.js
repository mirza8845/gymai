// screens/WorkoutDetails.js
import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useTheme, useRoute } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Colors, Fonts } from "../../constants/theme";
import menGym from "../../assets/images/benchPress.png";

const WorkoutDetails = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { exercise, day } = route.params;

  /** -------- helpers ---------- */
  const SectionCard = ({ title, children }) => (
    <View style={styles.card}>
      <Text style={[styles.cardTitle, { color: colors.text }]}>{title}</Text>
      {children}
    </View>
  );

  const renderBulletList = (title, list = []) =>
    list && list.length > 0 ? (
      <SectionCard title={title}>
        {list.map((item, idx) => (
          <View key={idx} style={styles.bulletRow}>
            <AntDesign name="checkcircle" size={14} color={Colors.white} style={{ top: 3 }} />
            <Text style={[styles.bulletText, { color: colors.text }]}> {item}</Text>
          </View>
        ))}
      </SectionCard>
    ) : null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.heroWrapper}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} accessibilityLabel="Go back">
            <AntDesign name="arrowleft" size={RFPercentage(3)} color="#fff" />
          </TouchableOpacity>
          <Image source={menGym} style={styles.heroImg} resizeMode="cover" />
          <View style={styles.overlay} />
          <View style={styles.heroTextWrap}>
            <Text style={styles.exerciseName}>{exercise?.name || "Exercise"}</Text>
            <View style={styles.dayRow}>
              <AntDesign name="clockcircleo" size={14} color="#fff" />
              <Text style={styles.dayText}>{day || "Training Day"}</Text>
            </View>
          </View>
        </View>

        {/* Core info cards */}
        <SectionCard title="Reps & Sets">
          <Text style={[styles.cardBody, { color: colors.text }]}>
            {exercise?.sets || 3} Sets • {exercise?.reps || "10‑12"} Reps
          </Text>
        </SectionCard>

        <SectionCard title="Equipment">
          <Text style={[styles.cardBody, { color: colors.text }]}>{exercise?.equipment || "Bodyweight"}</Text>
        </SectionCard>

        <SectionCard title="Muscles Targeted">
          <Text style={[styles.cardBody, { color: colors.text }]}>{exercise?.muscles_targeted?.join(", ") || "Full Body"}</Text>
        </SectionCard>

        {renderBulletList("Proper Form", exercise?.proper_form)}
        {renderBulletList("Tips & Tricks", exercise?.tips_and_tricks)}
        {renderBulletList("Common Mistakes", exercise?.common_mistakes)}

        <View style={{ height: 80 }} />
      </ScrollView>

      <View style={{ paddingVertical: 10, width: "90%", alignSelf: "center", alignItems: "center" }}>
        <Pressable
          style={styles.startBtn}
          // onPress={() => navigation.navigate("StartWorkoutScreen", { exercise })}
        >
          <Text style={styles.startText}>Start Exercise</Text>
          <AntDesign name="playcircleo" size={20} color="#fff" style={{ marginLeft: 6 }} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default WorkoutDetails;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },

  backBtn: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 10,
    backgroundColor: "#0008",
    padding: 8,
    borderRadius: 32,
  },

  scroll: {
    paddingBottom: 16,
    paddingTop: RFPercentage(3),
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
  },

  /* hero section */
  heroWrapper: {
    height: RFPercentage(30),
    width: "100%",
  },
  heroImg: {
    height: "100%",
    width: "100%",
    borderRadius: RFPercentage(2),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#0005",
  },
  heroTextWrap: {
    position: "absolute",
    bottom: 16,
    left: 20,
  },
  exerciseName: {
    color: "#fff",
    fontSize: 22,
    fontFamily: Fonts.Montserrat_SemiBold,
  },
  dayRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  dayText: {
    color: "#fff",
    marginLeft: 6,
    fontFamily: Fonts.Montserrat_Medium,
  },

  /* cards */
  card: {
    marginTop: 20,
    backgroundColor: "#1A1A1D",
    borderRadius: 12,
    padding: 16,
    width: "100%",
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: Fonts.SemiBold,
    marginBottom: 6,
    color: "#fff",
  },
  cardBody: {
    fontSize: 15,
    fontFamily: Fonts.Regular,
  },

  bulletRow: { flexDirection: "row", marginVertical: 4 },
  bulletText: {
    fontSize: 15,
    fontFamily: Fonts.Regular,
    flex: 1,
    flexWrap: "wrap",
    left: 6,
  },

  startBtn: {
    backgroundColor: Colors.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 12,
    width: "100%",
  },
  startText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: Fonts.SemiBold,
  },
});
