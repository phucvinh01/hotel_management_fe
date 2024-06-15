'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { INeighborhoob } from '@/service/_neighborhook.service';
import { PlusCircle, X } from 'lucide-react';
import React, { Dispatch, SetStateAction, useState } from 'react';

type FromInsertNeiborhoodProp = {
  neighborhood: INeighborhoob[];
  setNeiborhood: Dispatch<SetStateAction<INeighborhoob[]>>;
};

const category = [
  {
    id: 1,
    name: 'Mua sắm & quà lưu niệm',
  },
  {
    id: 2,
    name: 'Nhà hàng',
  },
  {
    id: 3,
    name: 'Khu vui chơi',
  },
  {
    id: 4,
    name: 'Điểm nút giao thông',
  },
  {
    id: 5,
    name: 'Giáo dục',
  },
  {
    id: 6,
    name: 'Công viên sở thú',
  },
  {
    id: 7,
    name: 'Khác',
  },
];

const FromInsertNeiborhood = ({
  neighborhood,
  setNeiborhood,
}: FromInsertNeiborhoodProp) => {
  const [newNeighborhood, setNewNeighborhood] = useState<INeighborhoob>({
    id_hotel: '',
    name: '',
    category: '',
    is_popular: '',
    icon: '',
    distance: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof INeighborhoob,
  ) => {
    setNewNeighborhood({ ...newNeighborhood, [field]: e.target.value });
  };

  const handleAddNeighborhood = () => {
    setNeiborhood([...neighborhood, newNeighborhood]);
    setNewNeighborhood({
      id_hotel: '',
      name: '',
      category: '',
      is_popular: '',
      icon: '',
      distance: '',
    });
  };

  const handleRemoveNeighborhood = (index: number) => {
    const updatedNeighborhood = neighborhood.filter((_, i) => i !== index);
    setNeiborhood(updatedNeighborhood);
  };

  return (
    <div className='flex flex-col gap-4 w-full'>
      {neighborhood.map((place, index) => (
        <div
          key={index}
          className='flex flex-row items-center gap-2'>
          <Input
            type='text'
            value={place.name}
            readOnly
            className='border p-2'
          />
          <Input
            type='text'
            value={place.category}
            readOnly
            className='border p-2'
          />
          <Input
            type='text'
            value={place.distance}
            readOnly
            className='border p-2'
          />
           <Checkbox
            id='is_popular'
            value={newNeighborhood.is_popular}
             defaultChecked = {newNeighborhood.is_popular === "1" && true}
            ></Checkbox>
          <Button
            onClick={() => handleRemoveNeighborhood(index)}
            className='bg-red-500 text-white p-2'>
            <X />
          </Button>
        </div>
      ))}
      <div className='grid grid-cols-12 gap-2 items-center'>
        <div className='col-span-3'>
          <Label htmlFor='name'>Tên địa điểm</Label>
          <Input
            required
            value={newNeighborhood.name}
            onChange={(e) => handleInputChange(e, 'name')}
            id='name'
            type='text'
          />
        </div>
        <div className='col-span-3'>
          <Label htmlFor='city'>Thể loại</Label>
          <Select
            name='city'
            onValueChange={(e) =>
              setNewNeighborhood({ ...newNeighborhood, category: e })
            }>
            <SelectTrigger >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Thể loại</SelectLabel>
                {category.map((item: any, index: number) => {
                  return (
                    <SelectItem
                      key={index}
                      value={item.name}>
                      {item.name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='col-span-2'>
          <Label htmlFor='name'>Khoảng cách</Label>
          <Input
            required
            type='text'
            placeholder='Distance'
            value={newNeighborhood.distance}
            onChange={(e) => handleInputChange(e, 'distance')}
            className='border p-2'
          />
        </div>
        <div className='col-span-2'>
            <Label
            htmlFor='is_popular'
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
            Có nỗi tiếng
          </Label>
          <Checkbox
            id='is_popular'
            value={newNeighborhood.is_popular}
            onCheckedChange={(e) =>
              setNewNeighborhood({
                ...newNeighborhood,
                is_popular: e ? "1" : "0"
              })
            }
          />
          
        </div>
        <Button
          onClick={handleAddNeighborhood}
          className=' col-span-2 mt-4'>
          <PlusCircle />
        </Button>
      </div>
    </div>
  );
};

export default FromInsertNeiborhood;
