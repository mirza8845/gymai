import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import HorizontalPicker from '@vseslav/react-native-horizontal-picker';
import { RulerPicker } from 'react-native-ruler-view';
import Button from '../../CommonComponent/Button';
import Heading from '../../CommonComponent/Heading';

const AgeQuestionnaire = () => {
  const { colors } = useTheme();
  const ageOptions = Array.from(Array(100).keys());
  const navigation = useNavigation()
  const [selectedHeight, setSelectedHeight] = React.useState(0);



  const renderItem = (item, index) => (
    <View style={questionnaireStyles.pickerItem}>
      <Text style={questionnaireStyles.pickerItemText}>
        {item}</Text>
    </View>
  );

  return (
    <View style={[questionnaireStyles.container, { backgroundColor: colors.background }]}>
      <Heading title="Age"/>
      <View style={questionnaireStyles.pickerWrapper}>
        <HorizontalPicker
          data={ageOptions}
          renderItem={renderItem}
          itemWidth={50}
          snapToAlignment="start"
          decelerationRate="fast"
          contentContainerStyle={{ justifyContent: 'flex-start' }}
        />
      </View>


      <Text style={[questionnaireStyles.heading, { color: colors.text }]}>Weight</Text>
      <View style={questionnaireStyles.weightToggle}>
        <Text style={questionnaireStyles.unitText}>KG</Text>
        <View style={questionnaireStyles.verticalDivider} />
        <Text style={questionnaireStyles.unitText}>LB</Text>
      </View>

      <RulerPicker
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
          padding: 10
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
          labelFormat: 'Value: ${value} kg',
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
      {/* <Text style={[questionnaireStyles.selectedText, { color: colors.text }]}>
        {selectedHeight} kg
      </Text> */}
      
      <Button title="Continue" onPress={()=>navigation.navigate('heightQuestionnaire')}/>
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
    height: 50,
  },
  pickerItem: {
    width: 85,
    height: 60,
    justifyContent: 'center',
  },
  pickerItemText: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#4E4E4E',
  },

  weightToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 250,
    height: 40,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 12,
    paddingHorizontal: 50,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    margin: 20
  },
  unitText: {
    fontWeight: 700,
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
    paddingTop:60
  },
});

