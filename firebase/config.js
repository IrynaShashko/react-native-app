import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDP-tOA9ASwtnaOUdO7sDQdlAV8AjwJXM4",
  authDomain: "react-native-app-0.firebaseapp.com",
  projectId: "react-native-app-0",
  storageBucket: "react-native-app-0.appspot.com",
  messagingSenderId: "587034132109",
  appId: "1:587034132109:web:d999a7b072d83f58cf2cc4",
  measurementId: "G-LZC0YCRP3N",
};

export const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };

export const db = getFirestore(app);
