// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBEIAm47l69TDdy_vBal1-uPd0hkP_new",
  authDomain: "databarangs.firebaseapp.com",
  databaseURL: "https://databarangs-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "databarangs",
  storageBucket: "databarangs.appspot.com",
  messagingSenderId: "450200577992",
  appId: "1:450200577992:web:1391f11a9a33f2a13182fd"
};

// Initialize Firebase
const databarangs = initializeApp(firebaseConfig);

export default databarangs;