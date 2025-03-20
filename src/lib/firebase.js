
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCmnHiXuFq1ekUTpFQES35GhivYd5_8IE",
  authDomain: "sign-scribe-13.firebaseapp.com",
  projectId: "sign-scribe-13",
  storageBucket: "sign-scribe-13.firebasestorage.app",
  messagingSenderId: "1083475571895",
  appId: "1:1083475571895:web:63d7e3aa99ce41fd8f4932"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
