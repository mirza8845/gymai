import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import Button from '../../CommonComponent/Button';
import Heading from '../../CommonComponent/Heading';
import CommonInput from '../../CommonComponent/CommonInput';

const Login = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.innerContainer}>
        <Heading title="Welcome" />
        <View style={styles.inputView}>
          <CommonInput
            label="Username or email"
            placeholder="Email"
          />
           <CommonInput
            label="Password"
            placeholder="Password"
          />

          <TouchableOpacity style={styles.forgotWrapper}>
            <Text style={[styles.forgotAndSignUpText, { color: colors.text }]}>Forgot Password?</Text>
          </TouchableOpacity>

          <Button title="Log In" onPress={() => navigation.navigate('introQuestionnaire')} />
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('signup')}>
        <Text style={[styles.signupBtn, { color: colors.text }]}>
          Don’t have an account? Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputView: {
    width: '85%',
    marginTop: '70'
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
  },
  forgotAndSignUpText: {
    fontSize: 11,
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
  selectedText: {
    fontSize: 45,
    fontWeight: '700',
    marginTop: 15,
  }
});
