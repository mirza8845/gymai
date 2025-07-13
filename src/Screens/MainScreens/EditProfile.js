import { View, Text, ScrollView, Image, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import profileImg from "../../assets/images/noDp.png";
import Heading from "../../CommonComponent/Heading";
import Paragraph from "../../CommonComponent/Paragraph";
import CommonInput from "../../CommonComponent/CommonInput";
import EditIcon from "../../assets/svg/edit.svg";
import { UserContext } from "../../utils/userContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import { launchImageLibrary } from "react-native-image-picker";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Colors, Fonts } from "../../constants/theme";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const EditProfile = () => {
  const { userData, setUserData } = useContext(UserContext);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [dob, setDob] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const [imageUri, setImageUri] = useState(null);

  const handleSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 1,
        selectionLimit: 1,
      },
      (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.errorCode) {
          console.log("Error: ", response.errorMessage);
        } else {
          const uri = response.assets?.[0]?.uri;
          setImageUri(uri);
        }
      }
    );
  };

  useEffect(() => {
    if (userData) {
      setFullName(userData.fullName || "");
      setEmail(userData.email || "");
      setMobileNumber(userData?.mobile || "");
      setDob(userData.dob || "");
      setWeight(userData.weight || "");
      setHeight(userData.height || "");
    }
  }, [userData]);

  const handleUpdate = async () => {
    const updatedData = {
      ...userData,
      fullName: fullName.trim(),
      email: email.trim(),
      mobileNumber: mobileNumber.trim(),
      dob: dob.trim(),
      weight: weight.trim(),
      height: height.trim(),
    };

    setUserData(updatedData);
    await AsyncStorage.setItem("userData", JSON.stringify(updatedData));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.profileContainer}>
          <View style={{ marginTop: RFPercentage(3), alignItems: "center", justifyContent: "center" }}>
            <TouchableOpacity onPress={handleSelectImage} style={[styles.profileImg, { borderWidth: 1, borderColor: Colors.primary, alignItems: "center", justifyContent: "center" }]}>
              <Image source={imageUri ? { uri: imageUri } : profileImg} style={{ width: 145, height: 145, borderRadius: 100 }} />
              <View style={styles.editIcon}>
                <TouchableOpacity onPress={handleSelectImage}>
                  <EditIcon width={16} height={16} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 20 }}>
            <Heading title={userData?.fullName} />
          </View>
          <View style={{ bottom: 20 }}>
            <Paragraph title={auth().currentUser?.email} />
          </View>
        </View>

        <View style={styles.formSection}>
          <CommonInput icon={"user"} placeholder="Enter Your Full Name" value={fullName} onChangeText={setFullName} />
          <CommonInput icon={"phone"} placeholder="Enter your Mobile Number" value={mobileNumber} onChangeText={setMobileNumber} />
          <CommonInput icon={"calendar-alt"} placeholder="Enter your Date of birth" value={dob} onChangeText={setDob} />
          <CommonInput icon={"weight"} placeholder="Enter your Weight" value={weight} onChangeText={setWeight} />
          <CommonInput icon={"ruler-vertical"} placeholder="Enter your Height" value={height} onChangeText={setHeight} />
        </View>

        <Pressable style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Update Profile</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

// Styles unchanged (can be customized further)
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  profileContainer: {
    paddingHorizontal: 20,
    alignItems: "center",
    paddingTop: 20,
  },
  birthdayText: { marginTop: 0 },
  birthdayLabel: { color: "white", fontFamily: Fonts.Montserrat_Medium },
  birthdayValue: { color: "white", fontFamily: Fonts.Montserrat_Regular },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 52,
    paddingTop: 30,
  },
  statItem: { alignItems: "center", height: 23 },
  statValue: { color: "white", fontSize: 17, fontFamily: Fonts.Montserrat_Medium },
  statLabel: { color: "white", fontFamily: Fonts.Montserrat_Regular, fontSize: 16 },
  formSection: {
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    marginTop:20
  },
  updateButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignSelf: "center",
    marginTop:50
  },
  updateButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: Fonts.Montserrat_Medium,
  },
  imageContainer: {
    alignSelf: "center",
    marginTop: 20,
    position: "relative",
  },
  profileImg: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 5,
    backgroundColor: "white",
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
});
