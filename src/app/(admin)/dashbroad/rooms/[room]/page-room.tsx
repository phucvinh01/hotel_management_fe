import { Metadata } from 'next';
import { ModalAddRoom } from '../modal-add-room';
import { getRooms } from '@/service/hotel.service';
import { DataTable } from '@/components/table/data-table';
import { columns } from '@/components/table/columns';

export const metadata: Metadata = {
  title: 'Rooms',
};


export default async function RoomPage({ params }: { params: { room: string } }) {
  async function getData(id: string): Promise<SelectRoomsResult[]> {
    try {
      const data = await getRooms(id);
      return data;
    } catch (error) {
      console.error('Error fetching rooms:', error);
      throw error;
    }
  }


  const data = await getData(params.room as string);

  return (
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
      <DataTable
        columns={columns}
        data={data}
      />
    </div>
  );
}
