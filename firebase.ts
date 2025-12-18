import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCW8oMLEMRosKPzy1nJwXyyWZM1YL2_pv0",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "hair-coaction-4940e.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "hair-coaction-4940e",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "hair-coaction-4940e.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "349364008358",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:349364008358:web:5ca253307ef53fb2aacb67",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-0T7PT6K9M2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// const analytics = getAnalytics(app); // Remove unused variable warning

export { auth, provider, signInWithPopup };