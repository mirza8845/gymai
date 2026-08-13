import React, { useRef, useState } from "react";
import { Animated, Easing, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import workout from "../../assets/images/workout.png";
import appleicon from "../../assets/images/Nutrition.png";
import personsicon from "../../assets/images/Community.png";
import stepActive from "../../assets/images/stepperactive.png";
import stepInactive from "../../assets/images/stepperinactive.png";
import img2 from "../../assets/images/img2.png";
import img3 from "../../assets/images/img3.png";
import img1 from "../../assets/images/img1.png";
import { useNavigation } from "@react-navigation/native";
import { Fonts } from "../../constants/theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import LinearGradient from "react-native-linear-gradient";

const steps = [
  {
    icon: workout,
    image: img1,
    text: `Get Stronger for\nPreparation`,
  },
  {
    icon: appleicon,
    image: img2,
    text: `Build Your Mind\nand Body`,
  },
  {
    icon: personsicon,
    image: img3,
    text: "Running to Your\nDream",
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
      <StatusBar translucent={true} backgroundColor={"transparent"} barStyle={"light-content"} />
      <Animated.Image source={steps[stepIndex]?.image} style={styles.backgroundImage} resizeMode="cover" />
      <LinearGradient colors={["rgba(0, 0, 0, 0.4)", "rgba(0, 0, 0, 1)"]} style={styles.gradient}>
        <Animated.View style={[styles.content]}>
          <Text style={styles.description}>{steps[stepIndex]?.text}</Text>
          <Text style={{ color: "#d8d4d4ff", fontFamily: Fonts.Montserrat_Italic, fontSize: 16,  }}>Be an Inspiration</Text>

          <View style={styles.stepperline}>
            {steps.map((_, index) => (
              <View key={index} style={[styles.dot, index === stepIndex ? styles.activeDot : styles.inactiveDot]} />
            ))}
          </View>

          <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>{stepIndex === steps.length - 1 ? "Get Started" : "Next"}</Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
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
    width: 50,
    height: 50,
  },
  gradient: {
    width: "100%",
    height: RFPercentage(40),
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
  },
  description: {
    color: "white",
    fontSize: 26,
    textAlign: "center",
    fontFamily: Fonts.Lora_Bold,
    bottom:16
  },
  stepperline: {
    flexDirection: "row",
    gap: 3,
    marginTop: 15,
  },
  stepIcon: {
    width: 18,
    height: 5,
    borderRadius: 20,
  },
  button: {
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#F34E3A",
    width: RFPercentage(22),
    height: RFPercentage(6),
    marginTop: 45,
  },
  buttonText: {
    color: "#F34E3A",
    fontSize: RFPercentage(2),
    textAlign: "center",
    fontFamily: Fonts.Montserrat_SemiBold,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  dot: {
    width: 20,
    height: 7,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  activeDot: {
    backgroundColor: "#fff",
  },
  inactiveDot: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
});
