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
import { PlusCircleIcon, Wifi } from 'lucide-react';
import { useAuth } from '@/hooks/useAuthContext';
import { getTypeRooms, insertRoom } from '@/service/hotel.service';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { useCreateRoom } from '@/service/query';

export function ModalAddRoom() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [typerooms, setTyperooms] = useState<SelectTypeRoomResulet[]>([]);
  const [formData, setFormData] = useState<Room>({})
 const createRoomMutation = useCreateRoom();
  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createRoomMutation.mutate(formData)

    if(createRoomMutation.isPending) {
      toast({
        title:"Đang khợi tạo"
      })
    }
    else if(createRoomMutation.isError) {
       toast({
        title:"Tạo mới thất bại"
      })
      setIsOpen(true)
    }
    else{
       toast({
        title:"Tạo mới thành công"
      })
      setIsOpen(false)
    }

    // console.table(formData)
    // const result = await insertRoom(formData)
    // console.log(result);
    // if(result) {
    //   toast({
    //     title:"Tạo mới thành công"
    //   })
    //   setIsOpen(false)
    // }
    // else {
    //   toast({
    //     title:"Tạo mới thất bại"
    //   })
    //   setIsOpen(true)
    // }

    //setIsOpen(false);
  };

  const { admin } = useAuth();

  useEffect(() => {
    if (isOpen) {
      const getDataTypeRooms = async (id: string) => {
        console.log('Id: ', id);
        if (!id) return;

        try {
          const result = await getTypeRooms(id);
          setTyperooms(result[0]);
        } catch (error) {
          throw error;
        }
      };

      getDataTypeRooms(admin?.id_hotel as string);
    }
  }, [admin, isOpen]);

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
          <DialogTitle>Add Room</DialogTitle>
        </DialogHeader>
        <form className='grid gap-4 py-4 grid-cols-12 ' onSubmit={(e) => handleSubmit(e)}>
          <div className='flex space-y-2 flex-col col-span-6'>
            <Label
              htmlFor='name'
              className='text-start'>
              Room Name
            </Label>
            <Input
            required
              id='name'
              onChange={(e) => setFormData((prev) => ({ ...prev!, RoomName: e.target.value }))}
            />
          </div>
          <div className='flex space-y-2 flex-col col-span-6'>
            <Label
              htmlFor='roomtype'
              className='text-start'>
              Room Type
            </Label>
            <Select name='roomtype' required onValueChange={(e) => setFormData((prev) => ({ ...prev!, TypeRoomId: e }))}>
              <SelectTrigger className=''>
                <SelectValue placeholder='Select a fruit' />
              </SelectTrigger>
              <SelectContent className='bg-white text-black dark:bg-black dark:text-white'>
                <SelectGroup>
                  {typerooms.map((item) => (
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
              className='text-start'>
              State
            </Label>
            <Select name='state' required  onValueChange={(e) => setFormData((prev) => ({ ...prev!, State: e }))}>
              <SelectTrigger className=''>
                <SelectValue placeholder='Select a fruit' />
              </SelectTrigger>
              <SelectContent className='bg-white text-black dark:bg-black dark:text-white'>
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
              className='text-start'>
              Discount
            </Label>
            <Input
              min={0}
              maxLength={4}
              id='discount'
              type='number'
              onChange={(e) => setFormData((prev) => ({ ...prev!, Discount: e.target.valueAsNumber }))}

            />
          </div>
          <div className='flex space-y-2 flex-col col-span-12'>
            <Label
              htmlFor='Gift'
              className='text-start'>
              Gift
            </Label>
            <Textarea
              id='Gift'
              onChange={(e) => setFormData((prev) => ({ ...prev!, Gift: e.target.value }))}

            />
          </div>
          <div className='flex items-center space-x-2 col-span-4'>
            <Checkbox id='wifi'
            onCheckedChange={(e) =>
                    setFormData((prev) => ({ ...prev!, Wifi: e ? 1 : 0, }))
                  }
            
            />
            <label
              htmlFor='wifi'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Wifi
            </label>
          </div>
          <div className='flex items-center space-x-2 col-span-4'>
            <Checkbox id='breakfast'
            onCheckedChange={(e) =>
                    setFormData((prev) => ({ ...prev!, Breakfast: e ? 1 : 0, }))
                  }
            />
            <label
              htmlFor='breakfast'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Breakfast
            </label>
          </div>
          <div className='flex items-center space-x-2 col-span-4'>
            <Checkbox id='is_morking'
            onCheckedChange={(e) =>
                    setFormData((prev) => ({ ...prev!, NoSmoking: e ? 1 : 0, }))
                  }
            />
            <label
              htmlFor='is_morking'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Morking
            </label>
          </div>
          <div className='flex items-center space-x-2 col-span-4'>
            <Checkbox id='cancel'
            onCheckedChange={(e) =>
                    setFormData((prev) => ({ ...prev!, Cancel: e ? 1 : 0, }))
                  }
            />
            <label
              htmlFor='cancel'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Cancel
            </label>
          </div>
          <div className='flex items-center space-x-2 col-span-4'>
            <Checkbox id='payment'
            onCheckedChange={(e) =>
                    setFormData((prev) => ({ ...prev!, Hinh_Thuc_Thanh_Toan: e ? 1 : 0, }))
                  }
            />
            <label
              htmlFor='payment'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
              Hình thanh toán online
            </label>
          </div>
          <div className='flex items-center space-x-2 col-span-4'>
            <Checkbox id='fax'
            onCheckedChange={(e) =>
                    setFormData((prev) => ({ ...prev!, Bao_Gom_Thue_Va_Phi: e ? 1 : 0, }))
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
            className='bg-black text-white dark:border-white hover:text-black'
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className='bg-cyan-500 dark:bg-cyan-900'
            type='submit'>
            Add
          </Button>
        </DialogFooter>
        </form>

      </DialogContent>
    </Dialog>
  );
}
