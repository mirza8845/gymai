import React, { useState, useRef, useEffect } from "react";
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  StyleSheet, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableOpacity,
  Alert 
} from "react-native";
import Avatar from "../../assets/images/Avatar.png";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import { Colors, Fonts } from "../../constants/theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AnimatedDots from "../../utils/dotsAnimations";
import chatService from "../../services/chatService";
// If you're using the functional export version, import like this instead:
// import { sendMessage, clearHistory } from "./groqService";

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: "Hello, I'm GymAI! I'm your virtual fitness coach. How can I help you?",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef();

  // Optional: Load conversation history on mount
  useEffect(() => {
    // If you want to load previous conversation history
    // const history = chatService.getHistory();
    // if (history.length > 0) {
    //   // Convert history to chat messages format
    //   const chatHistory = history.map(msg => ({
    //     type: msg.role === 'user' ? 'user' : 'ai',
    //     text: msg.content
    //   }));
    //   setMessages(chatHistory);
    // }
  }, []);

  const handleSend = async () => {
    if (inputText.trim() === "") return;

    const userMessage = { type: "user", text: inputText };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    try {
      // Use Groq service to get response
      const aiReply = await chatService.sendMessage(inputText);
      
      // If using functional export:
      // const aiReply = await sendMessage(inputText);
      
      setIsTyping(false);
      setMessages((prev) => [...prev, { type: "ai", text: aiReply }]);
    } catch (error) {
      setIsTyping(false);
      console.error("Chat Error:", error.message);
      
      // Handle different error types
      let errorMessage = "Oops! Something went wrong. Please try again.";
      
      if (error.message.includes("Too many requests")) {
        errorMessage = "Please wait a moment before sending another message.";
      } else if (error.message.includes("Failed to get response")) {
        errorMessage = "Network error. Please check your connection.";
      }
      
      setMessages((prev) => [...prev, { 
        type: "ai", 
        text: errorMessage 
      }]);
      
      // Optional: Show alert for critical errors
      // Alert.alert("Error", errorMessage, [{ text: "OK" }]);
    }
  };

  // Optional: Function to clear conversation history
  const clearChatHistory = () => {
    Alert.alert(
      "Clear Chat History",
      "Are you sure you want to clear all chat history?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => {
            setMessages([
              {
                type: "ai",
                text: "Hello, I'm GymAI! I'm your virtual fitness coach. How can I help you?",
              },
            ]);
            chatService.clearHistory();
            // If using functional export:
            // clearHistory();
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={styles.flex} 
        keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 30}
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.robotIconContainer}>
            <MaterialCommunityIcons 
              name="robot" 
              color="white" 
              size={28} 
              style={styles.robotIcon} 
            />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>GymAI</Text>
            <View style={styles.statusWrapper}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Always active</Text>
            </View>
          </View>
          
          {/* Optional: Clear chat button */}
          {/* <TouchableOpacity onPress={clearChatHistory} style={styles.clearButton}>
            <Feather name="trash-2" color="#888" size={20} />
          </TouchableOpacity> */}
        </View>

        {/* Messages */}
        <ScrollView 
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false} 
          ref={scrollRef} 
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((msg, idx) =>
            msg.type === "user" ? (
              <View key={idx} style={styles.messageRowRight}>
                <View style={styles.messageBubbleSent}>
                  <Text style={styles.messageText}>{msg.text}</Text>
                </View>
              </View>
            ) : (
              <View key={idx} style={styles.messageRow}>
                <View style={styles.smallRobotContainer}>
                  <MaterialCommunityIcons name="robot" color="white" size={22} />
                </View>
                <View style={styles.messageBubbleReceived}>
                  <Text style={styles.messageText}>{msg.text}</Text>
                </View>
              </View>
            )
          )}

          {/* Typing Indicator */}
          {isTyping && (
            <View style={styles.messageRow}>
              <View style={styles.smallRobotContainer}>
                <MaterialCommunityIcons 
                  name="robot" 
                  color="white" 
                  size={22} 
                  style={styles.smallRobotIcon} 
                />
              </View>
              <View style={styles.messageBubbleReceived}>
                <AnimatedDots />
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input Area */}
        <View style={styles.inputRow}>
          <View style={styles.textInputContainer}>
            <TextInput 
              style={styles.textInput} 
              placeholder="Type a message..." 
              placeholderTextColor="#72777A" 
              value={inputText} 
              onChangeText={setInputText}
              onSubmitEditing={handleSend}
              multiline={true}
              maxLength={500}
            />
          </View>
          <TouchableOpacity 
            onPress={handleSend} 
            style={[
              styles.sendButton,
              !inputText.trim() && styles.sendButtonDisabled
            ]}
            disabled={!inputText.trim() || isTyping}
          >
            <Feather 
              name="send" 
              color={!inputText.trim() || isTyping ? "#666" : "white"} 
              size={23} 
              style={styles.sendIcon} 
            />
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
  robotIconContainer: {
    width: RFPercentage(8),
    height: RFPercentage(8),
    backgroundColor: "black",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  robotIcon: {
    bottom: 3,
  },
  headerTextContainer: {
    flex: 1,
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
  clearButton: {
    padding: 8,
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
    marginBottom: 20,
  },
  messageRowRight: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  smallRobotContainer: {
    width: 40,
    height: 40,
    backgroundColor: "black",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  smallRobotIcon: {
    bottom: 2,
  },
  messageBubbleReceived: {
    backgroundColor: "black",
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    padding: 15,
    maxWidth: "75%",
    elevation: 3,
    minHeight: 50,
    justifyContent: "center",
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
    lineHeight: 22,
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
    minHeight: 50,
    maxHeight: 100,
  },
  textInput: {
    color: "#fff",
    fontSize: 16,
    flex: 1,
    paddingVertical: 10,
    fontFamily: Fonts.Montserrat_Medium,
    maxHeight: 80,
  },
  sendButton: {
    backgroundColor: "#F34E3A",
    borderRadius: RFPercentage(100),
    justifyContent: "center",
    alignItems: "center",
    width: RFPercentage(5),
    height: RFPercentage(5),
  },
  sendButtonDisabled: {
    backgroundColor: "#333",
  },
  sendIcon: {
    top: 1,
    right: 1,
  },
});