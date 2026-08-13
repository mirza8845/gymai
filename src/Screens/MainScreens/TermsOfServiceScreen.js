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

const TermsOfServiceScreen = () => {
  const navigation = useNavigation();

  const sections = [
    {
      title: "Acceptance of Terms",
      content: `By downloading, installing, or using GymAI ("the App"), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the App.

These terms constitute a legally binding agreement between you and GymAI regarding your use of the fitness application services.`,
    },
    {
      title: "Description of Service",
      content: `GymAI provides:

• Personalized workout plan generation based on user inputs
• Exercise tracking and progress monitoring
• Hydration tracking features
• Fitness statistics and analytics
• Educational fitness content

We reserve the right to modify, suspend, or discontinue any part of the service at any time without notice.`,
    },
    {
      title: "User Accounts",
      content: `To use certain features, you must create an account:

• **Accuracy**: You must provide accurate and complete information
• **Security**: You are responsible for maintaining account security
• **Age Requirement**: You must be at least 13 years old to use the App
• **Single User**: Accounts are for individual use only
• **Termination**: We may suspend or terminate accounts for violation of terms

You must notify us immediately of any unauthorized account access.`,
    },
    {
      title: "Health Disclaimer",
      content: `IMPORTANT: GymAI is a fitness tracking application, not a medical tool.

• **Consult Professionals**: Always consult with a healthcare provider before beginning any exercise program
• **Listen to Your Body**: Do not exercise through pain or discomfort
• **Individual Results**: Results vary based on individual factors
• **No Medical Advice**: The App does not provide medical advice or diagnosis

We are not responsible for any injuries or health issues resulting from use of workout suggestions.`,
    },
    {
      title: "User Responsibilities",
      content: `You agree to:

• Use the App only for lawful purposes
• Not attempt to hack, reverse engineer, or modify the App
• Not use automated systems to access the service
• Not share content that is illegal, harmful, or infringing
• Respect the intellectual property rights of others
• Not use the App to harass, threaten, or harm others

Violation may result in account termination and legal action.`,
    },
    {
      title: "Subscription and Payments",
      content: `Some features may require subscription:

• **Free Features**: Basic functionality is available without payment
• **Subscription Plans**: Premium features require subscription
• **Auto-Renewal**: Subscriptions automatically renew unless cancelled
• **Cancellation**: You may cancel at any time via app store settings
• **Refunds**: Subscription fees are non-refundable unless required by law

Prices are subject to change with notice to existing subscribers.`,
    },
    {
      title: "Intellectual Property",
      content: `All rights reserved:

• **Our Content**: Workout plans, exercises, and app content are protected by copyright
• **Your Data**: You retain ownership of your personal data
• **License Grant**: You grant us license to use your data to provide services
• **Trademarks**: "GymAI" and associated logos are our trademarks
• **Restrictions**: You may not copy, modify, or distribute App content without permission

Unauthorized use may violate copyright and trademark laws.`,
    },
    {
      title: "Limitation of Liability",
      content: `To the maximum extent permitted by law:

• We are not liable for indirect, incidental, or consequential damages
• Total liability is limited to the amount you paid for services
• We do not guarantee uninterrupted or error-free service
• We are not liable for third-party actions or content
• Some jurisdictions do not allow liability limitations, so this may not apply to you

This does not affect liability for personal injury or death caused by negligence.`,
    },
    {
      title: "Termination",
      content: `We may terminate or suspend your access:

• For violations of these terms
• For prolonged inactivity
• If required by law
• For security reasons
• At our discretion with notice

Upon termination:
• Your right to use the App ceases immediately
• You must delete the App from your devices
• We may retain anonymized data as permitted by law`,
    },
    {
      title: "Changes to Terms",
      content: `We may update these terms:

• We will provide notice of material changes
• Continued use after changes constitutes acceptance
• Changes will be effective upon posting
• We encourage you to review terms periodically
• We will update the "Last Updated" date

If you disagree with changes, you must stop using the App.`,
    },
    {
      title: "Governing Law",
      content: `These terms are governed by and construed in accordance with applicable laws.

• **Jurisdiction**: Disputes will be resolved in the appropriate courts
• **Severability**: If any provision is invalid, the rest remains effective
• **Waiver**: Failure to enforce a right does not waive that right
• **Entire Agreement**: These terms constitute the entire agreement between parties`,
    },
    {
      title: "Contact Information",
      content: `For questions about these Terms of Service:

• Email: jazzy.tech007@gmail.com
• Phone: +923047428845
• Response Time: We aim to respond to inquiries within 48 hours

Please include "Terms of Service Inquiry" in your subject line.`,
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
          <Text style={styles.headerTitle}>Terms of Service</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Last Updated */}
        <View style={styles.updateContainer}>
          <Ionicons name="alert-circle" size={16} color={darkColors.warning} />
          <Text style={styles.updateText}>Last Updated: January 19, 2024</Text>
        </View>

        {/* Important Notice */}
        <View style={styles.noticeContainer}>
          <Ionicons name="warning" size={24} color={darkColors.warning} />
          <Text style={styles.noticeTitle}>Important Legal Notice</Text>
          <Text style={styles.noticeText}>
            Please read these terms carefully. By using GymAI, you agree to these terms. If you do not agree, do not use the application.
          </Text>
        </View>

        {/* Terms Content */}
        <View style={styles.contentContainer}>
          {sections.map((section, index) => renderSection(section, index))}
        </View>

        {/* Acceptance Section */}
        <View style={styles.acceptanceContainer}>
          <View style={styles.acceptanceHeader}>
            <Ionicons name="checkmark-circle" size={24} color={darkColors.success} />
            <Text style={styles.acceptanceTitle}>Acceptance of Terms</Text>
          </View>
          <Text style={styles.acceptanceText}>
            By continuing to use GymAI, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.
          </Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.acceptButtonText}>I Understand</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.declineButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.declineButtonText}>Decline</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: "rgba(245, 158, 11, 0.1)",
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.3)",
  },
  updateText: {
    color: darkColors.warning,
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
    marginLeft: 8,
  },
  noticeContainer: {
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: "rgba(245, 158, 11, 0.1)",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(245, 158, 11, 0.3)",
    alignItems: "center",
  },
  noticeTitle: {
    color: darkColors.warning,
    fontSize: 18,
    fontFamily: "Montserrat-Bold",
    marginTop: 12,
    marginBottom: 8,
  },
  noticeText: {
    color: darkColors.textSecondary,
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
    lineHeight: 22,
    textAlign: "center",
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
  acceptanceContainer: {
    marginHorizontal: 20,
    marginTop: 32,
    backgroundColor: "#0b0a0aff",
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1d1c1cff",
  },
  acceptanceHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  acceptanceTitle: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Montserrat-Bold",
    marginLeft: 12,
  },
  acceptanceText: {
    color: darkColors.textSecondary,
    fontSize: 15,
    fontFamily: "Montserrat-Regular",
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  acceptButton: {
    flex: 1,
    backgroundColor: darkColors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  acceptButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
  },
  declineButton: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: darkColors.border,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  declineButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
  },
});

export default TermsOfServiceScreen;