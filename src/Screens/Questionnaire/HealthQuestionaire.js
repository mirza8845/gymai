import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Heading from '../../CommonComponent/Heading'
import { useNavigation, useTheme } from '@react-navigation/native'
import Paragraph from '../../CommonComponent/Paragraph'
import Button from '../../CommonComponent/Button'

const HealthQuestionaire = () => {
  const {colors} =useTheme()
  const navigation = useNavigation()
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
     <Heading title="Health" />
     <View>
      <Paragraph title="How many hours do sleep every night?"/>
     </View>
     <View>
      <Paragraph title="How much water do you drink per day (L)?"/>
     </View>
     <View>
      <Paragraph title="How are your energy levels? (1=Low, 5=High) "/>
     </View>
     <Button title="Continue" onPress={()=>navigation.navigate('profileQuestionaire')}/>
    </View>
  )
}

export default HealthQuestionaire

const styles = StyleSheet.create({
  container: {
    paddingVertical: 80,
    paddingHorizontal: 24,
    justifyContent: 'center',
},
})