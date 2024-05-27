'use client'

import { DataTable } from '@/components/table/data-table';
import DefaultLayout from '@/components/admin/Layouts/DefaultLayout';
import { columns } from './_components/columns';
import { ModalAddTypeRoom } from './_components/modal-add-typeroom';
import { useGetTypeRooms } from '@/service/query.service';
import Loader from '@/components/admin/common/Loader';

export default  function RoomPage({
  params,
}: {
  params: { typeroom: string };
}) {
  const { isLoading, error, data } = useGetTypeRooms(params.typeroom);

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;
  return (
    <DefaultLayout>
      <div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
        <div className='flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Danh sách loại phòng
            </h2>
            <p className='text-muted-foreground'>
              Đây là các loại phòng khác nhau của bạn.
            </p>
          </div>
          <ModalAddTypeRoom />
        </div>
        {isLoading && (
          <div>
            <Loader />
          </div>
        )}
        <DataTable
          columns={columns}
          data={data[0]}
        />
      </div>
    </DefaultLayout>
  );
}
