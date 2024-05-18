import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import CardHoltel from './CardHoltel';

type CarouselHotelProps = {
  listData: ICardHotel[] | false | undefined;
};

const CarouselHotelVietNam = ({ listData }: CarouselHotelProps) => {
  return (
    <Carousel className='w-full '>
      <CarouselContent className=''>
        {listData &&
          listData.length > 0 &&
          listData.map((item) => (
            <CarouselItem
              key={item.id}
              className='basis-1/4'>
              <CardHoltel item={item} />
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious className='ml-10 bg-slate-400 text-black' />
      <CarouselNext className='mr-10 bg-slate-400 text-black' />
    </Carousel>
  );
};

export default CarouselHotelVietNam;
