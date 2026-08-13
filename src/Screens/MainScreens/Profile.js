import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
  Alert,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import profileImg from "../../assets/images/noDp.png";
import Heading from "../../CommonComponent/Heading";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../utils/userContext";
import { Colors, Fonts } from "../../constants/theme";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";

const Profile = () => {
  const navigation = useNavigation();
  const { userData, setUserData } = useContext(UserContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  const profileOptions = [
    {
      icon: "user",
      title: "Profile",
      navigateTo: "EditProfile",
      color: "white",
    },
    {
      icon: "redo",
      title: "Retake Questionnaire",
      navigateTo: "genderQuestionnaire",
      color: "white",
    },
    {
      icon: "cog",
      title: "Setting",
      navigateTo: "SettingsScreen",
      color: "white",
    },
    {
      icon: "question-circle",
      title: "Help",
      navigateTo: "HelpScreen",
      color: "white",
    },
    { icon: "trash", title: "Delete Account", color: "red" },
    { icon: "sign-out-alt", title: "Logout", color: "red" },
  ];

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("email");
      await AsyncStorage.removeItem("password");
      setUserData(null);
      navigation.navigate("login");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const deleteAllUserWorkouts = async (userId) => {
    try {
      // Delete all workouts for this user
      const workoutsQuery = firestore()
        .collection("workouts")
        .where("userId", "==", userId);

      const workoutsSnapshot = await workoutsQuery.get();

      // Create batch delete operations
      const batch = firestore().batch();

      workoutsSnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      // Execute batch delete
      await batch.commit();
      console.log(`Deleted ${workoutsSnapshot.size} workout documents`);

      return workoutsSnapshot.size;
    } catch (error) {
      console.error("Error deleting workouts:", error);
      throw error;
    }
  };

  const deleteUserFromFirestore = async (userId) => {
    try {
      // Delete user document from 'users' collection
      await firestore().collection("users").doc(userId).delete();
      console.log("User document deleted from Firestore");
    } catch (error) {
      console.error("Error deleting user document:", error);
      // If user document doesn't exist, that's okay - just continue
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText.toLowerCase() !== "delete") {
      Alert.alert(
        "Confirmation Required",
        "Please type 'DELETE' in all caps to confirm account deletion.",
        [{ text: "OK" }],
      );
      return;
    }

    setIsDeleting(true);

    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        throw new Error("No user logged in");
      }

      const userId = currentUser.uid;
      const userEmail = currentUser.email;

      // Show confirmation alert
      Alert.alert(
        "Permanent Account Deletion",
        "Are you sure you want to delete your account? This action:\n\n• Cannot be undone\n• Will delete all your workout data\n• Will remove all personal information\n• Will log you out immediately",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete Account",
            style: "destructive",
            onPress: async () => {
              try {
                // 1. Delete all workout documents
                const deletedWorkoutsCount = await deleteAllUserWorkouts(
                  userId,
                );

                // 2. Delete user document from Firestore
                await deleteUserFromFirestore(userId);

                // 3. Delete authentication account
                await currentUser.delete();

                // 4. Clear local storage
                await AsyncStorage.removeItem("email");
                await AsyncStorage.removeItem("password");

                // 5. Update context
                setUserData(null);

                // 6. Show success message
                Alert.alert(
                  "Account Deleted",
                  `Your account and ${deletedWorkoutsCount} workouts have been permanently deleted.`,
                  [
                    {
                      text: "OK",
                      onPress: () => {
                        setShowDeleteModal(false);
                        navigation.navigate("login");
                      },
                    },
                  ],
                );
              } catch (error) {
                console.error("Error during account deletion:", error);

                // Check specific error cases
                if (error.code === "auth/requires-recent-login") {
                  Alert.alert(
                    "Re-authentication Required",
                    "For security, please log in again before deleting your account.",
                    [
                      { text: "Cancel", style: "cancel" },
                      {
                        text: "Re-login",
                        onPress: () => {
                          setShowDeleteModal(false);
                          handleLogout();
                        },
                      },
                    ],
                  );
                } else {
                  Alert.alert(
                    "Deletion Failed",
                    `Could not delete account: ${
                      error.message || "Unknown error"
                    }`,
                    [{ text: "OK" }],
                  );
                }
              } finally {
                setIsDeleting(false);
              }
            },
          },
        ],
      );
    } catch (error) {
      console.error("Error preparing account deletion:", error);
      Alert.alert(
        "Error",
        "Failed to initiate account deletion. Please try again.",
        [{ text: "OK" }],
      );
      setIsDeleting(false);
    }
  };

  const renderDeleteModal = () => (
    <Modal
      visible={showDeleteModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => !isDeleting && setShowDeleteModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <View style={styles.warningIconContainer}>
              <Ionicons name="warning" size={32} color="#EF4444" />
            </View>
            <Text style={styles.modalTitle}>Delete Account</Text>
            <Text style={styles.modalSubtitle}>
              This action is permanent and cannot be undone
            </Text>
          </View>

          {/* Warning Information */}
          <View style={styles.warningContainer}>
            <View style={styles.warningItem}>
              <Ionicons name="close-circle" size={20} color="#EF4444" />
              <Text style={styles.warningText}>
                All workout data will be permanently deleted
              </Text>
            </View>
            <View style={styles.warningItem}>
              <Ionicons name="close-circle" size={20} color="#EF4444" />
              <Text style={styles.warningText}>
                Personal information will be removed
              </Text>
            </View>
            <View style={styles.warningItem}>
              <Ionicons name="close-circle" size={20} color="#EF4444" />
              <Text style={styles.warningText}>
                This action cannot be reversed
              </Text>
            </View>
            <View style={styles.warningItem}>
              <Ionicons name="close-circle" size={20} color="#EF4444" />
              <Text style={styles.warningText}>
                You will be logged out immediately
              </Text>
            </View>
          </View>

          {/* Confirmation Input */}
          <View style={styles.confirmContainer}>
            <Text style={styles.confirmLabel}>
              Type <Text style={styles.confirmKeyword}>DELETE</Text> to confirm:
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={deleteConfirmText}
                onChangeText={setDeleteConfirmText}
                placeholder="Type DELETE here"
                placeholderTextColor="#666666"
                autoCapitalize="characters"
                editable={!isDeleting}
              />
              {deleteConfirmText.length > 0 && (
                <Text
                  style={[
                    styles.confirmStatus,
                    deleteConfirmText.toUpperCase() === "DELETE"
                      ? styles.confirmValid
                      : styles.confirmInvalid,
                  ]}
                >
                  {deleteConfirmText.toUpperCase() === "DELETE" ? "✓" : "✗"}
                </Text>
              )}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setShowDeleteModal(false)}
              disabled={isDeleting}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.modalButton,
                styles.deleteButton,
                (isDeleting || deleteConfirmText.toUpperCase() !== "DELETE") &&
                  styles.deleteButtonDisabled,
              ]}
              onPress={handleDeleteAccount}
              disabled={
                isDeleting || deleteConfirmText.toUpperCase() !== "DELETE"
              }
            >
              {isDeleting ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <>
                  <Text style={styles.deleteButtonText}>Delete Account</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileCard}>
          <Image
            source={
              userData?.profileImage
                ? { uri: userData?.profileImage }
                : profileImg
            }
            resizeMode="contain"
            style={[
              styles.profileImage,
              { borderWidth: 1, borderColor: Colors.primary },
            ]}
          />
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
                } else if (item.title === "Delete Account") {
                  setShowDeleteModal(true);
                  setDeleteConfirmText("");
                } else if (item.navigateTo) {
                  navigation.navigate(item.navigateTo);
                }
              }}
            >
              <FontAwesome5 name={item.icon} size={20} color={item.color} />
              <Text style={[styles.optionText, { color: item.color }]}>
                {item.title}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {renderDeleteModal()}
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
    borderRadius: 20,
    alignItems: "center",
    padding: 20,
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
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    backgroundColor: "#1A1A1A",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "#333",
  },
  modalHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  warningIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 24,
    fontFamily: Fonts.Montserrat_Bold,
    marginBottom: 8,
  },
  modalSubtitle: {
    color: "#EF4444",
    fontSize: 14,
    fontFamily: Fonts.Montserrat_Medium,
    textAlign: "center",
  },
  warningContainer: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.3)",
  },
  warningItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  warningText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: Fonts.Montserrat_Medium,
    marginLeft: 12,
    flex: 1,
  },
  confirmContainer: {
    marginBottom: 24,
  },
  confirmLabel: {
    color: "#fff",
    fontSize: 16,
    fontFamily: Fonts.Montserrat_Medium,
    marginBottom: 12,
  },
  confirmKeyword: {
    color: "#EF4444",
    fontFamily: Fonts.Montserrat_Bold,
  },
  inputContainer: {
    position: "relative",
  },
  textInput: {
    backgroundColor: "#000",
    borderWidth: 2,
    borderColor: "#333",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: "#fff",
    fontSize: 16,
    fontFamily: Fonts.Montserrat_Medium,
  },
  confirmStatus: {
    position: "absolute",
    right: 16,
    top: 16,
    fontSize: 20,
  },
  confirmValid: {
    color: "#10B981",
  },
  confirmInvalid: {
    color: "#EF4444",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  cancelButton: {
    backgroundColor: "#333",
    borderWidth: 1,
    borderColor: "#444",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: Fonts.Montserrat_Medium,
  },
  deleteButton: {
    backgroundColor: "#EF4444",
  },
  deleteButtonDisabled: {
    backgroundColor: "#7F1D1D",
    opacity: 0.7,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: Fonts.Montserrat_Bold,
  },
});
