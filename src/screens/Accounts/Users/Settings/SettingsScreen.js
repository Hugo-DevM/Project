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
        backgroundColor: '#ff5c5c', // Puedes cambiar el color si lo deseas
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 25, // Hace el botón ovalado
        elevation: 3, // Añade una sombra para que se vea mejor (solo en Android)
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default SettingsScreen;
