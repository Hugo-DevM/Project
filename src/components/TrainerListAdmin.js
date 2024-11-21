import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firestore } from '../firebase';

const TrainerListAdmin = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = firestore.collection('trainers').onSnapshot(
      (snapshot) => {
        const trainersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTrainers(trainersData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching trainers:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => navigation.navigate('ShowTrainersAdmin', { trainerId: item.id })} 
      style={styles.itemContainer}
    >
      <View style={styles.trainerDetails}>
        <Text style={styles.name}>Nombre: {item.name}</Text>
        <Text style={styles.age}>Edad: {item.age}</Text>
        <Text style={styles.weight}>Peso: {item.weight} Kg</Text>
        <Text style={styles.weight}>Contacto: +52 {item.contact}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />;
  }

  if (trainers.length === 0) {
    return (
      <View style={styles.noTrainersContainer}>
        <Text style={styles.noTrainersText}>No hay entrenadores disponibles</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={trainers}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  trainerDetails: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  age: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  weight: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTrainersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTrainersText: {
    fontSize: 16,
    color: '#888',
  },
});

export default TrainerListAdmin;
