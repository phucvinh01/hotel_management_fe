import Image from 'next/image'
import React from 'react'
import { CarouselCountry } from './CarouselCountry'

const BannerSection = () => {
  return (
    <section className=' flex flex-col gap-20 py-20 '>
            <Image src='/banner/banner1.webp' className='rounded-lg'  layout='responsive'  width={500} height={100} alt='banner1'/>

             <Image src='/banner/banner2.webp' className='rounded-lg'  layout='responsive'  width={500} height={100} alt='banner1'/>

             <CarouselCountry />
    </section>
  )
}

export default BannerSection