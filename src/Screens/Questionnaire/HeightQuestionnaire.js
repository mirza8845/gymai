import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { RulerPicker } from "react-native-ruler-view";
import Button from "../../CommonComponent/Button";
import Heading from "../../CommonComponent/Heading";
import { Colors, Fonts } from "../../constants/theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";
import { UserContext } from "../../utils/userContext";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function HeightQuestionnaire() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const { userData, setUserData } = useContext(UserContext);

  const [selectedHeight, setSelectedHeight] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userData?.height) {
      const heightStr = userData.height.toString();
      const heightVal = parseInt(heightStr.replace("cm", ""));
      if (!isNaN(heightVal)) {
        setSelectedHeight(heightVal);
      }
    }
  }, [userData]);

  const handleContinue = async () => {
    if (selectedHeight === 0) {
      Toast.show({
        type: "info",
        text1: "Select Height",
        text2: "Please select your height to continue.",
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
      setLoading(true);
      await firestore()
        .collection("Users")
        .doc(currentUser.uid)
        .update({
          height: `${selectedHeight}cm`,
        });

      // ✅ Update context state
      setUserData((prev) => ({
        ...prev,
        height: `${selectedHeight}cm`,
      }));

      navigation.navigate("goalsQuestionnaire");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to update height. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center", paddingTop: RFPercentage(10) }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()} style={{ position: "absolute", left: 20 }}>
          <AntDesign name="arrowleft" color={"white"} size={RFPercentage(3.4)} />
        </TouchableOpacity>
        <Heading title="Height Selection" />
      </View>

      <Text style={{ marginTop: RFPercentage(6) }}>
        <Text style={[styles.selectedText, { color: colors.text }]}>{selectedHeight}</Text>
        <Text style={{ color: colors.text, fontFamily: Fonts.Montserrat_Regular }}>cm</Text>
      </Text>

      <View
        style={{
          padding: 0,
          margin: 0,
          width: 10,
          height: 380,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <RulerPicker
          unit=""
          min={0}
          max={300}
          step={1}
          width={10}
          indicatorHeight={80}
          height={350}
          vertical
          fractionDigits={0}
          initialValue={0}
          showLabels={true}
          gapBetweenSteps={14}
          containerStyle={{
            backgroundColor: "#4E4E4E",
            borderRadius: 9,
            padding: 0,
            margin: 0,
            width: 10,
            height: 350,
          }}
          valueTextStyle={{
            // color:'red',
            right: 10,
          }}
          theme={{
            indicatorColor: "white",
            shortStepColor: "white",
            longStepColor: "white",
            textColor: "white",
            backgroundColor: "transparent",
            fontWeight: "700",
            fontSize: 10,
          }}
          accessibility={{
            enabled: true,
            labelFormat: "Value: ${value}",
            announceValues: true,
          }}
          onValueChange={(val) => setSelectedHeight(Math.round(val))}
          formatLabel={(val) => `${Math.round(val)}`}
          animationConfig={{
            springConfig: {
              tension: 40,
              friction: 9,
            },
          }}
        />
      </View>

      <View style={{ marginTop: RFPercentage(5) }}>
        <Button title="Continue" onPress={handleContinue} loader={loading} disbaled={loading} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.background
  },
  selectedText: {
    fontSize: 48,
    fontFamily: Fonts.Medium,
  },
});
