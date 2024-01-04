import React from 'react'
import './Login.css'
const Login = () => {
  return (
    <div className='gap-6 flex flex-col justify-center items-center w-full h-[100vh]'>
      <p className='text-3xl font-bold'>Welcome to Funchat</p>
      <iframe className='h-[250px]' title='lottie' src="https://lottie.host/embed/398992f1-190f-47dc-b174-a4330d4c861d/Y9c2xBs1Ow.json"></iframe>
      <div className='cssclass p-1 rounded-2xl'>
        <button className='font-bold text-xl bg-white w-[200px] h-[40px] rounded-xl'>Sign in</button>


      </div>
      
    </div>
  )
}

export default Login
