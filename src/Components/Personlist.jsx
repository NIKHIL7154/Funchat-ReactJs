import React, { useRef, useState } from 'react'
import rainb from '../assets/rainbow.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Personlist = (props) => {
  
  
  const [bgcolor, setbgcolor] = useState('bg-[#f02222]');
function changebg(){
  setbgcolor('bg-[#000]')
}

  return (
    <div onClick={changebg} className={`${bgcolor} p-3 mt-[5px] pointr flex justify-start items-center`}>
        {/* <img src={rainb} className='rounded-[50%] w-[50px] h-[50px]' alt="" /> */}
        <div className={`rounded-[50%] w-[50px] h-[50px] bg-blue-300 overflow-hidden flex justify-center items-center`}>
          <FontAwesomeIcon icon="fa-solid fa-user" className='w-[60%] h-[60%]'/>
        </div>
        <div className='mx-[25px]'>
          Sourav
        </div>
    </div>
  )
}

export default Personlist
