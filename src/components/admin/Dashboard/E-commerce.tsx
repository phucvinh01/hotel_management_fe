'use client';
import React, { useEffect, useState } from 'react';
import ChartOne from '../Charts/ChartOne';
import ChartThree from '../Charts/ChartThree';
import ChatCard from '../Chat/ChatCard';
import TableOne from '../Tables/TableOne';
import CardDataStats from '../CardDataStats';
import { CalendarCheck, HomeIcon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuthContext';
import { getHotel } from '@/service/hotel.service';

const ECommerce: React.FC = () => {
  const { admin } = useAuth();
  const [hotel, setHotel] = useState<HotelResponse>();

  useEffect(() => {


    const getDataHotel = async () => {
      if (admin?.id_hotel) {
        const res = await getHotel(admin?.id_hotel as string);
        if (res) setHotel(res);
      }
    };

    getDataHotel()
    
  }, []);



  return (
    <div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2'>
        <CardDataStats
          title='Total booking'
          total='$3.456K'
          rate='0.43%'
          levelUp>
          <CalendarCheck />
        </CardDataStats>
        <CardDataStats
          title='Rooms Available'
          total={hotel?.number_of_room_types ? hotel?.number_of_room_types + "room" : "Đang lấy thông tin..."}
          rate=''
          levelUp>
          <HomeIcon />
        </CardDataStats>
      </div>
      <div className='mt-4 grid grid-cols-2 first-letter:gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'>
        <ChartThree />
        <ChartOne />
        <TableOne />
        <ChatCard />
      </div>
    </div>
  );
};

export default ECommerce;
