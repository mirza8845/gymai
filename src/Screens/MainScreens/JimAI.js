import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import Avatar from '../../assets/images/Avatar.png'
import { SafeAreaView } from 'react-native-safe-area-context'

const JimAI = () => {
  return (
    <SafeAreaView >
      <ScrollView>
        <Image source={Avatar}/>
        <Text style={{color:'white'}}>Jim AI</Text>
        
        <Text style={{color:'white'}}>Always active</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default JimAI

