import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CommonActions } from '@react-navigation/native';
import { createEvent } from '../../../../services/eventsServices';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddEventsScreen = (props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const saveEvent = async () => {
        if (!title || !description || !date || !time) {
            Alert.alert('Incomplete Data', 'Please fill all fields before saving the event.');
            return;
        }

        try {
            const formattedDate = date.toISOString().split('T')[0];
            const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            await createEvent(title, description, formattedDate, formattedTime);
            Alert.alert('Event Created', 'Your event has been successfully created!');

            props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'HomeAdmin' }],
                })
            );
        } catch (error) {
            Alert.alert('Error', 'There was an error creating the event. Please try again.');
            console.error('Error creating event:', error);
        }
    };

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const handleTimeChange = (event, selectedTime) => {
        setShowTimePicker(false);
        if (selectedTime) {
            setTime(selectedTime);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#1D2951' }}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => props.navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'HomeAdmin' }],
                        })
                    )}
                >
                    <Icon name='arrow-back' size={35} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Create Events</Text>
            </View>
            <ScrollView style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.label}>Event Title:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter event title"
                        placeholderTextColor="#aaa"
                        value={title}
                        onChangeText={setTitle}
                    />

                    <Text style={styles.label}>Day of the Event:</Text>
                    <TouchableOpacity
                        style={styles.dateButton}
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Text style={styles.dateText}>{date.toDateString()}</Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={date}
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
                        <Text style={styles.dateText}>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                    </TouchableOpacity>
                    {showTimePicker && (
                        <DateTimePicker
                            value={time}
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
                        value={description}
                        onChangeText={setDescription}
                        multiline={true}
                        numberOfLines={4}
                    />

                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={saveEvent}
                    >
                        <Text style={styles.saveButtonText}>Save Event</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AddEventsScreen;

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
