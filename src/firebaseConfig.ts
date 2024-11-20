// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4KpuWjthKTtjK7RrvwEF_WfEBPn8m6ZY",
  authDomain: "budget-web-app-79672.firebaseapp.com",
  databaseURL: "https://budget-web-app-79672.firebaseio.com",
  projectId: "budget-web-app-79672",
  storageBucket: "budget-web-app-79672.firebasestorage.app",
  messagingSenderId: "448735584426",
  appId: "1:448735584426:web:74a7d3668ee508fd9e30d3",
  measurementId: "G-LW2Z0ZJXD6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore-ni olish
const db = getFirestore(app);

export { db };