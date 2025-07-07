import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import Heading from "../../CommonComponent/Heading";
import { useNavigation, useTheme } from "@react-navigation/native";
import Paragraph from "../../CommonComponent/Paragraph";
import Button from "../../CommonComponent/Button";
import { Colors, Fonts } from "../../constants/theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";
import { UserContext } from "../../utils/userContext";
import AntDesign from "react-native-vector-icons/AntDesign";

const Modifications = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { userData, setUserData } = useContext(UserContext);
  const [modificationText, setModificationText] = useState("");

  useEffect(() => {
    if (userData?.modifications) {
      setModificationText(userData.modifications);
    }
  }, [userData]);

  const handleContinue = async () => {
    const currentUser = auth().currentUser;
    if (!currentUser) {
      Toast.show({
        type: "error",
        text1: "Authentication Error",
        text2: "User not authenticated.",
      });
      return;
    }

    try {
      const trimmed = modificationText.trim();

      await firestore().collection("Users").doc(currentUser.uid).update({
        modifications: trimmed,
      });

      setUserData((prev) => ({
        ...prev,
        modifications: trimmed,
      }));

      navigation.navigate("availableEquipment");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to save modifications.",
      });
    }
  };

  return (
    <View style={[styles.wrapper, { backgroundColor: Colors.background }]}>
      <View style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%" }}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()} style={{ position: "absolute", left: 0 }}>
            <AntDesign name="arrowleft" color={"white"} size={RFPercentage(4)} />
          </TouchableOpacity>
          <Heading title={"Modifications"} />
        </View>
        <Paragraph title="Do you need modifications for injuries or physical limitations?" />
        <View style={styles.modificationsNote}>
          <TextInput placeholder="If yes, please explain..." value={modificationText} onChangeText={setModificationText} multiline style={styles.input} placeholderTextColor="#999" />
        </View>
      </View>
      <View style={{ top: 50 }}>
        <Button title="Continue" onPress={handleContinue} />
      </View>
    </View>
  );
};

export default Modifications;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: RFPercentage(10),
    paddingHorizontal: RFPercentage(2),
  },
  container: {
    // flexGrow: 1,
    // backgroundColor:'red'
  },
  modificationsNote: {
    backgroundColor: "#080808",
    borderRadius: RFPercentage(2),
    padding: 18,
    minHeight: RFPercentage(25),
    marginTop: RFPercentage(13),
    marginHorizontal: RFPercentage(2),
  },
  input: {
    fontSize: 16,
    color: "white",
    fontFamily: Fonts.Montserrat_Regular,
    textAlignVertical: "top",
    flex: 1,
  },
});
