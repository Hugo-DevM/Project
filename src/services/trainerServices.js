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