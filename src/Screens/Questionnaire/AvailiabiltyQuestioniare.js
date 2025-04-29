import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Heading from '../../CommonComponent/Heading'
import { useNavigation, useTheme } from '@react-navigation/native'
import Paragraph from '../../CommonComponent/Paragraph'
import Option from '../../CommonComponent/Option'
import Button from '../../CommonComponent/Button'

const availabilityOptions=['1','2','3','4','5','6','7']

const AvailiabiltyQuestioniare = () => {
    const [selectedOption, setSelectedOption] = useState(null); 
  const { colors } = useTheme()
  const navigation= useNavigation()
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Heading title="Availiabilty" />
      <Paragraph title="How many workouts can you commit to weekly?" />
      <View style={styles.availabilityOptions}>
        {availabilityOptions.map((opt,index)=>(
          <Option
          key={index}
          label={opt}
          selected={selectedOption === opt}
            onPress={() => setSelectedOption(opt)}/>
        ))}
        
      </View>
      <Button title="Continue" onPress={()=>navigation.navigate('modifications')}/>
    </View>
  )
}

export default AvailiabiltyQuestioniare

const styles = StyleSheet.create({
  container: {
    paddingVertical: 80,
    paddingHorizontal: 35,
    justifyContent: 'center',
  },
  availabilityOptions: {
    gap: 10,
    paddingTop:6
    },
})