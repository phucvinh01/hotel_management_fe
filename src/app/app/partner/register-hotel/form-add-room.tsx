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
import { Dispatch, SetStateAction, useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { Checkbox } from '@/components/ui/checkbox';
import { PlusCircle, XCircleIcon } from 'lucide-react';

type RoomCardProps = {
  index: number;
  removeRoom: (indexToRemove: number) => void;
  dataRender: TypeRoom[] | undefined;
  dataRooms: Room[] | undefined;
  setDataRooms: Dispatch<SetStateAction<Room[]>>;
};

const RoomCard = ({
  index,
  removeRoom,
  dataRender,
  dataRooms,
  setDataRooms,
}: RoomCardProps) => {
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
          <Button
            className='space-x-2 bg-cyan-500 text-white'
            onClick={() => removeRoom(index)}>
            <XCircleIcon />
          </Button>
        </div>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='flex flex-row gap-4 items-center'>
          <div className='space-y-1'>
            <Label htmlFor='room-name'>Tên phòng</Label>
            <Input
              value={dataRooms && dataRooms[index]?.RoomName}
              onChange={(e) =>
                setDataRooms((prev) => {
                  const updatedFormData = [...(prev ?? [])];
                  updatedFormData[index] = {
                    ...updatedFormData[index],
                    RoomName: e.target.value,
                  };
                  return updatedFormData;
                })
              }
              type='text'
              id='room-name'
            />
          </div>
          <div className='space-y-1'>
            <Label htmlFor='room-typeroom'>Loại phòng</Label>
            <Select
              name='room-typeroom'
              value={dataRooms && dataRooms[index]?.TypeRoomId}
              onValueChange={(e) =>
                setDataRooms((prev) => {
                  const updatedFormData = [...(prev ?? [])];
                  updatedFormData[index] = {
                    ...updatedFormData[index],
                    TypeRoomId: e,
                  };
                  return updatedFormData;
                })
              }>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Chọn loại phòng' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {dataRender?.map((item, index) => {
                    return (
                      <SelectItem
                        value={item.Name}
                        key={index}>
                        {item.Name}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className='space-y-1'>
            <Label htmlFor='room-quanity'>Số lượng phòng </Label>
            <Input
              value={dataRooms && dataRooms[index]?.quannity}
              onChange={(e) =>
                setDataRooms((prev) => {
                  const updatedFormData = [...(prev ?? [])];
                  updatedFormData[index] = {
                    ...updatedFormData[index],
                    quannity: e.target.valueAsNumber,
                  };
                  return updatedFormData;
                })
              }
              min={1}
              type='number'
              id='room-quanity'
            />
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='breakfast'
              defaultChecked={
                dataRooms && dataRooms[index]?.Breakfast === 1 && true
              }
              value={dataRooms && dataRooms[index]?.Breakfast}
              onCheckedChange={(e) =>
                setDataRooms((prev) => {
                  const updatedFormData = [...(prev ?? [])];
                  updatedFormData[index] = {
                    ...updatedFormData[index],
                    Breakfast: e ? 1 : 0,
                  };
                  return updatedFormData;
                })
              }
            />
            <label
              htmlFor='breakfast'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Bao gồm ăn sáng?
            </label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='room-wifi'
              defaultChecked={dataRooms && dataRooms[index]?.Wifi === 1 && true}
              value={dataRooms && dataRooms[index]?.Wifi}
              onCheckedChange={(e) =>
                setDataRooms((prev) => {
                  const updatedFormData = [...(prev ?? [])];
                  updatedFormData[index] = {
                    ...updatedFormData[index],
                    Wifi: e ? 1 : 0,
                  };
                  return updatedFormData;
                })
              }
            />
            <label
              htmlFor='room-wifi'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Wifi
            </label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='room-morking'
              defaultChecked={
                dataRooms && dataRooms[index]?.NoSmoking === 1 && true
              }
              value={dataRooms && dataRooms[index]?.NoSmoking}
              onCheckedChange={(e) =>
                setDataRooms((prev) => {
                  const updatedFormData = [...(prev ?? [])];
                  updatedFormData[index] = {
                    ...updatedFormData[index],
                    NoSmoking: e ? 1 : 0,
                  };
                  return updatedFormData;
                })
              }
            />
            <label
              htmlFor='room-morking'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Được hút thuốc
            </label>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='room-cancel'
              defaultChecked={
                dataRooms && dataRooms[index]?.Cancel === 1 && true
              }
              value={dataRooms && dataRooms[index]?.Cancel}
              onCheckedChange={(e) =>
                setDataRooms((prev) => {
                  const updatedFormData = [...(prev ?? [])];
                  updatedFormData[index] = {
                    ...updatedFormData[index],
                    Cancel: e ? 1 : 0,
                  };
                  return updatedFormData;
                })
              }
            />
            <label
              htmlFor='room-cancel'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Cho phép hủy
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

type IFormAddNewRoomProps = {
  dataRender: TypeRoom[] | undefined;
  dataRooms: Room[] | undefined;
  setDataRooms: Dispatch<SetStateAction<Room[]>>;
};

const FormAddNewRoom = ({
  dataRender,
  dataRooms,
  setDataRooms,
}: IFormAddNewRoomProps) => {
  const removeRoom = (indexToRemove: number) => {
    setRooms((prevRooms) =>
      prevRooms.filter((_, index) => index !== indexToRemove)
    );
    setDataRooms((prev) => {
      const updatedFormData = prev
        ? prev.filter((_, i) => i !== indexToRemove)
        : [];
      return updatedFormData;
    });
  };
  const [rooms, setRooms] = useState<React.ReactNode[]>([
    <RoomCard
      key={Math.random()}
      index={0}
      removeRoom={removeRoom}
      dataRender={dataRender && dataRender}
      dataRooms={dataRooms}
      setDataRooms={setDataRooms}
    />,
  ]);

  const addRoom = () => {
    setRooms((prevRooms) => [
      ...prevRooms,
      <RoomCard
        key={Math.random()}
        index={prevRooms.length}
        removeRoom={removeRoom}
        dataRender={dataRender && dataRender}
        dataRooms={dataRooms}
        setDataRooms={setDataRooms}
      />,
    ]);
  };
  console.log(dataRender);

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
