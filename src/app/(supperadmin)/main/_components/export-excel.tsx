'use client';

import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import { getHotelRegisterByMonth } from '@/service/_superadmin.service';
import { Download, Loader } from 'lucide-react';
type ExportToExcelProps = {
  month: string;
};
const ExportToExcel = ({ month }: ExportToExcelProps) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [csvInstance, setCsvInstance] = useState<any>(null);

  const headers = [
    { label: 'User ID', key: 'user_id' },
    { label: 'User Email', key: 'user_email' },
    { label: 'User Name', key: 'user_name' },
    { label: 'User Phone', key: 'user_phone' },
    { label: 'User Created', key: 'user_created' },
    { label: 'Hotel ID', key: 'hotel_id' },
    { label: 'Hotel Name', key: 'hotel_name' },
    { label: 'Hotel Address', key: 'hotel_address' },
    { label: 'Hotel Phone', key: 'hotel_phone' },
    { label: 'Hotel Description', key: 'hotel_decs' },
    { label: 'Hotel Created', key: 'hotel_created' },
    { label: 'Room Name', key: 'room_name' },
    { label: 'Room Price', key: 'room_price' },
    { label: 'Room Max People', key: 'room_max_people' },
    { label: 'Room Type Bed', key: 'room_type_bed' },
    { label: 'Room Num Bed', key: 'room_num_bed' },
    { label: 'Room Convenient', key: 'room_convenient' },
    { label: 'Room Count', key: 'room_count' },
  ];
  const exportToExcel = async () => {
    setIsLoading(true);
    const data = await getHotelRegisterByMonth(month);

    const csvData = data.map((user) => {
      const baseData = {
        user_id: user.user_id,
        user_email: user.user_email,
        user_name: user.user_name,
        user_phone: user.user_phone,
        user_created: user.user_created,
        hotel_id: user.hotel_id,
        hotel_name: user.hotel_name,
        hotel_address: user.hotel_address,
        hotel_phone: user.hotel_phone,
        hotel_decs: user.hotel_decs,
        hotel_created: user.hotel_created,
        room_name: '',
        room_price: '',
        room_max_people: '',
        room_type_bed: '',
        room_num_bed: '',
        room_convenient: '',
        room_count: '',
      };

      if (user.rooms && user.rooms.length > 0) {
        baseData.room_name = user.rooms.map(room => room.type_room_name).join('; ');
        baseData.room_price = user.rooms.map(room => room.typeroom_price).join('; ');
        baseData.room_max_people = user.rooms.map(room => room.typeroom_maxpeople).join('; ');
        baseData.room_type_bed = user.rooms.map(room => room.typeroom_type_bed).join('; ');
        baseData.room_num_bed = user.rooms.map(room => room.typeroom_num_bed).join('; ');
        baseData.room_convenient = user.rooms.map(room => room.typeroom_convenient).join('; ');
        baseData.room_count = user.rooms.map(room => room.room_count).join('; ');
      }

      return baseData;
    });
    setIsLoading(false);
    setData(csvData)
    if (csvInstance) {
      csvInstance.link.click();
    }
  };

  const handleClick = async (csvLink: any) => {
    setCsvInstance(csvLink);
    if (data.length === 0) {
      await exportToExcel();
      return false;
    }
    return true; 
  };


  return (
    <CSVLink
      headers={headers}
      data={data}
      asyncOnClick={true}
      className='px-3 py-3 border rounded-3xl bg-black text-white'
       onClick={(event, csvLink) => handleClick(csvLink)}>
      {isLoading ? <Loader/> : <span className='space-x-3 flex'><Download /> <span>Xuất dữ liệu các khách sạn đăng ký mới</span></span>}
    </CSVLink>
  );
};

export default ExportToExcel;
