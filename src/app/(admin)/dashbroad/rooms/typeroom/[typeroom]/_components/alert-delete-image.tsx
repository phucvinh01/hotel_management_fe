import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from '@/components/ui/use-toast';
import { deleteImageTypeRoom } from '@/service/typeroom.service';
import { Trash } from 'lucide-react';

type AlertDeleteImageProps = {
  idImage: string;
  images: IHotelImage[] | false | undefined;
};

export function AlertDeleteImage({ idImage, images }: AlertDeleteImageProps) {
  const handleDeleleImage = async () => {
    const res = await deleteImageTypeRoom(idImage);

    if (res) {
      if (!Array.isArray(images)) {
        console.error('Mảng images không hợp lệ');
        return;
      }
      const index = images.findIndex((image) => image.id === idImage);

      if (index === -1) {
        console.error('Không tìm thấy hình ảnh với id: ', idImage);
        return;
      }

      images.splice(index, 1);

      toast({
        title: 'Xóa hình ảnh thành công',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Xóa hình ảnh thất bại',
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash
          color='white'
          size={16}
          className='hover:cursor-pointer bg-red-500 p-0.5 rounded-lg'
        />{' '}
      </AlertDialogTrigger>
      <AlertDialogContent className='bg-white text-black dark:bg-black drak:text-while rounded-2xl'>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn có chắc chắn sẽ xóa?</AlertDialogTitle>
          <AlertDialogDescription>
            Hành động này không thể được hoàn tác. Thao tác này sẽ xóa vĩnh viễn
            ảnh này khỏi máy chủ của chúng tôi.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDeleleImage()}
            className='bg-cyan-500 dark:bg-cyan-900'>
            Xác nhận
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
