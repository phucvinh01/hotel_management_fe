import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href={'/'}>
     <Image src={'/logo/Logo.png'} width={145} height={43} alt='Logo' loading='lazy' />
    </Link>
   
  )
}

export default Logo