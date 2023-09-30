// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEmvw_PAhOc7mttk1_1ifFl6tVCIo_B_0",
  authDomain: "user-email-password-auth-a473e.firebaseapp.com",
  projectId: "user-email-password-auth-a473e",
  storageBucket: "user-email-password-auth-a473e.appspot.com",
  messagingSenderId: "701225073300",
  appId: "1:701225073300:web:6f23e3c7bd0d53441dd281"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;