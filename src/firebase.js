// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBazB9V_bt_7FTFND72vjth2rFhbZ6jupM",
  authDomain: "taskmaster-743c4.firebaseapp.com",
  projectId: "taskmaster-743c4",
  storageBucket: "taskmaster-743c4.appspot.com",
  messagingSenderId: "639776804976",
  appId: "1:639776804976:web:f0a7624524d7ea98ede4b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const taskCollection = collection(db, "myTasks")
