import { StyleSheet, TextInput, View } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import Heading from "../../CommonComponent/Heading";
import { useNavigation, useTheme } from "@react-navigation/native";
import Paragraph from "../../CommonComponent/Paragraph";
import Button from "../../CommonComponent/Button";
import { Fonts } from "../../constants/theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";
import { UserContext } from "../../utils/userContext";

const Modifications = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { userData, setUserData } = useContext(UserContext); // ✅ use context
  const [modificationText, setModificationText] = useState("");

  // ✅ Prefill if available
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

      // ✅ Update context
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
    <View style={[styles.wrapper, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        <Heading title="Modifications" />
        <Paragraph title="Do you need modifications for injuries or physical limitations?" />
        <View style={styles.modificationsNote}>
          <TextInput
            placeholder="If yes, please explain..."
            value={modificationText}
            onChangeText={setModificationText}
            multiline
            style={styles.input}
            placeholderTextColor="#999"
          />
        </View>
      </View>
      <Button title="Continue" onPress={handleContinue} />
    </View>
  );
};

export default Modifications;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingVertical: 80,
    paddingHorizontal: 37,
  },
  container: {
    flexGrow: 1,
  },
  modificationsNote: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    minHeight: RFPercentage(25),
    marginTop: RFPercentage(10),
  },
  input: {
    fontSize: 16,
    color: "black",
    fontFamily: Fonts.Regular,
    textAlignVertical: "top",
    flex: 1,
  },
});
