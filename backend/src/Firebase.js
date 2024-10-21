// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxAmvgeJBPBsD6wvSJigGe5BWNiYLKtqg",
  authDomain: "tdxteam-865e8.firebaseapp.com",
  projectId: "tdxteam-865e8",
  storageBucket: "tdxteam-865e8.appspot.com",
  messagingSenderId: "4644935639",
  appId: "1:4644935639:web:11d0a1db84785b5e2b1d92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
export {app,storage}