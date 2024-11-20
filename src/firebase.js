
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


const settings = {timestampsInSnapshots: true,merge:true};
const config = {
    apiKey: "AIzaSyAOIvDBYCHjGJhNddiJLIIemAnYs2Ss5Kk",
    authDomain: "gymmate-2777f.firebaseapp.com",
    projectId: "gymmate-2777f",
    storageBucket: "gymmate-2777f.firebasestorage.app",
    messagingSenderId: "781013935548",
    appId: "1:781013935548:web:ca442fa285bda335a337b9",
    measurementId: "G-7EDLLQX23J"
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  const firestore = firebase.firestore();
  firestore.settings(settings);
  
  const auth = firebase.auth();
  const storage = firebase.storage();
  
  export {
      firebase,
      auth,
      firestore,
      storage,
  };