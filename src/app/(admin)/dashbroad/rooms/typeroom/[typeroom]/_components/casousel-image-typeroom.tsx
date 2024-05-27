import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { Edit3, Trash } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { getValueAfterSemicolon } from '@/lib/getValueAfterSemicolon';
import ModalAddImageTypeRoom from './modal-add-image-typeroom';
import { AlertDeleteImage } from './alert-delete-image';

type CarouselImageTypeRoomProps = {
  listData: IHotelImage[] | false | undefined;
  typeroom: string | undefined;
  hotel: string | undefined;
};

const CarouselImageTypeRoom = ({
  listData,
  typeroom,
  hotel,
}: CarouselImageTypeRoomProps) => {
  const Render = () => listData && listData.length === 0 ? (
    <>
      <Card className='border-none p-0 space-y-2 col-span-2 flex flex-col '>
        <div className='flex justify-start items-end gap-4 mr-10'>
          <ModalAddImageTypeRoom
            typeroom={typeroom as string}
            hotel={hotel as string}
          />
        </div>
        <div className='grid place-items-center'>
          <Image
            className='rounded-2xl'
            src={'/images/default_image.jpg'}
            alt={`http://localhost:8000/images/$imageUrl`}
            width={150}
            height={150}
            quality={100}
          />
        </div>

        <CardContent className='flex flex-col gap-4 py-1 max-h-52 p-0'>
          <p className='font-bold text-sm text-black line-clamp-2 text-center'>
            Hãy thêm hình ảnh
          </p>

          {/* <p className='text-xs text-gray-500 font-bold line-through'>{formatCurrency(item.minPrice)}</p> */}
          <div className='flex flex-row justify-between items-center text-sm'></div>
        </CardContent>
      </Card>
    </>
  ) : (
    <Carousel className='w-full '>
      <CarouselContent className=''>
        {listData &&
          listData.length > 0 &&
          listData.map((item, index) => (
            <CarouselItem key={item.id}>
              <Card
                key={index}
                className='border-none p-0 space-y-2 col-span-2 flex flex-col '>
                <div className='flex justify-start items-end gap-4 mr-10'>
                  <ModalAddImageTypeRoom
                    typeroom={typeroom as string}
                    hotel={item.HotelId}
                  />
                  {/* <Edit3
                    color='yellow'
                    size={16}
                    className='hover:cursor-pointer'
                  /> */}
                  <AlertDeleteImage idImage={item.id} images={listData}/>
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
      <CarouselPrevious className='ml-10' />
      <CarouselNext className='mr-10' />
    </Carousel>
  );


  return <Render/>
};

export default CarouselImageTypeRoom;
