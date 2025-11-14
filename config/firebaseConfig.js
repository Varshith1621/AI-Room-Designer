// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "varshith-31cc1.firebaseapp.com",
  projectId: "varshith-31cc1",
  storageBucket: "varshith-31cc1.firebasestorage.app",
  messagingSenderId: "900951812417",
  appId: "1:900951812417:web:d6e748a45773dca38d99c0",
  measurementId: "G-E77S6XC88C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)
