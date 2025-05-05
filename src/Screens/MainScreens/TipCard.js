import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TipCard = ({ children, color }) => {
  return (
    <Text style={[styles.tipCard, { backgroundColor: color }]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  tipCard: {
    fontSize: 17,
    padding: 25,
    borderRadius: 20,
    letterSpacing: 1,
    marginVertical: 10,
    lineHeight:15
  },
});

export default TipCard;
