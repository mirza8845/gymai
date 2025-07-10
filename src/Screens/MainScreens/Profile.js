import React, { useContext } from "react";
import { View, Text, ScrollView, Image, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import profileImg from "../../assets/images/womanpic.png";
import Heading from "../../CommonComponent/Heading";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../utils/userContext";
import { Colors, Fonts } from "../../constants/theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// SVGs
import Profilesvg from "../../assets/svg/anotherProfile.svg";
import Favourite from "../../assets/svg/bigstar.svg";
import Retake from "../../assets/svg/retake.svg";
import Setting from "../../assets/svg/setting.svg";
import Help from "../../assets/svg/help.svg";
import Logout from "../../assets/svg/logout.svg";

const Profile = () => {
  const navigation = useNavigation();
  const { userData, setUserData } = useContext(UserContext);

  const profileOptions = [
    { icon: Profilesvg, title: "Profile", navigateTo: "EditProfile" },
    { icon: Favourite, title: "Favourite" },
    { icon: Retake, title: "Retake Questionnaire" },
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
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileCard}>
          <Image source={profileImg} style={styles.profileImage} />
          <Heading title={userData?.fullName} />
          <Text style={styles.email}>{auth().currentUser?.email}</Text>

          <Text style={styles.birthdayText}>
            <Text style={styles.birthdayLabel}>Nickname: </Text>
            <Text style={styles.birthdayValue}>{userData?.nickname}</Text>
          </Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userData?.weight}</Text>
              <Text style={styles.statLabel}>Weight</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userData?.age}</Text>
              <Text style={styles.statLabel}>Years Old</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userData?.height}</Text>
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
              <item.icon width={20} height={20} />
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
    backgroundColor: Colors.background,
  },
  container: {
    padding: 20,
    paddingBottom: 30,
  },
  profileCard: {
    // backgroundColor: "#000",
    borderRadius: 20,
    alignItems: "center",
    padding: 20,
    // shadowColor: "#6D6D6D",
    // elevation: 5,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 100,
    marginBottom: 15,
  },
  email: {
    color: "#999",
    fontFamily: Fonts.Medium,
    marginTop: 5,
  },
  birthdayText: {
    flexDirection: "row",
    marginTop: 5,
  },
  birthdayLabel: {
    color: "#fff",
    fontFamily: Fonts.SemiBold,
  },
  birthdayValue: {
    color: "#999",
    fontFamily: Fonts.Regular,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: "100%",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    color: "#fff",
    fontSize: 18,
    fontFamily: Fonts.Montserrat_Bold,
  },
  statLabel: {
    color: "#999",
    fontSize: 14,
    fontFamily: Fonts.Montserrat_Medium,
  },
  divider: {
    width: 2,
    height: 50,
    backgroundColor: "#333",
    alignSelf: "center",
  },
  optionsContainer: {
    marginTop: 30,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 4,
    shadowColor: "#6D6D6D",
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: Fonts.Montserrat_Medium,
    marginLeft: 10,
  },
});
