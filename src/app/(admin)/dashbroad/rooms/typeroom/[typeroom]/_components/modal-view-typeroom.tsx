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
import { useGetImagesTypeRoom, useGetTypeRooms, useUpdateTypeRoom } from '@/service/query.service';
import { toast } from '@/components/ui/use-toast';
import FormEditTypeRoom from './form-edit-typeroom';
import ViewTypeRoom from './view-typeroom';

export const ModelViewTypeRoom = ({ data }: { data: any }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<SelectTypeRoom>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { admin } = useAuth();

  const updateTypeRoomMutation = useUpdateTypeRoom();
  
  let typedData: SelectRoomsResult[] = [];

  const { data: dataTyperooms, isLoading } = useGetTypeRooms(
    admin?.id_hotel as string,
  );

  const { data: imageTyperoom, isLoading: loadingImageTyperoom } = useGetImagesTypeRoom(formData?.id as string
  );

  if (!isLoading && dataTyperooms) {
    typedData = dataTyperooms[0] as SelectRoomsResult[];
  }

  useEffect(() => {
    if (isOpen) {
      setFormData(data as SelectTypeRoom);
    }
  }, [isOpen, data,]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const amenities = {
      room: {
        waitingRoom: formData?.Khu_Vuc_Cho === 1 ? 'Khu Vực Chờ' : null,
        balcony: formData?.Ban_Cong_San_Hien === 1 ? 'Ban công' : null,
        airConditioner: formData?.May_Lanh === 1 ? 'Máy Lạnh' : null,
        microwave: formData?.Lo_Vi_Song === 1 ? 'Lò vi sóng' : null,
        refrigerator: formData?.Tu_Lanh === 1 ? 'Tủ lạnh' : null,
        washingMachine: formData?.May_Giat === 1 ? 'Máy giặt' : null,
      },
      bathroom: {
        shower: formData?.Voi_Tam_Dung === 1 ? 'Vòi tắm đứng' : null,
        bathtub: formData?.Bon_Tam === 1 ? 'Bồn tắm' : null,
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
              {isEdit
                ? `Chỉnh sửa thông tin loại phòng ${formData?.Name}`
                : `Thông tin loại phòng ${formData?.Name}`}
            </DialogTitle>
            {isEdit ? (
              <MoveLeft onClick={() => setIsEdit(false)} />
            ) : (
              <Settings onClick={() => setIsEdit(true)} />
            )}
          </DialogHeader>
          {!isEdit ? (
            <ViewTypeRoom
              formData={formData}
              imageTypeRoom={imageTyperoom}
            />
          ) : (
            <FormEditTypeRoom
              formData={formData}
              setFormData={setFormData}
              imageTypeRoom={imageTyperoom}
            />
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
