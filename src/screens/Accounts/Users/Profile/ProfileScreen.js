import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import getUserData from '../../../../services/userServices'

import {auth} from '../../../../firebase'

const ProfileScreen = () => {
    const [userData, setUserData] = useState(null);
  
    const handleFetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          Alert.alert('Error', 'No user is currently logged in');
          return;
        }
        const userId = currentUser.uid;
        const data = await getUserData(userId);
        if (data) {
          setUserData(data);
          Alert.alert('User Data', JSON.stringify(data, null, 2));
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch user data');
        
        
      }
    };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../../assets/images/logo.webp')}
        style={styles.image}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleFetchUserData} style={styles.button}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      {userData && (
        <View style={styles.userDataContainer}>
          <Text style={styles.userDataText}>Name: {userData.name}</Text>
          <Text style={styles.userDataText}>Email: {userData.email}</Text>
        </View>
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: '10%',
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
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
  userDataContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  userDataText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});
