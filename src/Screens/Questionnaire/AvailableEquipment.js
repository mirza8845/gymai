import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation, useTheme } from '@react-navigation/native';
import Heading from '../../CommonComponent/Heading';
import Paragraph from '../../CommonComponent/Paragraph';
import Button from '../../CommonComponent/Button';
import DoubleButton from '../../CommonComponent/DoubleButton';


const AvailableEquipment = () => {
  const { colors } = useTheme();
  const navigation = useNavigation()
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Heading title="Available equipment" />
      <Paragraph title="What equipment do you have access to?You can start with nothing!" />
         <View style={{gap:2,paddingTop:30,paddingBottom:150}}>
          <DoubleButton title="Everything"/>
          <DoubleButton title="Nothing"/>
          <DoubleButton title="Cable machine"/>
          <DoubleButton title="Smith machine"/>
          <DoubleButton title="Squat rack"/>
          <DoubleButton title="Back extension"/>
          <DoubleButton title="Dumbells"/>
          <DoubleButton title="Barbell"/>
          <DoubleButton title="Pull up/Dip bars"/>
          <DoubleButton title="Back machines"/>
          <DoubleButton title="Leg machines"/>
          <DoubleButton title="Other"/>
        </View>
      <Button title="Continue" onPress={()=>navigation.navigate('challenges')}/>
    </View>
  )
}

export default AvailableEquipment

const styles = StyleSheet.create({
  container: {
    paddingVertical: 80,
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
})