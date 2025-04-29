import { useNavigation, useTheme } from '@react-navigation/native';
import * as React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RulerPicker } from 'react-native-ruler-view';
import Button from '../../CommonComponent/Button';
import Heading from '../../CommonComponent/Heading';

export default function HeightQuestionnaire() {
  const { colors } = useTheme();
  const [selectedHeight, setSelectedHeight] = React.useState(0);
  const navigation = useNavigation()


  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
    >
      <Heading title="Height" />

      <Text style={{ paddingTop: 90 }}>
        <Text style={[styles.selectedText, { color: colors.text }]}>
          {selectedHeight}
        </Text>
        <Text style={{ color: colors.text }}>cm</Text>
      </Text>
      <View
        style={{
          padding: 0,
          margin: 0,
          width: 10,
          height: 380,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <RulerPicker
          unit=""
          min={0}
          max={1000}
          step={1}
          width={10}
          indicatorHeight={80}
          initialValue={20}
          height={350}
          vertical
          showLabels={true}
          gapBetweenSteps={14}
          containerStyle={{
            backgroundColor: '#4E4E4E',
            borderRadius: 9,
            padding: 0,
            margin: 0,
            width: 10,
            height: 350,
          }}
          theme={{
            indicatorColor: 'white',
            shortStepColor: 'white',
            longStepColor: 'white',
            textColor: 'white',
            backgroundColor: 'black',
            fontWeight: '700',
            fontSize: 10,
          }}
          accessibility={{
            enabled: true,
            labelFormat: 'Value: ${value}',
            announceValues: true,
          }}
          onValueChange={(val) => setSelectedHeight(val)}
          animationConfig={{
            springConfig: {
              tension: 40,
              friction: 9,
            },
          }}

        />
      </View>

      <Button title="Continue" onPress={() => navigation.navigate('goalsQuestionnaire')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingTop: 140,
    paddingHorizontal: 70
  },
  selectedText: {
    fontSize: 48,
    fontWeight: 700,
  },
});
