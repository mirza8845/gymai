import React, { useState, useRef, useEffect } from "react";
import { View, Text, Image, ScrollView, StyleSheet, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import Avatar from "../../assets/images/Avatar.png";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import { Colors, Fonts } from "../../constants/theme";
import axios from "axios";
import { RFPercentage } from "react-native-responsive-fontsize";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AnimatedDots from "../../utils/dotsAnimations";

const GEMINI_API_KEY = "AIzaSyBNunMEcP-_CGwc4JHk5DPkTH3IU69GLR0";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: "Hello, I’m GymAI! I’m your virtual fitness coach. How can I help you?",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingDots, setTypingDots] = useState("");
  const scrollRef = useRef();

  useEffect(() => {
    let interval;
    if (isTyping) {
      let dotCount = 1;
      interval = setInterval(() => {
        setTypingDots("•".repeat(dotCount));
        dotCount = (dotCount % 3) + 1;
      }, 500);
    } else {
      setTypingDots("");
    }

    return () => clearInterval(interval);
  }, [isTyping]);

  const handleSend = async () => {
    if (inputText.trim() === "") return;

    const userMessage = { type: "user", text: inputText };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    const aiReply = await fetchGeminiResponse(inputText);
    setIsTyping(false);
    setMessages((prev) => [...prev, { type: "ai", text: aiReply }]);
  };

  const systemPrompt = `
You are GymAI, a virtual fitness trainer and coach.

Speak like a real gym coach — direct, confident, and motivational.
Always provide concise, relevant answers focused on fitness guidance.
Avoid saying "Alright", "Sure", or long introductions — get to the point.
Never say you are an AI or language model.
Only give practical gym-related advice in 1–3 short sentences.
`;

  const fetchGeminiResponse = async (text) => {
    try {
      const response = await axios.post(
        GEMINI_URL,
        {
          contents: [
            {
              parts: [{ text: systemPrompt + "\n\nUser: " + text }],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const aiText = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      return aiText || "I'm here to help you with your fitness goals!";
    } catch (error) {
      console.error("Gemini Error:", error.message);
      return "Oops! Something went wrong. Try again.";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.flex} keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 30}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View
            style={{
              width: RFPercentage(8),
              height: RFPercentage(8),
              backgroundColor: "black",
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialCommunityIcons name="robot" color="white" size={28} style={{ bottom: 3 }} />
          </View>
          <View>
            <Text style={styles.headerTitle}>GymAI</Text>
            <View style={styles.statusWrapper}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Always active</Text>
            </View>
          </View>
        </View>

        {/* Messages */}
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} ref={scrollRef} onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}>
          {messages.map((msg, idx) =>
            msg.type === "user" ? (
              <View key={idx} style={styles.messageRowRight}>
                <View style={styles.messageBubbleSent}>
                  <Text style={styles.messageText}>{msg.text}</Text>
                </View>
              </View>
            ) : (
              <View key={idx} style={styles.messageRow}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: "black",
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons name="robot" color="white" size={22} />
                </View>
                <View style={styles.messageBubbleReceived}>
                  <Text style={styles.messageText}>{msg.text}</Text>
                </View>
              </View>
            )
          )}

          {/* Typing Animation */}

          {isTyping && (
            <View style={styles.messageRow}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "black",
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons name="robot" color="white" size={22} style={{ bottom: 2 }} />
              </View>
              <View style={styles.messageBubbleReceived}>
                <AnimatedDots />
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputRow}>
          <View style={styles.textInputContainer}>
            <TextInput style={styles.textInput} placeholder="Type a message..." placeholderTextColor="#72777A" value={inputText} onChangeText={setInputText} onSubmitEditing={handleSend} />
          </View>
          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <Feather name="send" color="white" size={23} style={{ top: 1, right: 1 }} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  flex: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: Colors.background,
    zIndex: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    paddingBottom: 8,
  },
  avatarImageLarge: {
    width: 60,
    height: 60,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontFamily: Fonts.Montserrat_Bold,
  },
  statusWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#50d45dff",
    marginRight: 8,
  },
  statusText: {
    color: "#888",
    fontSize: 12,
    fontFamily: Fonts.Montserrat_Medium,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 50,
  },
  messageRowRight: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  avatarImageSmall: {
    width: 40,
    height: 40,
  },
  messageBubbleReceived: {
    backgroundColor: "black",
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    padding: 15,
    maxWidth: "75%",
    elevation: 3,
  },
  messageBubbleSent: {
    backgroundColor: "#F34E3A",
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 15,
    maxWidth: "75%",
    elevation: 3,
  },
  messageText: {
    color: "#fff",
    fontSize: 15,
    fontFamily: Fonts.Montserrat_Medium,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.background,
    gap: 10,
    borderTopWidth: 1,
    borderColor: "#222",
  },
  textInputContainer: {
    backgroundColor: "#1c1c1e",
    borderRadius: 30,
    flexDirection: "row",
    flex: 1,
    paddingHorizontal: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
  },
  textInput: {
    color: "#fff",
    fontSize: 16,
    flex: 1,
    paddingVertical: 10,
    fontFamily: Fonts.Montserrat_Medium,
  },
  micIcon: {
    color: "#888",
    marginLeft: 10,
  },
  sendButton: {
    backgroundColor: "#F34E3A",
    // padding: 12,
    borderRadius: RFPercentage(100),
    justifyContent: "center",
    alignItems: "center",
    width: RFPercentage(5),
    height: RFPercentage(5),
  },
});
