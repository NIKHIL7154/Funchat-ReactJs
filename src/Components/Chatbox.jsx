import React, { useEffect, useRef, useState } from 'react'
import Message from './Message'
//import ScrollToBottom, {useScrollToBottom, useSticky } from 'react-scroll-to-bottom';
import '../Components/Chatbox.css'
import {app} from '../fbconfig'
import { Timestamp, getFirestore } from "firebase/firestore";
import { collection, addDoc,orderBy, setDoc,doc ,updateDoc,onSnapshot,getDoc,query, where,getDocs} from "firebase/firestore"; 

var months=["Jan","Feb","Mar","Apr","May","June","july","Aug","Sep","Oct","Nov","Dec"]

function nowww(){
  
  let dt = new Date();
  let hours = dt.getHours() ; // gives the value in 24 hours format
  let AmOrPm = hours >= 12 ? 'PM' : 'AM';
  hours = (hours % 12) || 12;
  let minutes = dt.getMinutes() ;
  let finalTime = hours + ":" + minutes + " " + AmOrPm+" "+dt.getDate()+" "+months[dt.getMonth()]
  return finalTime
}
const Chatbox = ({datum}) => {
  
  const [msgs, setmsgs] = useState("");
  const msginput = useRef('hello')
  const scrollers = useRef(null)
  const db = getFirestore(app);
  const nameref = useRef('')

  

  useEffect(() => {
    const q = query(collection(db, "users","room/messages"), orderBy("time"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        let reff=change.doc.data()
        if (change.type === "added") {
          let del=""
          if(reff.Name==="Nikhil"){
            del="onn"
          }else{
            del="inn"
          }
          setmsgs(prevArray=>[...prevArray,<Message timeee={reff.nutime} deliver={del} msg={reff.msg}/>])
          
        }

      });
    setTimeout(() => {
      scrollers.current.scrollTop = scrollers.current.scrollHeight;
    }, 200);
});

  },[]);
  
  return (
    <div id='chatboxscroller' className='h-[100%]'>
      <div ref={scrollers} className={`h-[90%] overflow-y-scroll scrole`}>
        {datum}
        {msgs}
        
      </div>
      <div className='h-[10%] flex items-center justify-evenly'>
          <input placeholder='Enter message here.....' ref={msginput} type="text" className='px-5 h-[70%] w-[80%]'/>
          <button onClick={async ()=>{
            let currentmsg=msginput.current.value
            
            msginput.current.value=''
            try {
              const frankDocRef = collection(db, "users", "room/messages");
              
              const final=addDoc(frankDocRef, {
                Name:nameref.current.value,
                msg:currentmsg,
                time:Timestamp.now(),
                nutime:nowww()
              });
              console.log("Document written with ID: ", final.id);
            } catch (e) {
              console.error("Error adding document: ", e);
            }
            
            
          }} className='bg-blue-500 p-3 text-white font-bold rounded-xl'>Send</button>
      </div>
      <button onClick={()=>{
        //scrollers.current.scrollTop = scrollers.current.scrollHeight;
      }}>hello</button>
      <input type="text" placeholder="enter name" ref={nameref}/>
      
    </div>
    
  )
  
}

export default Chatbox
