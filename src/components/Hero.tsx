import React from 'react'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'
 const listContryImg = [
    {
      "id": 1,
      "url": "/country/cannang.webp"
    },
    {
      "id": 2,
      "url": "/country/seoul.webp"
    },
    {
      "id": 3,
      "url": "/country/busan.webp"
    },
    {
      "id": 4,
      "url": "/country/Tokyo.webp"
    },
    {
      "id": 5,
      "url": "/country/osaka.webp"
    },
    {
      "id": 6,
      "url": "/country/taipie.webp"
    },
    {
      "id": 7,
      "url": "/country/shanghai.webp"
    },
    {
      "id": 8,
      "url": "/country/hongkong.webp"
    },
    {
      "id": 9,
      "url": "/country/khaohsung.webp"
    },
    {
      "id": 10,
      "url": "/country/bengji.webp"
    },
  ]

const Hero = () => {
  return (
    <div className="w-full radius rounded-3xl mt-1 shadow-md shadow-blue-500
            bg-gradient-to-b from-sky-500 via-sky-600 to-blue-700" style={{ height: 320 }}>
        <div className="flex h-3/4 w-full justify-center items-center">
          <Carousel className="w-full px-3" id='slider'>
            <CarouselContent className="">
              <CarouselItem key={0} className="basis-3/5">
                <div className="w-full h-full ml-32 flex flex-col items-center justify-center">
                  <p className=" w-11/12 text-xl text-gray-200 font-bold my-5">
                    Tìm & đặt phòng khách sạn giá rẻ chỉ với 3 bước đơn giản!
                  </p>
                  <p className="w-11/12 text-xl text-gray-200  ">
                    Khám phá ngay những ưu đãi tốt nhất dành cho bạn tại Traveloka!
                  </p>
                </div>
              </CarouselItem>
              {listContryImg.map((item) => (
                <CarouselItem
                  key={item.id}
                  className='basis-1/4'>
                  <Image
                    src={item.url}
                    alt={item.url}
                    width={300}
                    height={120}
                    className='rounded-xl object-cover'
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <div className='h-1/6 flex w-full justify-center'>
          <ArrowLeft className='cursor-pointer' color='#FFF'/>
          <span className='font-bold text-white mx-32 cursor-pointer'>
            Xem thêm khuyến mãi
          </span>
          <ArrowRight className='cursor-pointer' color='#FFF'/>
        </div>
      </div>
  )
}

export default Hero