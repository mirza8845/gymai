import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Fonts } from '../../constants/theme';

const TipCard = ({ children, color }) => {
  return (
    <Text style={[styles.tipCard, { backgroundColor: color }]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  tipCard: {
    fontSize: 16,
    padding: 25,
    borderRadius: 20,
    letterSpacing: 1,
    marginVertical: 10,
    lineHeight:23,
    fontFamily:Fonts.Regular
  },
});

export default TipCard;
