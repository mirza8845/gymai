import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RulerPicker } from "react-native-ruler-view";
import Button from "../../CommonComponent/Button";
import Heading from "../../CommonComponent/Heading";
import { Fonts } from "../../constants/theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";

export default function HeightQuestionnaire() {
  const { colors } = useTheme();
  const [selectedHeight, setSelectedHeight] = React.useState(0);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

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
      <Heading title="Height" />

      <Text style={{ marginTop: RFPercentage(6) }}>
        <Text style={[styles.selectedText, { color: colors.text }]}>{selectedHeight}</Text>
        <Text style={{ color: colors.text, fontFamily: Fonts.Regular }}>cm</Text>
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
          max={1000}
          step={1}
          width={10}
          indicatorHeight={80}
          initialValue={20}
          height={350}
          vertical
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
          theme={{
            indicatorColor: "white",
            shortStepColor: "white",
            longStepColor: "white",
            textColor: "white",
            backgroundColor: "black",
            fontWeight: "700",
            fontSize: 10,
          }}
          accessibility={{
            enabled: true,
            labelFormat: "Value: ${value}",
            announceValues: true,
          }}
          onValueChange={(val) => setSelectedHeight(val)}
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
    paddingTop: 20,
    paddingHorizontal: 70,
  },
  selectedText: {
    fontSize: 48,
    // fontWeight: 700,
    fontFamily: Fonts.Medium,
  },
});
