import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const DoubleButton = ({ title }) => {
  const [selected, setSelected] = useState(false);

  const toggleRadio = () => {
    setSelected(!selected);
  };

  return (
    <TouchableOpacity onPress={toggleRadio} style={styles.container}>
      <View style={styles.radioOuter}>
        {selected && <View style={styles.radioInner} />}
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default DoubleButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingBottom:5,
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
  radioInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: 'white',
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
  },
});
