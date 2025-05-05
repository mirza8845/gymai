import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const InfoCard = ({ title, subtitle, imageSource, customWrapperStyle, customCardStyle }) => {
  return (
    <View style={[styles.infoCardWrapper, customWrapperStyle]}>
      <View style={[styles.infoCard, customCardStyle]}>
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoCardTitle}>{title}</Text>
          <Text style={styles.infoCardSubtitle}>{subtitle}</Text>
        </View>
        <Image source={imageSource} style={styles.infoCardImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoCardWrapper: {
    marginBottom: 30,
  },
  infoCard: {
    backgroundColor: 'white',
    width: '100%', 
    borderRadius: 20,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  infoTextContainer: {
    padding: 15,
    width: '60%', 
    gap: 5,
  },
  infoCardTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
  infoCardSubtitle: {
    fontSize: 14,
    color: 'black',
  },
  infoCardImage: {
    width: 127,
    height: 110,
   borderRadius:20,
    position: 'absolute', 
    right: 0,
  },
});

export default InfoCard;
