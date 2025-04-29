import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useTheme } from '@react-navigation/native';
import Heading from '../../CommonComponent/Heading';
import Paragraph from '../../CommonComponent/Paragraph';
import Option from '../../CommonComponent/Option';
import Button from '../../CommonComponent/Button';

const dietsOPtion = ['High in Protein', 'High in Carbohydrates', 'High in Fats', 'High in fiber', 'Balanced with a range of foods providing macro', 'High in Ultra-processed foods', 'Other']

const Diets = () => {
    const { colors } = useTheme();
    const [selectedOption, setSelectedOption] = useState(null);
    const navigation = useNavigation()

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Heading title="Diet" />
            <Paragraph title="How would you describe your current diet?" />
            <View style={{ paddingTop: 14, paddingBottom: 50, gap: 15 }}>
                {dietsOPtion.map((opt, index) => (
                    <Option
                        key={index}
                        label={opt}
                        selected={selectedOption === opt}
                        onPress={() => setSelectedOption(opt)}
                    />
                ))}
            </View>
            <Button title="Continue" onPress={()=>navigation.navigate('healthQuestionaire')}/>
        </View>
    )
}

export default Diets

const styles = StyleSheet.create({
    container: {
        paddingVertical: 80,
        paddingHorizontal: 24,
        justifyContent: 'center',
    },
})