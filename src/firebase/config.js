import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {

  apiKey: "AIzaSyDGAmv7cz_GfCcxwMEcbUYdJvyXp6ZLP_Y",

  authDomain: "miniblog-5b725.firebaseapp.com",

  projectId: "miniblog-5b725",

  storageBucket: "miniblog-5b725.appspot.com",

  messagingSenderId: "23573285146",

  appId: "1:23573285146:web:e74df5f210b9c3ca4184a3"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };