
import { Metadata } from 'next';
import { ModalAddRoom } from '../../modal-add-room';
import { getRooms, getTypeRooms } from '@/service/hotel.service';
import { DataTable } from '@/components/table/data-table';
import DefaultLayout from '@/components/admin/Layouts/DefaultLayout';
import { columns } from './columns';

export const metadata: Metadata = {
  title: 'Type Room',
};

export default async function RoomPage({ params }: { params: { typeroom: string } }) {
  async function getData(id: string): Promise<any> {
    try {
      const data = await getTypeRooms(id);
      return data;
    } catch (error) {
      console.error('Error fetching rooms:', error);
      throw error;
    }
  }

  const data = await getData(params.typeroom as string);

  return (
    <DefaultLayout>
    <div className='hidden h-full flex-1 flex-col space-y-8 p-8 md:flex'>
      <div className='flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Danh sách loại phòng</h2>
          <p className='text-muted-foreground'>
            Đây là các loại phòng khác nhau của bạn.
          </p>
        </div>
        <ModalAddRoom />
      </div>
      <DataTable
        columns={columns}
        data={data[0]}
      />
    </div>
    </DefaultLayout>
  );
}


