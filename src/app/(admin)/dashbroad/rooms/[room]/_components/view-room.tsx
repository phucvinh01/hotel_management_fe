import Badge from '@/components/shared/Badge';
import { AVAILABLE, EMPTY, NOT_EMPTY } from '@/constant';
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type ViewRoomProps = {
  room: ViewRoom;
  typerooms: SelectRoomsResult[];
  className?: string;
};

function filterBookingsByDate(bookings:Booking[]) {
    const today = new Date();
    return bookings.filter(booking => {
        const timeLeave = new Date(booking.TimeLeave);
        const timeRecive = new Date(booking.TimeRecive);
        return today >= timeRecive && today <= timeLeave;
    });
}

const ViewRoom = ({ room, typerooms, className }: ViewRoomProps) => {
  const filteredBookings = filterBookingsByDate(room.booking as Booking[]);

  return (
    <div className={`grid gird-col-12  p-4 border-t ${className}`}>
      <div className='col-span-12 flex justify-end items-center'>
        <Badge
          name={room.State === AVAILABLE ? EMPTY : NOT_EMPTY}
          color={room.State === AVAILABLE ? 'gray' : 'green'}
        />
      </div>
      <div className='mt-4 col-span-6 space-y-3'>
        <h3 className='text-sm font-bold'>Thông tin phòng</h3>
        <dl className='grid grid-cols-2 gap-4'>
          <dt className='text-gray-600'>Phòng:</dt>
          <dd className='font-bold text-[14px]'>{room.RoomName}</dd>

          <dt className='text-gray-600'>Loại:</dt>
          <dd className='font-bold text-[14px]'>
            {typerooms.find((item) => item.id === room.TypeRoomId)?.RoomName}
          </dd>

          <dt className='text-gray-600'>Giảm giá:</dt>
          <dd className='font-bold text-[14px]'>{room.Discount}</dd>
        </dl>
      </div>
      <div className='mt-4 col-span-6'>
        <h3 className='text-sm font-bold'>Tiện ích</h3>
        <ul className='list-disc pl-4 mt-2'>
          <li hidden={room.Wifi === 0}>{room.Wifi === 1 ? 'Wifi' : ''}</li>
          <li hidden={room.Breakfast === 0}>
            {room.Breakfast === 1 ? 'Có buổi sáng' : ''}{' '}
          </li>
          <li hidden={room.NoSmoking === 0}>
            {room.NoSmoking === 1 ? 'Được hút thuốc' : ''}
          </li>
          <li hidden={room.Bao_Gom_Thue_Va_Phi === 0}>
            {room.Bao_Gom_Thue_Va_Phi === 1 ? 'Đã bao gồm thuế và phí' : ''}
          </li>
          <li hidden={room.Hinh_Thuc_Thanh_Toan === 0}>
            {room.Hinh_Thuc_Thanh_Toan === 1 ? 'Thanh toán online' : ''}
          </li>
        </ul>
      </div>
      <div className='mt-4 col-span-12 space-y-3'>
        <h3 className='text-sm font-bold'>Thông tin thuê</h3>
        <Table>
          <TableHeader>
            <TableRow className='w-full border-b bg-gray-200'>
              <TableHead className='text-left py-2 px-4 text-gray-600'>
                Trạng thái
              </TableHead>
              <TableHead className='text-left py-2 px-4 text-gray-600'>
                Người thuê
              </TableHead>
               <TableHead className='text-left py-2 px-4 text-gray-600'>
                Số người
              </TableHead>
              <TableHead className='text-left py-2 px-4 text-gray-600'>
                Thời gian đến
              </TableHead>
              <TableHead className='text-left py-2 px-4 text-gray-600'>
                Thời gian đi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className='w-full border-b'>
              <TableCell className='font-bold text-[14px] py-2 px-4'>
                {room.State === AVAILABLE ? EMPTY : NOT_EMPTY}
              </TableCell>
              <TableCell className='font-bold text-[14px] py-2 px-4'>{filteredBookings[0].guest_name}</TableCell>
              <TableCell className='font-bold text-[14px] py-2 px-4'>
                 {filteredBookings[0].members.length}
              </TableCell>
              <TableCell className='font-bold text-[14px] py-2 px-4'>
               {filteredBookings[0].TimeRecive}
              </TableCell>
              <TableCell className='font-bold text-[14px] py-2 px-4'>
               {filteredBookings[0].TimeLeave}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ViewRoom;
