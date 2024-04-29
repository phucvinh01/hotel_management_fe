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
import Uploader from './upload-image';
const FormTypeRoom = () => {
  const [selected, setSelected] = useState([]);
  const options = [
    { label: 'Grapes 🍇', value: 'grapes' },
    { label: 'Mango 🥭', value: 'mango' },
    { label: 'Strawberry 🍓', value: 'strawberry', disabled: true },
  ];

  const RoomTypeCard = ({ index, removeRoomType }:{index:number, removeRoomType: (indexToRemove: number) => void}) => {
    return (
      <Card>
        <CardHeader className='flex flex-row justify-between items-center'>
          <div className='space-y-2'>
            <CardTitle>Các loại phòng của khách sạn</CardTitle>
            <CardDescription>
              Khách sạn bạn gồm những loại phòng nào
            </CardDescription>
          </div>
          <div className='flex justify-end items-end'>
          <Button className='space-x-2 bg-cyan-500 text-white' onClick={() => removeRoomType(index)}>
            <XCircleIcon />
          </Button>
        </div>
        </CardHeader>
        <CardContent className='space-y-2'>
          <div className='grid grid-cols-2 gap-3'>
            <div className='grid grid-cols-2 gap-3'>
              <div className='space-y-1'>
                <Label htmlFor='typeroom-name'>Tên loại phòng</Label>
                <Input
                  type='text'
                  id='typeroom-name'
                />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='typeroom-floor'>Số sảnh</Label>
                <Input
                  type='number'
                  min={1}
                  id='typeroom-floor'
                />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='typeroom-max-person'>Số người tối đa</Label>
                <Input
                  type='number'
                  min={1}
                  id='typeroom-max-person'
                />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='typeroom-price'>Giá của loại phòng này</Label>
                <Input
                  type='text'
                  id='typeroom-price'
                />
              </div>
            </div>

            <Uploader />
          </div>

          <div className='flex flex-row gap-3 items-center'>
            <div>
              <Label htmlFor='typeroom-bed'>Giường</Label>
              <Select name='typeroom-bed'>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Chọn loại giường' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value='single'>Đơn</SelectItem>
                    <SelectItem value='couple'>Đôi</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className='space-y-1'>
              <Label htmlFor='typeroom-beb-quanity'>Số lượng</Label>
              <Input
                type='number'
                min={1}
                id='typeroom-beb-quanity'
              />
            </div>
          </div>
          <div className='grid grid-cols-2 gap-3'>
            <div className='space-y-1'>
              <Label htmlFor='typeroom-price'>
                Loại phòng này có những tiện nghi gì?
              </Label>
              <MultiSelect
                options={options}
                value={selected}
                onChange={setSelected}
                labelledBy='Select'
              />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='typeroom-price'>
                Phòng tắm của loại phòng này có những tiện nghi gì?
              </Label>
              <MultiSelect
                options={options}
                value={selected}
                onChange={setSelected}
                labelledBy='Select'
              />
            </div>
          </div>
          <div className='flex flex-row gap-4 py-4'>
            <Label htmlFor='typeroom-price'>Những tiện nghi khác như:</Label>
            <div className='grid grid-cols-5 gap-5'>
              <div className='flex items-center space-x-2'>
                <Checkbox id='shower' />
                <label
                  htmlFor='shower'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                  Vòi tắm đứng
                </label>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox id='bacon' />
                <label
                  htmlFor='bacon'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                  Ban công
                </label>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox id='wating' />
                <label
                  htmlFor='wating'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                  Khu vực chờ
                </label>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox id='air-conditioner' />
                <label
                  htmlFor='air-conditioner'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                  Máy lạnh
                </label>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox id='fridge' />
                <label
                  htmlFor='fridge'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                  Tủ lạnh
                </label>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox id='microway' />
                <label
                  htmlFor='microway'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                  Lò vi sóng
                </label>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox id='fridge' />
                <label
                  htmlFor='fridge'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                  Tủ lạnh
                </label>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox id='wash-machine' />
                <label
                  htmlFor='wash-machine'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                  Máy giặt
                </label>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox id='isMorking' />
                <label
                  htmlFor='isMorking'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                  Được hút thuốc
                </label>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox id='bathtub' />
                <label
                  htmlFor='bathtub'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                  Bồn tắm
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
   const removeRoomType = (indexToRemove: number) => {
    setRoomTypes(prevRoomTypes => prevRoomTypes.filter((_, index) => index !== indexToRemove));
  };

  const [roomTypes, setRoomTypes] = useState<React.ReactNode[]>([
    <RoomTypeCard key={Math.random()}  index={0} removeRoomType={removeRoomType} />,
  ]);

    const addRoomType = () => {
    setRoomTypes(prevRoomTypes => [...prevRoomTypes, <RoomTypeCard key={Math.random()} index={prevRoomTypes.length} removeRoomType={removeRoomType} />]);
  };


  return (
    <>
      <div className='flex justify-end items-end'>
        <Button
          onClick={addRoomType}
          className='space-x-2 bg-cyan-500 text-white'>
          <PlusCircle /> <span>Thêm loại phòng</span>
        </Button>
      </div>
      {roomTypes.map((roomType, index) => (
        <div key={index}>{roomType}</div>
      ))}
    </>
  );
};

export default FormTypeRoom;
