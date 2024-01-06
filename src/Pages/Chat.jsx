import React, { useEffect, useState } from 'react'
import Chatbox from '../Components/Chatbox';
var count=0
var stopeffect=false
const Chat = () => {
    
    function addperson(){
        count += 1;
        let divv=document.createElement('div');
        divv.className='bg-yellow-100 mt-[5px] pointr'
        let namep=document.createElement('p')
        namep.innerHTML='Hello'
        let namep2=document.createElement('p')
        namep2.innerHTML='email'+count
        divv.appendChild(namep)
        divv.appendChild(namep2)
        divv.addEventListener('click',()=>{
            setperson(namep2.innerHTML)
        })
        document.getElementById('persons').appendChild(divv)

    }
    const [person, setperson] = useState("Click on any chat to start");
    useEffect(() => {
        if(stopeffect){
            alert(person)
        }
        
        return () => {
            
        };
    }, [person]);
    
    return (
    <div className='h-[100vh] flex justify-center items-center'>
      <div className='w-[92%] h-[92%] shadd bg-red-500  shadow-black flex'>

        <div className='h-[100%] w-[50%] bg-blue-200'>
            <div className='h-[10%] bg-slate-300 flex justify-around items-center'>
                    <button onClick={addperson}>Add person</button>
                    <button>Logout</button>
            </div>
            <div id='persons' className='overflow-y-scroll h-[90%] bg-orange-300'>
                persons will appear here
                <div className='bg-yellow-100'>
                    <p>name</p>
                    <p>email</p>
                </div>
            </div>
        </div>
        <div className='h-full w-[50%]'>
            <Chatbox datum={person} />
        </div>

      </div>

    </div>
    
  )
}


export default Chat
