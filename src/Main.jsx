import React, { useState } from 'react'
import Login from './Pages/Login';
import Chat from './Pages/Chat';

const Main = () => {
    const [login, setlogin] = useState(true);
    const [email, setemail] = useState('Not logged');
    if(login){
      return(
        <><Chat />
        
        </>
      )
    }else{
      return (
        <>
        <Login loginstate={setlogin} usermail={setemail}/>
        

        </>
      )
    }

  
}

export default Main
