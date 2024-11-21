import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchUsersByTrainer } from '../services/trainerServices';

const UserListTrainer = ({ trainerId }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = fetchUsersByTrainer(trainerId, (usersData) => {
      setUsers(usersData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [trainerId]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.userDetails}>
        <Text style={styles.name}>Nombre: {item.name}</Text>
        <Text style={styles.age}>Edad: {item.age ? item.age : 'No disponible'}</Text>
        <Text style={styles.weight}>Peso: {item.weight ? item.weight + ' kg' : 'No disponible'}</Text>
        <Text style={styles.phone}>Teléfono: {item.phone ? item.phone : 'No disponible'}</Text>
      </View>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />;
  }

  if (users.length === 0) {
    return (
      <View style={styles.noUsersContainer}>
        <Text style={styles.noUsersText}>No hay usuarios registrados para este entrenador</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.userId}
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
    alignItems: 'flex-start',
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
  userDetails: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  age: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  weight: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  phone: {
    fontSize: 14,
    color: '#555',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noUsersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noUsersText: {
    fontSize: 16,
    color: '#888',
  },
});

export default UserListTrainer;
