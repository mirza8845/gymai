import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import Heading from '../../CommonComponent/Heading';
import profileImg from '../../assets/images/womanpic.png';
import EditIcon from '../../assets/svg/edit.svg';
import CommonInput from '../../CommonComponent/CommonInput';

const ProfileQuestionaire = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Heading title="Fill Your Profile" />

      <View style={styles.imageContainer}>
        <Image source={profileImg} style={styles.profileImg} />
        <View style={styles.editIcon}>
          <EditIcon width={16} height={16} />
        </View>
      </View>

      <View style={styles.formSection}>
        <CommonInput
          label="Full name"
          placeholder="Enter Your Full Name"
        />
        <CommonInput
          label="Nickname"
          placeholder="Enter your Nick name"
        />
        <CommonInput
          label="Email"
          placeholder="Enter your Email"
        />
        <CommonInput
          label="Mobile Number"
          placeholder="Enter your Mobile Number"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Home')} >
        <Text style={styles.btntext} >Start</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileQuestionaire;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
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
  formSection: {
    width: '85%',
    alignSelf: 'center',
    marginTop: 40,
    paddingHorizontal:10
  },
  button: {
    width: '40%',
    height: 50,
    borderRadius: 20,
    backgroundColor: '#FFDD03',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  btntext: {
    fontSize: 25,
    fontWeight: '700',
    color: 'black'
  },
});
