import React from 'react'
import './Login.css'
import {signInWithPopup} from "firebase/auth";
import {auth, provider,app} from '../fbconfig'
import { useCookies } from 'react-cookie';
import { collection, doc, getDoc,getFirestore, setDoc } from "firebase/firestore";
// Initialize Firebase




const Login = (props) => {
  const db = getFirestore(app);
  const [cookies, setCookie] = useCookies(['refresh','idtoken']);
  const {loginstate,usermail}=props;
  function signinnow(){
    signInWithPopup(auth, provider)
    .then(async (result) => {
      
      // loginstate(true)
      usermail(result.user.email)
      console.log(result)
      let usern=result.user
      setCookie('refresh',result._tokenResponse.refreshToken)
      setCookie('idtoken',result._tokenResponse.idToken)
      var rawemail=usern.email.replace('@gmail.com','')
      const docRef = doc(db, "users/logged/userdata/", rawemail);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        loginstate(true)
        
      } else {
        
        const docf=doc(db,"users/logged/userdata/",rawemail)
        setDoc(docf,{
          Name:usern.displayName,
          Email:usern.email,
          Phone:usern.phoneNumber?usern.phoneNumber:"Not given",
          Uid:usern.uid,
          rooms:{demo:"demo"}

        }).then(console.log("Data added successfully"))
      }


      // The signed-in user info.
      
      
    }).catch((error) => {
      
    });
  }
  

  async function currentus(){
    const docRef = doc(db, "users/logged/userdata/", "yes");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        loginstate(true)
      } else {
        const docf=doc(db,"users/logged/userdata/","yes")
        setDoc(docf,{
          Name:"result.user.name"
        }).then(console.log("done")).catch((err)=>{console.log(err)})
      }
    
    
  }
  

  function logout(){
    
    setCookie("refresh","newvalue")
    
    
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
