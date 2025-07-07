import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Fonts } from '../constants/theme';

const DoubleButton = ({ title, selected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={[styles.radioOuter]}>
        {selected && <View style={styles.radioInner} />}
      </View>
      <Text style={[styles.title, selected && styles.titleSelected]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default DoubleButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 5,
  },
  radioOuter: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: 'white',
  },
  radioInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: 'white',
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontFamily: Fonts.Montserrat_Regular,
  },
  titleSelected: {
    // fontFamily: Fonts.Montserrat_Bold,
  },
});
