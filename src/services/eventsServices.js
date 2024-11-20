import { firestore } from '../firebase';

//Crear Eventos
export const createEvent = async (title, description, date, time) => {
  try {
    const event = {
      title,
      description,
      date,
      time,
      createdAt: new Date(),
    };

    const docRef = await firestore.collection('events').add(event);
    console.log('Evento creado con ID: ', docRef.id);
  } catch (error) {
    console.error('Error al crear el evento: ', error);
  }
};

//Traer los datos del evento
export const fetchEvents = async () => {
    try {
        const snapshot = await firestore.collection('events').get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error; 
    }
};

//Traer los datos por el id del item
export const fetchEventById = async (id) => {
    try {
      const doc = await firestore.collection('events').doc(id).get();
      if (doc.exists) {
        return { id: doc.id, ...doc.data() };
      } else {
        throw new Error('Event not found');
      }
    } catch (error) {
      throw error;
    }
  };
  //Actualizar los datos
  export const updateEvent = async (id, updatedData) => {
    try {
      await firestore.collection('events').doc(id).update(updatedData);
    } catch (error) {
      throw error;
    }
  };