import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCNilqizrUdycb39f9kBGs4h2WE-dB5WWE",
  authDomain: "service-desk-171ca.firebaseapp.com",
  projectId: "service-desk-171ca",
  storageBucket: "service-desk-171ca.appspot.com",
  messagingSenderId: "519177171789",
  appId: "1:519177171789:web:70b1989ddcf1a8620a3d04",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {db, auth};
