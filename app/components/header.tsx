import React from 'react'
import Image from 'next/image'

function Header() {
  return (
    <div className='w-screen h-[50px] bg-[#FEB344] fixed p-3 top-0 z-90  '>
      <div className="relative h-full  flex justify-between  items-center w-full max-w-screen-2xl mx-auto ">
      <div className="absolute inset-0 flex items-center justify-center">
        <Image src="/insights-logo.svg" alt="Logo" width={120} height={24} />
      </div>
      </div></div>
  )
}

export default Header