
import { initializeApp } from "firebase/app";
import {  initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
   apiKey: "AIzaSyDt6cKDcm4sj-OKedp8beQAGbu7mlpNJB8",
  authDomain: "cmlnorthest.firebaseapp.com",
  projectId: "cmlnorthest",
  storageBucket: "cmlnorthest.firebasestorage.app",
  messagingSenderId: "308460005524",
  appId: "1:308460005524:web:7644e0cd43c2d5ca522c81",
  measurementId: "G-4HQQST6MX3"
};

const app = initializeApp(firebaseConfig);
initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6Ld2fc4rAAAAAHVpwqV-TfblC2EGv26mqOFqc6yt"),
  isTokenAutoRefreshEnabled: true,
});
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);