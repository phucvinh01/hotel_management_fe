import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TabsContent } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SetStateAction, useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { Checkbox } from '@/components/ui/checkbox';
import { PlusCircle, XCircleIcon } from 'lucide-react';

const RoomCard = ({ index, removeRoom }:{index:number, removeRoom :(indexToRemove: number) => void}) => {
  return (
    <Card>
      <CardHeader className='flex flex-row justify-between items-center'>
        <div className='space-y-1'>
          <CardTitle>Thêm phòng vào khách sạn của bạn</CardTitle>
          <CardDescription>
            Thêm một ít phòng vào để hoàn thành việc đăng ký nào
          </CardDescription>
        </div>
        <div className='flex justify-end items-end'>
          <Button className='space-x-2 bg-cyan-500 text-white' onClick={() => removeRoom(index)}>
            <PlusCircle /> 
          </Button>
        </div>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='flex flex-row gap-4 items-center'>
          <div className='space-y-1'>
            <Label htmlFor='room-name'>Tên phòng</Label>
            <Input type='text' id='room-name' />
          </div>
          <div className='space-y-1'>
            <Label htmlFor='room-typeroom'>Loại phòng</Label>
            <Select name='room-typeroom'>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Chọn loại phòng' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='A'>A</SelectItem>
                  <SelectItem value='B'>B</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className='space-y-1'>
            <Label htmlFor='room-quanity'>Số lượng phòng </Label>
            <Input min={1} type='number' id='room-quanity' />
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox id='breakfast' />
            <label htmlFor='breakfast' className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Bao gồm ăn sáng?
            </label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox id='room-wifi' />
            <label htmlFor='room-wifi' className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Wifi
            </label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox id='room-morking' />
            <label htmlFor='room-morking' className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Được hút thuốc
            </label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox id='room-cancel' />
            <label htmlFor='room-cancel' className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Cho phép hủy
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const FormAddNewRoom = () => {
    const removeRoom = (indexToRemove: number) => {
    setRooms(prevRooms => prevRooms.filter((_, index) => index !== indexToRemove));
  };
  const [rooms, setRooms] = useState<React.ReactNode[]>([
    <RoomCard key={Math.random()}  index={0} removeRoom={removeRoom} />,
  ])

  const addRoom = () => {
    setRooms(prevRooms => [...prevRooms, <RoomCard key={Math.random()} index={prevRooms.length} removeRoom={removeRoom} />]);
  };

  

  return (
    <>
      <div className='flex justify-end items-end'>
        <Button
          onClick={addRoom}
          className='space-x-2 bg-cyan-500 text-white'>
          <PlusCircle /> <span>Thêm phòng</span>
        </Button>
      </div>

      {rooms.map((room, index) => (
        <div key={index}>{room}</div>
      ))}
    </>
  );
};

export default FormAddNewRoom;
