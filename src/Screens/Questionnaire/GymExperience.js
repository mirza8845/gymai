import { StyleSheet, Text, View , TouchableOpacity} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Heading from "../../CommonComponent/Heading";
import { useNavigation, useTheme } from "@react-navigation/native";
import Button from "../../CommonComponent/Button";
import { Colors, Fonts } from "../../constants/theme";
import Option from "../../CommonComponent/Option";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import Toast from "react-native-toast-message";
import { UserContext } from "../../utils/userContext";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RFPercentage } from "react-native-responsive-fontsize";
import Paragraph from "../../CommonComponent/Paragraph";


const availabilityOptions = [
  "Complete Novice",
  "Beginner",
  "Intermediate",
  "Advance",
];

const GymExperience = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const { userData, setUserData } = useContext(UserContext); 
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (userData?.gymExperience) {
      setSelectedOption(userData.gymExperience);
    }
  }, [userData]);

  const handleContinue = async () => {
    if (!selectedOption) {
      Toast.show({
        type: "info",
        text1: "Select Experience",
        text2: "Please select your gym experience to continue.",
      });
      return;
    }

    const currentUser = auth().currentUser;
    if (!currentUser) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "User not authenticated.",
      });
      return;
    }

    try {
      await firestore()
        .collection("Users")
        .doc(currentUser.uid)
        .update({
          gymExperience: selectedOption,
        });

      setUserData((prev) => ({
        ...prev,
        gymExperience: selectedOption,
      }));

      navigation.navigate("availiabiltyQuestioniare");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to update gym experience.",
      });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors.background }]}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()} style={{ position: "absolute", left: 0 }}>
          <AntDesign name="arrowleft" color={"white"} size={RFPercentage(3.1)} />
        </TouchableOpacity>
        <Heading title={"Gym Experience"} />
      </View>

       <Paragraph title={"Select your gym experience"} />
      <View style={styles.optionsContainer}>
        {availabilityOptions.map((opt, index) => (
          <Option
            key={index}
            label={opt}
            selected={selectedOption === opt}
            onPress={() => setSelectedOption(opt)}
          />
        ))}
      </View>

      <Button title="Continue" onPress={handleContinue} />
    </View>
  );
};

export default GymExperience;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: RFPercentage(10),
    paddingHorizontal: RFPercentage(2.8),
  },
  optionsContainer: {
    gap: 15,
    alignItems: "center",
    marginTop:RFPercentage(12),
    // paddingHorizontal:RFPercentage(2),
    marginBottom:RFPercentage(5)
  },
});
