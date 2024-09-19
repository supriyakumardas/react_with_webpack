 import { initializeApp } from "firebase/app";
 import { getAuth } from "firebase/auth";



 const firebaseConfig = {
  apiKey: "AIzaSyCYtKNbxpRUCsz-dOYJ1OMSajiEMPRNhAM",
  authDomain: "react-webpack-cb2c4.firebaseapp.com",
  projectId: "react-webpack-cb2c4",
  storageBucket: "react-webpack-cb2c4.appspot.com",
  messagingSenderId: "669588612928",
  appId: "1:669588612928:web:8bab2b94aa07727775fca5",
  measurementId: "G-75CN90L3K0"
};


const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);


export { auth };
