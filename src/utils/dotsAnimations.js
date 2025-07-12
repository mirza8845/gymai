import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay,
} from "react-native-reanimated";

const Dot = ({ delay }) => {
  const bounce = useSharedValue(0);

  useEffect(() => {
    bounce.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, { duration: 300 }),
        -1,
        true
      )
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: bounce.value * -5 }],
    opacity: bounce.value < 0.5 ? 0.4 : 1,
  }));

  return <Animated.View style={[styles.dot, style]} />;
};

const AnimatedDots = () => {
  return (
    <View style={styles.container}>
      <Dot delay={0} />
      <Dot delay={150} />
      <Dot delay={300} />
    </View>
  );
};

export default AnimatedDots;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingVertical: 5,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: "white",
    borderRadius: 4,
  },
});
