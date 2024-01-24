import React, { useEffect, useRef, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Personlist = ({dete,sperson,id}) => {
  const [bgchng, setbgchng] = useState(false);
  useEffect(() => {
    if(id===dete){
      setbgchng(true)
    }else{
      setbgchng(false)
    }
  
    
  }, [dete,id])

  return (
    <div onClick={()=>{sperson(id)}} className={`${bgchng?'bg-orange-600':'bg-blue-200'} p-3 mt-[5px] pointr flex justify-start items-center`}>
        <div className={`rounded-[50%] w-[50px] h-[50px] bg-blue-300 overflow-hidden flex justify-center items-center`}>
          <FontAwesomeIcon icon="fa-solid fa-user" className='w-[60%] h-[60%]'/>
        </div>
        <div className='mx-[25px]'>
          Sourav{id}
        </div>
    </div>
  )
}

export default Personlist
