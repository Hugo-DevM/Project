import { firestore } from '../firebase';

  export const getTrainers = async () => {
    try {
        const snapshot = await firestore.collection('trainers').get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error fetching trainers:', error);
        throw error; 
    }
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