import React, { useEffect, useState } from 'react'
import Chatbox from '../Components/Chatbox';
import Personlist from '../Components/Personlist';
import {auth,app} from '../fbconfig'
import { Timestamp, getFirestore,collection, addDoc,orderBy, setDoc,doc ,updateDoc,onSnapshot,getDoc,query, where,getDocs} from "firebase/firestore";
import Loadingdiag from '../Components/Loadingdiag';
const Chat = () => {
    const db = getFirestore(app);
    const [person, setperson] = useState("PR1");
    const rawemail=auth.currentUser.email.replace('@gmail.com','')
    const docref=doc(db,'users/logged/userdata/',rawemail)
   // callback function for person set from user
    const [personslist, setpersonslist] = useState([45,84]);
    function callperson(data) {
        setperson(data)
    }
    
    var myarray=[]
    
    
    
    useEffect(() => {
      
      if(auth.currentUser===null){
        console.log("No users logged")
      }else{
      
      /* const unsubscribe = onSnapshot(docref, (snapshot) => {
        let maindata=snapshot.data().rooms
        console.log(maindata)
        for(let ibba in maindata){
          console.log(ibba+" : "+maindata[ibba])
        }

      }) */
      const myquery = query(collection(db, "users","roomnames/",rawemail));
      
      async function mydone(){
        const qsnap= await getDocs(myquery)
        let jaku=0
        
        await qsnap.forEach((doc)=>{
          jaku=jaku+10
          let tname=doc.data().Targetname
          
          myarray.push([tname,jaku,doc.id])
          
        })
        setTimeout(()=>{setpersonslist(myarray)},100)
        
      }
      mydone()
      
      
      console.log(personslist)
      
    }
    }, []);
    return (
    <div className='h-[100vh] flex justify-center items-center'>
      <div className='w-[92%] h-[92%] shadd bg-red-500  shadow-black flex'>

        <div className='h-[100%] w-[40%] bg-blue-200'>
            <div className='h-[10%] bg-slate-300 flex justify-around items-center'>
                    <button>Add person</button>
                    <button onClick={()=>{auth.signOut()}}>Logout</button>
            </div>
            <div id='persons' className='overflow-y-scroll scrole h-[90%] bg-orange-300'>
                {personslist.map((data)=>{
                  return <Personlist key={data[1]} id={[data[2],data[0]]} datum={person} sperson={setperson}/>
                })}
                

            </div>
        </div>
        <div className='h-full w-[60%]'>
            <Chatbox datum={person} />
        </div>

      </div>
      <Loadingdiag/>
    </div>

  )
}


export default Chat
