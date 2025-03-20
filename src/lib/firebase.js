
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJmDm_FTm9RVX18Ly13LYUWe-rNifSQZ4",
  authDomain: "sign-scribe-app.firebaseapp.com",
  projectId: "sign-scribe-app",
  storageBucket: "sign-scribe-app.appspot.com",
  messagingSenderId: "854791921225",
  appId: "1:854791921225:web:a51af15bed99b4de8a3c13",
  measurementId: "G-LD32VCWL5E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
