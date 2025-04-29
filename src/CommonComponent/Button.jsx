import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native';

const Button = ({title,onPress}) => {
      const { colors } = useTheme();
    
    return (
        <TouchableOpacity style={styles.button} onPress={onPress} >
            <Text style={[styles.text, { color: colors.text }]} >{title}</Text>
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    button: {
        width: '60%',
        height: 45,
        borderRadius: 20,
        backgroundColor: '#383838',
        borderColor: 'white',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        alignSelf: 'center',
      },
      text: {
        fontSize: 20,
        fontWeight: '700',
      },
})