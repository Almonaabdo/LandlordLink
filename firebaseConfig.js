// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8rGWs81f3EWgNpdZaGahFjT1q8o25D50",
  authDomain: "accommod8u-dc7cc.firebaseapp.com",
  projectId: "accommod8u-dc7cc",
  storageBucket: "accommod8u-dc7cc.appspot.com",
  messagingSenderId: "72934641381",
  appId: "1:72934641381:web:9da745b69ce39a03f90e0c",
  measurementId: "G-XWEJEZXTBX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);