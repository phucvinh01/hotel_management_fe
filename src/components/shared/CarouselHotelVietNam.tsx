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
import { CloudFog, Dot } from 'lucide-react';
import { formatCurrency } from '@/lib/formatCurrency';
import extractProvinceCity from '@/lib/extractProvinceCity';
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
  console.log(listData);
  return (
    <Fragment>
    <Carousel className='w-full '>
      <CarouselContent className=''>
        {listData && listData.length > 0 && listData.map((item) => (
          <CarouselItem
            key={item.id}
            className='basis-1/5'>
            <div className='rounded-lg shadow-md border'>
              <div className='relative'>
                <Image
                  className='rounded-lg object-contain'
                  src={`http://localhost:8000/images/${ item.FileName}`}
                  alt={`http://localhost:8000/images/${ item.FileName}`}
                  width={240}
                  height={60}
                />
                <span className='absolute top-0 px-2 py-1 bg-cyan-700 text-white font-bold text-md rounded-md'>
                  {extractProvinceCity(item.Address)}
                </span>
                <span
                  style={ribbonStyle}
                  className='absolute bottom-0'>
                  {10}
                </span>
              </div>
              <div className='flex flex-col gap-1 px-3 py-1 max-h-52'>
                <p className='font-bold text-sm text-black line-clamp-2'>{item.Name}</p>
                <div className='w-full flex gap-1 items-center'>
                  <Rate  count={item.average_rating === null ? 0 : item.average_rating} value={item.average_rating === null ? 0 : item.average_rating} />
                  <Dot />
                  <p className='text-cyan-400 text-sm font-bold'>{item.total_reviews}</p>
                </div>
                {/* <p className='text-xs text-gray-500 font-bold line-through'>{formatCurrency(item.minPrice)}</p> */}
                <p className='text-lg text-orange-600 font-bold'>{formatCurrency(item.min_price)}</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-10"/>
      <CarouselNext className="mr-10"/>
    </Carousel>
    </Fragment>
  );
};

export default CarouselHotelVietNam;
