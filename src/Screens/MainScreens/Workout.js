import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions, Image } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import CircularProgress from "react-native-circular-progress-indicator";
import LinearGradient from "react-native-linear-gradient";
import { Colors, Fonts } from "../../constants/theme";

const { width } = Dimensions.get("window");

const Workouts = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Building Progress</Text>

      {/* Top Section */}
      <View style={styles.cardLarge}>
        <CircularProgress
          value={89}
          radius={60}
          maxValue={100}
          title={"Percent"}
          titleColor="#fff"
          titleStyle={{ fontSize: 12, fontFamily: Fonts.Montserrat_Medium }}
          valueFontSize={22}
          valueColor="#fff"
          activeStrokeWidth={12}
          inActiveStrokeColor="#3C3C3C"
          activeStrokeSecondaryColor="#F07C3B"
          activeStrokeColor="#F34E3A"
        />

        <View style={styles.activityInfo}>
          <Text style={styles.totalText}>
            <Text style={styles.highlight}>15</Text> / 20
          </Text>
          <Text style={styles.subLabel}>Total Activity</Text>
          <Text style={styles.caloriesLabel}>Calories Burned</Text>
          <Text style={styles.caloriesValue}>50K Cal</Text>
        </View>
      </View>

      {/* Middle Cards */}
      <View style={styles.cardRow}>
        <View style={styles.cardSmall}>
          <View style={styles.iconRow}>
            <FontAwesome5 name="running" size={16} color="#f44336" />
            <Text style={styles.cardHighlight}> 45</Text>
            <Text style={styles.cardDim}> / 60 Km</Text>
          </View>
          <Text style={styles.cardLabel}>Calories Burned</Text>
          <Text style={styles.cardValue}>25K Cal</Text>
        </View>
        <View style={styles.cardSmall}>
          <View style={styles.iconRow}>
            <FontAwesome5 name="moon" size={16} color="#f44336" />
            <Text style={styles.cardHighlight}> 21</Text>
            <Text style={styles.cardDim}> / 25 hrs</Text>
          </View>
          <Text style={styles.cardLabel}>Calories Burned</Text>
          <Text style={styles.cardValue}>25K Cal</Text>
        </View>
      </View>

      {/* Monitoring Section */}
      <Text style={styles.monitoringTitle}>Monitoring</Text>
      <Text style={styles.monitoringSubtitle}>Daily progress</Text>
      <View style={styles.barChartCard}>
        {[
          { day: "Mon", value: 100, gradient: ["#F34E3A", "#F17C3B","#333"], color: "#f44336" },
          { day: "Tue", value: 30, gradient: ["#999", "#333"], color: "#fff" },
          { day: "Wed", value: 70, gradient: ["#F34E3A",  "#F17C3B" , "#333"], color: "#fff" },
          { day: "Thu", value: 50, gradient: [ "#F17C3B", "#333"], color: "#fff" },
          { day: "Fri", value: 90, gradient: ["#F34E3A",  "#F17C3B" , "#333"], color: "#fff" },
          { day: "Sat", value: 20, gradient: ["#999", "#333"], color: "#fff" },
        ].map((item, idx) => (
          <View key={idx} style={styles.barContainer}>
            <Text style={[styles.barValue, { color: item.color }]}>{item.value === 80 ? item.value : ""}</Text>
            <LinearGradient colors={item.gradient} style={[styles.bar, { height: item.value }]} />
            <Text style={styles.barDay}>{item.day}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 20, paddingTop: 60 },
  title: { fontSize: 20, color: "#fff", alignSelf: "center", fontFamily: Fonts.Montserrat_Bold },
  cardLarge: {
    backgroundColor: "#000",
    flexDirection: "row",
    padding: 20,
    borderRadius: 20,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    shadowColor: "#6D6D6D",
    elevation: 5,
  },
  activityInfo: { flex: 1, marginLeft: 20 },
  totalText: { fontSize: 22, color: "#888", fontFamily: Fonts.Montserrat_Medium },
  highlight: { color: "#FF5722", fontFamily: Fonts.Montserrat_Bold },
  subLabel: { color: "#999", fontSize: 14, marginBottom: 5, fontFamily: Fonts.Montserrat_Medium },
  caloriesLabel: { color: "#999", fontSize: 14, fontFamily: Fonts.Montserrat_Medium },
  caloriesValue: { color: "#fff", fontSize: 16, fontFamily: Fonts.Montserrat_Bold },
  cardRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20, marginTop: 30 },
  cardSmall: {
    width: width / 2.3,
    backgroundColor: "#000",
    borderRadius: 20,
    padding: 15,
    shadowColor: "#6D6D6D",
    elevation: 5,
  },
  iconRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  cardHighlight: { fontSize: 18, color: "#f44336", fontFamily: Fonts.Montserrat_Bold },
  cardDim: { fontSize: 14, color: "#888", fontFamily: Fonts.Montserrat_Medium },
  cardLabel: { color: "#999", fontSize: 13, fontFamily: Fonts.Montserrat_Medium },
  cardValue: { color: "#fff", fontSize: 16, fontFamily: Fonts.Montserrat_Bold },
  monitoringTitle: { color: "#fff", fontSize: 18, fontFamily: Fonts.Montserrat_Bold , marginTop:20},
  monitoringSubtitle: { color: "#888", marginBottom: 10, fontFamily: Fonts.Montserrat_Medium },
  barChartCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#000",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    shadowColor: "#6D6D6D",
    elevation: 5,
  },
  barContainer: {
    alignItems: "center",
    justifyContent: "flex-end", 
    height: 150, 
  },

  bar: {
    width: 16,
    height: "100%",
    marginVertical: 5,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  barDay: { color: "#fff", fontSize: 12, fontFamily: Fonts.Montserrat_Medium },
  barValue: { fontSize: 10, marginBottom: 4 },
});

export default Workouts;
