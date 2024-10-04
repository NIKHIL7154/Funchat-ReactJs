import { getAuth, GoogleAuthProvider,browserLocalPersistence,setPersistence } from "firebase/auth";


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// modified
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};
function getCurrentUser(auth) {
  return new Promise((resolve, reject) => {
     const unsubscribe = auth.onAuthStateChanged(user => {
        unsubscribe();
        resolve(user);
     }, reject);
  });
}
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const app = initializeApp(firebaseConfig);
const auth = await getAuth();
const mydata= await getCurrentUser(auth)
export {mydata}
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    //done
    
  })
  .catch((error) => {
    // Handle Errors here.
    
  });
export {auth}

export const provider = new GoogleAuthProvider();
