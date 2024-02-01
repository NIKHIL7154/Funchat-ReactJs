import React, { useEffect, useState } from 'react'
import Chatbox from '../Components/Chatbox';
import Personlist from '../Components/Personlist';
import {auth,app} from '../fbconfig'
import { Timestamp, getFirestore,collection, addDoc,orderBy, setDoc,doc ,updateDoc,onSnapshot,getDoc,query, where,getDocs} from "firebase/firestore";
import Loadingdiag from '../Components/Loadingdiag';
const Chat = () => {
  const [person, setperson] = useState("PR1");
  const [personslist, setpersonslist] = useState([["Nikhil",45,85],["Aditya",85,15]]);
    /* const db = getFirestore(app);
    const [person, setperson] = useState("PR1");
    const rawemail=auth.currentUser.email.replace('@gmail.com','')
    const docref=doc(db,'users/logged/userdata/',rawemail)
   // callback function for person set from user
    const [personslist, setpersonslist] = useState([]);
    const [loading,setloading]=useState(false)
    function callperson(data) {
        setperson(data)
    }
    
    var myarray=[]
    
    
    
    useEffect(() => {
      
      if(auth.currentUser===null){
        console.log("No users logged")
      }else{
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
    }, []); */
    return (
    <div className='h-[100vh] flex justify-center items-center'>
      {/* {loading?<Loadingdiag/>:<></>} */}
      <div className='w-[92%] rounded-2xl overflow-hidden h-[92%] bg-[#c0ecf9] flex'>

        <div className='h-[100%] w-[40%] bg-blue-200'>

            <div className='h-[10%] bg-[#000000] flex justify-around items-center'>
                    <div className='text-[#fff]'>Hi, Nikhil Kumar</div>
                    <button className='butonpro'>Add person</button>
                    <button onClick={()=>{auth.signOut()}} className='butonpro'>Logout</button>
            </div>
            <div id='persons' className='overflow-y-scroll flex items-center flex-col scrole h-[90%] bg-orange-300'>
                {personslist.map((data)=>{
                  return <Personlist key={data[1]} id={[data[2],data[0]]} datum={person} sperson={setperson}/>
                })}
                

            </div>
        </div>
        <div className='h-full w-[60%]'>
            {/* <Chatbox setloading={setloading} datum={person} /> */}
        </div>

      </div>
      
    </div>

  )
}


export default Chat
