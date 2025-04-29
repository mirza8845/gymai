import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'

const Paragraph = ({title}) => {
    const {colors} = useTheme()
    return (
        <View>
            <Text style={[styles.subheading, { color: colors.text }]}>
                {title}
            </Text>      
       </View>
    )
}

export default Paragraph

const styles = StyleSheet.create({
    subheading: {
        paddingHorizontal:30,
        fontSize: 16,
        fontWeight: 200,
        textAlign: 'center',
    },
})