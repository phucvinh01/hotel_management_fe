import React, { Fragment, useState } from 'react';
import { getHotelPage } from '../../service/hotel.service'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import Rate from '@/components/shared/Rate'
import { CloudFog, Dot, LassoIcon, Locate, LocateFixedIcon, MapPin, Star, StarIcon, StarOffIcon, StarsIcon } from 'lucide-react';
import { formatCurrency } from '@/lib/formatCurrency';
import extractProvinceCity from '@/lib/extractProvinceCity';
import { Card, CardContent, CardHeader } from '../ui/card';

import imageDefault from '../../../public/images/default_image.jpg';
import ImageComponent from './ImageComponent';

type CarouselHotelProps = {
  listData: ICardHotel[] | false | undefined
}

const CarouselHotelVietNam = ({listData}: CarouselHotelProps) => {

  const [src, setSrc] = useState()
  return (
    <Fragment>
    <Carousel className='w-full '>
      <CarouselContent className=''>
        {listData && listData.length > 0 && listData.map((item) => (
          <CarouselItem
            key={item.id}
            className='basis-1/4'>
            <Card className='border-none p-0 space-y-2'>
              <div className='relative'>
                <Image
                  className='rounded-3xl object-contain w-full'
                  src={`http://localhost:8000/images/${ item.FileName}`}
                  alt={`http://localhost:8000/images/${ item.FileName}`}
                  width={288}
                  height={264}
                  
                  // onError={(e) => {
                  //         e.preventDefault(); 
                  //         const target = e.target as HTMLImageElement;
                  //         target.src = 'http://localhost:3000/images/default_image.jpg';
                  //         target.alt = 'Default Image';
                  //       }}
                /> 
                {/* <ImageComponent  alt = {item.FileName} key={item.id} width={288} height={264} src ={item.FileName}/> */}
              </div>
              <CardContent className='flex flex-col gap-4 py-1 max-h-52 p-0'>
                <p className='font-bold text-sm text-black line-clamp-2'>{item.Name}</p>
                <p className='text-gray-400 text-sm flex gap-3 items-center'><MapPin  size={18}/> <span>140 Lê Trọng Tấn</span></p>
                {/* <p className='text-xs text-gray-500 font-bold line-through'>{formatCurrency(item.minPrice)}</p> */}
                <div className='flex flex-row justify-between items-center text-sm'>
                <p className=' text-orange-400'>{formatCurrency(item.min_price)} /Đêm</p>
                <p className='flex items-center gap-1'> <span><StarIcon size={18} color='yellow' fill='yellow'/></span> <span className='font-semibold'>{item.average_rating === null ? 0 : item.average_rating}</span> </p>
                </div>

              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-10 bg-slate-400 text-black"/>
      <CarouselNext className="mr-10 bg-slate-400 text-black"/>
    </Carousel>
    </Fragment>
  );
};

export default CarouselHotelVietNam;
