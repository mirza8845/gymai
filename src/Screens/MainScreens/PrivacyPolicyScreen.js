import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFPercentage } from "react-native-responsive-fontsize";

const darkColors = {
  background: "#000000",
  primary: "#F34E3A",
  primaryLight: "#F17C3B",
  surface: "#000000",
  surfaceElevated: "#1A1A1A",
  primaryDark: "#D83A28",
  textPrimary: "#FFFFFF",
  textSecondary: "#888888",
  textMuted: "#666768",
  border: "#3C3C3C",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  gradientStart: "#F34E3A",
  gradientEnd: "#FF6B4A",
};

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();

  const sections = [
    {
      title: "Information We Collect",
      content: `We collect the following types of information:
      
• **Personal Information**: When you create an account, we collect your email address, name, and basic profile information.

• **Workout Data**: Information about your workouts, exercises, sets, reps, weights, and progress.

• **Health Information**: Height, weight, age, fitness goals, and health metrics you choose to provide.

• **Usage Data**: How you use our app, including features you access, time spent, and preferences.

• **Device Information**: Device type, operating system, app version, and unique device identifiers.`,
    },
    {
      title: "How We Use Your Information",
      content: `We use your information to:
      
• Provide and personalize your workout experience
• Generate customized workout plans
• Track your progress and show statistics
• Improve our app's features and performance
• Send you important updates and notifications
• Respond to your support requests
• Ensure the security of your account`,
    },
    {
      title: "Data Security",
      content: `We implement industry-standard security measures to protect your data:

• **Encryption**: All data transmitted between the app and our servers is encrypted using TLS.

• **Secure Storage**: User data is stored in secure databases with access controls.

• **Authentication**: Secure login mechanisms including password protection.

• **Regular Audits**: We conduct regular security assessments of our systems.

However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.`,
    },
    {
      title: "Data Sharing",
      content: `We do not sell your personal information to third parties. We may share data only in these circumstances:

• **With Your Consent**: When you explicitly agree to share specific information.

• **Service Providers**: With trusted third parties who help us operate our service (e.g., cloud hosting, analytics).

• **Legal Requirements**: When required by law or to protect our rights, safety, or property.

• **Business Transfers**: In connection with a merger, acquisition, or sale of assets.`,
    },
    {
      title: "Your Rights",
      content: `You have the following rights regarding your data:

• **Access**: You can access your personal data through the app.

• **Correction**: You can update or correct your information in the app settings.

• **Deletion**: You can request deletion of your account and associated data.

• **Export**: You can request a copy of your data in a readable format.

• **Opt-Out**: You can opt out of non-essential communications and data sharing.

To exercise these rights, contact us at jazzy.tech007@gmail.com`,
    },
    {
      title: "Data Retention",
      content: `We retain your data for as long as your account is active or as needed to provide services. If you delete your account:

• Workout data and personal information are permanently deleted within 30 days.

• Some anonymized data may be retained for analytics purposes.

• Backup copies may exist for up to 60 days before permanent deletion.`,
    },
    {
      title: "Children's Privacy",
      content: `Our app is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately so we can remove the information.`,
    },
    {
      title: "Changes to This Policy",
      content: `We may update this Privacy Policy from time to time. We will notify you of any material changes by:

• Posting the new Privacy Policy in the app
• Sending an email notification
• Showing a prominent notice within the app

Your continued use of the app after changes constitutes acceptance of the updated policy.`,
    },
    {
      title: "Contact Us",
      content: `If you have any questions about this Privacy Policy, please contact us:

• Email: jazzy.tech007@gmail.com
• Phone: +923047428845
• Response Time: We aim to respond to all privacy inquiries within 48 hours.`,
    },
  ];

  const renderSection = (section, index) => (
    <View key={index} style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.numberCircle}>
          <Text style={styles.numberText}>{index + 1}</Text>
        </View>
        <Text style={styles.sectionTitle}>{section.title}</Text>
      </View>
      <Text style={styles.sectionContent}>{section.content}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Privacy Policy</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Last Updated */}
        <View style={styles.updateContainer}>
          <Ionicons name="time" size={16} color={darkColors.primary} />
          <Text style={styles.updateText}>Last Updated: January 19, 2024</Text>
        </View>

        {/* Introduction */}
        <View style={styles.introContainer}>
          <Text style={styles.introText}>
            Your privacy is important to us. This Privacy Policy explains how GymAI collects, uses, and protects your information when you use our fitness application.
          </Text>
        </View>

        {/* Policy Content */}
        <View style={styles.contentContainer}>
          {sections.map((section, index) => renderSection(section, index))}
        </View>

        {/* Agreement */}
        <View style={styles.agreementContainer}>
          <View style={styles.agreementHeader}>
            <Ionicons name="shield-checkmark" size={24} color={darkColors.success} />
            <Text style={styles.agreementTitle}>Your Agreement</Text>
          </View>
          <Text style={styles.agreementText}>
            By using GymAI, you acknowledge that you have read and understood this Privacy Policy and agree to the collection, use, and sharing of your information as described herein.
          </Text>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkColors.background,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: darkColors.border,
    marginTop: RFPercentage(6),
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Montserrat-Bold",
  },
  headerSpacer: {
    width: 40,
  },
  updateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(243, 78, 58, 0.1)",
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(243, 78, 58, 0.3)",
  },
  updateText: {
    color: darkColors.textPrimary,
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
    marginLeft: 8,
  },
  introContainer: {
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: "#0b0a0aff",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1d1c1cff",
  },
  introText: {
    color: darkColors.textSecondary,
    fontSize: 15,
    fontFamily: "Montserrat-Regular",
    lineHeight: 22,
  },
  contentContainer: {
    marginHorizontal: 20,
    marginTop: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  numberCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: darkColors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  numberText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Montserrat-Bold",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Montserrat-Bold",
    flex: 1,
  },
  sectionContent: {
    color: darkColors.textSecondary,
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
    lineHeight: 22,
    marginLeft: 40,
  },
  agreementContainer: {
    marginHorizontal: 20,
    marginTop: 32,
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.3)",
  },
  agreementHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  agreementTitle: {
    color: darkColors.success,
    fontSize: 18,
    fontFamily: "Montserrat-Bold",
    marginLeft: 12,
  },
  agreementText: {
    color: darkColors.textSecondary,
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
    lineHeight: 22,
  },
});

export default PrivacyPolicyScreen;