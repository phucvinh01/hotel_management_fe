import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import React from 'react';
import SearchFormPageHotel from '@/components/shared/form/SearchFormPageHotel';


export default function Hotel() {
  const listContryImg = [
    {
      id: 1,
      url: '/country/cannang.webp',
    },
    {
      id: 2,
      url: '/country/seoul.webp',
    },
    {
      id: 3,
      url: '/country/busan.webp',
    },
    {
      id: 4,
      url: '/country/Tokyo.webp',
    },
    {
      id: 5,
      url: '/country/osaka.webp',
    },
    {
      id: 6,
      url: '/country/taipie.webp',
    },
    {
      id: 7,
      url: '/country/shanghai.webp',
    },
    {
      id: 8,
      url: '/country/hongkong.webp',
    },
    {
      id: 9,
      url: '/country/khaohsung.webp',
    },
    {
      id: 10,
      url: '/country/bengji.webp',
    },
  ];
  

  return (
    <main
      className='w-full '
      style={{ height: 1000 }}>
      <div
        className='w-full radius rounded-sm
            bg-gradient-to-b from-sky-500 via-sky-600 to-blue-700'
        style={{ height: 320 }}>
        <div className='flex h-3/4 w-full justify-center items-center'>
          <Carousel
            className='w-full px-3'
            id='slider'>
            <CarouselContent className=''>
              <CarouselItem
                key={0}
                className='basis-3/5'>
                <div className='w-full h-full ml-32 flex flex-col items-center justify-center'>
                  <p className=' w-11/12 text-2xl text-gray-200 font-bold my-5'>
                    Tìm & đặt phòng khách sạn giá rẻ chỉ với 3 bước đơn giản!
                  </p>
                  <p className='w-11/12 text-2xl text-gray-200  '>
                    Khám phá ngay những ưu đãi tốt nhất dành cho bạn tại
                    Traveloka!
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
            {/* <CarouselPrevious className="ml-10 " />
                        <CarouselNext className="mr-10" /> */}
          </Carousel>
        </div>

        <div className='h-1/6 flex w-full justify-center'>
          <span className='cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 text-white'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 19.5 8.25 12l7.5-7.5'
              />
            </svg>
          </span>
          <span className='font-bold text-white mx-32 cursor-pointer'>
            Xem thêm khuyến mãi
          </span>
          <span className='cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 text-white'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m8.25 4.5 7.5 7.5-7.5 7.5'
              />
            </svg>
          </span>
        </div>
      </div>

      {/* form tim kiem khach san  */}
      <SearchFormPageHotel/>
    </main>
  );
}
