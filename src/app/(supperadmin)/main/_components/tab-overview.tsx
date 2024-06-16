import React from 'react';
import Loader from '@/components/admin/common/Loader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Overview } from './overview';
import { RecentSales } from './recent-sales';
import { Statistics } from '@/service/_superadmin.service';

type TabOverviewProps = {
    data: Statistics
}

const TabOverview = ({data}:TabOverviewProps) => {
 
  return (
    <div className="space-y-4">

    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Lượt đăng ký khách hàng mới
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
            <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
            <circle
              cx='9'
              cy='7'
              r='4'
            />
            <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
          </svg>
        </CardHeader>
        {data && (
          <CardContent>
            <div className='text-2xl font-bold'>+ {data.registrations.guest}</div>
          </CardContent>
        )}
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Lượt đăng ký cộng tác mới
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
            <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
            <circle
              cx='9'
              cy='7'
              r='4'
            />
            <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
          </svg>
        </CardHeader>
        {data && (
          <CardContent>
            <div className='text-2xl font-bold'>+ {data.registrations.staff}</div>
          </CardContent>
        )}
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Số lượt đặt phòng
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
            <rect
              width='20'
              height='14'
              x='2'
              y='5'
              rx='2'
            />
            <path d='M2 10h20' />
          </svg>
        </CardHeader>
        <CardContent>
          {data && (
            <div className='text-2xl font-bold'>+ {data.total_bookings}</div>
          )}
        </CardContent>




      </Card>
    </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Biểu đồ khách hàng đăng ký</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Top doanh thu khách sạn</CardTitle>                  
                  </CardHeader>
                  <CardContent>
                    <RecentSales data={data.top_hotels} />
                  </CardContent>
                </Card>
              </div>
    </div>

  );
};

export default TabOverview;
