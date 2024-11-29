import { auth, firestore, firebase } from '../firebase'; 

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

export const updateUserData = async (userId, userData) => {
  try {
    await firestore.collection('users').doc(userId).update(userData);
    return { success: true, message: 'Perfil actualizado correctamente.' };
  } catch (error) {
    console.error('Error al actualizar los datos del usuario:', error);
    return { success: false, message: 'Ocurrió un error al guardar los cambios.' };
  }
};
export const hireTrainer = async (userId, trainer) => {
  try {
    if (!userId || !trainer || !trainer.id) {
      console.error('Invalid userId or trainer data');
      return false; 
    }

    const userRef = firestore.collection('users').doc(userId);

    const userSnapshot = await userRef.get();
    if (!userSnapshot.exists) {
      console.error('User not found');
      return false; 
    }
    const userData = userSnapshot.data();

    if (userData.myTrainer && userData.myTrainer.trainerId) {
      if (userData.myTrainer.trainerId === trainer.id) {
        alert('Trainer is already assigned to this user');
        return false; 
      } else {
        alert('User already has a different trainer assigned');
        return false; 
      }
    }

    const trainerData = {
      name: trainer.name || 'Unknown',
      age: trainer.age ? trainer.age.toString() : '0',
      weight: trainer.weight ? trainer.weight.toString() : '0',
      contact: trainer.phone || 'Unknown',
      cost: trainer.cost ? trainer.cost.toString() : '0',
    };

    await userRef.set(
      {
        myTrainer: {
          trainerId: trainer.id,
          ...trainerData,
          hireDate: new Date().toISOString(),
        },
      },
      { merge: true }
    );

    const userDataForTrainer = {
      userId: userId,
      age: userData.age || 'Unknown',
      weight: userData.weight || 'Unknown',
      name: userData.name || 'Unknown',
      email: userData.email || 'Unknown',
      phone: userData.phone || 'Unknown',
      hireDate: new Date().toISOString(),
    };

    const trainerRef = firestore.collection('trainers').doc(trainer.id);
    const trainerSnapshot = await trainerRef.get();

    if (trainerSnapshot.exists) {
      const trainerData = trainerSnapshot.data();
      if (trainerData.myUsers && trainerData.myUsers[userId]) {
        return false; 
      }
    }

    await trainerRef.set(
      {
        myUsers: {
          [userId]: {
            ...userDataForTrainer,
          },
        },
      },
      { merge: true }
    );

    return true; 
  } catch (error) {
    console.error('Error hiring trainer:', error);
    return false; 
  }
};

export const handleHireTrainer = async (trainer) => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error('No user is currently logged in');
    }

    const wasHired = await hireTrainer(currentUser.uid, trainer);

    if (wasHired) {
      alert('Trainer successfully hired!');
    }
  } catch (error) {
    console.error('Error handling trainer hire:', error);
    alert('Failed to hire trainer. Please try again.');
  }
};

export const fetchHiredTrainer = async () => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error('No user is currently logged in');
    }
    const userRef = firestore.collection('users').doc(currentUser.uid);
    const userSnapshot = await userRef.get();

    if (!userSnapshot.exists) {
      throw new Error('User not found');
    }

    const userData = userSnapshot.data();

    if (!userData.myTrainer || !userData.myTrainer.trainerId) {
      throw new Error('No trainer assigned to this user');
    }

    const trainerId = userData.myTrainer.trainerId;

    const trainerRef = firestore.collection('trainers').doc(trainerId);
    const trainerSnapshot = await trainerRef.get();

    if (!trainerSnapshot.exists) {
      throw new Error('Trainer not found');
    }

    return trainerSnapshot.data();
  } catch (error) {
    console.error('Error fetching hired trainer:', error);
    throw error;
  }
};

export const removeTrainer = async () => {
  const userId = auth.currentUser?.uid;
  if (!userId) {
    throw new Error('User ID is required');
  }

  console.log('Starting trainer removal for user ID:', userId);

  try {
    const userRef = firestore.collection('users').doc(userId);
    const userSnapshot = await userRef.get();

    if (!userSnapshot.exists) {
      console.error('User document not found:', userId);
      throw new Error('User not found in Firestore');
    }

    const userData = userSnapshot.data();
    const trainerId = userData.myTrainer?.trainerId;

    if (!trainerId) {
      console.error('No trainer assigned for user:', userId);
      throw new Error('No trainer assigned to this user');
    }

    await userRef.update({
      myTrainer: firebase.firestore.FieldValue.delete(), 
    });

    console.log('Trainer removed from user:', userId);

    const trainerRef = firestore.collection('trainers').doc(trainerId);
    const trainerSnapshot = await trainerRef.get();

    if (trainerSnapshot.exists) {
      const trainerData = trainerSnapshot.data();
      const updatedUsers = { ...trainerData.myUsers };
      delete updatedUsers[userId];

      await trainerRef.update({
        myUsers: updatedUsers,
      });
    }

    console.log('User data removed from trainer:', trainerId);

    return true;
  } catch (error) {
    console.error('Error removing trainer:', error);
    throw error;
  }
};


