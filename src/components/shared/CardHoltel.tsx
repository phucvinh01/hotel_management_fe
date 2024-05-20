import React from 'react';
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { MapPin, StarIcon } from 'lucide-react';
import { formatCurrency } from '@/lib/formatCurrency';
import Link from 'next/link';

type CardHotelProps = {
  item: ICardHotel;
  className?: string;
};

const CardHoltel = ({ item, className }: CardHotelProps) => {
  return (
    <Link href={`/app/hotel/hotel_detail?id=${item.id}`}>
      <Card className={`border-none p-0 space-y-2 ${className}`}>
        <div className='relative'>
          <Image
            className='rounded-3xl object-contain w-full'
            src={`${item.FileName}`}
            alt={`${item.FileName}`}
            width={288}
            height={264}
          />
        </div>
        <CardContent className='flex flex-col gap-4 py-1 max-h-52 p-0'>
          <p className='font-bold text-sm text-black line-clamp-2'>
            {item.Name}
          </p>
          <p className='text-gray-400 text-sm flex gap-3 items-center'>
            <MapPin size={18} /> <span>140 Lê Trọng Tấn</span>
          </p>
          {/* <p className='text-xs text-gray-500 font-bold line-through'>{formatCurrency(item.minPrice)}</p> */}
          <div className='flex flex-row justify-between items-center text-sm'>
            <p className=' text-orange-400'>
              {formatCurrency(item.min_price as string)} /Đêm
            </p>
            <p className='flex items-center gap-1'>
              {' '}
              <span>
                <StarIcon
                  size={18}
                  fill='yellow'
                />
              </span>{' '}
              <span className='font-semibold'>
                {item.average_rating === null ? 0 : item.average_rating}
              </span>{' '}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CardHoltel;
