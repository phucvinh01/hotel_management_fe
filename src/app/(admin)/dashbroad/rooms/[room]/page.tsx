'use client';
import { DataTable } from '@/components/table/data-table';
import DefaultLayout from '@/components/admin/Layouts/DefaultLayout';
import { useRooms } from '@/service/query.service';
import Loader from '@/components/admin/common/Loader';
import { ModalAddRoom } from './_components/modal-add-room';
import { columns } from './_components/columns';



export default  function RoomPage({ params }: { params: { room: string } }) {

  const { isLoading, error, data } = useRooms(params.room)

  if (isLoading) return <div><Loader/></div>;
  if (error) return <div>Error: {error.message}</div>;


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


