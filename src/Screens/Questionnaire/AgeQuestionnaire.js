import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import HorizontalPicker from '@vseslav/react-native-horizontal-picker';
import { RulerPicker } from 'react-native-ruler-view';
import Button from '../../CommonComponent/Button';
import Heading from '../../CommonComponent/Heading';
import { Dimensions } from 'react-native';


const AgeQuestionnaire = () => {
  const [unit, setUnit] = useState('kg');
  const { colors } = useTheme();
  const ageOptions = Array.from(Array(100).keys());
  const navigation = useNavigation();
  const [selectedHeight, setSelectedHeight] = useState(0);
  const [selectedAgeIndex, setSelectedAgeIndex] = useState(0);

   const renderItem = (item, index) => (
      <View style={questionnaireStyles.pickerItem}>
        <Text
          style={[
            questionnaireStyles.pickerItemText,
            index === selectedAgeIndex && questionnaireStyles.selectedPickerItemText,
          ]}
        >
          {item}
        </Text>
      </View>
    );
  

  return (
    <View style={[questionnaireStyles.container, { backgroundColor: colors.background }]}>
      <Heading title="Age" />
      <View style={questionnaireStyles.pickerWrapper}>
             <HorizontalPicker
               data={ageOptions}
               renderItem={renderItem}
               itemWidth={100}
               snapToAlignment="center"
               snapToInterval={100}
               decelerationRate="fast"
               contentContainerStyle={{
                 paddingHorizontal: (Dimensions.get('window').width - 100) / 2.,
               }}
               onChange={(index) => setSelectedAgeIndex(index)}
               initialIndex={selectedAgeIndex}
             />
             <View style={questionnaireStyles.selectorLineRight} />
             <View style={questionnaireStyles.selectorLineLeft} />
           </View>
      <Text style={[questionnaireStyles.heading, { color: colors.text }]}>Weight</Text>
      <View style={questionnaireStyles.weightToggle}>
        <Pressable onPress={() => setUnit('kg')}>
          <Text style={questionnaireStyles.unitText}>KG</Text>
        </Pressable>

        <View style={questionnaireStyles.verticalDivider} />
        <Pressable onPress={() => setUnit('LB')}>
          <Text style={questionnaireStyles.unitText}>LB</Text>
        </Pressable>
      </View>

      <RulerPicker
        unit={unit}
        min={0}
        max={600}
        step={1}
        width={500}
        indicatorHeight={80}
        height={50}
        showLabels={true}
        containerStyle={{
          backgroundColor: '#4E4E4E',
          borderRadius: 5,
          padding: 10,
        }}
        theme={{
          indicatorColor: 'white',
          shortStepColor: 'white',
          longStepColor: 'white',
          textColor: 'white',
          backgroundColor: 'black',
          fontWeight: '700',
          fontSize: 10,
        }}
        accessibility={{
          enabled: true,
          labelFormat: `Value: \${value} ${unit}`,
          announceValues: true,
        }}
        onValueChange={(val) => setSelectedHeight(val)}
        animationConfig={{
          springConfig: {
            tension: 40,
            friction: 7,
          },
        }}
      />

      <Button title="Continue" onPress={() => navigation.navigate('heightQuestionnaire')} />
    </View>
  );
};

export default AgeQuestionnaire;

const questionnaireStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerWrapper: {
    width: '100%',
    height: 70,
    backgroundColor: '#4E4E4E',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    position: 'relative',
  },
  pickerItem: {
    width: 100,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4E4E4E',

  },
  pickerItemText: {
    fontSize: 40,
    color: '#1E1E1E',
    fontWeight: 'bold',
  },
  selectedPickerItemText: {
    fontSize: 48,
    color: 'white',
    fontWeight: 'bold',
  },
  weightToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 250,
    height: 40,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 50,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    margin: 20,
  },
  unitText: {
    fontWeight: '700',
    color: 'black',
    fontSize: 20,
  },
  verticalDivider: {
    width: 2,
    height: 20,
    backgroundColor: 'black',
    marginHorizontal: 10,
  },
  selectedText: {
    fontSize: 45,
    fontWeight: '700',
  },
  heading: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
    paddingTop: 60,
  },
   selectorLineLeft: {
      position: 'absolute',
      left: Dimensions.get('window').width / 2 - 50,
      height: 90,
      width: 2,
      backgroundColor: 'white',
    },
    selectorLineRight: {
      position: 'absolute',
      right: Dimensions.get('window').width / 2 - 50,
      height: 90,
      width: 2,
      backgroundColor: 'white',
    },
});
