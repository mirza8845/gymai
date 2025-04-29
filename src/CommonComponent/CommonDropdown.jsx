import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Dropdown } from 'react-native-element-dropdown';


const CommonDropdown = ({text}) => {
  return (
    <View>
      <Dropdown
          style={styles.Dropdown}
          placeholder={text}
          placeholderStyle={styles.placeholderStyle}
          iconStyle={styles.iconStyle}

/>
    </View>
  )
}

export default CommonDropdown

const styles = StyleSheet.create({
  Dropdown:{
    paddingVertical:30,
    paddingHorizontal:20
  },
  placeholderStyle:{
    color:'white',
    fontSize:18,
    
  },
  iconStyle:{
    width:45,
  }
})