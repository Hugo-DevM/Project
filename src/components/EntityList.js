import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { firestore } from '../firebase';

const EntityList = ({ collectionName, renderItemDetails }) => {
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore.collection(collectionName).onSnapshot(
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEntities(data);
        setLoading(false);
      },
      (error) => {
        console.error(`Error fetching ${collectionName} in real-time:`, error);
      }
    );

    return () => unsubscribe();
  }, [collectionName]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {renderItemDetails(item)}
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />;
  }

  if (entities.length === 0) {
    return (
      <View style={styles.noEntitiesContainer}>
        <Text style={styles.noEntitiesText}>No hay elementos disponibles</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={entities}
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
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noEntitiesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noEntitiesText: {
    fontSize: 16,
    color: '#888',
  },
});

export default EntityList;
