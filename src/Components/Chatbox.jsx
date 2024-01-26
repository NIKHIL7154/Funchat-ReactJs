import React, { useEffect, useRef, useState } from 'react'
import Message from './Message'
//import ScrollToBottom, {useScrollToBottom, useSticky } from 'react-scroll-to-bottom';
import '../Components/Chatbox.css'
import {app} from '../fbconfig'
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, setDoc,doc ,updateDoc} from "firebase/firestore"; 

const Chatbox = ({datum}) => {
  
  const [msgs, setmsgs] = useState([<Message deliver={'inn'}/>,<Message/>]);
  const msginput = useRef('hello')
  const scrollers = useRef('')
  const db = getFirestore(app);

  useEffect(() => {
    let jk=0
    let temparr=[]
    for(jk;jk<20;jk++){
      let temp='hh'
      if(jk%3===0){
        temp='inn'
      }
      console.log(jk+" runs "+temp)
      temparr.push(<Message deliver={temp} msg={jk+temp}/>)
    }
    setmsgs(temparr)
    jk=6
  },[]);
  return (
    <div id='chatboxscroller' className='h-[100%]'>
      <div ref={scrollers} className={`h-[90%] overflow-y-scroll scrole`}>
        {datum}
        {msgs}
        
      </div>
      <div className='h-[10%] flex items-center justify-evenly'>
          <input placeholder='Enter message here.....' ref={msginput} type="text" className='px-5 h-[70%] w-[80%]'/>
          <button onClick={()=>{
            let currentmsg=msginput.current.value
            setmsgs(prevArray=>[...prevArray,<Message deliver={'onn'} msg={currentmsg}/>])
            msginput.current.value=''
            setTimeout(async ()=>{
              scrollers.current.scrollTop = scrollers.current.scrollHeight;
              try {
                const frankDocRef = doc(db, "users", "frank");
                let valu={
                  
                }
                const upda = {
                  ...valu,
                  [currentmsg]: currentmsg+"yolo",
              };
                await updateDoc(frankDocRef, {
                  
                  upda
                  
                });
                console.log("Document written with ID: ", frankDocRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
              }
            },200)
            
            
          }} className='bg-blue-500 p-3 text-white font-bold rounded-xl'>Send</button>
      </div>
      
    </div>
    
  )
  
}

export default Chatbox
