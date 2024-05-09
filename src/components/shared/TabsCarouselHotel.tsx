'use client';

import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CarouselHotelVietNam from './CarouselHotelVietNam';
import { getHotelsByProvince } from '@/service/hotel.service';
import { Temp } from '@/types';
import Heading from './Heading';
import { Button } from '../ui/button';
import Link from 'next/link';

type TabsCarouselHotelProps = {
  title: string;
  data: Temp[];
};

const TabsCarouselHotel = ({ title, data }: TabsCarouselHotelProps) => {
  const [province, setProvice] = useState<string>(data[0].name);
  const [dataList, setDataList] = useState<
    IResponeCardHotel | false | undefined
  >();

  useEffect(() => {
    const callApi = async () => {
      const respone: IResponeCardHotel | false | undefined =
        await getHotelsByProvince(province);
      setDataList(respone);
    };
    callApi();
  }, [province]);

  return (
    <div className='space-y-4'>
      <Heading
        className='text-2xl font-extrabold text-black'
        desc={
          'Khám phá những bài viết nổi bật nhất về mọi chủ đề của cuộc sống.'
        }>
        {title}
      </Heading>
      <Tabs
        defaultValue={data[0].name}
        className='w-full bg-transparent'>
        <TabsList className='bg-transparent gap-7 '>
          {data.map((item) => (
            <TabsTrigger
              onClick={() => setProvice(item.name)}
              className='text-white font-semibold text-[16px] py-2 px-3 hover:outline-[1px] rounded-[20px] data-[state=active]:text-white data-[state=active]:button-primary data-[state=inactive]:bg-white data-[state=inactive]:text-black'
              key={item.id}
              value={item.name}>
              {item.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {data.map((item) => (
          <TabsContent
            key={item.id}
            value={item.name}>
            <CarouselHotelVietNam listData={dataList && dataList.hotels} />
          </TabsContent>
        ))}
      </Tabs>

      <div className='flex justify-center items-center mt-4'>
       <Button asChild className="bg-cyan-500 px-4 py-3 font-semibold rounded-3xl mt-6 sm:mt-11">
        <Link href={'/app/hotel'} >
          Xem thêm
        </Link>
        </Button>
      </div>
    </div>
  );
};

export default TabsCarouselHotel;
