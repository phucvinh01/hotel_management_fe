'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ActivityIcon,
  Building2Icon,
  BuildingIcon,
  BusIcon,
  CarIcon,
  HomeIcon,
  HotelIcon,
  MenuSquareIcon,
  PlaneIcon,
  PlaneTakeoffIcon,
} from 'lucide-react';
import { useState } from 'react';
import SearchForm from './form/Search/SearchForm';

const tabList = [
  {
    title: 'Khách sạn',
    icon: <HotelIcon className='mr-2' />,
    disabled: false,
    value: 'Hotel',
  },
  {
    title: 'Vé máy bay',
    icon: <PlaneIcon className='mr-2' />,
    disabled: true,
    value: 'Plane',
  },
  {
    title: 'Đưa đón sân bay',
    icon: <PlaneTakeoffIcon className='mr-2' />,
    disabled: true,
    value: 'PlaneTakeoff',
  },
  {
    title: 'Cho thuê xe',
    icon: <CarIcon className='mr-2' />,
    disabled: true,
    value: 'Car',
  },
  {
    title: ' Hoạt động vui chơi',
    icon: <ActivityIcon className='mr-2' />,
    disabled: true,
    value: 'Activity',
  },
  {
    title: 'Khác',
    icon: <MenuSquareIcon className='mr-2' />,
    disabled: true,
    value: 'Menu',
  },
];

const subTabList = [
  {
    title: 'Khách sạn',
    icon: (
      <HotelIcon
        size={18}
        className='mr-1'
      />
    ),
    value: 'Hotel',
  },
  {
    title: 'Holiday Stay',
    icon: (
      <Building2Icon
        size={18}
        className='mr-1'
      />
    ),
    value: 'Holiday',
  },
  {
    title: 'Biệt thự',
    icon: (
      <BuildingIcon
        size={18}
        className='mr-1'
      />
    ),
    value: 'Building',
  },
  {
    title: 'Căn hộ',
    icon: (
      <HomeIcon
        size={18}
        className='mr-1'
      />
    ),
    value: 'Homestay',
  },
];

const TabHero = () => {


  return (
    <Tabs
      defaultValue='Hotel'
      className='container w-full py-3'>
      <TabsList className='bg-transparent gap-7 '>
        {tabList.map((item, index) => (
          <TabsTrigger
            disabled={item.disabled}
            className='text-white font-medium text-[16px] py-2 px-3 hover:outline-[1px] rounded-[20px]'
            value={item.value}
            key={index}>
            {item.icon}
            {item.title}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value='Hotel' >
        <Tabs
          defaultValue='Hotel'
          className='container w-full py-3'>
          <TabsList className='bg-transparent gap-7'>
            {subTabList.map((item, index) => (
              <TabsTrigger
                className={`text-white font-semibold text-[12px] py-2 px-3 hover:outline-[1px] rounded-[20px] data-[state=active]:text-white data-[state=active]:button-primary data-[state=inactive]:bg-[rgba(0,0,0,0.25)] `}
                value={item.value}
                key={index}>
                {item.icon}
                {item.title}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value='Hotel'>
            <SearchForm />
          </TabsContent>
          <TabsContent value='Holiday'>
            <SearchForm />
          </TabsContent>
          <TabsContent value='Building'>
            <SearchForm />
          </TabsContent>
           <TabsContent value='Homestay'>
            <SearchForm />
          </TabsContent>
        </Tabs>
      </TabsContent>
    </Tabs>
  );
};

export default TabHero;
