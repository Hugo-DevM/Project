import { auth, firestore } from '../firebase';
import { CommonActions } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import React from 'react';

//Login de usuarios de admins, trainers y users
export const handleLogin = (email, password, navigation) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      console.log('UID del usuario autenticado:', user.uid);

      try {
        const adminDocRef = firestore.collection('admins').doc(user.uid);
        const adminDoc = await adminDocRef.get();

        if (adminDoc.exists) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'HomeAdmin' }],
            })
          );
          return;
        }

        const trainerDocRef = firestore.collection('trainers').doc(user.uid);
        const trainerDoc = await trainerDocRef.get();

        if (trainerDoc.exists) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'TrainerScreen' }],
            })
          );
          return;
        }

        const userDocRef = firestore.collection('users').doc(user.uid);
        const userDoc = await userDocRef.get();

        if (userDoc.exists) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'MainDrawer' }],
            })
          );
          return;
        }

        alert('El usuario no tiene un rol asignado o su documento no existe.');
      } catch (error) {
        console.error('Error verificando el rol del usuario:', error);
        alert('Ocurrió un error al verificar el rol del usuario.');
      }
    })
    .catch(error => alert(`Error de inicio de sesión: ${error.message}`));
};
//Registro de Usuarios
export const handleRegister = (email, password, name, role, subscriptionActive = false, navigation) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      const qrContent = {
        userId: user.uid,
        role: role,
        ...(role === 'user' && { subscriptionActive: subscriptionActive })
      };

      const collection = role === 'user' ? 'users' : role === 'trainer' ? 'trainers' : 'admins';
      firestore.collection(collection).doc(user.uid).set({
        name: name,
        email: email,
        password: password,
        role: role,
        ...(role === 'user' && { subscriptionActive: subscriptionActive }),
        qrCodeContent: qrContent,
      })
        .then(() => {
          console.log(`${role} almacenado exitosamente en Firestore.`);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'HomeAdmin' }],
            })
          );
        })
        .catch((error) => {
          console.error(`Error guardando la información del ${role} en Firestore:`, error);
          alert(`Error al registrar el ${role} en Firestore. Por favor, intenta de nuevo.`);
        });
    })
    .catch((error) => {
      console.error(`Error al crear ${role} con Firebase Authentication:`, error);
      alert(`Error de registro: ${error.message}`);
    });
};

//Registro de Admins
export const handleRegisterAdmins = (email, password, name, navigation) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      firestore.collection('admins').doc(user.uid).set({
        name: name,
        email: email,
        password: password,
        role: 'admin'
      })
        .catch(error => console.error('Error saving user information:', error));

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'HomeAdmin' }],
        })
      );
    })
    .catch(error => alert(error.message));
};
//Ver si un usuario esta logueado
export const checkUserLoggedIn = (navigation) => {
  auth.onAuthStateChanged(user => {
    if (user) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'MainDrawer' }],
        })
      );
    }
  });
};
//Realizar un logout
export const handleLogout = (navigation) => {
  auth.signOut()
    .then(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    })
    .catch((error) => {
      console.error("Error signing out: ", error);
      alert('Error al cerrar sesión. Por favor, intenta de nuevo.');
    });
};

