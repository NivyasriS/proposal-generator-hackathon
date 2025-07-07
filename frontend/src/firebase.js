// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC5V2z0LZtdCY2Rbo-uIrxGCozei6C79ws",
  authDomain: "proposalgenhackathon.firebaseapp.com",
  projectId: "proposalgenhackathon",
  storageBucket: "proposalgenhackathon.appspot.com", // FIXED: storageBucket format must be .appspot.com
  messagingSenderId: "25725734156",
  appId: "1:25725734156:web:046e1a1de5d3f18d0a0d29",
  measurementId: "G-9Q0NJ9HPTY",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
