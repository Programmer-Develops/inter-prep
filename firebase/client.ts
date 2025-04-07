// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMeWdErPrMdHcVJzuCd0-NprcPx46Zs1g",
  authDomain: "prepwise-81e55.firebaseapp.com",
  projectId: "prepwise-81e55",
  storageBucket: "prepwise-81e55.firebasestorage.app",
  messagingSenderId: "509963448558",
  appId: "1:509963448558:web:3b2ac598a4a6c9f6b943ff",
  measurementId: "G-DLTHP03JSP"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);