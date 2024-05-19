import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import Link from 'next/link';
import Image from 'next/image';



type DataCarouselStatic = {
  name: string;
  src: string;
};

type CarouselStaticProps = {
  data: DataCarouselStatic[];
  classNameContent?:string,
  classNameButtonPre?:string,
  classNameButtonNext?:string,
  classNameItem?:string,
};

const CarouselStatic = ({ data,classNameButtonNext,classNameButtonPre,classNameContent,classNameItem }: CarouselStaticProps) => {
  return (
    <Carousel
      className='w-full '
      id='slider'>
      <CarouselContent className=''>
        {data.map((item, index) => {
          return (
            <CarouselItem
              key={index}
              className='basis-1/5'>
              <Link href={'/#'}>
                <Image
                  width={180}
                  height={180}
                  src={item.src}
                  className='rounded-3xl'
                  alt={item.name}
                />
              </Link>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className={`ml-5 ${classNameButtonPre}`} />
      <CarouselNext className={`ml-5 ${classNameButtonNext}`} />
    </Carousel>
  );
};

export default CarouselStatic;
