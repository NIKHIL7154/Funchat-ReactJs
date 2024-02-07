import React from 'react'
import loadico from '../assets/loaderico.gif'
const Loadingdiag = () => {
  return (
    <div className='z-20 flex justify-center items-center absolute bg-[#0000004f] h-[100%] w-[100%]'>
      <div className='flex justify-center items-center flex-col overflow-hidden w-[150px] h-[150px] md:w-[400px] md:h-[300px] bg-white rounded-xl'>
        <img className='md:w-[250px] w-[100px] h-[90px] md:h-[170px]' src={loadico} alt="" />
        <h1 className='w-[70%] mt-2 md:mt-3 md:text-lg text-[9px] font-bold text-center'>Please wait while we are processing data.</h1>
      </div>
      </div>
  )
}

export default Loadingdiag
