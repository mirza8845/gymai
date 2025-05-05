import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation, useTheme } from '@react-navigation/native';
import Heading from '../../CommonComponent/Heading';
import Input from '@ant-design/react-native/lib/input-item/Input';
import ContentImage from '../../assets/images/Content.png'

const ExerciseForm = () => {
  const { colors } = useTheme();
  const navigation = useNavigation()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.dateContainer}>
          <Text style={[styles.dateText, { color: colors.text }]}>June 09</Text>
          <View style={styles.timeContainer}>
            <AntDesign name="clockcircle" size={17} color={colors.text} />
            <Text style={[styles.timeText, { color: colors.text }]}>25 Mins</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Workout Title</Text>
        <Text style={styles.sectionSubtitle}>Description</Text>

        <Input
          placeholder="How Did Your Workout Go?"
          placeholderTextColor="#939495"
          style={styles.inputField}
        />

        <Text style={styles.sectionSubtitle}>Add Media</Text>
        <Image source={ContentImage} style={styles.mediaImage} />

        <View style={styles.buttonWrapper}>
          <Text style={styles.saveText}>Save workout</Text>
          <TouchableOpacity style={styles.saveButton} onPress={()=>navigation.navigate('SaveRoutineDate')}>
            <Text style={styles.saveButtonText}>Save routine</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExerciseForm;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  dateContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
  },
  timeContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 17,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: '500',
    paddingVertical: 20,
  },
  sectionSubtitle: {
    color: 'white',
    fontSize: 20,
  },
  inputField: {
    fontSize: 20,
    padding: 10,
    borderRadius: 8,
    marginBottom: 70,
  },
  mediaImage: {
    marginVertical: 15,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  buttonWrapper: {
    marginTop: 'auto',
    marginBottom: 30,
    alignItems: 'flex-end',
  },
  saveText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 30,
  },
  saveButton: {
    width: 150,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 19,
    color: 'black',
    fontWeight: '500',
  },
});
