import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Button, Alert } from 'react-native';
import { firestore, auth } from '../../../../firebase'; 
import { removeTrainer } from '../../../../services/userServices';

const MyTrainerScreen = () => {
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      setError('User not logged in');
      setLoading(false);
      return;
    }

    // Configura un listener para escuchar cambios en tiempo real
    const unsubscribe = firestore
      .collection('users')
      .doc(userId)
      .onSnapshot(
        (doc) => {
          if (doc.exists) {
            const userData = doc.data();
            setTrainer(userData.myTrainer || null);
          } else {
            setTrainer(null);
            setError('User document not found');
          }
          setLoading(false);
        },
        (err) => {
          console.error('Error fetching trainer:', err);
          setError('Failed to fetch trainer data');
          setLoading(false);
        }
      );

    // Limpia el listener al desmontar el componente
    return () => unsubscribe();
  }, []);

  const handleRemoveTrainer = async () => {
    Alert.alert(
      'Remove Trainer',
      'Are you sure you want to remove your trainer?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              setLoading(true);
              await removeTrainer(); // Llama a la función para eliminar el entrenador
              Alert.alert('Success', 'Trainer removed successfully');
            } catch (err) {
              console.error(err);
              Alert.alert('Error', 'Failed to remove trainer');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!trainer) {
    return (
      <View style={styles.centered}>
        <Text>No trainer assigned</Text>
      </View>
    );
  }

  let formattedHireDate = 'Unknown';
  if (trainer.hireDate) {
    try {
      const hireDate = new Date(trainer.hireDate);
      if (!isNaN(hireDate)) {
        formattedHireDate = hireDate.toLocaleDateString();
      }
    } catch (error) {
      console.error('Error formatting hire date:', error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Trainer</Text>
      <Text>Name: {trainer.name}</Text>
      <Text>Age: {trainer.age}</Text>
      <Text>Weight: {trainer.weight}</Text>
      <Text>Contact: {trainer.contact}</Text>
      <Text>Cost: {trainer.cost}</Text>
      <Text>Hire Date: {formattedHireDate}</Text>
      <Button title="Remove Trainer" onPress={handleRemoveTrainer} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
  },
});

export default MyTrainerScreen;
