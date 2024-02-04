import React from 'react'
import grad from '../assets/gradient.png'
const Message = ({deliver,msg,timeee,photourl}) => {
  if(deliver==='inn'){
  return (
    <div className='ml-2 flex my-3'>
      <img className='w-8 h-8 rounded-[50%]' src={grad} alt="" />
      <div className='bg-[#eeecec78] ml-3 mt-3 rounded-b-[10px] min-w-[150px] max-w-[250px] md:max-w-[350px] rounded-tr-[10px] p-2'>
        <p>{msg}</p>
        <p className='text-[10px] text-right'>{timeee}</p>
      </div>
    </div>
  )
}else{
    return (
        <div className='mr-2 flex justify-end my-3'>
          <div className='bg-[#eeecec78] mr-3 mt-3 rounded-b-[10px] min-w-[150px] max-w-[250px] md:max-w-[350px] rounded-tl-[10px] p-2'>
            <p className='text-left whitespace-pre-wrap'>{msg}</p>
            <p className='text-[10px] text-right'>{timeee}</p>
          </div>
          <img className='w-8 h-8 rounded-[50%]' src={grad} alt="" />
        </div>
      )
}
}

export default Message
