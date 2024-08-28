// lib/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAKRnJuW0Wu-xWuSzZxb7CFRFHbJ9odnP8",
  authDomain: "revenge-motorsport.firebaseapp.com",
  projectId: "revenge-motorsport",
  storageBucket: "revenge-motorsport.appspot.com",
  messagingSenderId: "214059486325",
  appId: "1:214059486325:web:24d2e09ace360d3f2e7c3c",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
