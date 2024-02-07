import React, { useEffect, useState } from 'react'
import Chatbox from '../Components/Chatbox';
import Personlist from '../Components/Personlist';
import backicon from '../assets/backicon.png'
import { auth, app } from '../fbconfig'
import { getFirestore, collection, query, getDocs } from "firebase/firestore";
import Loadingdiag from '../Components/Loadingdiag';
import Dialogbox from '../Components/Dialogbox';

const Chat = () => {
  const [person, setperson] = useState("PR1");
  const [personslist, setpersonslist] = useState([]);
  const [addperson, setaddperson] = useState(false)
  const curwidth = window.screen.width
  const [mobile, setmobile] = useState(false)
  const [burger, setburger] = useState(false)
  const db = getFirestore(app);

  const rawemail = auth.currentUser.email.replace('@gmail.com', '')
  // docref=doc(db,'users/logged/userdata/',rawemail)
  // callback function for person set from user

  const [loading, setloading] = useState(true)
  /* function callperson(data) {
      setperson(data)
  } */
  const [addpersonchecker, setitnow] = useState(false)
  const [newmember,setmember]=useState(true)




  useEffect(() => {
    
    if (auth.currentUser === null) {
      console.log("No users logged")
    } else {

      const myquery = query(collection(db, "users", "roomnames/", rawemail));

      async function mydone() {
        const qsnap = await getDocs(myquery)
        let jaku = 0
        var myarray = []
        if (!qsnap.empty) {
          setmember(false)
          await qsnap.forEach((doc) => {
            jaku = jaku + 10
            let tname = doc.data().Targetname
            let photourl = doc.data().Photourl

            myarray.push([tname, jaku, doc.id, photourl])

          })
          
           setTimeout(() => { setpersonslist(myarray) }, 100)
        }else{
          
          setmember(true)
        }
        setloading(false)
      }
      mydone()
      


    }
  }, [rawemail, db, addpersonchecker]);

  useEffect(() => {
    if (curwidth < 700 && person !== 'PR1') {
      setmobile(true)
    }
    return () => {

    };
  }, [person, curwidth]);

  return (

    <div className='h-[100vh] flex justify-center items-center'>
      {loading ? <Loadingdiag /> : <></>}
      {addperson ? <Dialogbox checker={addpersonchecker} setitnow={setitnow} addperson={setaddperson} /> : <></>}

      <div className='md:w-[92%] w-[99%] flex-col shadd rounded-2xl overflow-hidden h-[99%] md:h-[92%] bg-[#dfdfdf] flex'>
        <div className='h-[8%] md:h-[10%] bg-[#284785] flex justify-between items-center'>

          <div className='text-[#fff] pl-4 text-lg md:text-xl'>Hi, {auth.currentUser.displayName}</div>
          <p className='pr-3 text-right md:text-center text-xl md:text-2xl text-white font-bold'>FunChat</p>
          {mobile ?
            <div onClick={() => {
              setmobile(false)
              setperson("PR1")
            }} className='cursor-pointer ml-2 mr-5 md:hidden text-white text-2xl'>
              <img className='w-[30px] h-[30px]' src={backicon} alt="" />
            </div>
            : <div onClick={() => { setburger(!burger) }} className='cursor-pointer pl-2 pr-5 md:hidden text-white text-2xl'>☰</div>}
          <div className='md:flex hidden justify-end gap-2 pr-4 items-center'>
            <button onClick={() => { setaddperson(true) }} className='butonpro'>Add person</button>
            <button onClick={() => { auth.signOut() }} className='butonpro'>Logout</button>
          </div>
        </div>


        <div className='relative z-0 flex w-[100%] h-[92%] md:h-[90%]'>
          <div className={`${burger ? 'block' : 'hidden'} absolute right-[1%] overflow-hidden rounded-xl bg-white w-[200px]`}>
            <button onClick={() => {
              setaddperson(true)
              setburger(false)
            }} className='mobiledialog'>Add person</button>
            <button onClick={() => { auth.signOut() }} className='mobiledialog'>Logout</button>
          </div>
          <div className={`h-[100%] ${mobile ? 'hidden' : 'block'} w-[100%] md:w-[40%] bg-[#ffffff]`}>
            {newmember?
            <div className='w-[100%] h-[100%] flex justify-center items-center'><p className='px-2 text-lg text-[#b0b0b0] text-center'>Add person to start chatting with. You can also add me entering nikhilthakurq@gmail.com in add person section.</p></div>
            :
            <div id='persons' className='overflow-y-scroll flex items-center flex-col scrole w-[100%] h-[100%] bg-[#ebebeb8e]'>
            {personslist.map((data) => {
              return <Personlist key={data[1]} id={[data[2], data[0], data[3]]} datum={person} sperson={setperson} />
            })}

          </div>
            }
            {/* <div id='persons' className='overflow-y-scroll flex items-center flex-col scrole w-[100%] h-[100%] bg-[#ebebeb8e]'>
              {personslist.map((data) => {
                return <Personlist key={data[1]} id={[data[2], data[0], data[3]]} datum={person} sperson={setperson} />
              })}

            </div> */}
          </div>
          <div className={`bg-[#ffffff] ${mobile ? 'block' : 'hidden'} md:block h-full w-[100%] md:w-[60%]`}>
            <Chatbox setloading={setloading} datum={person} />
          </div>

        </div>
      </div>

    </div>

  )
}


export default Chat
