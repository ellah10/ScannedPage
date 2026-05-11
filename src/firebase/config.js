import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import {
  getFirestore
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBVRLAhFEm7I5Ct2G94b2iolI6xxma4Ulg",
  authDomain: "scanedpage.firebaseapp.com",
  projectId: "scanedpage",
  storageBucket: "scanedpage.firebasestorage.app",
  messagingSenderId: "230151019340",
  appId: "1:230151019340:web:22dfe7c32e44ad6ae40de9",
  measurementId: "G-GC30H7HVZH"
};


const app =
  initializeApp(firebaseConfig);

export const db =
  getFirestore(app);
  export const auth = getAuth(app);