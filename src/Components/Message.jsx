import React from 'react'
import grad from '../assets/gradient.png'
const Message = ({deliver,msg}) => {
  if(deliver==='inn'){
  return (
    <div className='flex my-3'>
      <img className='w-8 h-8 rounded-[50%]' src={grad} alt="" />
      <div className='bg-[#ff9c9c] ml-3 mt-3 rounded-b-[10px] min-w-[200px] max-w-[350px] rounded-tr-[10px] p-2'>
        <p>{msg}</p>
        <p className='text-sm text-right'>12:12AM</p>
      </div>
    </div>
  )
}else{
    return (
        <div className='flex justify-end my-3'>
          
          <div className='bg-[#ff9c9c] mr-3 mt-3 rounded-b-[10px] min-w-[200px] max-w-[350px] rounded-tl-[10px] p-2'>
            <p>{msg}</p>
            <p className='text-sm text-right'>12:12AM</p>
          </div>
          <img className='w-8 h-8 rounded-[50%]' src={grad} alt="" />
        </div>
      )
}
}

export default Message
