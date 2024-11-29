import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, SafeAreaView, ScrollView, Alert, Image} from 'react-native';
import { auth } from '../../../../firebase';
import { getUserData, updateUserData } from '../../../../services/userServices';
import Icon from 'react-native-vector-icons/Ionicons';


const EditProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (userId) {
          const data = await getUserData(userId);
          setUserData(data);
        } else {
          setError('Usuario no autenticado.');
        }
      } catch (err) {
        console.error(err);
        setError('Error al cargar los datos del usuario.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      const userId = auth.currentUser.uid;
      const response = await updateUserData(userId, userData);
      Alert.alert('Profile Updated', response.message);
      if (response.success) {
        navigation.goBack();
      }
    } catch (err) {
      console.error('Error al guardar los cambios:', err);
      Alert.alert('Error', 'Ocurrió un error al guardar los cambios.');
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>
      <ScrollView contentContainerStyle={styles.form}>
      <View style={styles.imageContainer}>
      <Image source={require('../../../../../assets/images/logoUser.png')} style={styles.image}/>
      </View>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#aaa"
          value={userData?.name || ''}
          onChangeText={(text) => setUserData({ ...userData, name: text })}
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={userData?.email || ''}
          editable={false}
        />

        <Text style={styles.label}>Phone:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={userData?.phone || ''}
          onChangeText={(text) => setUserData({ ...userData, phone: text })}
        />

        <Text style={styles.label}>Age:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your age"
          placeholderTextColor="#aaa"
          value={userData?.age || ''}
          keyboardType="numeric"
          onChangeText={(text) => setUserData({ ...userData, age: text })}
        />

        <Text style={styles.label}>Weight (kg):</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your weight"
          placeholderTextColor="#aaa"
          value={userData?.weight || ''}
          keyboardType="numeric"
          onChangeText={(text) => setUserData({ ...userData, weight: text })}
        />

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D2951',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    backgroundColor: '#1D2951',
    borderBottomColor: '#1D2951',
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    marginRight: 30,
    color: 'white',
  },
  form: {
    padding: 20,
    backgroundColor: '#FFFFFF',
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
  image:{
    width: 300,
    height: 300,
    marginBottom: '10%'
  },
  imageContainer:{
    alignItems: 'center',
    justifyContent: 'center'
  }
});
