import React, { useContext } from "react";
import { View, Text, ScrollView, Image, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import profileImg from "../../assets/images/womanpic.png";
import Heading from "../../CommonComponent/Heading";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../utils/userContext";
import { Fonts } from "../../constants/theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import auth from "@react-native-firebase/auth";

// SVGs
import Profilesvg from "../../assets/svg/anotherProfile.svg";
import Favourite from "../../assets/svg/bigstar.svg";
import Retake from "../../assets/svg/retake.svg";
import Setting from "../../assets/svg/setting.svg";
import Help from "../../assets/svg/help.svg";
import Logout from "../../assets/svg/logout.svg";

// AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const navigation = useNavigation();
  const { userData, setUserData } = useContext(UserContext);

  const profileOptions = [
    { icon: Profilesvg, title: "Profile", navigateTo: "EditProfile" },
    { icon: Favourite, title: "Favourite" },
    { icon: Help, title: "Retake Questionnaire" },
    { icon: Setting, title: "Setting" },
    { icon: Help, title: "Help" },
    { icon: Logout, title: "Logout" },
  ];

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("email");
      await AsyncStorage.removeItem("password");
      setUserData(null);
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.profileContainer}>
          <Image source={profileImg} style={styles.profileImage} />
          <Heading title={userData?.fullName} />
          <Text style={{ color: "white", fontFamily: Fonts.Medium }}>{auth().currentUser?.email}</Text>
          <Text style={styles.birthdayText}>
            <Text style={styles.birthdayLabel}>Nickname: </Text>
            <Text style={styles.birthdayValue}>{userData?.nickname}</Text>
          </Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {userData?.weight}
                {"\n"}
              </Text>
              <Text style={styles.statLabel}>Weight</Text>
            </View>
            <View style={{ width: 2, height: 50, backgroundColor: "yellow", top: 5 }} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {userData?.age}
                {"\n"}
              </Text>
              <Text style={styles.statLabel}>Years Old</Text>
            </View>
            <View style={{ width: 2, height: 50, backgroundColor: "yellow", top: 5 }} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {userData?.height}
                {"\n"}
              </Text>
              <Text style={styles.statLabel}>Height</Text>
            </View>
          </View>
        </View>

        <View style={styles.optionsContainer}>
          {profileOptions.map((item, index) => (
            <Pressable
              key={index}
              style={styles.optionItem}
              onPress={() => {
                if (item.title === "Logout") {
                  handleLogout();
                } else if (item.navigateTo) {
                  navigation.navigate(item.navigateTo);
                }
              }}
            >
              <item.icon style={{ width: 20, height: 20 }} />
              <Text style={styles.optionText}>{item.title}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  profileContainer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 20,
  },
  birthdayText: {
    flexDirection: "row",
  },
  birthdayLabel: {
    color: "white",
    fontFamily: Fonts.SemiBold,
  },
  birthdayValue: {
    color: "white",
    fontFamily: Fonts.Regular,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 30,
    marginTop: 30,
  },
  statItem: {
    alignItems: "center",
    height: RFPercentage(4),
  },
  statValue: {
    color: "white",
    fontSize: 15,
    fontFamily: Fonts.SemiBold,
    top: 6,
  },
  statLabel: {
    color: "grey",
    fontSize: 16,
    fontFamily: Fonts.Regular,
  },
  optionsContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    paddingBottom: 20,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "rgba(135, 134, 134, 0.3)",
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 10,
  },
  optionText: {
    color: "white",
    fontSize: 16,
    fontFamily: Fonts.Medium,
    left: 10,
  },
});
