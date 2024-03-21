import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <Image src={'/logo/Logo.png'} width={145} height={43} alt='Logo' loading='lazy' />
  )
}

export default Logo