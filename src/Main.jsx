import React, { useEffect, useState } from 'react'
import Login from './Pages/Login';
import Chat from './Pages/Chat';
import { auth } from './fbconfig';
import {onAuthStateChanged } from "firebase/auth";


const Main = () => {
    const [login, setlogin] = useState(false);
    const [email, setemail] = useState('Not logged');
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
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
      
    }, []);
    if(login){
      return(
        <>
        <Chat />

        </>
      )
    }else{
      return (
        <>
        <Login loginstate={setlogin} usermail={setemail}/>

        </>
      )
    }

  
}

export default Main
