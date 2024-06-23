'use client';
import Loader from '@/components/admin/common/Loader';
import { DataTable } from '@/components/table/data-table';
import { useGetAllHotel } from '@/service/query.service';
import React from 'react';
import { columns } from './_components/column';
import { MainNav } from '../_components/main-nav';
import { UserNav } from '../_components/user-nav';

const HotelPage = () => {
  const { isLoading, error, data } = useGetAllHotel();

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className='p-10 space-y-10'>
       <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
      <div className='flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Quản lý tất cả khách sạn trong hệ thống🌃</h2>
          </div>
        </div>
      {data && (
        <DataTable
          columns={columns}
          data={data}
        />
      )}
    </div>
  );
};

export default HotelPage;
