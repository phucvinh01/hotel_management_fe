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
import { FormEvent, useEffect, useState } from 'react';
import { Loader, PlusCircleIcon, PlusIcon, Wifi, XIcon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuthContext';
import { useCreateTypeRoom } from '@/service/query';
import { toast } from '@/components/ui/use-toast';

export function ModalAddTypeRoom() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<ITypeRoom>();

  const { admin } = useAuth();
  const createTypeRoomMutation = useCreateTypeRoom();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const amenities = {
      room: {
        waitingRoom: formData?.Khu_Vuc_Cho === 1 ? 'Khu Vực Chờ' : '',
        balcony: formData?.Ban_Cong_San_Hien === 1 ? 'Ban công' : '',
        airConditioner: formData?.May_Lanh === 1 ? 'Máy Lạnh' : '',
        microwave: formData?.Lo_Vi_Song === 1 ? 'Lò vi sóng' : '',
        refrigerator: formData?.Tu_Lanh === 1 ? 'Tủ lạnh' : '',
        washingMachine: formData?.May_Giat === 1 ? 'Máy giặt' : '',
      },
      bathroom: {
        shower: formData?.Voi_Tam_Dung === 1 ? 'Vòi tắm đứng' : '',
        bathtub: formData?.Bon_Tam === 1 ? 'Bồn tắm' : '',
      },
    };

    if (formData) {
      formData.ConvenientRoom = Object.values(amenities.room).join('; ');
      formData.ConvenientBathRoom = Object.values(amenities.bathroom).join(
        '; '
      );
      formData.HotelId = admin?.id_hotel;
    } else {
      console.warn('formData is undefined. Amenities cannot be assigned.');
    }

    console.log(formData);
    createTypeRoomMutation.mutate(formData as ITypeRoom);
    if (createTypeRoomMutation.isPending) {
      toast({
        title: 'Đang khợi tạo',
      });
    } else if (createTypeRoomMutation.isError) {
      toast({
        title: 'Tạo mới thất bại',
      });
      setIsOpen(true);
    } else {
      toast({
        title: 'Tạo mới thành công',
      });
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button
          className='bg-cyan-500 dark:bg-cyan-700'
          onClick={() => setIsOpen(true)}>
          <PlusCircleIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[825px] bg-white dark:bg-black text-black dark:text-white'>
        <DialogHeader className=''>
          <DialogTitle>Thêm loại phòng </DialogTitle>
        </DialogHeader>
        <form
          className='grid gap-2 py-2 grid-cols-12 border-t'
          onSubmit={(e) => handleSubmit(e)}>
          <h3 className='col-span-12 text-[18px] underline my-2'>Thông tin</h3>
          <div className='flex space-y-2 flex-col col-span-6'>
            <Label
              htmlFor='name'
              className='text-start'>
              Tên Loại Phòng
            </Label>
            <Input
              required
              id='name'
              onChange={(e) =>
                setFormData((prev) => ({ ...prev!, Name: e.target.value }))
              }
            />
          </div>
          <div className='flex space-y-2 flex-col col-span-6'>
            <Label
              htmlFor='floor'
              className='text-start'>
              Số sảnh
            </Label>
            <Input
              min={1}
              maxLength={4}
              id='floor'
              type='number'
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev!,
                  FloorArea: e.target.valueAsNumber,
                }))
              }
            />
          </div>
          <div className='flex space-y-2 flex-col col-span-6'>
            <Label
              htmlFor='people'
              className='text-start'>
              Số người tối đa
            </Label>
            <Input
              min={1}
              maxLength={4}
              id='people'
              type='number'
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev!,
                  MaxQuantityMember: e.target.valueAsNumber,
                }))
              }
            />
          </div>
          <div className='flex space-y-2 flex-col col-span-6'>
            <Label
              htmlFor='Price'
              className='text-start'>
              Giá
            </Label>
            <Input
              min={0}
              maxLength={8}
              id='Price'
              type='number'
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev!,
                  Price: e.target.valueAsNumber,
                }))
              }
            />
          </div>
          <h3 className='col-span-12 text-[18px] underline my-3'>Tiện nghi</h3>
          <div className='flex space-y-2 flex-col col-span-6'>
            <Label
              htmlFor='typebed'
              className='text-start'>
              Giường
            </Label>
            <Select
              name='typebed'
              required
              onValueChange={(e) =>
                setFormData((prev) => ({ ...prev!, TenLoaiGiuong: e }))
              }>
              <SelectTrigger className=''>
                <SelectValue placeholder='Chọn loại giường' />
              </SelectTrigger>
              <SelectContent className='bg-white text-black dark:bg-black dark:text-white'>
                <SelectGroup>
                  <SelectItem value={'Single'}>Single</SelectItem>
                  <SelectItem value={'Double'}>Double</SelectItem>
                  <SelectItem value={'Queen'}>Queen</SelectItem>
                  <SelectItem value={'King'}>King</SelectItem>
                  <SelectItem value={'Superking'}>Super king</SelectItem>
                  <SelectItem value={'Murphy'}>Murphy</SelectItem>
                  <SelectItem value={'Bunk'}>Bunk</SelectItem>
                  <SelectItem value={'Round'}>Round</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className='flex space-y-2 flex-col col-span-6'>
            <Label
              htmlFor='bed-quantity'
              className='text-start'>
              Số lượng giường
            </Label>
            <Input
              min={0}
              maxLength={8}
              id='bed-quantity'
              type='number'
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev!,
                  SoLuongGiuong: e.target.valueAsNumber,
                }))
              }
            />
          </div>

          <h3 className='col-span-12 text-[18px] underline my-2'>Tiện ích</h3>

          <div className='grid grid-cols-12 col-span-12 px-3'>
            <h4 className='col-span-12 my-3'>Phòng</h4>
            <div className='flex items-center space-x-2 col-span-4'>
              <Checkbox
                id='bacon'
                onCheckedChange={(e) =>
                  setFormData((prev) => ({
                    ...prev!,
                    Ban_Cong_San_Hien: e ? 1 : 0,
                  }))
                }
              />
              <label
                htmlFor='bacon'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                Ban công
              </label>
            </div>
            <div className='flex items-center space-x-2 col-span-4'>
              <Checkbox
                id='wating-room'
                onCheckedChange={(e) =>
                  setFormData((prev) => ({ ...prev!, Khu_Vuc_Cho: e ? 1 : 0 }))
                }
              />
              <label
                htmlFor='wating-room'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                Khu vực chờ
              </label>
            </div>
          </div>

          <div className='grid grid-cols-12 col-span-12 px-3'>
            <h4 className='col-span-12 my-3'>Phòng tắm</h4>
            <div className='flex items-center space-x-2 col-span-4'>
              <Checkbox
                id='shower'
                onCheckedChange={(e) =>
                  setFormData((prev) => ({ ...prev!, Voi_Tam_Dung: e ? 1 : 0 }))
                }
              />
              <label
                htmlFor='shower'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                Vòi tắm đứng
              </label>
            </div>
            <div className='flex items-center space-x-2 col-span-4'>
              <Checkbox
                id='bath'
                onCheckedChange={(e) =>
                  setFormData((prev) => ({ ...prev!, Bon_Tam: e ? 1 : 0 }))
                }
              />
              <label
                htmlFor='bath'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                Bồn tắm
              </label>
            </div>
            <div className='flex items-center space-x-2 col-span-4'>
              <Checkbox
                id='hotwater'
                onCheckedChange={(e) =>
                  setFormData((prev) => ({ ...prev!, Nuoc_Nong: e ? 1 : 0 }))
                }
              />
              <label
                htmlFor='hotwater'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                Nước nóng
              </label>
            </div>
          </div>

          <div className='grid grid-cols-12 gap-2 col-span-12 px-3'>
            <h4 className='col-span-12 my-3'>Khác</h4>
            <div className='flex items-center space-x-2 col-span-4'>
              <Checkbox
                id='air-machine'
                onCheckedChange={(e) =>
                  setFormData((prev) => ({ ...prev!, May_Lanh: e ? 1 : 0 }))
                }
              />
              <label
                htmlFor='air-machine'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                Máy lạnh
              </label>
            </div>
            <div className='flex items-center space-x-2 col-span-4'>
              <Checkbox
                id='bath'
                onCheckedChange={(e) =>
                  setFormData((prev) => ({ ...prev!, Bon_Tam: e ? 1 : 0 }))
                }
              />
              <label
                htmlFor='bath'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                Bồn tắm
              </label>
            </div>
            <div className='flex items-center space-x-2 col-span-4'>
              <Checkbox
                id='microway'
                onCheckedChange={(e) =>
                  setFormData((prev) => ({ ...prev!, Lo_Vi_Song: e ? 1 : 0 }))
                }
              />
              <label
                htmlFor='microway'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                Lò vi sóng
              </label>
            </div>
            <div className='flex items-center space-x-2 col-span-4'>
              <Checkbox
                id='watsing-machine'
                onCheckedChange={(e) =>
                  setFormData((prev) => ({ ...prev!, May_Giat: e ? 1 : 0 }))
                }
              />
              <label
                htmlFor='cancel'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                Máy giặt
              </label>
            </div>
            <div className='flex items-center space-x-2 col-span-4'>
              <Checkbox
                id='frige'
                onCheckedChange={(e) =>
                  setFormData((prev) => ({ ...prev!, Tu_Lanh: e ? 1 : 0 }))
                }
              />
              <label
                htmlFor='frige'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                Tủ lạnh
              </label>
            </div>
            <div className='flex items-center space-x-2 col-span-4'>
              <Checkbox
                id='fax'
                onCheckedChange={(e) =>
                  setFormData((prev) => ({ ...prev!, No_Moking: e ? 1 : 0 }))
                }
              />
              <label
                htmlFor='fax'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                Được hút thuốc
              </label>
            </div>
          </div>

          <DialogFooter className='col-span-12 mt-2'>
            <Button
              className='bg-black text-white dark:border-white hover:text-black space-x-2 dark:border'
              onClick={() => setIsOpen(false)}>
              <XIcon /> Hủy
            </Button>
            <Button
              className='bg-cyan-500 dark:bg-cyan-900 space-x-2'
              type='submit'>
              {createTypeRoomMutation.isPending ? (
                <Loader />
              ) : (
                <>
                  <PlusIcon /> Thêm
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
