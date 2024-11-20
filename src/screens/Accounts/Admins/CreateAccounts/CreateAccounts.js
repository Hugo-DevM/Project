import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CommonActions } from '@react-navigation/native';
import CreateAccountTabs from '../../../../navigation/TabNavigatorAccounts'

const CreateAccountsScreen = (props) => {
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
                <Text style={styles.headerTitle}>Create Account</Text>
            </View>
            <View style={styles.container}>
            <CreateAccountTabs />
            </View>
        </SafeAreaView>
    );
};

export default CreateAccountsScreen;

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
        color: 'white'
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
  });