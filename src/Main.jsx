import React, { useEffect, useState } from 'react'
import Login from './Pages/Login';
import Chat from './Pages/Chat';
import { auth } from './fbconfig';
import {onAuthStateChanged } from "firebase/auth";


const Main = () => {
    const [login, setlogin] = useState(false);
    const [forlogindone, setforlogindone] = useState('Not logged');
    useEffect(() => {
      if(auth.currentUser!=null){
        setforlogindone("Loginhasdone")
      }
      return () => {
        
      };
    }, []);
    useEffect(() => {
      
      if(forlogindone==="Loginhasdone"){
        const authstatelist = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          setlogin(true)
          // ...
        } else {
          // User is signed out
          // ...
          setlogin(false)
        }
      });
      }
      return () => {
        
      }
      
    }, [forlogindone]);
    
    if(login){
      return(
        <>
        <Chat />

        </>
      )
    }else{
      return (
        <>
        <Login logindone={setforlogindone}/>

        </>
      )
    }

  
}

export default Main
