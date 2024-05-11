'use client'


import { ModalAddRoom } from '../modal-add-room';
import { DataTable } from '@/components/table/data-table';
import { columns } from '@/components/table/columns';
import DefaultLayout from '@/components/admin/Layouts/DefaultLayout';
import { useRooms } from '@/service/query';
import { useQuery } from '@tanstack/react-query';
import { getRooms } from '@/service/hotel.service';
import Loader from '@/components/admin/common/Loader';



export default  function RoomPage({ params }: { params: { room: string } }) {

  const { isLoading, error, data } = useRooms(params.room)

  console.log(data);
  if (isLoading) return <div><Loader/></div>;
  if (error) return <div>Error: {error.message}</div>;

  // Use data here
  console.log(data); // Now data should be available

 

  return (
    <DefaultLayout>
    <div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
      <div className='flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Danh sách phòng</h2>
          <p className='text-muted-foreground'>
            Đây là các phòng khác nhau của bạn.
          </p>
        </div>
        <ModalAddRoom />
      </div>
      {
        data &&  <DataTable
        columns={columns}
        data={data}
      />
      }
     
    </div>
    </DefaultLayout>
  );
}


