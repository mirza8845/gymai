import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const DoubleButton = ({title}) => {
  return (
     <View style={{ flexDirection: 'row', gap: 4 }} >
              <Icon style={{ color: 'white', fontSize: 29 }} name="circle-double" size={39} />
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 200 }}>{title}</Text>
            </View>
  )
}

export default DoubleButton

const styles = StyleSheet.create({})