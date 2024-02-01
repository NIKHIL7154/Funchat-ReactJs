import { getAuth, GoogleAuthProvider,browserLocalPersistence,setPersistence } from "firebase/auth";


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBD2aKoBXn5ML6XV-TN68uiySTqtyNewFw",
  authDomain: "funchat-react.firebaseapp.com",
  projectId: "funchat-react",
  storageBucket: "funchat-react.appspot.com",
  messagingSenderId: "378929997525",
  appId: "1:378929997525:web:445766ae4f17eafcf0a45c",
  measurementId: "G-RMZQRFTR6X"
};

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const app = initializeApp(firebaseConfig);
const auth = getAuth();
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("done persistence")
    
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });
export {auth}

export const provider = new GoogleAuthProvider();
