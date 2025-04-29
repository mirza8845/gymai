import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import maleImg from '../../assets/images/Bot-Gender-Male.png';
import femaleImg from '../../assets/images/Bot-Gender-Female.png';
import Button from '../../CommonComponent/Button';
import Heading from '../../CommonComponent/Heading';

const GenderQuestionnaire = () => {
  const { colors } = useTheme();
  const navigation = useNavigation()

  return (
    <View style={styles.screen}>
      
      <Heading title="What’s Your Gender"/>

      <View style={styles.genderOptionsContainer}>
        <View style={styles.genderOption}>
          <Image source={maleImg} style={styles.genderImage} />
          <Text style={[styles.genderLabel, { color: colors.text }]}>Male</Text>
        </View>

        <View style={styles.genderOption}>
          <Image source={femaleImg} style={styles.genderImage} />
          <Text style={[styles.genderLabel, { color: colors.text }]}>Female</Text>
        </View>

        <Text style={[styles.other,{ color: colors.text }]}>Other</Text>
      </View>

      <Button title="continue" onPress={()=>navigation.navigate('ageQuestionnaire')}/>
    </View>
  );
};

export default GenderQuestionnaire;


const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 50,
      paddingVertical: 80,
    },
    genderOptionsContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    genderOption: {
      alignItems: 'center',
      marginBottom: 10,
    },
    genderImage: {
      width: 150,
      height: 150,
    },
    genderLabel: {
      fontSize: 21,
      fontWeight: '700',
      marginTop: 8,
    },
    other:{
      paddingTop:20
    }
  });