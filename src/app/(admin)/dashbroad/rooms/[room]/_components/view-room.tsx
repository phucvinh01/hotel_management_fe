import Badge from '@/components/shared/Badge';
import React from 'react';

type ViewRoomProps = {
  room: Room;
  typerooms: SelectRoomsResult[];
  className?: string;
};

const ViewRoom = ({ room, typerooms, className }: ViewRoomProps) => {
  return (
    <div className={`grid gird-col-12  p-4 border-t ${className}`}>
      <div className='col-span-12 flex justify-end items-center'>
        <Badge
          name={room.State === 0 ? 'Trống' : 'Đang được thuê'}
          color={room.State === 0 ? 'gray' : 'green'}
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
      <div className='mt-4 col-span-6 space-y-3'>
        <h3 className='text-sm font-bold'>Thông tin thuê</h3>
        <dl className='grid grid-cols-2 gap-4'>
          <dt className='text-gray-600'>Trạng thái:</dt>
          <dd className='font-bold text-[14px]'>
            {room.State === 0 ? 'Trống' : 'Đang được thuê'}
          </dd>
          <dt className='text-gray-600'>Người thuê:</dt>
          <dd className='font-bold text-[14px]'></dd>{' '}
          <dt className='text-gray-600'>Số ngày thuê: </dt>
          <dd className='font-bold text-[14px]'>{''}</dd>
          <dt className='text-gray-600'>Thời gian đến:</dt>
          <dd className='font-bold text-[14px]'>{room.TimeRecive}</dd>
          <dt className='text-gray-600'>Thời gian đi:</dt>
          <dd className='font-bold text-[14px]'>{room.TimeLeave}</dd>{' '}
        </dl>
      </div>
      <div className='mt-4 col-span-12'>
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
    </div>
  );
};

export default ViewRoom;
