import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { handleLogout } from '../../../../services/authServices';

const SettingsScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Cerrar Sesión</Text>
            <TouchableOpacity style={styles.logoutButton} onPress={() => handleLogout(navigation)}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    logoutText: {
        fontSize: 16,
        marginBottom: 10,
    },
    logoutButton: {
        backgroundColor: '#ff5c5c',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 25,
        elevation: 3,
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default SettingsScreen;
