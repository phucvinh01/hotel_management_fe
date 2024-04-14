import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CarouselHotelVietNam from './CarouselHotelVietNam';



type TabsCarouselHotelProps = {
  "title":string,
  "data": Temp[]
}

const TabsCarouselHotel = ({title,data}:TabsCarouselHotelProps) => {
  return (
    <>
    <p className='text-2xl font-extrabold text-black'>{title}</p>
     <Tabs
      defaultValue={data[0].name}
      className='w-full bg-transparent'>
      <TabsList className='bg-transparent gap-7 '>
        {
            data.map((item) => <TabsTrigger className='text-white font-semibold text-[12px] py-2 px-3 hover:outline-[1px] rounded-[20px] data-[state=active]:text-white data-[state=active]:button-primary data-[state=inactive]:bg-[rgba(0,0,0,0.1)] data-[state=inactive]:text-cyan-500' key={item.id} value={item.name}>{item.name}</TabsTrigger>)
        }
      </TabsList>
      {
            data.map((item) =>
             <TabsContent key={item.id} value={item.name}>
                <CarouselHotelVietNam/>
            </TabsContent>
             )
        }
    </Tabs>
    </>
   
  );
};

export default TabsCarouselHotel;