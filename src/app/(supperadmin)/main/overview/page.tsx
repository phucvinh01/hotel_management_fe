'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { useGetStatistics } from '@/service/query.service';
import { format } from 'date-fns';
import Loader from '@/components/admin/common/Loader';
import { CalendarMonthPicker } from '../_components/date-range-picker';
import ExportToExcel from '../_components/export-excel';
import TabOverview from '../_components/tab-overview';
import { MainNav } from '../_components/main-nav';
import { UserNav } from '../_components/user-nav';

const OveviewPage = () => {
  const [month, setMonth] = useState(new Date());

  const { data, isLoading } = useGetStatistics(format(month, 'yyyy-MM'));
  return (
    <div className='hidden flex-col md:flex'>
            <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-3xl font-bold tracking-tight'>Tổng quan</h2>
          <div className='flex items-center space-x-2'>
            <CalendarMonthPicker
              month={month}
              setMonth={setMonth}
            />
            <ExportToExcel month={format(month, 'yyyy-MM')} />
          </div>
        </div>
        {isLoading && <Loader />}
        <Tabs
          defaultValue='overview'
          className='space-y-4'>
          <TabsList>
            <TabsTrigger
              className='data-[state=active]:border-white data-[state=active]:bg-black data-[state=active]:text-white'
              value='overview'>
              Tổng quan
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value='overview'
            className='space-y-4'>
            {data && <TabOverview data={data} />}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OveviewPage;
