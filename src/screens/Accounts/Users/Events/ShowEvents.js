import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { fetchEventById } from '../../../../services/eventsServices';
import Icon from 'react-native-vector-icons/Ionicons';

const ShowEventScreen = ({ route, navigation }) => {
    const { eventId } = route.params;
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!event) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.notFoundText}>Event not found</Text>
            </View>
        );
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
                <Text style={styles.headerTitle}>Event Details</Text>
            </View>
            <ScrollView style={styles.container}>
                <View style={styles.detailsContainer}>
                    <Image source={require('../../../../../assets/images/logo.webp')}
                        style={styles.image} />
                    <Text style={styles.label}>Event Title:</Text>
                    <Text style={styles.value}>{event.title}</Text>

                    <Text style={styles.label}>Event Date:</Text>
                    <Text style={styles.value}>{event.date}</Text>

                    <Text style={styles.label}>Event Time:</Text>
                    <Text style={styles.value}>{event.time}</Text>

                    <Text style={styles.label}>Event Description:</Text>
                    <Text style={styles.value}>{event.description}</Text>
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
    detailsContainer: {
        padding: 20,
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    value: {
        fontSize: 16,
        marginBottom: 15,
        color: '#000',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notFoundText: {
        fontSize: 18,
        color: '#888',
    },
    image: {
        width: 300,
        height: 300,
        marginBottom: '10%'
    }
});

export default ShowEventScreen;
