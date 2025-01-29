// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3okMFR2AYGzROV8RykgLXfJFEzy7cI5s",
  authDomain: "budget-61e6a.firebaseapp.com",
  databaseURL: "https://budget-61e6a.firebaseio.com",
  projectId: "budget-61e6a",
  storageBucket: "budget-61e6a.firebasestorage.app",
  messagingSenderId: "204894394511",
  appId: "1:204894394511:web:8aec788c45ab0c030df8fa",
  measurementId: "G-CB13KSN8GE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore-ni olish
const db = getFirestore(app);

export { db };
