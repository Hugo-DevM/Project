import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import TrainerList from '../../../../components/TrainerList'

const ListTrainersScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
                <TrainerList />
            </View>
        </SafeAreaView>
    );
};

export default ListTrainersScreen;
