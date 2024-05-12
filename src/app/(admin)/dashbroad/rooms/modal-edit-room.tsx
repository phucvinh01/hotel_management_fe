'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { EditIcon, EyeIcon, MoveLeft, Settings } from 'lucide-react';
import { useAuth } from '@/hooks/useAuthContext';
import { getTypeRooms } from '@/service/hotel.service';
import Badge from '@/components/shared/Badge';
import { Separator } from '@/components/ui/separator';
import { useGetTypeRooms } from '@/service/query';

export const ModalEditRoom = ({ data }: { data: any }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Room>({});
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { admin } = useAuth();


  let typedData: SelectRoomsResult[] = []

  const {data:dataTyperooms, isLoading}= useGetTypeRooms(admin?.id_hotel as string)

  if (!isLoading && dataTyperooms) {
      typedData = dataTyperooms[0] as SelectRoomsResult[]; 
  }


   useEffect(() => {
    if (isOpen) {
      setFormData(data as Room);
    }
  }, [isOpen, data]);


  return (
    <Dialog
      open={isOpen}
      key={'edit'}>
      <DialogTrigger asChild>
        <EyeIcon
          size={16}
          className='hover:cursor-pointer'
          onClick={() => setIsOpen(true)}
        />
      </DialogTrigger>
      <DialogContent className='sm:max-w-[825px] bg-white dark:bg-black dark:text-white'>
        <DialogHeader className='flex flex-row justify-between items-center'>
          <DialogTitle>{isEdit === true ? `Chỉnh sửa thông tin phòng ${formData.RoomName}` : `Thông tin phòng ${formData.RoomName}`}</DialogTitle>
          {
            isEdit === true ? <MoveLeft onClick={() => setIsEdit(false)} /> :  <Settings onClick={() => setIsEdit(true)} />
          }
        </DialogHeader>
        {isEdit !== true ? (
          <div className='grid gird-col-12  p-4 border-t'>
            <div className='col-span-12 flex justify-end items-center'>
              <Badge
                name={formData.State === '0' ? 'Trống' : 'Đang được thuê'}
                color={formData.State === '0' ? 'gray' : 'green'}
              />
            </div>
            <div className='mt-4 col-span-6 space-y-3'>
              <h3 className='text-sm font-bold'>Thông tin phòng</h3>
              <dl className='grid grid-cols-2 gap-4'>
                <dt className='text-gray-600'>Phòng:</dt>
                <dd className='font-bold text-[14px]'>{formData.RoomName}</dd>

                <dt className='text-gray-600'>Loại:</dt>
                <dd className='font-bold text-[14px]'>{typedData.find(item => item.id === formData.TypeRoomId)?.RoomName}</dd>

                <dt className='text-gray-600'>Giảm giá:</dt>
                <dd className='font-bold text-[14px]'>{formData.Discount}</dd>
              </dl>
            </div>
            <div className='mt-4 col-span-6 space-y-3'>
              <h3 className='text-sm font-bold'>Thông tin thuê</h3>
              <dl className='grid grid-cols-2 gap-4'>
                <dt className='text-gray-600'>Trạng thái:</dt>
                <dd className='font-bold text-[14px]'>
                  {formData.State === '0' ? 'Trống' : 'Đang được thuê'}
                </dd>
                <dt className='text-gray-600'>Người thuê:</dt>
                <dd className='font-bold text-[14px]'></dd>{' '}
                <dt className='text-gray-600'>Số ngày thuê: </dt>
                <dd className='font-bold text-[14px]'>{''}</dd>
                <dt className='text-gray-600'>Thời gian đến:</dt>
                <dd className='font-bold text-[14px]'>{formData.TimeRecive}</dd>
                <dt className='text-gray-600'>Thời gian đi:</dt>
                <dd className='font-bold text-[14px]'>
                  {formData.TimeLeave}
                </dd>{' '}
              </dl>
            </div>
            <div className='mt-4 col-span-12'>
              <h3 className='text-sm font-bold'>Tiện ích</h3>
              <ul className='list-disc pl-4 mt-2'>
                <li hidden={formData.Wifi === 0 ? true : false}>
                  {formData.Wifi === 1 ? 'Wifi' : ''}
                </li>
                <li hidden={formData.Breakfast === 0 ? true : false}>
                  {formData.Breakfast === 1 ? 'Có buổi sáng' : ''}{' '}
                </li>
                <li hidden={formData.NoSmoking === 0 ? true : false}>
                  {formData.NoSmoking === 1 ? 'Được hút thuốc' : ''}
                </li>
                <li hidden={formData.Bao_Gom_Thue_Va_Phi === 0 ? true : false}>
                  {formData.Bao_Gom_Thue_Va_Phi === 1
                    ? 'Đã bao gồm thuế và phí'
                    : ''}
                </li>
                <li hidden={formData.Hinh_Thuc_Thanh_Toan === 0 ? true : false}>
                  {formData.Hinh_Thuc_Thanh_Toan === 1
                    ? 'Thanh toán online'
                    : ''}
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className='grid gap-4 py-4 grid-cols-12'>
            <div className='flex space-y-2 flex-col col-span-6'>
              <Label
                htmlFor='name'
                className='text-start font-bold'>
               Tên phòng
              </Label>
              <Input
                className=''
                id='name'
                type='text'
                value={formData.RoomName}
              />
            </div>
            <div className='flex space-y-2 flex-col col-span-6'>
              <Label
                htmlFor='roomtype'
                className='text-start font-bold'>
                Loại phòng
              </Label>
              <Select
                defaultValue={formData.TypeRoomId}
                name='roomtype'
                required
                onValueChange={(e) =>
                  setFormData((prev) => ({ ...prev!, TypeRoomId: e }))
                }>
                <SelectTrigger className=''>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className='bg-white text-black dark:bg-black dark:text-white'>
                  <SelectGroup>
                    {
                      isLoading && <SelectItem value='loading'>Loading.....</SelectItem>
                    }
                    {dataTyperooms[0].map((item:SelectRoomsResult) => (
                      <SelectItem
                        key={item.id}
                        value={item.id}>
                        {item.RoomName}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className='flex space-y-2 flex-col col-span-6'>
              <Label
                htmlFor='state'
                className='text-start font-bold'>
               Trạng thái
              </Label>
              <Select
                name='state'
                defaultValue={formData.State}>
                <SelectTrigger className=''>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className='bg-white dark:bg-black dark:text-white'>
                  <SelectGroup>
                    <SelectItem value={"0"}>Trống</SelectItem>
                    <SelectItem value={"1"}>Đang thuê</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className='flex space-y-2 flex-col col-span-6'>
              <Label
                htmlFor='discount'
                className='text-start font-bold'>
               Giảm giá
              </Label>
              <Input
              className='text-[14px] font-bold'
                id='discount'
                type='number'
                value={formData.Discount}
              />
            </div>
            <div className='flex space-y-2 flex-col col-span-12'>
              <Label
                htmlFor='Gift'
                className='text-start font-bold'>
               Quà Tặng
              </Label>
              <Input
                className='text-[14px] font-bold'
                id='Gift'
                type='text'
                value={formData.Gift}
              />
            </div>
            <div className='flex items-center space-x-2 col-span-4'>
              <Checkbox
                id='wifi'
                defaultChecked={formData.Wifi === 1 ? true : false}
              />
              <label
                htmlFor='wifi'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                Wifi
              </label>
            </div>
            <div className='flex items-center space-x-2 col-span-4'>
              <Checkbox
                id='breakfast'
                defaultChecked={formData.Breakfast === 1 ? true : false}
              />
              <label
                htmlFor='breakfast'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                Buổi sáng
              </label>
            </div>
            <div className='flex items-center space-x-2 col-span-4'>
              <Checkbox
                id='is_morking'
                defaultChecked={formData.NoSmoking === 1 ? true : false}
              />
              <label
                htmlFor='is_morking'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Được hút thuốc
              </label>
            </div>
            <div className='flex items-center space-x-2 col-span-4'>
              <Checkbox
                id='cancel'
                defaultChecked={formData.Cancel === 1 ? true : false}
              />
              <label
                htmlFor='cancel'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Được hủy
              </label>
            </div>
            <div className='flex items-center space-x-2 col-span-4'>
              <Checkbox
                id='payment'
                defaultChecked={formData.Hinh_Thuc_Thanh_Toan === 1 ? true : false}
                onCheckedChange={(e) =>
                  setFormData((prev) => ({
                    ...prev!,
                    Hinh_Thuc_Thanh_Toan: e ? 1 : 0,
                  }))
                }
              />
              <label
                htmlFor='payment'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                Hình thanh toán online
              </label>
            </div>
            <div className='flex items-center space-x-2 col-span-4'>
              <Checkbox
                id='fax'
                defaultChecked={formData.Bao_Gom_Thue_Va_Phi === 1 ? true : false}
                onCheckedChange={(e) =>
                  setFormData((prev) => ({
                    ...prev!,
                    Bao_Gom_Thue_Va_Phi: e ? 1 : 0,
                  }))
                }
              />
              <label
                htmlFor='fax'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                Bao gồm thuế và phí
              </label>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button
            onClick={() => {setIsOpen(false) , setIsEdit(false)}}
            className='bg-black text-white hover:text-black transition-colors'>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
