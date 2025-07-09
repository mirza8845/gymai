// ChartComponent.js

import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
import { Colors, Fonts } from "../constants/theme";

const { width } = Dimensions.get("window");
const chartWidth = width - 45;
const chartHeight = 100;

const dataPoints = [40, 70, 60, 80, 70]; // sample values

// Bezier curve generator
const generateSmoothPath = (points, width, height) => {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const stepX = width / (points.length - 1);
  const scaleY = (y) => height - ((y - min) / (max - min)) * height;

  let d = "";
  points.forEach((point, i) => {
    const x = i * stepX;
    const y = scaleY(point);
    if (i === 0) {
      d += `M ${x} ${y}`;
    } else {
      const prevX = (i - 1) * stepX;
      const prevY = scaleY(points[i - 1]);
      const midX = (prevX + x) / 2;
      d += ` Q ${prevX} ${prevY}, ${midX} ${(prevY + y) / 2}`;
      d += ` T ${x} ${y}`;
    }
  });

  return d;
};

const ChartComponent = () => {
  const path = generateSmoothPath(dataPoints, chartWidth, chartHeight);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Status</Text>

      <Svg width={chartWidth} height={chartHeight} style={styles.chart}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={'rgb(235, 108, 16)'} stopOpacity="0.5" />
            <Stop offset="1" stopColor="#0B0B0B" stopOpacity="0.3" />
          </LinearGradient>
        </Defs>

        {/* Fill under the curve */}
        <Path d={`${path} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`} fill="url(#grad)" />

        {/* Smooth curve line */}
        <Path d={path} stroke={'rgb(157, 57, 24)'} strokeWidth={2} fill="none" />
      </Svg>

      {/* Day labels */}
      <View style={styles.daysRow}>
        {["day 1", "day 2", "day 3", "day 4", "day 5"].map((day, i) => (
          <Text key={i} style={styles.dayText}>
            {day}
          </Text>
        ))}
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>78</Text>
          <Text style={styles.statLabel}>BPM</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>340</Text>
          <Text style={styles.statLabel}>KKAL</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>120</Text>
          <Text style={styles.statLabel}>Weight</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    borderRadius: 20,
    paddingHorizontal: 5,
    margin: 20,
    elevation: 5,
    shadowColor: "#6D6D6D",
    paddingVertical:20
  },
  title: {
    color: "#727272",
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
    fontFamily: Fonts.Montserrat_Medium,
  },
  chart: {
    marginTop: 10,
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  dayText: {
    color: "#727272",
    fontSize: 12,
    fontFamily: Fonts.Montserrat_Regular,
    marginHorizontal:10
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 25,
  },
  statBox: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    color: "#fff",
    fontFamily: Fonts.Montserrat_Bold,
  },
  statLabel: {
    color: "#727272",
    marginTop: 3,
    fontSize: 14,
    fontFamily: Fonts.Montserrat_Medium,
  },
});

export default ChartComponent;
