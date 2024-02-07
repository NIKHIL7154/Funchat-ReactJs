import React, { useEffect, useRef, useState } from 'react'
import Message from './Message'

import '../Components/Chatbox.css'
import { app, auth } from '../fbconfig'

import { /* Timestamp, onSnapshot , updateDoc, collection , query, where, getDocs , addDoc, orderBy, */ query, orderBy, collection, onSnapshot, addDoc, Timestamp, getFirestore } from "firebase/firestore";


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
  const [msgs, setmsgs] = useState([]);
  const msginput = useRef('hello')
  const scrollers = useRef(null)
  const { datum, setloading } = props
  const db = getFirestore(app);
  const [newmemberss, setitnow] = useState(true)

  async function sendthemessage() {
    let currentmsg = msginput.current.value
    if (currentmsg === '') {
      return
    }
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
  }
  function check(event) {
    if (event.key === 'Enter') {
      sendthemessage()
    }

  }

  useEffect(() => {
    if (datum !== 'PR1') {
      setloading(true)
    }

  }, [datum, setloading]);


  useEffect(() => {
    if (datum !== 'PR1' && !newmemberss) {
      
        scrollers.current.innerHTML = ''
      
    }
    const q = query(collection(db, "users", "room/", datum), orderBy("time"));
    if (datum === 'PR1') {
      return
    }
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        setitnow(true)
      } else {
        setitnow(false)
        snapshot.docChanges().forEach(async (change) => {
          let reff = change.doc.data()
          if (change.type === "added") {
            let del = ""
            if (reff.useruid === curuseruid) {
              del = "onn"
            } else {
              del = "inn"
            }
            
            setmsgs(prevArray => [...prevArray, <Message key={change.doc.id} timeee={reff.nutime} deliver={del} msg={reff.msg} />])
          }

        });
      }
      setTimeout(() => {
        if (datum !== 'PR1' && !newmemberss) {
          console.log('ho rha h')
          scrollers.current.scrollTop = scrollers.current.scrollHeight;
        }
        setloading(false)
      }, 100);

    });
    return () => {
      unsubscribe()
    };

  }, [datum, curuseruid, db, setloading,newmemberss]);

  return (

    <div id='chatboxscroller' className='h-[100%]'>
      {/* <div onClick={() => {
        setmobile(false)
      }} className='block md:hidden text-5xl absolute right-[10%] mt-[15px]'>🔙</div>
       */}
      {datum === 'PR1' ?
        <div className='flex h-[100%] justify-center items-center'>Select any chat to see messages</div> : <></>}



      {newmemberss ?
        <div className='h-[100%]'>
        <div className='flex h-[92%] md:h-[90%] justify-center items-center'>Send a message to start conversation.</div>

        <div className='h-[8%] md:h-[10%] flex items-center justify-evenly'>
          <input onKeyDown={check} placeholder='Enter message here.....' ref={msginput} type="text" className='rounded-lg border-[1px] border-black px-5 h-[70%] w-[80%]' />
          <button onClick={sendthemessage} className='bg-blue-500 h-[80%] p-2 text-white font-bold rounded-xl'>Send</button>
        </div>
      </div>

        :
        <div className='h-[100%]'>
          <div ref={scrollers} className={`h-[92%] md:h-[90%] overflow-y-scroll scrole`}>

            {msgs.map((data) => {
              return data
            })}

          </div>
          <div className='h-[8%] md:h-[10%] flex items-center justify-evenly'>
            <input onKeyDown={check} placeholder='Enter message here.....' ref={msginput} type="text" className='rounded-lg border-[1px] border-black px-5 h-[70%] w-[80%]' />
            <button onClick={sendthemessage} className='bg-blue-500 h-[80%] p-2 text-white font-bold rounded-xl'>Send</button>
          </div>
        </div>}



    </div>

  )

}

export default Chatbox
