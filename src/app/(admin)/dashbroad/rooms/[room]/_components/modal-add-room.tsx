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
import { FormEvent, useState } from 'react';
import { Loader, PlusCircleIcon, PlusIcon, XIcon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuthContext';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { useCreateRoom, useGetTypeRooms } from '@/service/query.service';
import { AVAILABLE, EMPTY, INAVAILABLE, NOT_EMPTY } from '@/constant';

export function ModalAddRoom() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Room>({});
  const { admin } = useAuth();

  const { data, isLoading } = useGetTypeRooms(admin?.id_hotel as string);
  const createRoomMutation = useCreateRoom();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await createRoomMutation.mutateAsync(formData);

    if (res) {
      toast({
        title: 'Tạo mới thành công',
      });
      setIsOpen(false);
    } else {
      toast({
        variant: 'destructive',
        title: 'Tạo mới thất bại',
      });
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
      <DialogContent className='sm:max-w-[625px] bg-white dark:bg-black text-black dark:text-white'>
        <DialogHeader>
          <DialogTitle>Thêm phòng</DialogTitle>
        </DialogHeader>
        <form
          className='grid gap-4 py-4 grid-cols-12 '
          onSubmit={(e) => handleSubmit(e)}>
          <div className='flex space-y-2 flex-col col-span-6'>
            <Label
              htmlFor='name'
              className='text-start'>
              Tên phòng
            </Label>
            <Input
              required
              id='name'
              onChange={(e) =>
                setFormData((prev) => ({ ...prev!, RoomName: e.target.value }))
              }
            />
          </div>
          <div className='flex space-y-2 flex-col col-span-6'>
            <Label
              htmlFor='roomtype'
              className='text-start'>
              Loại phòng
            </Label>
            <Select
              name='roomtype'
              required
              onValueChange={(e) =>
                setFormData((prev) => ({ ...prev!, TypeRoomId: e }))
              }>
              <SelectTrigger className=''>
                <SelectValue placeholder='Chọn loại phòng' />
              </SelectTrigger>
              <SelectContent className='bg-white text-black dark:bg-black dark:text-white'>
                {isLoading && <Loader />}
                {data && (
                  <SelectGroup>
                    {data[0].map((item: SelectTypeRoom) => (
                      <SelectItem
                        key={item.id}
                        value={item.id}>
                        {item.RoomName}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                )}
              </SelectContent>
            </Select>
          </div>
          <div className='flex space-y-2 flex-col col-span-6'>
            <Label
              htmlFor='state'
              className='text-start'>
              Trạng thái
            </Label>
            <Select
              name='state'
              required
              onValueChange={(e) =>
                setFormData((prev) => ({ ...prev!, State: Number(e) }))
              }>
              <SelectTrigger className=''>
                <SelectValue placeholder='Chọn trạng thái' />
              </SelectTrigger>
              <SelectContent className='bg-white text-black dark:bg-black dark:text-white'>
                <SelectGroup>
                  <SelectItem value={'0'}>{EMPTY}</SelectItem>
                  <SelectItem value={'1'}>{NOT_EMPTY}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className='flex space-y-2 flex-col col-span-6'>
            <Label
              htmlFor='discount'
              className='text-start'>
              Giảm giá
            </Label>
            <Input
              min={0}
              maxLength={4}
              id='discount'
              type='number'
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev!,
                  Discount: e.target.valueAsNumber,
                }))
              }
            />
          </div>
          <div className='flex space-y-2 flex-col col-span-12'>
            <Label
              htmlFor='Gift'
              className='text-start'>
              Quà
            </Label>
            <Textarea
              id='Gift'
              onChange={(e) =>
                setFormData((prev) => ({ ...prev!, Gift: e.target.value }))
              }
            />
          </div>
          <div className='flex items-center space-x-2 col-span-4'>
            <Checkbox
              id='wifi'
              onCheckedChange={(e) =>
                setFormData((prev) => ({ ...prev!, Wifi: e ? 1 : 0 }))
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
              onCheckedChange={(e) =>
                setFormData((prev) => ({ ...prev!, Breakfast: e ? 1 : 0 }))
              }
            />
            <label
              htmlFor='breakfast'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Bữa sáng
            </label>
          </div>
          <div className='flex items-center space-x-2 col-span-4'>
            <Checkbox
              id='is_morking'
              onCheckedChange={(e) =>
                setFormData((prev) => ({ ...prev!, NoSmoking: e ? 1 : 0 }))
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
              onCheckedChange={(e) =>
                setFormData((prev) => ({ ...prev!, Cancel: e ? 1 : 0 }))
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
          <DialogFooter className='col-span-12'>
            <Button
              className='bg-black text-white dark:border-white hover:text-black space-x-2'
              onClick={() => setIsOpen(false)}>
              <XIcon size={16} /> Hủy
            </Button>
            <Button
              className='bg-cyan-500 dark:bg-cyan-900 space-x-2'
              type='submit'>
              <PlusIcon size={16} />
              Thêm
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
