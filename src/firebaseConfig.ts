// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhbAH_mZeFHBPHudIOFIV8bHL9elAwrF4",
  authDomain: "budget-bb0ef.firebaseapp.com",
  databaseURL: "https://budget-bb0ef.firebaseio.com",
  projectId: "budget-bb0ef",
  storageBucket: "budget-bb0ef.firebasestorage.app",
  messagingSenderId: "952775563917",
  appId: "1:952775563917:web:32cc69b77d649473cde0c4",
  measurementId: "G-52ZZH0WK9W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore-ni olish
const db = getFirestore(app);

export { db };
