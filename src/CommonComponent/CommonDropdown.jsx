import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { Fonts } from '../constants/theme';


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
    paddingHorizontal:20,
    fontFamily:Fonts.Regular
  },
  placeholderStyle:{
    color:'white',
    fontSize:18,
    fontFamily:Fonts.Medium
    
  },
  iconStyle:{
    width:45,
  }
})