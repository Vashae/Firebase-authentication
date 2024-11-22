// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import {getFirestore}from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOITT69TO0t2-e-fD5FskMRoYsEzk1_ak",
  authDomain: "fir-intro-e1ef5.firebaseapp.com",
  projectId: "fir-intro-e1ef5",
  storageBucket: "fir-intro-e1ef5.firebasestorage.app",
  messagingSenderId: "411903484048",
  appId: "1:411903484048:web:4b14827f1b9de5e71f7815",
  measurementId: "G-QDNBRHBF58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 export const auth = getAuth();
 export const db = getFirestore();