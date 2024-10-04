import React, { useEffect, useState } from 'react'



const Personlist = ({datum,sperson,id}) => {
  const [bgchng, setbgchng] = useState(false);
  useEffect(() => {
    if(id[0]===datum){
      setbgchng(true)
    }else{
      setbgchng(false)
    }

  }, [datum,id])
  let photourl=id[2]

  return (
    <div className={`bg-[#ebebeb8e] w-[100%] py-2 flex justify-center items-center`}>
    <div onClick={()=>{
      sperson(id[0])
      }} className={`${bgchng?'bg-[#28478565]':'bg-[#fff] person'} borderperson rounded-xl p-3 w-[95%] pointr flex justify-start items-center`}>
        <div className={`rounded-[50%] w-[50px] h-[50px] bg-blue-300 overflow-hidden flex justify-center items-center`}>
          <img src={photourl} alt='Jai ho' className=''/>
        </div>
        <div className='mx-[25px] font-bold text-lg md:text-xl'>

          {id[1]}

        </div>
    </div>
    </div>

  )
}

export default Personlist
