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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
    },});