import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href={'/'}>
      <div className='flex flex-row justify-center items-center'>
        <Image src={'/logo/MainLogo1.png'} width={72} height={72} alt='Logo' loading='lazy' className='z-10' />
        {/* <span className='mr-2'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="font-bold w-[65px] h-[65px] text-blue-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
          </svg>
        </span> */}
        <div className='flex flex-col ml-[-14px] hover:text-gradient-hover '>
          <p className='text-6xl text-gradient font-bold  hover:text-gradient-hover'>Finder</p>
          <p className='pl-3 text-gradient font-semibold mt-[-4px] shadow shadow-cyan-500 rounded-sm'>VietNam Hotel Finder</p>
        </div>
      </div>

    </Link>

  )
}

export default Logo