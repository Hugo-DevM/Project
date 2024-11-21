// src/screens/UserScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { fetchUserDetails } from '../../../services/qrServices'; 

const UserScreen = () => {
  const [qrContent, setQrContent] = useState(null); 
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const { qrCodeContent, name } = await fetchUserDetails();
        setQrContent(qrCodeContent); 
        setUserName(name);
      } catch (error) {
        console.error('Error al obtener los detalles del usuario:', error);
      } finally {
        setLoading(false);
      }
    };

    getUserDetails();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bienvenido {userName}</Text>
      </View>
      <View style={styles.qrContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : qrContent ? (
          <QRCode value={JSON.stringify(qrContent)} size={200} />
        ) : (
          <Text style={styles.errorText}>No se pudo cargar el código QR.</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  qrContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});

export default UserScreen;
