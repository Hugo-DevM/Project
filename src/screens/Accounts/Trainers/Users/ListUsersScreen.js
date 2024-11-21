import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import UserListTrainer from '../../../../components/UserListTrainer';
import { auth } from '../../../../firebase';
import { getTrainerData } from '../../../../services/trainerServices'; 

const ListUserScreen = () => {
  const [trainerId, setTrainerId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrainerId = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (userId) {
          const trainerData = await getTrainerData(userId); 
          setTrainerId(trainerData.trainerId || userId); 
        } else {
          setError('Usuario no autenticado.');
        }
      } catch (err) {
        console.error('Error obteniendo trainerId:', err);
        setError('Error al obtener los datos del entrenador.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrainerId();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!trainerId) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No se pudo obtener el ID del entrenador.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tus Usuarios Asignados</Text>
      <UserListTrainer trainerId={trainerId} />
    </View>
  );
};

export default ListUserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 16,
    color: '#ff0000',
  },
});
