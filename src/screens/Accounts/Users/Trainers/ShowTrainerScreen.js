import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { fetchTrainerById } from '../../../../services/trainerServices';
import Icon from 'react-native-vector-icons/Ionicons';

const ShowTrainerScreen = ({ route, navigation }) => {
    const { trainerId } = route.params;
    const [trainer, setTrainer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTrainer = async () => {
            try {
                const eventData = await fetchTrainerById(trainerId);
                setTrainer(eventData);
            } catch (error) {
                console.error('Error fetching trainer:', error);
            } finally {
                setLoading(false);
            }
        };

        getTrainer();
    }, [trainerId]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!trainer) {
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
                <Text style={styles.headerTitle}>Trainer Details</Text>
            </View>
            <ScrollView style={styles.container}>
                <View style={styles.detailsContainer}>
                    <Image source={require('../../../../../assets/images/logo.webp')}
                        style={styles.image} />
                    <Text style={styles.label}>Name:</Text>
                    <Text style={styles.value}>{trainer.name}</Text>

                    <Text style={styles.label}>Age:</Text>
                    <Text style={styles.value}>{trainer.age} years</Text>

                    <Text style={styles.label}>Weight:</Text>
                    <Text style={styles.value}>{trainer.weigth} Kg</Text>

                    <Text style={styles.label}>Contact:</Text>
                    <Text style={styles.value}>+52 {trainer.contact}</Text>

                    <Text style={styles.label}>Cost:</Text>
                    <Text style={styles.value}>${trainer.cost} / Month</Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Hire</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
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
        marginBottom: '5%'
    },
    buttonContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
      },
      button: {
        backgroundColor: '#FEC104',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
      },
      buttonText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 18,
      },
});

export default ShowTrainerScreen;
