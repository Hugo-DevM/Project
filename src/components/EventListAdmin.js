// EventList.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchEvents } from '../services/eventsServices'; 
import { useNavigation } from '@react-navigation/native';
import { firestore } from '../firebase';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const getEvents = async () => {
      try {
        const eventsData = await fetchEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error('Error loading events:', error);
      } finally {
        setLoading(false);
      }
    };

    getEvents();
  }, []);

  const deleteEvent = async (id) => {
    try {
      await firestore.collection('events').doc(id).delete();
      setEvents((prevEvents) => prevEvents.filter(event => event.id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => navigation.navigate('EditEvents', { eventId: item.id })} 
      style={styles.itemContainer}
    >
      <View style={styles.eventDetails}>
        <Text style={styles.title}>{item.title}</Text>
        {item.date ? (
          <Text style={styles.date}>{item.date}</Text>
        ) : (
          <Text style={styles.date}>Fecha no disponible</Text>
        )}
        {item.time && (
          <Text style={styles.time}>{item.time}</Text>
        )}
      </View>
      <TouchableOpacity onPress={() => deleteEvent(item.id)} style={styles.deleteButton}>
        <Icon name="trash" size={24} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />;
  }

  if (events.length === 0) {
    return (
      <View style={styles.noEventsContainer}>
        <Text style={styles.noEventsText}>No hay eventos disponibles</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={events}
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
  eventDetails: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  deleteButton: {
    marginLeft: 16,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noEventsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noEventsText: {
    fontSize: 16,
    color: '#888',
  },
});

export default EventList;