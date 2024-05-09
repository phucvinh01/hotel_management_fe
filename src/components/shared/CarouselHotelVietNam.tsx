import React, { Fragment } from 'react';
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
/* HTML: <div class="ribbon">Your text content</div> */

const ribbonStyle = {
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#fff',
  '--f': '.3em' /* control the folded part*/,
  '--r': '.5em' /* control the ribbon shape */,
  bottom: '20px',
  left: 'calc(-1 * var(--f))',
  paddingInline: '.15em',
  lineHeight: '1.8',
  background: '#E3AD40',
  borderTop: 'var(--f) solid #0005',
  borderRight: 'var(--r) solid #0000',
  clipPath:
    'polygon(0 100%, 0 var(--f), var(--f) 0, var(--f) var(--f), 100% var(--f), calc(100% - var(--r)) calc(50% + var(--f)/2), 100% 100%)',
};

const hotelList = [
  {
    id: 1,
    image: '/hotel/1.webp',
    name: 'Hotel Lovecraft',
    star: 4,
    vote: '9/10',
    price: 3000000,
    priceSale: 1500000,
    discount: '50%',
    address: 'Ward 1',
  },
  {
    id: 2,
    image: '/hotel/1.webp',
    name: 'Hotel Lovecraft',
    star: 4,
    vote: '9/10',
    price: 3000000,
    priceSale: 1500000,
    discount: '50%',
    address: 'Ward 1',
  },
  {
    id: 3,
    image: '/hotel/1.webp',
    name: 'Hotel Lovecraft',
    star: 4,
    vote: '9/10',
    price: 3000000,
    priceSale: 1500000,
    discount: '50%',
    address: 'Ward 1',
  },
  {
    id: 4,
    image: '/hotel/1.webp',
    name: 'Hotel Lovecraft',
    star: 4,
    vote: '9/10',
    price: 3000000,
    priceSale: 1500000,
    discount: '50%',
    address: 'Ward 1',
  },
  {
    id: 5,
    image: '/hotel/1.webp',
    name: 'Hotel Lovecraft',
    star: 4,
    vote: '9/10',
    price: 3000000,
    priceSale: 1500000,
    discount: '50%',
    address: 'Ward 1',
  },
  {
    id: 6,
    image: '/hotel/1.webp',
    name: 'Hotel Lovecraft',
    star: 4,
    vote: '9/10',
    price: 3000000,
    priceSale: 1500000,
    discount: '50%',
    address: 'Ward 1',
  },
];

type CarouselHotelProps = {
  listData: ICardHotel[] | false | undefined
}

const CarouselHotelVietNam = ({listData}: CarouselHotelProps) => {
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
                />
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
