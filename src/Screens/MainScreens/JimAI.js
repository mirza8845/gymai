import { View, Text, Image, ScrollView, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import Avatar from '../../assets/images/Avatar.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import Img from "../../assets/images/gymGirl.png";
import Icon from 'react-native-vector-icons/Feather';
import SendIcon from '../../assets/svg/send.svg';
import InfoCard from '../../CommonComponent/InfoCard';

const ChatScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerContainer}>
          <Image source={Avatar} style={styles.avatarImageLarge} />
          <View>
            <Text style={styles.headerTitle}>Jim AI</Text>
            <View style={styles.statusWrapper}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Always active</Text>
            </View>
          </View>
        </View>

        <Text style={styles.timestamp}>Wed 8:21 AM</Text>

        {/* Message from AI */}
        <View style={styles.messageRow}>
          <Image source={Avatar} style={styles.avatarImageSmall} />
          <Text style={styles.messageBubbleReceived}>
            Hello, I’m Jim AI! I’m your virtual fitness coach. How can I help you?
          </Text>
        </View>

        {/* Message from User */}
        <View style={styles.messageRowRight}>
          <Text style={styles.messageBubbleSent}>
            Hello, I’m Jim AI! I’m your virtual fitness coach. How can I help you?
          </Text>
        </View>

        {/* Another AI Message */}
        <View style={styles.messageRow}>
          <Image source={Avatar} style={styles.avatarImageSmall} />
          <Text style={styles.messageBubbleReceived}>
            Keep a firm shoulder-width grip, engage your core, and press straight up without arching your back. Lower to at least a 90-degree angle and avoid flaring your elbows too much. Need more details? Check out this article!
          </Text>
        </View>

       <InfoCard
        title="Shoulder Press Form" 
        subtitle="Tap to learn more" 
        imageSource={Img} 
        customWrapperStyle={{alignItems:'flex-end'}}
        customCardStyle={{width:300}}/>

        <View style={styles.inputRow}>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder='Type a message...'
              placeholderTextColor="#72777A"
            />
            <Icon name="mic" size={20} style={styles.micIcon} />
          </View>
          <View style={styles.sendButton}>
            <SendIcon />
          </View>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 30,
    paddingVertical: 60,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    paddingBottom: 10,
  },
  avatarImageLarge: {
    width: 60,
    height: 60,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    paddingTop: 10,
  },
  statusWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#7DDE86',
    marginRight: 8,
  },
  statusText: {
    color: '#72777A',
  },
  timestamp: {
    color: '#72777A',
    textAlign: 'center',
    padding: 20,
    fontSize: 18,
  },
  messageRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  avatarImageSmall: {
    width: 45,
    height: 45,
  },
  messageBubbleReceived: {
    backgroundColor: 'white',
    width: 300,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    fontSize: 16,
    color: '#3F6480',
  },
  messageRowRight: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  messageBubbleSent: {
    backgroundColor: '#0070F0',
    width: 300,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    fontSize: 16,
    color: 'white',
  },
  
  inputRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 20,
    paddingBottom:30,
    gap: 15,
    alignItems: 'center',
  },
  textInputContainer: {
    backgroundColor: 'white',
    borderRadius: 30,
    flexDirection: 'row',
    width: 280,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    color: '#72777A',
    fontSize: 17,
    flex: 1,
    paddingVertical: 10,
  },
  micIcon: {
    color: '#72777A',
    marginLeft: 10,
  },
  sendButton: {
    backgroundColor: '#3F6480',
    padding: 10,
    borderRadius: 35,
  },
});

export default ChatScreen;
