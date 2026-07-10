import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white' >
      <div className="mycontainer flex justify-between
    items-center px-4 h-5 py-9">
        <div className="logo font-bold text-white text-2xl">
          <span className='text-green-700'>&lt;</span>
          Pass
          <span className='text-green-700'>OP/&gt;</span>
        </div>
{/* 
        <ul>
          <li className='flex gap-4 h-5'>
            <a className='hover:font-bold' href="/">Home</a>
            <a className='hover:font-bold' href="/">About</a>
            <a className='hover:font-bold' href="/">Contacts</a>
          </li>
        </ul> */}
        <button className='text-white bg-green-950 my-5 rounded-full justify-between items-center ring-white ring-1 '>
          
            <img className='invert p-1 w-8' src="icons/github.svg" alt="github logo" />
           {/* <span className='font-bold'>Github</span> */}
        </button>
        
      </div>
    </nav >
  )
}

export default Navbar