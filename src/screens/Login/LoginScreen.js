import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { checkUserLoggedIn, handleLogin } from '../../services/authServices';

const LoginScreen = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);

  useEffect(() => {
    //checkUserLoggedIn(props.navigation);
  }, []);
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">

    <View>
        <Image source={require('../../../assets/images/logo.webp')}
        style={styles.image}/>
    </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={[styles.input, isFocused1 ? styles.inputFocused : null]}
          onFocus={() => setIsFocused1(true)}
          onBlur={() => setIsFocused1(false)}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={[styles.input, isFocused2 ? styles.inputFocused : null]}
          onFocus={() => setIsFocused2(true)}
          onBlur={() => setIsFocused2(false)}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => handleLogin(email, password, props.navigation)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    color: '#222222',
    height: 50,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10
  },
  inputFocused: {
    borderColor: '#1D2951',
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#FEC104',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 18,
  },
  textRegister: {
    paddingTop: 24
  },
  image:{
    width: 300,
    height: 300,
    marginBottom: '10%'
  }
});
