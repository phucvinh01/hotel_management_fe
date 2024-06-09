'use client';
import React, { useState } from 'react';
import { HomeIcon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuthContext';
import { useGetHotel, useGetRenvenuHotel } from '@/service/query.service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/formatCurrency';
import Loader from '@/components/admin/common/Loader';
import { PeiChart } from './PeiChart';
import BarChartComponent from './BarChart';

const Dashbroad: React.FC = () => {
  const { admin } = useAuth();
  const [hotel, setHotel] = useState<HotelResponse>();

  const { data, isLoading } = useGetHotel(admin?.id_hotel as string);
  const { data: renvenu, isLoading: isLoadingRenvenu } = useGetRenvenuHotel(
    admin?.id_hotel,
  );

  if (isLoading || isLoadingRenvenu) {
    return <Loader />;
  }

  if (data?.length === 0) {
    return <Loader />;
  }

  return (
    <div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Doanh thu ngày
            </CardTitle>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-muted-foreground'>
              <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
            </svg>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {formatCurrency(renvenu?.today.revenue as string)}
            </div>
          
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Doanh thu tháng
            </CardTitle>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-muted-foreground'>
              <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
            </svg>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {formatCurrency(renvenu?.month.revenue as string)}
            </div>
           
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Doanh thu tuần
            </CardTitle>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='h-4 w-4 text-muted-foreground'>
              <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
            </svg>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {formatCurrency(renvenu?.week.revenue as string)}
            </div>
           
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Số phòng còn trống
            </CardTitle>
            <HomeIcon />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {data && data[0].total_rooms_state_0}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className='mt-4 grid grid-cols-2 first-letter:gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'>
        <PeiChart data={renvenu} />
        <BarChartComponent series={renvenu} />
      </div>
    </div>
  );
};

export default Dashbroad;
