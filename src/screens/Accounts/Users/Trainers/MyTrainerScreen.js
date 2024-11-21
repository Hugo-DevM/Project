import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchHiredTrainer } from '../../../../services/userServices'; // Asegúrate de importar la función correctamente

const MyTrainerScreen = () => {
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Llamar a la función para obtener los datos del entrenador
    const getTrainerData = async () => {
      try {
        const trainerData = await fetchHiredTrainer();
        setTrainer(trainerData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getTrainerData();
  }, []);

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

  // Convertir la fecha de contratación a un formato legible
  let formattedHireDate = "Unknown";
  if (trainer.hireDate) {
    try {
      const hireDate = new Date(trainer.hireDate);
      if (!isNaN(hireDate)) {
        formattedHireDate = hireDate.toLocaleDateString(); // Puedes ajustar el formato según tus necesidades
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
