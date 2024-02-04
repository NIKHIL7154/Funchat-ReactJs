import React from 'react'
import './Login.css'
import {signInWithPopup} from "firebase/auth";
import {auth, provider,app} from '../fbconfig'

import {  doc, getDoc,getFirestore, setDoc } from "firebase/firestore";
// Initialize Firebase




const Login = (props) => {
  const db = getFirestore(app);
  
  const {logindone}=props;
  function signinnow(){
    signInWithPopup(auth, provider)
    .then(async (result) => {

      let usern=result.user
      
      var rawemail=usern.email.replace('@gmail.com','')
      const docRef = doc(db, "users/logged/userdata/", rawemail);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        logindone("Loginhasdone")

      } else {

        const docf=doc(db,"users/logged/userdata/",rawemail)
        setDoc(docf,{
          Name:usern.displayName,
          Email:usern.email,
          Phone:usern.phoneNumber?usern.phoneNumber:"Not given",
          Uid:usern.uid,
          Photourl:result.user.photoURL,
          rooms:{demo:"demo"}

        }).then(logindone("Loginhasdone"))
      }


      // The signed-in user info.
      
      
    }).catch((error) => {
      
    });
  }
  

  
  

  
  return (
    <div className='gap-6 flex flex-col justify-center items-center w-full h-[100vh]'>
      <p className='text-xl md:text-3xl font-bold'>Welcome to Funchat</p>
      <iframe className='h-[150px] md:h-[250px]' title='lottie' src="https://lottie.host/embed/398992f1-190f-47dc-b174-a4330d4c861d/Y9c2xBs1Ow.json"></iframe>
      <button onClick={signinnow} className='font-bold loginbt text-sm md:text-xl w-[100px] md:w-[200px] h-[30px] md:h-[40px] rounded-md md:rounded-xl'>Sign in</button>
      
    </div>
  )
}

export default Login
