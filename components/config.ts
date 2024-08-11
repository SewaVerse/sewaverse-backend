// Import the functions you need from the SDKs you need

//here you must add your configs form Firebase website :https://firebase.google.com/

import { initializeApp } from "firebase/app";
import "firebase/auth";
// Import the functions you need from the SDKs you need

//copy and Paste
const firebaseConfig = {
  apiKey: "AIzaSyACpIFgw8u5TeWGxa_WcIQxcXnrpA2klvQ",
  authDomain: "sewaverse-542ac.firebaseapp.com",
  projectId: "sewaverse-542ac",
  storageBucket: "sewaverse-542ac.appspot.com",
  messagingSenderId: "709381976010",
  appId: "1:709381976010:web:d916fb6a91f80d0b186933",
  measurementId: "G-BBHGCX1HEN",
};

//IT MUST BE LIKE THIS  DONT CHANGE IT
const app = initializeApp(firebaseConfig);
export { app };
