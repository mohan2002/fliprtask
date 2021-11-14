// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCe70yf78cBhpoqGghkYl0qE2OUbcIzUCI",
  authDomain: "food-1f3c5.firebaseapp.com",
  projectId: "food-1f3c5",
  storageBucket: "food-1f3c5.appspot.com",
  messagingSenderId: "593454214877",
  appId: "1:593454214877:web:400504b5ab91d72193f534"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export {auth,db,storage}