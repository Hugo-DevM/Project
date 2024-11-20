import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, SafeAreaView } from 'react-native';
import { auth } from '../../firebase';
import { handleRegister } from '../../services/authServices';
import Icon from 'react-native-vector-icons/Ionicons';
import { CommonActions } from '@react-navigation/native';

const InformationScreen = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [isFocused3, setIsFocused3] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        props.navigation.navigate("Login");
      }
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={styles.areaContainer}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.buttonArrow}>
          <Icon.Button name='arrow-back' size={35} backgroundColor="transparent" color="#FEC104" onPress={() => props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          })
        )} />
        </View>
        <View>
          <Image source={require('../../../assets/images/logo.webp')}
            style={styles.image} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Nombre"
            value={name}
            onChangeText={text => setName(text)}
            style={[styles.input, isFocused1 ? styles.inputFocused : null]}
            onFocus={() => setIsFocused1(true)}
            onBlur={() => setIsFocused1(false)}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={[styles.input, isFocused2 ? styles.inputFocused : null]}
            onFocus={() => setIsFocused2(true)}
            onBlur={() => setIsFocused2(false)}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            style={[styles.input, isFocused3 ? styles.inputFocused : null]}
            onFocus={() => setIsFocused3(true)}
            onBlur={() => setIsFocused3(false)}
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => handleRegister(email, password, name, props.navigation)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sing In</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default InformationScreen;

const styles = StyleSheet.create({
  areaContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
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
    color: '#222222',
    fontWeight: '700',
    fontSize: 16,
  },
  textRegister: {
    paddingTop: 24
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: '10%',
    marginTop: '16%'
  },
  buttonArrow: {
    position: 'absolute', // Para poder ubicar el botón en una posición específica
    left: 10, // Ajusta el valor para ubicarlo según la distancia deseada desde la izquierda
    zIndex: 1, // Asegura que el botón esté por encima de otros elementos, si es necesario
    top: 10
  }
});
