import React, { useContext } from "react";
import { View, Text, ScrollView, Image, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import profileImg from "../../assets/images/noDp.png";
import Heading from "../../CommonComponent/Heading";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../utils/userContext";
import { Colors, Fonts } from "../../constants/theme";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const Profile = () => {
  const navigation = useNavigation();
  const { userData, setUserData } = useContext(UserContext);

  const profileOptions = [
    { icon: "user", title: "Profile", navigateTo: "EditProfile" },
    { icon: "star", title: "Favourite" },
    { icon: "redo", title: "Retake Questionnaire", navigateTo: "genderQuestionnaire" },
    { icon: "cog", title: "Setting" },
    { icon: "question-circle", title: "Help" },
    { icon: "sign-out-alt", title: "Logout" },
  ];

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("email");
      await AsyncStorage.removeItem("password");
      navigation.navigate("login");
      // setUserData(null);
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileCard}>
          <Image source={profileImg} resizeMode="contain" style={[styles.profileImage, { borderWidth: 1, borderColor: Colors.primary }]} />
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
              <FontAwesome5 name={item.icon} size={20} color="#fff" />
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
    fontFamily: Fonts.Montserrat_Medium,
  },
  birthdayText: {
    flexDirection: "row",
  },
  birthdayLabel: {
    color: "#fff",
    fontFamily: Fonts.Montserrat_Medium,
  },
  birthdayValue: {
    color: "#999",
    fontFamily: Fonts.Montserrat_Regular,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
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
