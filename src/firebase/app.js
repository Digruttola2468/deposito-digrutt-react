// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCgsle8cpTvEDeao7djLLJ32NoUKTfPYbI",
  authDomain: "digrutt-deposito.firebaseapp.com",
  projectId: "digrutt-deposito",
  storageBucket: "digrutt-deposito.appspot.com",
  messagingSenderId: "1085167861052",
  appId: "1:1085167861052:web:507b7b2ccdc6aed91bb239",
  measurementId: "G-SG3SPJ1T15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);