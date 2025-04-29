import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useTheme } from '@react-navigation/native';
import Heading from '../../CommonComponent/Heading';
import Paragraph from '../../CommonComponent/Paragraph';
import Option from '../../CommonComponent/Option';
import Button from '../../CommonComponent/Button';

const Challenges = () => {
    const challengesOption =['Not knowing what to do','Lack of motivation & consistency','Equipment limitations','Lack of confidence in the gym','Limited time or busy schedule','Lack of results from past program','other']
    const { colors } = useTheme();
    const navigation = useNavigation()
    const [selectedOption, setSelectedOption] = useState(null); 
    
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Heading title="Challenges" />
            <Paragraph title="What challenges do you face when it comes to fitness training?" />
            <View style={{gap:13,paddingTop:6,paddingBottom:20}}>
            {challengesOption.map((opt,index)=>(
                <Option
                key={index}
                label={opt}
                selected={selectedOption === opt}
                onPress={() => setSelectedOption(opt)}
                />
            ))}
            </View>

          <Button title="Continue" onPress={()=>navigation.navigate('dietaryPreferences')}/>

        </View>
    )
}

export default Challenges

const styles = StyleSheet.create({
    container: {
        paddingVertical: 80,
        paddingHorizontal: 27,
        justifyContent: 'center',
    },
})