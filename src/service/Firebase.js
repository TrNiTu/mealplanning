//import { getAuth, getRedirectResult, GoogleAuthProvider, initializeApp, SignInWithRedirect } from 'firebase/app';
import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to us
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDWVqz0bx6LO-Vaa4gUqHSHrfaEeKkeU-w",
  authDomain: "grocerylist-72f24.firebaseapp.com",
  projectId: "grocerylist-72f24",
  storageBucket: "grocerylist-72f24.appspot.com",
  messagingSenderId: "693632045296",
  appId: "1:693632045296:web:6b5a29d9ca5052ad1cb235",
  measurementId: "G-HRH84FM83Q"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDb = getFirestore(firebaseApp);