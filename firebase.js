// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth,GoogleAuthProvider  } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyA9ItBCjV8BDS1SLgDNhFfSXfaVokfjz7U",
  authDomain: "inventory-management-cbc87.firebaseapp.com",
  projectId: "inventory-management-cbc87",
  storageBucket: "inventory-management-cbc87.appspot.com",
  messagingSenderId: "337508076549",
  appId: "1:337508076549:web:3b374102e634244219606c",
  measurementId: "G-1C2BJ34X4P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { firestore };
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
