'use client';

import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CarouselHotelVietNam from './CarouselHotelVietNam';
import {  getHotelsByProvince } from '@/service/hotel.service';

type TabsCarouselHotelProps = {
  title: string;
  data: Temp[];
};

const TabsCarouselHotel = ({ title, data }: TabsCarouselHotelProps) => {
  const [province, setProvice] = useState<string>(data[0].name);
  const [dataList, setDataList] = useState<IResponeCardHotel | false | undefined>();

  useEffect(() => {
    const callApi = async () => {
      const respone: IResponeCardHotel | false | undefined =
        await getHotelsByProvince(province);
      setDataList(respone);
    };
    callApi();
  }, [province]);

  return (
    <>
      <p className='text-2xl font-extrabold text-black'>{title}</p>
      <Tabs
        defaultValue={data[0].name}
        className='w-full bg-transparent'>
        <TabsList className='bg-transparent gap-7 '>
          {data.map((item) => (
            <TabsTrigger
              onClick={() => setProvice(item.name)}
              className='text-white font-semibold text-[12px] py-2 px-3 hover:outline-[1px] rounded-[20px] data-[state=active]:text-white data-[state=active]:button-primary data-[state=inactive]:bg-[rgba(0,0,0,0.1)] data-[state=inactive]:text-cyan-500'
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
    </>
  );
};

export default TabsCarouselHotel;
