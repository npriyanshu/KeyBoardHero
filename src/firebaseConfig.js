// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeG9cUHOD5WMWkFKLxrB5rreP0iCvi_Ns",
  authDomain: "keyboardhero-a1428.firebaseapp.com",
  projectId: "keyboardhero-a1428",
  storageBucket: "keyboardhero-a1428.appspot.com",
  messagingSenderId: "661502390516",
  appId: "1:661502390516:web:269b64231e8e04481d6ea1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export {auth,app,firestore};