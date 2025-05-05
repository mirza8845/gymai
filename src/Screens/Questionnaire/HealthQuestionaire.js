import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Heading from '../../CommonComponent/Heading'
import { useNavigation, useTheme } from '@react-navigation/native'
import Paragraph from '../../CommonComponent/Paragraph'
import Button from '../../CommonComponent/Button'
import HorizontalPicker from '@vseslav/react-native-horizontal-picker';
import { Dimensions } from 'react-native';



const HealthQuestionaire = () => {
  const { colors } = useTheme()
  const navigation = useNavigation()
  const [selectedAgeIndex, setSelectedAgeIndex] = useState(0);
  const ageOptions = Array.from(Array(100).keys());
  const renderItem = (item, index) => (
    <View style={styles.pickerItem}>
      <Text
        style={[
          styles.pickerItemText,
          index === selectedAgeIndex && styles.selectedPickerItemText,
        ]}
      >
        {item}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Heading title="Health" />
      <View>
        <Paragraph title="How many hours do sleep every night?" />
      </View>
      <View style={styles.pickerWrapper}>
        <HorizontalPicker
          data={ageOptions}
          renderItem={renderItem}
          itemWidth={100}
          snapToAlignment="center"
          snapToInterval={100}
          decelerationRate="fast"
          contentContainerStyle={{
            paddingHorizontal: (Dimensions.get('window').width - 100) / 2.,
          }}
          onChange={(index) => setSelectedAgeIndex(index)}
          initialIndex={selectedAgeIndex}
        />
        <View style={styles.selectorLineRight} />
        <View style={styles.selectorLineLeft} />
      </View>
      <View style={{ marginTop: 80 }}>
        <Paragraph title="How much water do you drink per day (L)?" />
        <View style={styles.pickerWrapper}>
        <HorizontalPicker
          data={ageOptions}
          renderItem={renderItem}
          itemWidth={100}
          snapToAlignment="center"
          snapToInterval={100}
          decelerationRate="fast"
          contentContainerStyle={{
            paddingHorizontal: (Dimensions.get('window').width - 100) / 2.,
          }}
          onChange={(index) => setSelectedAgeIndex(index)}
          initialIndex={selectedAgeIndex}
        />
        <View style={styles.selectorLineRight} />
        <View style={styles.selectorLineLeft} />
      </View>
      </View>
      <View style={{ marginTop: 80,marginBottom:60 }}>
        <Paragraph title="How are your energy levels? (1=Low, 5=High) " />
        <View style={styles.pickerWrapper}>
        <HorizontalPicker
          data={ageOptions}
          renderItem={renderItem}
          itemWidth={100}
          snapToAlignment="center"
          snapToInterval={100}
          decelerationRate="fast"
          contentContainerStyle={{
            paddingHorizontal: (Dimensions.get('window').width - 100) / 2.,
          }}
          onChange={(index) => setSelectedAgeIndex(index)}
          initialIndex={selectedAgeIndex}
        />
        <View style={styles.selectorLineRight} />
        <View style={styles.selectorLineLeft} />
      </View>
      </View>
      <Button title="Continue" onPress={() => navigation.navigate('profileQuestionaire')} />
    </View>
  )
}

export default HealthQuestionaire

const styles = StyleSheet.create({
  container: {
    paddingVertical: 80,
    justifyContent: 'center',
  },
  pickerItem: {
    width: 100,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4E4E4E',

  },
  pickerItemText: {
    fontSize: 40,
    color: '#1E1E1E',
    fontWeight: 'bold',
  },
  selectedPickerItemText: {
    fontSize: 48,
    color: 'white',
    fontWeight: 'bold',
  },
  pickerWrapper: {
    width: '100%',
    height: 70,
    backgroundColor: '#4E4E4E',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    position: 'relative',
  },
  selectorLineLeft: {
    position: 'absolute',
    left: Dimensions.get('window').width / 2 - 50,
    height: 90,
    width: 2,
    backgroundColor: 'white',
  },
  selectorLineRight: {
    position: 'absolute',
    right: Dimensions.get('window').width / 2 - 50,
    height: 90,
    width: 2,
    backgroundColor: 'white',
  },

})