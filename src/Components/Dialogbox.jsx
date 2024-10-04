import React, { useEffect, useRef } from 'react'
import addpersonico from '../assets/addpersonico.gif'
import {auth,app} from '../fbconfig'
import { /* Timestamp, onSnapshot , updateDoc, collection , query, where, getDocs , addDoc, orderBy, */ setDoc, doc,getFirestore , getDoc} from "firebase/firestore";
const Dialogbox = (props) => {
  const emailref = useRef('')
  const errorref = useRef('')
  const db = getFirestore(app);
  const {addperson,checker,setitnow}=props
  useEffect(() => {
    
    return () => {

    };
  }, []);
  async function emailchecker(){
    let curremail=emailref.current.value;
    if(curremail===''){
      errorref.current.innerHTML="Please provide an email"
    }else if(curremail.includes('@gmail.com')){
      errorref.current.innerHTML="Please wait while we process data."
      let rawemail=curremail.replace("@gmail.com","")
      const docref=doc(db,"users/logged/userdata/"+rawemail)
      const datachecker=await getDoc(docref);
      if(datachecker.exists()){
        let targetname=datachecker.data().Name
        let myrawemail=auth.currentUser.email.replace("@gmail.com","")
        
        const myname = await auth.currentUser.displayName
        let roomid=''
        if(rawemail.length>myrawemail.length){
          roomid=rawemail+'zz22zz'+myrawemail
        }else{
          roomid=myrawemail+'zz22zz'+rawemail
        }
        const roomcheckref=doc(db,"users/roomnames/"+myrawemail+"/"+roomid)
        const roomchecker = await getDoc(roomcheckref);
        if(roomchecker.exists()){
          errorref.current.innerHTML="This user is already your friend."
        }else{
          const targetref=doc(db,"users/roomnames/"+rawemail+'/'+roomid)
          const myref=doc(db,"users/roomnames/"+myrawemail+'/'+roomid)
          await setDoc(targetref,{
            Targetname:myname,
            Photourl:auth.currentUser.photoURL
          })
          await setDoc(myref,{
            Targetname:targetname,
            Photourl:datachecker.data().Photourl
          }).then(()=>{
            errorref.current.innerHTML="Person added succesfully"
            setTimeout(()=>{
              setitnow(!checker)
              addperson(false)
            },700)
          }).catch(()=>{errorref.current.innerHTML="Error in adding data"})
        }

      }else{
        errorref.current.innerHTML="User is not registered on our app."
      }
    }else{
      errorref.current.innerHTML="Enter valid email"

    }
  }
  return (
    <div onClick={()=>{/* addperson(false) */}} className='z-10 flex justify-center items-center absolute bg-[#0000004f] h-[100%] w-[100%]'>
      <div className='flex justify-start items-center flex-col overflow-hidden w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-white rounded-xl'>
        <p onClick={()=>{addperson(false)}} className='cursor-pointer ml-[250px] md:ml-[350px] mt-[9px] absolute text-xl w-[30px] h-[30px]' >❌</p>
        <img className='md:w-[220px] w-[120px] md:h-[220px]' src={addpersonico} alt="Add person" />
        <p className='generaltext font-bold text-lg md:text-xl'>Enter email of friend to add</p>
        <input ref={emailref} required type="email" placeholder='Enter email' className='md:mt-5 mt-5 w-[90%] md:w-[80%] px-2 h-[12%] md:h-[10%] geninput rounded-lg shadd'/>
        <p ref={errorref} className='text-red-500 mt-4 md:my-1'>Enter email</p>
        <button onClick={emailchecker} className='bg-[#080a71] w-[40%] themebuton text-white text-sm rounded-lg py-1 md:py-2 mt-3 md:mt-1'>Add friend</button>
        </div>
      </div>
  )
}

export default Dialogbox
