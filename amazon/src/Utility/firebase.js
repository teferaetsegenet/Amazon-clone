import firebase from "firebase/compat/app";
//auth
import {getAuth} from "firebase/auth"
import "firebase/compat/firestore"
import "firebase/compat/auth"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0_oN3TLW2IP6VE-DDH2VqIvFIwNXAwdU",
  authDomain: "clone-d489a.firebaseapp.com",
  projectId: "clone-d489a",
  storageBucket: "clone-d489a.appspot.com",
  messagingSenderId: "402694341918",
  appId: "1:402694341918:web:f48a1c85d5c45843fe750f",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
