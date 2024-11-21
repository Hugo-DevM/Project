import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import TrainerListAdmin from '../../../../components/TrainerListAdmin'

const ListTrainersAdminScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
                <TrainerListAdmin />
            </View>
        </SafeAreaView>
    );
};

export default ListTrainersAdminScreen;
