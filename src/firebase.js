// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNf0IPjvwON7VivkFkG5qdkoxIiTCCYu8",
  authDomain: "first-backend-app-4d69e.firebaseapp.com",
  projectId: "first-backend-app-4d69e",
  storageBucket: "first-backend-app-4d69e.firebasestorage.app",
  messagingSenderId: "213977497379",
  appId: "1:213977497379:web:7e469ecd666cfc99939696",
  measurementId: "G-F02FW0GMGN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export {auth, db};