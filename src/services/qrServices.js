import { firestore, auth } from '../firebase';

// Función para obtener el QR del usuario
export const fetchUserDetails = async () => {
    const user = auth.currentUser;
  
    if (!user) {
      throw new Error('No hay un usuario autenticado.');
    }
  
    try {

      const userDoc = await firestore.collection('users').doc(user.uid).get();
      if (userDoc.exists) {
        const data = userDoc.data();
        return {
          qrCodeContent: data.qrCodeContent,
          name: data.name, 
        };
      } else {
        throw new Error('Documento de usuario no encontrado.');
      }
    } catch (error) {
      console.error('Error al obtener el contenido del QR:', error);
      throw error;
    }
  };