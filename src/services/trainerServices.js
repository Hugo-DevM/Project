import { firestore } from '../firebase';

export const getTrainers = (callback) => {
  const unsubscribe = firestore.collection('trainers').onSnapshot(
    (snapshot) => {
      const trainers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(trainers);
    },
    (error) => {
      console.error('Error fetching trainers in real-time:', error);
    }
  );

  return unsubscribe;
};

export const fetchTrainerById = async (id) => {
    try {
      const doc = await firestore.collection('trainers').doc(id).get();
      if (doc.exists) {
        return { id: doc.id, ...doc.data() };
      } else {
        throw new Error('Trainer not found');
      }
    } catch (error) {
      throw error;
    }
  };

  export const getTrainerData = async (userId) => {
    try {
      const userDoc = firestore.collection('trainers').doc(userId);
      const userSnapshot = await userDoc.get();
      if (userSnapshot.exists) {
        return userSnapshot.data();
      } else {
        console.log('No such document!');
        return null;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };
  
  export const updateTrainerData = async (userId, userData) => {
    try {
      await firestore.collection('trainers').doc(userId).update(userData);
      return { success: true, message: 'Perfil actualizado correctamente.' };
    } catch (error) {
      console.error('Error al actualizar los datos del usuario:', error);
      return { success: false, message: 'Ocurrió un error al guardar los cambios.' };
    }
  };


export const fetchUsersByTrainer = (trainerId, onUsersChange) => {
  try {
    return firestore
      .collection("trainers")
      .doc(trainerId)
      .onSnapshot(
        (docSnapshot) => {
          if (docSnapshot.exists) {
            const trainerData = docSnapshot.data();
            const users = trainerData.myUsers || {};
            const userList = Object.entries(users).map(([userId, userDetails]) => ({
              userId,
              ...userDetails,
            }));

            onUsersChange(userList); 
          } else {
            console.error("No se encontró el documento del entrenador.");
            onUsersChange([]);
          }
        },
        (error) => {
          console.error("Error al obtener los usuarios del entrenador:", error);
          onUsersChange([]);
        }
      );
  } catch (error) {
    console.error("Error al establecer el listener:", error);
    throw error;
  }
};

