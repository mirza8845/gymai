import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Fonts } from '../constants/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';

const Option = ({ label, selected, onPress }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
      <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
        {selected && <View style={styles.radioInner} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 55,
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: RFPercentage(2.1),
    // fontWeight: '500',
    color: 'black',
    width: '70%',
    paddingLeft:20,
    fontFamily:Fonts.Medium
  },
  radioOuter: {
    width: 35,
    height: 35,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: 'black',
  },
  radioInner: {
    width: 22,
    height: 22,
    borderRadius: 18,
    backgroundColor: 'black',
  },
});

export default Option;
