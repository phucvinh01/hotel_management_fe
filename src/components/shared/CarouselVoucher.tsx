import React from 'react'
 
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'


const voucherImageList = [
    {
        "id": 1,
        "url": '/voucher/1.webp'
    },{
        "id": 2,
        "url": '/voucher/2.webp'
    },{
        "id": 3,
        "url": '/voucher/3.webp'
    },{
        "id": 4,
        "url": '/voucher/4.webp'
    },{
        "id": 5,
        "url": '/voucher/5.webp'
    }
]


const CarouselVoucher = () => {
  return (
    <Carousel className="w-full ">
      <CarouselContent className="">
        {voucherImageList.map((item) => (
          <CarouselItem key={item.id} className="basis-1/4">
              <Image src={item.url} alt={item.url} width={300} height={120}objectFit="cover" className="rounded-xl"/>
          </CarouselItem>
        ))}
      </CarouselContent >
      <div className='relative mt-5 flex justify-center items-center'>
    <CarouselPrevious  className="relative"/>
      <CarouselNext className="relative"/>
  </div>
    </Carousel>
  )
}

export default CarouselVoucher