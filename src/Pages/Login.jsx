import React from 'react'
import './Login.css'
import {signInWithPopup} from "firebase/auth";
import {auth, provider} from '../fbconfig'
// Initialize Firebase




const Login = (props) => {

  const {loginstate,usermail}=props;
  function signinnow(){
    signInWithPopup(auth, provider)
    .then((result) => {
      
      loginstate(true)
      usermail(result.user.email)
      console.log(result)
      
      
      
      // The signed-in user info.
      const user = result.user;
      alert(user.email)
      
    }).catch((error) => {
      
    });
  }
  

  function currentus(){
    var useremail = auth.currentUser
    console.log(useremail)
    alert(useremail.email)
    
    
  }
  

  function logout(){
    
    
    auth.signOut().then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.error(err)
    })
    
    
  }
  return (
    <div className='gap-6 flex flex-col justify-center items-center w-full h-[100vh]'>
      <p className='text-xl md:text-3xl font-bold'>Welcome to Funchat</p>
      <iframe className='h-[150px] md:h-[250px]' title='lottie' src="https://lottie.host/embed/398992f1-190f-47dc-b174-a4330d4c861d/Y9c2xBs1Ow.json"></iframe>
      <button onClick={signinnow} className='font-bold text-sm md:text-xl w-[100px] md:w-[200px] h-[30px] md:h-[40px] rounded-md md:rounded-xl'>Sign in</button>
      <button onClick={currentus}>click me</button>
      <button onClick={logout}>logout</button>
    </div>
  )
}

export default Login
