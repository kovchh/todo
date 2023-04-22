// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Update import statement
import { getFirestore } from "firebase/firestore"; // Update import statement

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAztor4w_oyj3hb1ISn37iMUc6BPCI7_Mg",
  authDomain: "todo-e0f55.firebaseapp.com",
  projectId: "todo-e0f55",
  storageBucket: "todo-e0f55.appspot.com",
  messagingSenderId: "7640967574",
  appId: "1:7640967574:web:79275ade3677e868b9d5b7",
  measurementId: "G-7BY3KSG6VY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
