
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC8WJfytc4inNhzfgQEzvHj0rZcWMmhRCo",
    authDomain: "chatting-148a9.firebaseapp.com",
    projectId: "chatting-148a9",
    storageBucket: "chatting-148a9.appspot.com",
    messagingSenderId: "981966637874",
    appId: "1:981966637874:web:28c86714452ac32685652b",
    measurementId: "G-0HVYHYD51S"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { provider, auth };
export default db;


























