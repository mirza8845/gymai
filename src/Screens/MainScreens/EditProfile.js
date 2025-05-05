import { View, Text, ScrollView, Image, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import profileImg from '../../assets/images/womanpic.png';
import Heading from '../../CommonComponent/Heading';
import Paragraph from '../../CommonComponent/Paragraph';
import CommonInput from '../../CommonComponent/CommonInput';
import EditIcon from '../../assets/svg/edit.svg';


const EditProfile = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.profileContainer}>
          <View style={styles.imageContainer}>
            <Image source={profileImg} style={styles.profileImg} />
            <View style={styles.editIcon}>
              <EditIcon width={16} height={16} />
            </View>
          </View>

          <Heading title="Madison Smith" />
          <Paragraph title="madisons@example.com" />
          <Text style={styles.birthdayText}>
            <Text style={styles.birthdayLabel}>Birthday: </Text>
            <Text style={styles.birthdayValue}>April 1st</Text>
          </Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>75 Kg{'\n'}</Text>
              <Text style={styles.statLabel}>Weight</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>28{'\n'}</Text>
              <Text style={styles.statLabel}>Years Old</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>1.65 CM{'\n'}</Text>
              <Text style={styles.statLabel}>Height</Text>
            </View>
          </View>
        </View>

        <View style={styles.formSection}>
          <CommonInput label="Full name" placeholder="Enter Your Full Name" />
          <CommonInput label="Email" placeholder="Enter your Email" />
          <CommonInput label="Mobile Number" placeholder="Enter your Mobile Number" />
          <CommonInput label="Date of birth" placeholder="Enter your Date of birth" />
          <CommonInput label="Weight" placeholder="Enter your Weight" />
          <CommonInput label="Height" placeholder="Enter your Height" />
        </View>

        <Pressable style={styles.updateButton}>
          <Text style={styles.updateButtonText}>Update Profile</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  profileContainer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 20,
  },
  birthdayText: {
    marginTop: 10,
  },
  birthdayLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
  birthdayValue: {
    color: 'white',
    fontWeight: '200',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 52,
    paddingVertical: 30,
  },
  statItem: {
    alignItems: 'center',
    height: 23
  },
  statValue: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  statLabel: {
    color: 'white',
    fontWeight: '200',
    fontSize: 18,
  },
  formSection: {
    width: '85%',
    alignSelf: 'center',
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  updateButton: {
    backgroundColor: 'white',
    paddingVertical: 7,
    paddingHorizontal: 30,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 50,
  },
  updateButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignSelf: 'center',
    marginTop: 20,
    position: 'relative',
  },
  profileImg: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 5,
    backgroundColor: 'white',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
});
