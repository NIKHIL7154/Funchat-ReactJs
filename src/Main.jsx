import React, { useState } from 'react'
import Login from './Pages/Login';

const Main = () => {
    const [login, setlogin] = useState(false);

    if(login){
      return(
        <>No logged
        <button onClick={()=>{setlogin(!login)}}>click me</button>
        </>
      )
    }else{
      return (
        <>
        <Login />
        <button onClick={()=>{setlogin(!login)}}>click me</button>

        </>
      )
    }

  
}

export default Main
