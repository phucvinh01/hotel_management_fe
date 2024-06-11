'use client';;
import Loader from '@/components/admin/common/Loader';
import DefaultLayout from '@/components/admin/Layouts/DefaultLayout';
import { DataTable } from '@/components/table/data-table';
import { useAuth } from '@/hooks/useAuthContext';
import { useGetBooking } from '@/service/query.service';
import { columns } from './_components/columns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IResultGetBookings } from '@/service/_booking.service';
import { useEffect, useState } from 'react';
import _ from 'lodash';

const filterItemsByToday = (items: IResultGetBookings[]): IResultGetBookings[] => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    return _.filter(items, item => {
        const itemDate = new Date(item.created_at);
        itemDate.setHours(0, 0, 0, 0); 
        return itemDate.getTime() === today.getTime();
    });
};

const PageBooking = () => {
  const { admin } = useAuth();
  const { data, isLoading } = useGetBooking(admin?.id_hotel as string);
  const [todayBooking, setTodayBooking] = useState<IResultGetBookings[]>([])

useEffect(() => {
    if (data) {
      const todayBookingData = filterItemsByToday(data);
      setTodayBooking(todayBookingData);
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  

  return (
    <DefaultLayout>
      <div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
        <div className='flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Quản lý đặt phòng
            </h2>
            <p className='text-muted-foreground'>
              Đây là các đơn đặt phòng của bạn, nơi bạn có thể xem và duyệt các
              đơn book hoặc hủy
            </p>
          </div>
        </div>
        {isLoading && (
          <div>
            <Loader />
          </div>
        )}
        <Tabs
          defaultValue='new'
          className='w-full'>
          <TabsList className='grid w-full grid-cols-12'>
            <TabsTrigger className='data-[state=active]:border-white data-[state=active]:bg-cyan-400 data-[state=active]:shadow-sm' value='new'>Mới nhất</TabsTrigger>
            <TabsTrigger className='data-[state=active]:border-white data-[state=active]:bg-cyan-400 data-[state=active]:shadow-sm' value='all'>Tất cả</TabsTrigger>
          </TabsList>
          <TabsContent value='new'>
            <Card>
              <CardHeader>
                <CardTitle>Mới nhất 🎊</CardTitle>
                <CardDescription>
                  Tab quản lý các đơn đặt, hủy trong ngày
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-2'>
                { todayBooking && todayBooking.length > 0 ? (
                  <DataTable
                    columns={columns}
                    data={todayBooking}
                  />
                ): <p>Hiện chưa cho có đơn nào trong hôm nay 😥</p>}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value='all'>
            <Card>
              <CardHeader>
                <CardTitle>Tất cả 📋</CardTitle>
                <CardDescription>
                  Hiện thị tất cả đơn, với các thông tin đầy đủ nhất
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-2'>
                {data && (
                  <DataTable
                    columns={columns}
                    data={data}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DefaultLayout>
  );
};

export default PageBooking;
