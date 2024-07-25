import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACpIFgw8u5TeWGxa_WcIQxcXnrpA2klvQ",
  authDomain: "sewaverse-542ac.firebaseapp.com",
  projectId: "sewaverse-542ac",
  storageBucket: "sewaverse-542ac.appspot.com",
  messagingSenderId: "709381976010",
  appId: "1:709381976010:web:d916fb6a91f80d0b186933",
  measurementId: "G-BBHGCX1HEN",
};

// Initialize Firebase
const app =  initializeApp(firebaseConfig);
export const auth = getAuth(app);


