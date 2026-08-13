import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'
import { Fonts } from '../constants/theme'
import { RFPercentage } from 'react-native-responsive-fontsize'

const Paragraph = ({title}) => {
    const {colors} = useTheme()
    return (
        <View>
            <Text style={[styles.subheading, {  color:'rgba(255, 255, 255, 0.8)' }]}>
                {title}
            </Text>      
       </View>
    )
}

export default Paragraph

const styles = StyleSheet.create({
    subheading: {
        paddingHorizontal:20,
        fontSize: RFPercentage(1.8),
        textAlign: 'center',
        fontFamily:Fonts.Montserrat_Regular,
        top:RFPercentage(1.5)
    },
})