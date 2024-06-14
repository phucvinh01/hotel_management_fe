import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

import React, { Dispatch, Fragment, SetStateAction } from 'react'
import { EMPTY, NOT_EMPTY } from '@/constant';

type FormEditRoomProps = {
    room:ViewRoom,
    setRoom:Dispatch<SetStateAction<Room>>
    typeroom:SelectRoomsResult[]
}

const FormEditRoom = ({room, setRoom, typeroom}: FormEditRoomProps) => {
const stateValue = room.State === 1 ? '1' : '0'
  return (
    <Fragment>
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
                  value={room.RoomName}
                  onChange={(e) =>
                    setRoom((prev) => ({
                      ...prev!,
                      RoomName: e.target.value,
                    }))
                  }
                />
              </div>
              <div className='flex space-y-2 flex-col col-span-6'>
                <Label
                  htmlFor='roomtype'
                  className='text-start font-bold'>
                  Loại phòng
                </Label>
                <Select
                  defaultValue={room.TypeRoomId}
                  name='roomtype'
                  required
                  onValueChange={(e) =>
                    setRoom((prev) => ({ ...prev!, TypeRoomId: e }))
                  }>
                  <SelectTrigger className=''>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className='bg-white text-black dark:bg-black dark:text-white'>
                    <SelectGroup>
                     
                      {typeroom.map((item: SelectRoomsResult) => (
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
                  defaultValue={stateValue}
                  required
                  onValueChange={(e) =>
                    setRoom((prev) => ({ ...prev!, State: Number(e) }))
                  }>
                  <SelectTrigger className=''>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className='bg-white dark:bg-black dark:text-white'>
                    <SelectGroup>
                      <SelectItem value='0'>{EMPTY}</SelectItem>
                      <SelectItem value='1'>{NOT_EMPTY}</SelectItem>
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
                  value={room.Discount}
                  onChange={(e) =>
                    setRoom((prev) => ({
                      ...prev!,
                      Discount: e.target.valueAsNumber,
                    }))
                  }
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
                  value={room.Gift}
                  onChange={(e) =>
                    setRoom((prev) => ({ ...prev!, Gift: e.target.value }))
                  }
                />
              </div>
              <div className='flex items-center space-x-2 col-span-4'>
                <Checkbox
                  id='wifi'
                  defaultChecked={room.Wifi === 1 ? true : false}
                  onCheckedChange={(e) =>
                    setRoom((prev) => ({ ...prev!, Wifi: e ? 1 : 0 }))
                  }
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
                  defaultChecked={room.Breakfast === 1 ? true : false}
                  onCheckedChange={(e) =>
                    setRoom((prev) => ({ ...prev!, Breakfast: e ? 1 : 0 }))
                  }
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
                  defaultChecked={room.NoSmoking === 1 ? true : false}
                  onCheckedChange={(e) =>
                    setRoom((prev) => ({ ...prev!, NoSmoking: e ? 1 : 0 }))
                  }
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
                  defaultChecked={room.Cancel === 1 ? true : false}
                  onCheckedChange={(e) =>
                    setRoom((prev) => ({ ...prev!, Cancel: e ? 1 : 0 }))
                  }
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
                  defaultChecked={
                    room.Hinh_Thuc_Thanh_Toan === 1 ? true : false
                  }
                  onCheckedChange={(e) =>
                    setRoom((prev) => ({
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
                  defaultChecked={
                    room.Bao_Gom_Thue_Va_Phi === 1 ? true : false
                  }
                  onCheckedChange={(e) =>
                    setRoom((prev) => ({
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
    </Fragment>
  )
}

export default FormEditRoom