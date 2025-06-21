import React, { useRef, useState } from "react";
import { Animated, Easing, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import workout from "../../assets/images/workout.png";
import appleicon from "../../assets/images/appleVector.png";
import personsicon from "../../assets/images/personsVector.png";
import stepActive from "../../assets/images/stepperactive.png";
import stepInactive from "../../assets/images/stepperinactive.png";
import img2 from "../../assets/images/img2.jpg";
import img3 from "../../assets/images/img3.jpg";
import img1 from "../../assets/images/img1.jpg";
import { useNavigation } from "@react-navigation/native";
import { Fonts } from "../../constants/theme";
import { RFPercentage } from "react-native-responsive-fontsize";

const steps = [
  {
    icon: workout,
    image: img1,
    text: "Personalised workouts designed around your goals and lifestyle.",
  },
  {
    icon: appleicon,
    image: img2,
    text: "Health & Nutrition advice to support your recovery",
  },
  {
    icon: personsicon,
    image: img3,
    text: "Join Our Community, Reach Your Potential",
  },
];

const Onboarding = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();

  const handleNext = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      if (stepIndex < steps.length - 1) {
        setStepIndex((prev) => prev + 1);
      } else {
        navigation.navigate("login");
        return;
      }
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View style={styles.container}>
      <Animated.Image source={steps[stepIndex].image} style={styles.backgroundImage} resizeMode="cover" />

      {/* Black Overlay */}
      <View style={styles.overlay} />

      <Animated.View style={[styles.content]}>
        <Image source={steps[stepIndex].icon} style={styles.logo} resizeMode="contain" />
        <Text style={styles.description}>{steps[stepIndex].text}</Text>

        <View style={styles.stepperline}>
          {steps.map((_, index) => (
            <Image key={index} source={index === stepIndex ? stepActive : stepInactive} style={styles.stepIcon} />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>{stepIndex === steps.length - 1 ? "Get Started" : "Next"}</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  logo: {
    width: 30,
    height: 50,
  },
  description: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
    width: "80%",
    fontFamily: Fonts.Bold,
  },
  stepperline: {
    flexDirection: "row",
    marginBottom: 30,
    gap: 3,
  },
  stepIcon: {
    width: 18,
    height: 3,
  },
  button: {
    backgroundColor: "rgba(196, 184, 184, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 20,
    width: RFPercentage(20),
    height: RFPercentage(6),
  },
  buttonText: {
    color: "#fff",
    fontSize: RFPercentage(2),
    textAlign: "center",
    fontFamily: Fonts.SemiBold,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Adjust opacity as needed
  },
});
