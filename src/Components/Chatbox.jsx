import React, { useEffect, useRef, useState } from 'react'
import Message from './Message'
import ScrollToBottom, { useScrollToBottom, useSticky } from 'react-scroll-to-bottom';
import '../Components/Chatbox.css'
import { app, auth } from '../fbconfig'

import { /* Timestamp, onSnapshot , updateDoc, collection , query, where, getDocs , addDoc, orderBy, */ query,orderBy,collection,onSnapshot,addDoc,Timestamp,getFirestore} from "firebase/firestore";


var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "july", "Aug", "Sep", "Oct", "Nov", "Dec"]
function nowww() {

  let dt = new Date();
  let hours = dt.getHours(); // gives the value in 24 hours format
  let AmOrPm = hours >= 12 ? 'PM' : 'AM';
  hours = (hours % 12) || 12;
  let minutes = dt.getMinutes();
  let newhours = hours < 10 ? ("0" + hours) : hours
  let newmin = minutes < 10 ? ("0" + minutes) : minutes
  let finalTime = newhours + ":" + newmin + " " + AmOrPm + " " + dt.getDate() + " " + months[dt.getMonth()]
  return finalTime
}

const Chatbox = (props) => {
  const curusername = auth.currentUser.displayName
  const curuseruid = auth.currentUser.uid
  const [msgs, setmsgs] = useState([<Message timeee={45} deliver={'inn'} msg={'hello guys'} />]);
  const msginput = useRef('hello')
  const scrollers = useRef(null)
  const { datum, setloading} = props
  const db = getFirestore(app);



  useEffect(() => {
      if(datum!=='PR1'){
        setloading(true)
      }
    
  }, [datum,setloading]);


  useEffect(() => {
    datum === 'PR1' ? console.log("") : scrollers.current.innerHTML = ''
    const q = query(collection(db, "users", "room/", datum), orderBy("time"));
    if(datum === 'PR1'){
      return
    }
    const unsubscribe = onSnapshot(q, (snapshot) => {

      snapshot.docChanges().forEach(async (change) => {
        let reff = change.doc.data()
        if (change.type === "added") {
          let del = ""
          if (reff.useruid === curuseruid) {
            del = "onn"
          } else {
            del = "inn"
          }
          setmsgs(prevArray => [...prevArray, <Message timeee={reff.nutime} deliver={del} msg={reff.msg} />])
        }

      });
      setTimeout(() => {
        datum === 'PR1' ? console.log("") : scrollers.current.scrollTop = scrollers.current.scrollHeight;
        setloading(false)
      }, 100);

    });
    return () => {
      unsubscribe()
    };

  }, [datum]);

  return (

    <div id='chatboxscroller' className='h-[100%]'>
      {/* <div onClick={() => {
        setmobile(false)
      }} className='block md:hidden text-5xl absolute right-[10%] mt-[15px]'>🔙</div>
       */}
      {datum === 'PR1' ?
        <div className='flex h-[100%] justify-center items-center'>Select any chat to see messages</div>
        :
        <div className='h-[100%]'>
          <div ref={scrollers} className={`h-[92%] md:h-[90%] overflow-y-scroll scrole`}>

            {msgs.map((data) => {
              return data
            })}

          </div>
          <div className='h-[8%] md:h-[10%] flex items-center justify-evenly'>
            <input placeholder='Enter message here.....' ref={msginput} type="text" className='rounded-lg border-[1px] border-black px-5 h-[70%] w-[80%]' />
            <button onClick={async () => {
              let currentmsg = msginput.current.value
              msginput.current.value = ''
              try {
                const frankDocRef = collection(db, "users", "room/", datum);

                await addDoc(frankDocRef, {
                  Name: curusername,
                  useruid: curuseruid,
                  msg: currentmsg,
                  time: Timestamp.now(),
                  nutime: nowww()
                });

              } catch (e) {

              }


            }} className='bg-blue-500 h-[80%] p-2 text-white font-bold rounded-xl'>Send</button>
          </div>
        </div>}



    </div>

  )

}

export default Chatbox
