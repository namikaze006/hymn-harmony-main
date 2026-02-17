import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";

// TODO: User needs to replace this with their Firebase config from the console
const firebaseConfig = {
    apiKey: "AIzaSyBl3DeOf5sxX-Wj1Z4QID-xl9QNy5L8Vw8",
    authDomain: "himnario-bautista-b92dc.firebaseapp.com",
    projectId: "himnario-bautista-b92dc",
    storageBucket: "himnario-bautista-b92dc.firebasestorage.app",
    messagingSenderId: "378162030823",
    appId: "1:378162030823:web:9b9f0857129d2d2099da42",
    measurementId: "G-88ZRL804GT"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export { signInWithPopup, signOut, doc, setDoc, getDoc, onSnapshot };
