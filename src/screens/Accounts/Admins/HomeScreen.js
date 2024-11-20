import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CommonActions } from '@react-navigation/native';
import EventList from '../../../components/EventListAdmin';

const HomeScreen = (props) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.header}>
                <TouchableOpacity 
                    onPress={() => props.navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'AddEvents' }],
                        })
                    )}>
                    <Text style={styles.textTitle}>Add Events +</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
                <EventList />
                <TouchableOpacity
                    style={styles.floatingButton}
                    onPress={() => props.navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'CreateAccounts' }],
                        })
                    )}
                >
                    <Icon name='add' size={35} color="#FEC104" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#1D2951',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    textTitle: {
        textAlign: 'center',
        fontSize: 20,
        color: 'black',
    },
    headerText: {
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 18,
        fontWeight: 'bold',
    }
});
