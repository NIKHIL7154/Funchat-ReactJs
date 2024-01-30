import React, { useEffect, useRef, useState } from 'react'
import Message from './Message'
//import ScrollToBottom, {useScrollToBottom, useSticky } from 'react-scroll-to-bottom';
import '../Components/Chatbox.css'
import {app,auth} from '../fbconfig'

import { Timestamp, getFirestore,collection, addDoc,orderBy, setDoc,doc ,updateDoc,onSnapshot,getDoc,query, where,getDocs} from "firebase/firestore";

var months=["Jan","Feb","Mar","Apr","May","June","july","Aug","Sep","Oct","Nov","Dec"]
function nowww(){
  
  let dt = new Date();
  let hours = dt.getHours() ; // gives the value in 24 hours format
  let AmOrPm = hours >= 12 ? 'PM' : 'AM';
  hours = (hours % 12) || 12;
  let minutes = dt.getMinutes() ;
  let newhours=hours<10?("0"+hours):hours
  let newmin =minutes<10?("0"+minutes):minutes
  let finalTime = newhours + ":" + newmin + " " + AmOrPm+" "+dt.getDate()+" "+months[dt.getMonth()]
  return finalTime
}

const Chatbox = ({datum}) => {
  const curusername=auth.currentUser.displayName
  const curuseruid=auth.currentUser.uid
  const [msgs, setmsgs] = useState([]);
  const msginput = useRef('hello')
  const scrollers = useRef(null)
  const db = getFirestore(app);
  const nameref = useRef('')
  
  const [firstrender,setfirstrender]=useState(false)

  useEffect(() => {
    if(datum!=="PR1"){
    setfirstrender(true)}
    
  }, [datum]);

  useEffect(() => {
    scrollers.current.innerHTML=''
    const q = query(collection(db, "users","room/",datum), orderBy("time"));
    const unsubscribe = onSnapshot(q,(snapshot) => {
      
      snapshot.docChanges().forEach(async (change) => {
        
        let reff=change.doc.data()
        
        if (change.type === "added") {
          let del=""
          if(reff.useruid===curuseruid){
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

    return () => unsubscribe()

  },[datum]);
  
  return (
    <div id='chatboxscroller' className='h-[100%]'>
      
      {/* <div className='flex h-[90%] justify-center items-center'>Select any chat to see messages</div> */}
      <div ref={scrollers} className={`h-[90%] overflow-y-scroll scrole`}>
        {datum}
        {msgs.map((data)=>{
          return data
        })}
        
      </div>
      <div className='h-[10%] flex items-center justify-evenly'>
          <input placeholder='Enter message here.....' ref={msginput} type="text" className='px-5 h-[70%] w-[80%]'/>
          <button onClick={async ()=>{
            let currentmsg=msginput.current.value
            
            msginput.current.value=''
            try {
              const frankDocRef = collection(db, "users", "room/",datum);
              
              const  final=await addDoc(frankDocRef, {
                Name:curusername,
                useruid:curuseruid,
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
      
      
    </div>
    
  )
  
}

export default Chatbox
