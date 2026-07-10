import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col justify-center items-center bottom-0 w-full'> 
         <div className="logo font-bold text-white text-2xl">
          <span className='text-green-700'>&lt;</span>
          Pass
          <span className='text-green-700'>OP/&gt;</span>
        </div>
        
    <div className='flex h-7 text-white'>Created With hardwork and <img src="icons/heart.png" alt="heart" /> by Ankit
    </div>
    </div>
  )
}

export default Footer