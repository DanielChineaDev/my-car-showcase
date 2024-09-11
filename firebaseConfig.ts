// lib/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAKRnJuW0Wu-xWuSzZxb7CFRFHbJ9odnP8",
  authDomain: "revenge-motorsport.firebaseapp.com",
  projectId: "revenge-motorsport",
  storageBucket: "revenge-motorsport.appspot.com",
  messagingSenderId: "214059486325",
  appId: "1:214059486325:web:24d2e09ace360d3f2e7c3c",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

// Inicializa Firebase Auth
const auth = getAuth(app);

// Exportamos la base de datos (Firestore) y la autenticación (Auth)
export { db, auth };
