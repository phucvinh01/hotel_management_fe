/* eslint-disable @next/next/no-img-element */
'use client';
import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Image from 'next/image';

const LogoCarousel = [
  {
    id: 1,
    url: '/carousel/carousel1.webp',
  },
  {
    id: 2,
    url: '/carousel/carousel2.webp',
  },
  {
    id: 3,
    url: '/carousel/carousel3.webp',
  },
  {
    id: 4,
    url: '/carousel/carousel4.webp',
  },
  {
    id: 5,
    url: '/carousel/carousel5.webp',
  },
  {
    id: 6,
    url: '/carousel/carousel6.webp',
  },
  {
    id: 7,
    url: '/carousel/carousel7.webp',
  },
];

export function CarouselTrustBy() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <Carousel
    opts={{
      "align":"center",
      "slidesToScroll":1
    }}
      plugins={[plugin.current]}
      className='flex-center'
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}>
      <CarouselContent>
          <CarouselItem className='flex gap-10 text-white text-[24px] font-bold'>
            <em>Trust By</em>
          {LogoCarousel.slice(0, 4).map((item) => (
            <div  key={item.id} className='p-3 rounded-2xl hover:bg-white'> <img
             
              className='object-contain '
              
              src={item.url}
              alt={item.url}
            /></div>
           
            
          ))}
            </CarouselItem>
           <CarouselItem className='flex gap-4 text-white text-[24px] font-bold'>
            <em>Trust By</em>
          {LogoCarousel.slice(4).map((item) => (
            <div  key={item.id} className='p-3 rounded-2xl hover:bg-white'> <img
             
              className=' '
              
              src={item.url}
              alt={item.url}
            /></div>
            
          ))}
            </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
