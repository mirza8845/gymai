import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import Button from '../../CommonComponent/Button';
import Heading from '../../CommonComponent/Heading';
import CommonInput from '../../CommonComponent/CommonInput';

const SignUp = () => {
    const { colors } = useTheme();
    const navigation = useNavigation();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.innerContainer}>
                <Heading title="Create Account" />
                <View style={styles.inputView}>
                    <CommonInput
                        label="Full name"
                        placeholder="Enter Your Full Name"
                    />
                    <CommonInput
                        label="Email or Mobile Number"
                        placeholder="***********"
                    />
                    <CommonInput
                        label="Password"
                        placeholder="***********"
                    /> <CommonInput
                        label="Confirm Password"
                        placeholder="***********"
                    />

                    <TouchableOpacity style={styles.forgotWrapper}>
                        <Text style={[styles.forgotAndSignUpText, { color: colors.text }]}>    By continuing, you agree to{'\n'}

                            <Text style={{ fontWeight: 'bold' }}>
                                Terms of Use and Privacy Policy.
                            </Text>
                        </Text>
                    </TouchableOpacity>
                    <Button title="Sign Up" />
                </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
                <Text style={[styles.signupBtn, { color: colors.text }]}>
                    Already have an account? Log in
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default SignUp;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontWeight: '700',
        fontSize: 25,
        marginBottom: 40,
    },
    inputView: {
        width: '85%',
    },
    inputTitle: {
        fontSize: 14,
        marginTop: 10,
        marginBottom: 5,
    },
    inputText: {
        borderWidth: 1,
        borderRadius: 14,
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        color: 'black',
    },
    forgotWrapper: {
        alignItems: 'flex-end',
        marginBottom: 20,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    forgotAndSignUpText: {
        fontSize: 11,
        width: '60%',

    },
    loginBtn: {
        width: '60%',
        borderRadius: 20,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#383838',
        borderColor: 'white',
        borderWidth: 1,
        alignSelf: 'center',
        marginTop: 20,
    },
    loginText: {
        fontSize: 16,
        fontWeight: '600',
    },
    signupBtn: {
        textAlign: 'center',
        fontSize: 12,
    },
});
