import URL_Enum from '@/axios/URL_Enum';
import Badge from '@/components/shared/Badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/formatCurrency';
import { getValueAfterSemicolon } from '@/lib/getValueAfterSemicolon';
import Image from 'next/image';
import React, { Dispatch, SetStateAction } from 'react';

type ViewypeRoomProps = {
  formData: SelectTypeRoom | undefined;
  imageTypeRoom: IHotelImage[] | undefined;
  className?: string;
};

const ViewTypeRoom = ({
  formData,
  imageTypeRoom,
  className,
}: ViewypeRoomProps) => {
  return (
    <div className='grid gird-col-12 p-4 border-t'>
      <div className='col-span-12 flex justify-end items-center'>
        <Badge
          name={formData?.state_room != null ? (formData.state_room + '/' + formData?.total_rooms) : 0 + '/' + formData?.total_rooms}
          color={'green'}
        />
      </div>
      <div className='mt-4 col-span-6 space-y-3'>
        <h3 className=' text-lg font-bold'>Thông tin loại phòng</h3>
        <dl className='grid grid-cols-2 gap-4'>
          <dt className='text-gray-600'>Loại:</dt>
          <dd className='font-bold text-[14px]'>{formData?.Name}</dd>
          <dt className='text-gray-600'>Số sảnh:</dt>
          <dd className='font-bold text-[14px]'>{formData?.FloorArea}</dd>
          <dt className='text-gray-600'>Giá:</dt>
          <dd className='font-bold text-[14px]'>
            {' '}
            {formatCurrency(formData?.Price as string)}
          </dd>
        </dl>
      </div>
      <div className='mt-4 col-span-6 space-y-3'>
        <h3 className=' text-lg font-bold'>Tiện nghi</h3>
        <dl className='grid grid-cols-2 gap-4'>
          <dt className='text-gray-600'>Giường:</dt>
          <dd className='font-bold text-[14px]'>
            {formData?.TenLoaiGiuong} / {formData?.SoLuongGiuong}
          </dd>
        </dl>
      </div>
      <div className='mt-4 col-span-12'>
        <h3 className=' text-lg font-bold'>Tiện ích</h3>
        <dl className='flex flex-col gap-4'>
          <dt className='text-gray-600 col-span-3  text-[16px]'>Phòng:</dt>
          <dd className='font-bold text-[14px] col-span-1'>
            <Badge
              name={formData?.ConvenientRoom}
              color='green'
            />
          </dd>
          <dt className='text-gray-600 text-[16px]'>Phòng tắm:</dt>
          <dd className='font-bold text-[14px]'>
            <Badge
              name={formData?.ConvenientBathRoom}
              color='green'
            />
          </dd>
        </dl>
      </div>
      <div className='mt-4 col-span-12'>
        <h3 className=' text-lg font-bold'>Hình ảnh</h3>
        <div className='grid grid-cols-12 gap-2'>
          {imageTypeRoom && imageTypeRoom.map((item, index) => (
            <Card
              key={index}
              className='border-none p-0 space-y-2 col-span-2 flex flex-col'>
              <div className='relative justify-center items-center'>
                <Image
                  className='rounded-2xl object-contain min-w-[80px] min-h-[80px]'
                  src={URL_Enum.BaseURL_Image + item.FileName}
                  // alt={`${URL_Enum.BaseURL_Image + imageUrl}`}
                  alt={`${URL_Enum.BaseURL_Image + item.FileName}`}
                  width={80}
                  height={80}
                />
              </div>
              <CardContent className='flex flex-col gap-4 py-1 max-h-52 p-0'>
                <p className='font-bold text-sm text-black line-clamp-2'>
                  {getValueAfterSemicolon(item.TypeRoom)}
                </p>

                {/* <p className='text-xs text-gray-500 font-bold line-through'>{formatCurrency(item.minPrice)}</p> */}
                <div className='flex flex-row justify-between items-center text-sm'></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewTypeRoom;
