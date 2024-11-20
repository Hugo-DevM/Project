import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, SafeAreaView } from 'react-native';
import { updateEvent, fetchEventById } from '../../../../services/eventsServices';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';

const EditEventScreen = ({ route, navigation }) => {
  const { eventId } = route.params;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    const getEvent = async () => {
      try {
        const eventData = await fetchEventById(eventId);
        setEvent(eventData);
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    };

    getEvent();
  }, [eventId]);

  const handleSave = async () => {
    try {
      const { id, ...eventData } = event; // Excluir el campo 'id' del evento
      await updateEvent(eventId, eventData); // Actualizar con los datos sin 'id'
      Alert.alert('Event Updated', 'Your event has been successfully updated!');
      navigation.navigate('HomeAdmin', { updated: true });
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setEvent((prevEvent) => ({ ...prevEvent, date: selectedDate.toISOString().split('T')[0] }));
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setEvent((prevEvent) => ({ ...prevEvent, time: selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }));
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!event) {
    return <Text>Event not found</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#1D2951' }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name='arrow-back' size={35} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Event</Text>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.label}>Event Title:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter event title"
            placeholderTextColor="#aaa"
            value={event.title}
            onChangeText={(text) => setEvent({ ...event, title: text })}
          />

          <Text style={styles.label}>Day of the Event:</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>{event.date}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={new Date(event.date)}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}

          <Text style={styles.label}>Event Time:</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowTimePicker(true)}
          >
            <Text style={styles.dateText}>{event.time}</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={new Date()}
              mode="time"
              display="default"
              onChange={handleTimeChange}
            />
          )}

          <Text style={styles.label}>Event Description:</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter event description"
            placeholderTextColor="#aaa"
            value={event.description}
            onChangeText={(text) => setEvent({ ...event, description: text })}
            multiline={true}
            numberOfLines={4}
          />

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Save Event</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    backgroundColor: '#1D2951',
    borderBottomColor: '#1D2951',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    marginRight: 30,
    color: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    color: '#000',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
    marginBottom: 15,
  },
  dateText: {
    fontSize: 16,
    color: '#000',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#1D2951',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditEventScreen;