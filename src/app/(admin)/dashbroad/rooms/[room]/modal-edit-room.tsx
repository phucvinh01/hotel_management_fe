'use client';;
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FormEvent, useEffect, useState } from 'react';
import { Edit2, EyeIcon, MoveLeft, Settings, XCircleIcon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuthContext';
import { useGetTypeRooms, useUpdateRoom } from '@/service/query.service';
import { toast } from '@/components/ui/use-toast';
import ViewRoom from './view-room';
import FormEditRoom from './form-edit-room';

export const ModalEditRoom = ({ data }: { data: any }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Room>({});
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { admin } = useAuth();

  const updateRoomMutation = useUpdateRoom();
  let typedData: SelectRoomsResult[] = [];

  const { data: dataTyperooms, isLoading } = useGetTypeRooms(
    admin?.id_hotel as string
  );

  if (!isLoading && dataTyperooms) {
    typedData = dataTyperooms[0] as SelectRoomsResult[];
  }

  useEffect(() => {
    if (isOpen) {
      setFormData(data as Room);
    }
  }, [isOpen, data]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await updateRoomMutation.mutateAsync(formData);
    if(res) {
      toast({
        title: 'Cập nhật thành công',
      });
      setIsOpen(false);
      setIsEdit(false)
    }else {
      const errorMessage = updateRoomMutation.error
        ? updateRoomMutation.error.message
        : 'Có lỗi xảy ra';
      toast({
        title: errorMessage,
      });
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
                ? `Chỉnh sửa thông tin phòng ${formData.RoomName}`
                : `Thông tin phòng ${formData.RoomName}`}
            </DialogTitle>
            {isEdit === true ? (
              <MoveLeft onClick={() => setIsEdit(false)} />
            ) : (
              <Settings onClick={() => setIsEdit(true)} />
            )}
          </DialogHeader>
          {!isEdit ? (
            <ViewRoom room={formData} typerooms={typedData} key={'viewroom'}/>
          ) : (
           <FormEditRoom room={formData} typeroom={typedData} setRoom={setFormData}/>
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
