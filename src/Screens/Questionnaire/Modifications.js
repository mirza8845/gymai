import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Heading from '../../CommonComponent/Heading';
import { useNavigation, useTheme } from '@react-navigation/native';
import Paragraph from '../../CommonComponent/Paragraph';
import Button from '../../CommonComponent/Button';
import { Fonts } from '../../constants/theme';
import { RFPercentage } from 'react-native-responsive-fontsize';

const Modifications = () => {
  const { colors } = useTheme();
  const navigation = useNavigation()

  return (
    <View style={[styles.wrapper, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        <Heading title="Modifications" />
        <Paragraph title="Do you need modifications for injuries or physical limitations?" />
        <View style={styles.modificationsNote}>
          <Text style={styles.modificationsText}>If yes please explain...</Text>
        </View>
      </View>
      <Button title="Continue"  onPress={()=>navigation.navigate('availableEquipment')}/>
    </View>
  );
};

export default Modifications;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingVertical: 80,
    paddingHorizontal: 37,
  },
  container: {
    flexGrow: 1,
  },
  modificationsNote: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    minHeight: RFPercentage(25),
    marginTop: RFPercentage(10),
  },
  modificationsText: {
    fontSize: 18,
    color: 'black',
    fontFamily:Fonts.Regular
  },
});
