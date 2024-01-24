import React, { useEffect, useState } from 'react'
import Chatbox from '../Components/Chatbox';
import Personlist from '../Components/Personlist';
import {auth,app} from '../fbconfig'

const Chat = () => {
    
    const [person, setperson] = useState("000");

   // callback function for person set from user
    function callperson(data) {
        setperson(data)
    }
    var myarr=[]

    for(let i=0;i<6;i++){
        myarr.push(<Personlist id={`PR${i}`} dete={person} sperson={callperson}/>)
    }

    return (
    <div className='h-[100vh] flex justify-center items-center'>
      <div className='w-[92%] h-[92%] shadd bg-red-500  shadow-black flex'>

        <div className='h-[100%] w-[40%] bg-blue-200'>
            <div className='h-[10%] bg-slate-300 flex justify-around items-center'>
                    <button>Add person</button>
                    <button>Logout</button>
            </div>
            <div id='persons' className='overflow-y-scroll h-[90%] bg-orange-300'>
                persons will appear here
                {myarr}

            </div>
        </div>
        <div className='h-full w-[60%]'>
            <Chatbox datum={person} />
        </div>

      </div>

    </div>

  )
}


export default Chat
