import { firestore } from '../firebase'; 

export const getUserData = async (userId) => {
  try {
    const userDoc = firestore.collection('users').doc(userId);
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

