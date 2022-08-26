// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8WwSAQ9wq-EVhJU8BMvru05lClJ2i8bM",
  authDomain: "contactapp-447cd.firebaseapp.com",
  projectId: "contactapp-447cd",
  storageBucket: "contactapp-447cd.appspot.com",
  messagingSenderId: "132024561849",
  appId: "1:132024561849:web:1aebe21f63230806a36b68",
  measurementId: "G-MGTD0NB9W4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage_bucket = getStorage(app);
