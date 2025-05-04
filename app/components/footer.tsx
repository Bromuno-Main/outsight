import React from 'react'
import Image from 'next/image'

import { footerLink } from '../data/links'

function Footer() {
    return (
        <div className=" bg-white py-16 lg:px-24 rounded-[4rem] max-w-screen-lg relative mx-auto mb-10 flex   gap-4 lg:gap-12  w-screen px-8 min-h-12">
            <div>
                <Image src={'/insights-logo.svg'} width={100} height={40} alt='logo' className=' h-[40px]  ' />
                <p>from <span className="text-green-600">Bromuno</span></p>
            </div>
            <div className='grid-cols-3 grid-rows-2 flex-1 grid  '>
            {footerLink.map((item) => (
              
                        <a  href={item.href} className=' max-w-[12rem] '> {item.title} </a>
                                
            ))}
            </div>
        </div>
    );
}

export default Footer