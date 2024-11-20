import React, { useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { handleRegisterUser, handleRegisterTrainers, handleRegisterAdmins } from '../../src/services/authServices';

const Tab = createMaterialTopTabNavigator();

function UserAccount(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    return (
        <View style={styles.mainContainer}>
            <View style={styles.imageContainer}>
                <Image source={require('../../assets/images/logoUser.png')} style={styles.image} />
            </View>
            <ScrollView
                contentContainerStyle={styles.inputContainer}
                keyboardShouldPersistTaps="handled" 
            >
                <TextInput
                    placeholder="Nombre"
                    value={name}
                    onChangeText={text => setName(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => handleRegisterUser(email, password, name, true, props.navigation)}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Registrar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

function TrainerAccount(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    return (
        <View style={styles.mainContainer}>
            <View style={styles.imageContainer}>
                <Image source={require('../../assets/images/logoUser.png')} style={styles.image} />
            </View>
            <ScrollView
                contentContainerStyle={styles.inputContainer}
                keyboardShouldPersistTaps="handled" 
            >
                <TextInput
                    placeholder="Nombre"
                    value={name}
                    onChangeText={text => setName(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => handleRegisterTrainers(email, password, name, props.navigation)}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Registrar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

function AdminAccount(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    return (
        <View style={styles.mainContainer}>
            <View style={styles.imageContainer}>
                <Image source={require('../../assets/images/logoUser.png')} style={styles.image} />
            </View>
            <ScrollView
                contentContainerStyle={styles.inputContainer}
                keyboardShouldPersistTaps="handled" 
            >
                <TextInput
                    placeholder="Nombre"
                    value={name}
                    onChangeText={text => setName(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => handleRegisterAdmins(email, password, name, props.navigation)}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Registrar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

export default function CreateAccountTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'gray',
                tabBarIndicatorStyle: {
                    backgroundColor: 'blue',
                },
                tabBarLabelStyle: {
                    fontSize: 16,
                },
                tabBarStyle: {
                    backgroundColor: 'white',
                },
            }}
        >
            <Tab.Screen name="User" component={UserAccount} />
            <Tab.Screen name="Trainer" component={TrainerAccount} />
            <Tab.Screen name="Admin" component={AdminAccount} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 20,
        backgroundColor: 'white'
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        flexGrow: 1,
    },
    input: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        color: '#222222',
        height: 50,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
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
    image: {
        width: 150,
        height: 150,
    },
});
