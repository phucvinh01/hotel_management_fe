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
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEvent, useEffect, useState } from 'react';
import { Edit2, EyeIcon, MoveLeft, Settings, XCircleIcon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuthContext';
import Badge from '@/components/shared/Badge';
import {
  useGetTypeRooms,
  useUpdateRoom,
  useUpdateTypeRoom,
} from '@/service/query';
import { toast } from '@/components/ui/use-toast';
import { formatCurrency } from '@/lib/formatCurrency';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { getImageTypeRoom } from '@/service/hotel.service';
import { Item } from '@radix-ui/react-dropdown-menu';
import { getValueAfterSemicolon } from '@/lib/getValueAfterSemicolon';
import ImageUploader from '@/app/app/partner/register-hotel/upload-image';
import CarouselImageTypeRoom from './casousel-image-typeroom';

export const ModelViewTypeRoom = ({ data }: { data: any }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<SelectTypeRoom>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [imageTypeRoom, setImageTypeRoom] = useState<IHotelImage[]>([]);
  const { admin } = useAuth();

  const updateTypeRoomMutation = useUpdateTypeRoom();
  let typedData: SelectRoomsResult[] = [];

  const { data: dataTyperooms, isLoading } = useGetTypeRooms(
    admin?.id_hotel as string,
  );

  if (!isLoading && dataTyperooms) {
    typedData = dataTyperooms[0] as SelectRoomsResult[];
  }

  const getImagesTypeRoom = async (id: string) => {
    const res = await getImageTypeRoom(id);
    if (res) {
      setImageTypeRoom(res);
    } else {
      setImageTypeRoom([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setFormData(data as SelectTypeRoom);
      getImagesTypeRoom(formData?.id as string);
    }
  }, [isOpen, data, formData?.id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    const amenities = {
      room: {
        waitingRoom: formData?.Khu_Vuc_Cho === '1' ? 'Khu Vực Chờ' : null,
        balcony: formData?.Ban_Cong_San_Hien === '1' ? 'Ban công' : null,
        airConditioner: formData?.May_Lanh === '1' ? 'Máy Lạnh' : null,
        microwave: formData?.Lo_Vi_Song === '1' ? 'Lò vi sóng' : null,
        refrigerator: formData?.Tu_Lanh === '1' ? 'Tủ lạnh' : null,
        washingMachine: formData?.May_Giat === '1' ? 'Máy giặt' : null,
      },
      bathroom: {
        shower: formData?.Voi_Tam_Dung === '1' ? 'Vòi tắm đứng' : null,
        bathtub: formData?.Bon_Tam === '1' ? 'Bồn tắm' : null,
      },
    };

    if (formData) {
      const convenientRoomValues = Object.values(amenities.room).filter(
        (value) => value !== null,
      );
      formData.ConvenientRoom = convenientRoomValues.join('; ');

      const convenientBathroomValues = Object.values(amenities.bathroom).filter(
        (value) => value !== null,
      );
      formData.ConvenientBathRoom = convenientBathroomValues.join('; ');
    } else {
      console.warn('formData is undefined. Amenities cannot be assigned.');
    }

    try {
      const result = await updateTypeRoomMutation.mutateAsync(
        formData as SelectTypeRoom,
      );
      console.log(result);
      if (result === true) {
        toast({
          title: 'Cập nhật thành công',
        });
        setIsOpen(false);
        setIsEdit(false);
      } else {
        toast({
          variant: 'destructive',
          title: 'Cập nhật thất bại',
        });
        setIsOpen(true);
      }
    } catch (error) {
      toast({
        title: error as string,
      });
      setIsOpen(true);
    }
  };

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
        <form onSubmit={(e) => handleSubmit(e)}>
          <DialogHeader className='flex flex-row justify-between items-center mb-3'>
            <DialogTitle>
              {isEdit === true
                ? `Chỉnh sửa thông tin loại phòng ${formData?.Name}`
                : `Thông tin loại phòng ${formData?.Name}`}
            </DialogTitle>
            {isEdit === true ? (
              <MoveLeft onClick={() => setIsEdit(false)} />
            ) : (
              <Settings onClick={() => setIsEdit(true)} />
            )}
          </DialogHeader>
          {isEdit !== true ? (
            <div className='grid gird-col-12 p-4 border-t'>
              <div className='col-span-12 flex justify-end items-center'>
                <Badge
                  name={formData?.state_room + '/' + formData?.total_rooms}
                  color={'green'}
                />
              </div>
              <div className='mt-4 col-span-6 space-y-3'>
                <h3 className=' text-lg font-bold'>Thông tin loại phòng</h3>
                <dl className='grid grid-cols-2 gap-4'>
                  <dt className='text-gray-600'>Loại:</dt>
                  <dd className='font-bold text-[14px]'>{formData?.Name}</dd>
                  <dt className='text-gray-600'>Số sảnh:</dt>
                  <dd className='font-bold text-[14px]'>
                    {formData?.FloorArea}
                  </dd>
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
                  <dt className='text-gray-600 col-span-3  text-[16px]'>
                    Phòng:
                  </dt>
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
                  {imageTypeRoom.map((item, index) => (
                    <Card
                      key={index}
                      className='border-none p-0 space-y-2 col-span-2 flex flex-col'>
                      <div className='relative justify-center items-center'>
                        <Image
                          className='rounded-2xl object-contain min-w-[80px] min-h-[80px]'
                          src={item.FileName}
                          alt={`http://localhost:8000/images/$imageUrl`}
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
          ) : (
            <div className='grid grid-cols-12 gap-10'>
              <div className='col-span-6 grid grid-cols-12 gap-2'>
                <h3 className=' col-span-12 text-[18px] underline my-2 font-bold'>
                  Thông tin
                </h3>

                <div className='flex space-y-2 flex-col col-span-6'>
                  <Label
                    htmlFor='name'
                    className='text-start'>
                    Tên Loại Phòng
                  </Label>
                  <Input
                    value={formData?.Name}
                    required
                    id='name'
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev!,
                        Name: e.target.value,
                      }))
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
                    value={formData?.FloorArea}
                    min={1}
                    maxLength={4}
                    id='floor'
                    type='number'
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev!,
                        FloorArea: e.target.value,
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
                    value={formData?.MaxQuantityMember}
                    min={1}
                    maxLength={4}
                    id='people'
                    type='number'
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev!,
                        MaxQuantityMember: e.target.value,
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
                    value={formData?.Price}
                    min={0}
                    maxLength={8}
                    id='Price'
                    type='number'
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev!,
                        Price: e.target.value,
                      }))
                    }
                  />
                </div>
                <h3 className=' col-span-12 text-[18px] underline my-3 font-bold'>
                  Tiện nghi
                </h3>
                <div className='flex space-y-2 flex-col col-span-6'>
                  <Label
                    htmlFor='typebed'
                    className='text-start'>
                    Giường
                  </Label>
                  <Select
                    defaultValue={formData?.TenLoaiGiuong}
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
                    value={formData?.SoLuongGiuong}
                    min={0}
                    maxLength={8}
                    id='bed-quantity'
                    type='number'
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev!,
                        SoLuongGiuong: e.target.value,
                      }))
                    }
                  />
                </div>

                <h3 className=' col-span-12 text-[18px] underline my-2 font-bold'>
                  Tiện ích
                </h3>

                <div className='grid grid-cols-12 col-span-12 px-3'>
                  <h4 className='col-span-12 my-3 font-bold'>Phòng</h4>
                  <div className='flex items-center space-x-2 col-span-4'>
                    <Checkbox
                      defaultChecked={
                        formData?.Ban_Cong_San_Hien === '1' ? true : false
                      }
                      id='bacon'
                      onCheckedChange={(e) =>
                        setFormData((prev) => ({
                          ...prev!,
                          Ban_Cong_San_Hien: e ? '1' : '0',
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
                      defaultChecked={
                        formData?.Khu_Vuc_Cho === '1' ? true : false
                      }
                      id='wating-room'
                      onCheckedChange={(e) =>
                        setFormData((prev) => ({
                          ...prev!,
                          Khu_Vuc_Cho: e ? '1' : '0',
                        }))
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
                  <h4 className='col-span-12 my-3 font-bold'>Phòng tắm</h4>
                  <div className='flex items-center space-x-2 col-span-4'>
                    <Checkbox
                      defaultChecked={
                        formData?.Voi_Tam_Dung === '1' ? true : false
                      }
                      id='shower'
                      onCheckedChange={(e) =>
                        setFormData((prev) => ({
                          ...prev!,
                          Voi_Tam_Dung: e ? '1' : '0',
                        }))
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
                      defaultChecked={formData?.Bon_Tam === '1' ? true : false}
                      id='bath'
                      onCheckedChange={(e) =>
                        setFormData((prev) => ({
                          ...prev!,
                          Bon_Tam: e ? '1' : '0',
                        }))
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
                      defaultChecked={
                        formData?.Nuoc_Nong === '1' ? true : false
                      }
                      id='hotwater'
                      onCheckedChange={(e) =>
                        setFormData((prev) => ({
                          ...prev!,
                          Nuoc_Nong: e ? '1' : '0',
                        }))
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
                      defaultChecked={formData?.May_Lanh === '1' ? true : false}
                      id='air-machine'
                      onCheckedChange={(e) =>
                        setFormData((prev) => ({
                          ...prev!,
                          May_Lanh: e ? '1' : '0',
                        }))
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
                      defaultChecked={
                        formData?.Lo_Vi_Song === '1' ? true : false
                      }
                      id='microway'
                      onCheckedChange={(e) =>
                        setFormData((prev) => ({
                          ...prev!,
                          Lo_Vi_Song: e ? '1' : '0',
                        }))
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
                      defaultChecked={formData?.May_Giat === '1' ? true : false}
                      id='watsing-machine'
                      onCheckedChange={(e) =>
                        setFormData((prev) => ({
                          ...prev!,
                          May_Giat: e ? '1' : '0',
                        }))
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
                      defaultChecked={formData?.Tu_Lanh === '1' ? true : false}
                      onCheckedChange={(e) =>
                        setFormData((prev) => ({
                          ...prev!,
                          Tu_Lanh: e ? '1' : '0',
                        }))
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
                      defaultChecked={
                        formData?.No_Moking === '1' ? true : false
                      }
                      onCheckedChange={(e) =>
                        setFormData((prev) => ({
                          ...prev!,
                          No_Moking: e ? '1' : '0',
                        }))
                      }
                    />
                    <label
                      htmlFor='fax'
                      className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                      Được hút thuốc
                    </label>
                  </div>
                </div>
              </div>
              <div className='col-span-6 grid place-items-center'>
                <CarouselImageTypeRoom listData={imageTypeRoom} />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              type='button'
              onClick={() => {
                setIsOpen(false), setIsEdit(false);
              }}
              className='bg-black text-white dark:border-white dark:border hover:text-black transition-colors space-x-2 '>
              <XCircleIcon size={14} /> <span>Hủy</span>
            </Button>
            {isEdit && (
              <Button
                type='submit'
                className='space-x-2 bg-cyan-500 dark:bg-white dark:text-black'>
                <Edit2 size={14} />
                <span>Chỉnh sửa </span>
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
