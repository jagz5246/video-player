import React from 'react'
import logo from '../assets/logo.png'

const Navbar = () => {
  return (
    <div className= 'flex justify-center md:justify-start items-center bg-[#0a0a0a] min-w-full py-4 shadow-md border-b border-gray-500/20'>
          <img src={logo}
          className='ml-4'
          alt="logo" 
          width={120} 
          height={120}/>
          <h1 className='text-white text-2xl font-bold md:text-4xl'><span className='text-violet-500'>i</span>Player</h1>
    </div>
  )
}

export default Navbar
