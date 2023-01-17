// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
import "firebase/auth";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDP-tOA9ASwtnaOUdO7sDQdlAV8AjwJXM4",
  authDomain: "react-native-app-0.firebaseapp.com",
  projectId: "react-native-app-0",
  storageBucket: "react-native-app-0.appspot.com",
  messagingSenderId: "587034132109",
  appId: "1:587034132109:web:d999a7b072d83f58cf2cc4",
  measurementId: "G-LZC0YCRP3N",
};
// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
export default firebase;
