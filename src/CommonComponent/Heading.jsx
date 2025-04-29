import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native';

const Heading = ({ title }) => {
    const { colors } = useTheme();


    return (
        <View>
            <Text style={[styles.heading, { color: colors.text }]}>{title}</Text>
        </View>
    )
}

export default Heading

const styles = StyleSheet.create({
    heading: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 10,
        textAlign: 'center',
      },
})


