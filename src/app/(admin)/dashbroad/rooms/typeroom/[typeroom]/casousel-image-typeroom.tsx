import { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { Edit, Edit3, MapPin, StarIcon, Trash, Trash2, Trash2Icon, X } from 'lucide-react';
import { formatCurrency } from '@/lib/formatCurrency';
import { Card, CardContent } from '@/components/ui/card';
import { getValueAfterSemicolon } from '@/lib/getValueAfterSemicolon';

type CarouselImageTypeRoomProps = {
  listData: IHotelImage[] | false | undefined;
};

const CarouselImageTypeRoom = ({ listData }: CarouselImageTypeRoomProps) => {
  return (
    <Carousel className='w-full '>
      <CarouselContent className=''>
        {listData &&
          listData.length > 0 &&
          listData.map((item, index) => (
            <CarouselItem
              key={item.id}
             >
              <Card
                key={index}
                className='border-none p-0 space-y-2 col-span-2 flex flex-col '>
                    <div className='flex justify-end items-end gap-2 mr-10'>
                        <X size={15} className='hover:cursor-pointer rounded-full bg-red-500 '/> <Edit3 size={14} className='hover:cursor-pointer bg-green-500 rounded-full'/>
                    </div>
                    <div className='grid place-items-center'>

                  <Image
                    className='rounded-2xl'
                    src={item.FileName}
                    alt={`http://localhost:8000/images/$imageUrl`}
                    width={150}
                    height={150}
                    quality={100}
                  />
                    </div>

                <CardContent className='flex flex-col gap-4 py-1 max-h-52 p-0'>
                  <p className='font-bold text-sm text-black line-clamp-2 text-center'>
                    {getValueAfterSemicolon(item.TypeRoom)}
                  </p>

                  {/* <p className='text-xs text-gray-500 font-bold line-through'>{formatCurrency(item.minPrice)}</p> */}
                  <div className='flex flex-row justify-between items-center text-sm'></div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious className='ml-10 bg-slate-400 text-black' />
      <CarouselNext className='mr-10 bg-slate-400 text-black' />
    </Carousel>
  );
};

export default CarouselImageTypeRoom;
