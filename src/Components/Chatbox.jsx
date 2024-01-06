import React from 'react'

const Chatbox = (props) => {
    const {datum} =props
  return (
    <div className='overflow-y-scroll h-[100%]'>
      <div className='h-[90%]'>{datum}</div>
      <div className='h-[10%]'>send msg div</div>
    </div>
  )
}

export default Chatbox
