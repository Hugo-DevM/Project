import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import EventList from '../../../../components/EventListUser';

const GymEventsScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.header}>
                <Text style={styles.textTitle}> GYM Events</Text>
            </View>
            <View style={{ flex: 1 }}>
                <EventList />
            </View>
        </SafeAreaView>
    );
};

export default GymEventsScreen;

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: 'white',
    },
    textTitle: {
        textAlign: 'center',
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold'
    },
});