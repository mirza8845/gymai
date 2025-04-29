import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Heading from '../../CommonComponent/Heading';
import { useNavigation, useTheme } from '@react-navigation/native';
import Paragraph from '../../CommonComponent/Paragraph';
import DoubleButton from '../../CommonComponent/DoubleButton';
import Button from '../../CommonComponent/Button';

const DietaryPreferences = () => {
    const { colors } = useTheme();
    const navigation = useNavigation()
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Heading title="Dietary Preferences" />
            <View style={{ marginTop: 70, marginBottom: 60 }}>
                <Text style={[styles.paragraph, { color: colors.text }]}>What are your dietary preferences?</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <DoubleButton title="Vegetarian" />
                        <DoubleButton title="Vegan" />
                        <DoubleButton title="Gluten-Free" />
                    </View>
                    <View>
                        <DoubleButton title="Keto" />
                        <DoubleButton title="Paleo" />
                        <DoubleButton title="No preferences" />
                    </View>
                </View>
            </View>
           <View style={{paddingBottom:60}}>
           <Text style={{ fontSize: 25, marginBottom: 10, color: 'white' }}>Allergies</Text>
            <Text style={[styles.paragraph, { color: colors.text }]}>Do you have any food allergies we should know about?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 80 }}>
                <View>
                    <DoubleButton title="Nuts" />
                    <DoubleButton title="Dairy" />
                    <DoubleButton title="Shellfish" />
                </View>
                <View>
                    <DoubleButton title="Eggs" />
                    <DoubleButton title="No allergies" />
                </View>
            </View>
           </View>
            <Button title="Continue" onPress={()=>navigation.navigate('diets')} />
        </View>
    )
}

export default DietaryPreferences

const styles = StyleSheet.create({
    container: {
        paddingVertical: 80,
        paddingHorizontal: 25,
    },
    paragraph: {
        fontSize: 16,
        fontWeight: 200,
        paddingVertical: 8
    }
})