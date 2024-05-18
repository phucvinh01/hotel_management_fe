'use client';

import ImageUploader, {
  FileData,
} from '@/app/app/partner/register-hotel/upload-image';
import React, { Fragment, useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PlusCircle, X } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useCreateImagesTypeRoom } from '@/service/query.service';

type ModalAddImageTypeRoomProps = {
    typeroom: string,
    className?:string,
    hotel: string
}

const ModalAddImageTypeRoom = ({typeroom,className, hotel}: ModalAddImageTypeRoomProps) => {
  const [fileImageTypeRoom, setFileImageTypeRomm] = useState<FileData[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const createImagesTypeRoom = useCreateImagesTypeRoom();
  const handleUpLoadImage = async () => {
    const formdata:IMutilpleImageUpload = {
        file:fileImageTypeRoom.map((item) => item.file),
        region:fileImageTypeRoom.map((item) => item.regions),
        hotel:hotel,
        typeroom:typeroom
    }
     try {
      const result = await createImagesTypeRoom.mutateAsync(
        formdata
      );
      if (result) {
        toast({
          title: `Thêm ${fileImageTypeRoom.length} thành công`,
        });
        setIsOpen(false);
      } else {
        toast({
          variant: 'destructive',
          title: 'Thêm ảnh thất bại',
        });
      }
    } catch (error) {
      toast({
        title: error as string,
      });
    }
  }

  return (
    <div>
      <Dialog
        open={isOpen}
        onOpenChange={() => setFileImageTypeRomm([])}>
        <DialogTrigger asChild>
          <PlusCircle
            size={16}
            color='green'
            onClick={() => setIsOpen(true)}
          />
        </DialogTrigger>
        <DialogContent className={`sm:max-w-[825px] bg-white text-black dark:bg-black dark:text-white ${className}`}>
          <DialogHeader className='flex flex-row justify-between '>
            <div>
              <DialogTitle>Thêm hình ảnh cho phòng của bạn</DialogTitle>
              <DialogDescription>
                Thêm những hình ảnh chất lượng cao để nâng tầm khách sạn của bạn
              </DialogDescription>
            </div>
            <X onClick={() => setIsOpen(false)} />
          </DialogHeader>
          <ImageUploader
            type='typeroom'
            files={fileImageTypeRoom}
            setFiles={setFileImageTypeRomm}
          />

          <DialogFooter>
            <Button onClick={() => handleUpLoadImage()}>Lưu</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModalAddImageTypeRoom;
