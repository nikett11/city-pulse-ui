// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBriOLO7KpCuMkXR2NumVLFiRk7zJa0ALM",
  authDomain: "valid-broker-466518-r9.firebaseapp.com",
  projectId: "valid-broker-466518-r9",
  storageBucket: "valid-broker-466518-r9.firebasestorage.app",
  messagingSenderId: "1011723893887",
  appId: "1:1011723893887:web:f66accb1965281f576534a",
  measurementId: "G-TF3PBHZHYY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

export { auth, db };