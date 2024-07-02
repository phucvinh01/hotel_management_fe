'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import ImageUpLoader from './image-uploader';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import * as z from 'zod';
import { useAuth } from '@/hooks/useAuthContext';
import Loader from '@/components/admin/common/Loader';
import { useUpdateHotel } from '@/service/query.service';
import { Hotel } from 'lucide-react';
import { updateImageCover } from '@/service/hotel.service';
import { Label } from '@/components/ui/label';
import URL_Enum from '@/axios/URL_Enum';

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Tên khách sạn dùng phải có ít nhất 2 ký tự.',
    })
    .max(30, {
      message: 'Tên khách sạn dùng không được dài hơn 30 ký tự.',
    }),
  Telephone: z
    .number()
    .min(11, {
      message: 'Số điện thoại gồm 11 số',
    })
    .max(11, {
      message: 'Số điện thoại gồm 11 số',
    }),
  Address: z.string({
    required_error: 'Địa chỉ khách sạn không thể thiếu',
  }),
  Description: z.string().max(160).min(4).optional(),
  LocationDetail: z.string().max(160).min(4).optional(),
  TimeCheckOut: z.string(),
  TimeCheckIn: z.string(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.

type ProfileHotelFormProps = {
  data: HotelResponse[] | undefined;
  isLoading: boolean;
};

export function ProfileHotelForm({ data, isLoading }: ProfileHotelFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  const { admin } = useAuth();

  const [hotel, setHotel] = useState<HotelResponse>();
  const [loading, setLoading] = useState<boolean>(false);
  const useUpdate = useUpdateHotel();

  const handleUpLoading = async () => {
    const body: IUploadCoverImagePayload = {
      file: file,
      idImage: hotel?.idImage,
      nameFileOld: hotel?.hotel_image,
      hotelId: hotel?.id
    };
    const res = await updateImageCover(body);
    if (res.success) {
      toast({
        title: res.mga,
      });
    } else {
      toast({
        title: res.mga,
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    if (data) {
      setHotel(data[0]);
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  const handleCheckOutChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checkOutTime = e.target.value;
    const checkInTime = hotel?.TimeCheckIn;

    if (checkInTime && checkOutTime < checkInTime) {
      setError('Giờ kết thúc phải lớn hơn giờ bắt đầu');
    } else {
      setError('');
      setHotel((prev) => ({ ...prev!, TimeCheckOut: checkOutTime }));
    }
  };

  const handleCheckInChange = (e: ChangeEvent<HTMLInputElement>) => {
    const checkInTime = e.target.value;
    const checkOutTime = hotel?.TimeCheckOut;

    if (checkOutTime && checkOutTime < checkInTime) {
      setError('Giờ kết thúc phải lớn hơn giờ bắt đầu');
    } else {
      setError('');
      setHotel((prev) => ({ ...prev!, TimeCheckIn: checkInTime }));
    }
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    if (hotel != undefined) {
      const res = await useUpdate.mutateAsync(hotel);
      if (res) {
        toast({
          title: ' Cập nhật thông tin thành công',
        });
        setLoading(false);
      } else {
        toast({
          variant: 'destructive',
          title: ' Cập nhật thông tin thất bại',
        });
      }
    }
  }

  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      className='space-y-6'>
      <div className='space-y-1'>
        <Label className='font-bold'>Tên Khách Sạn</Label>
        <Input
          required
          value={hotel?.Name}
          minLength={2}
          maxLength={300}
          onChange={(e) =>
            setHotel((prev) => ({ ...prev!, Name: e.target.value }))
          }
        />
        <p className='text-muted text-xs'>
          Đây là tên hiển thị công khai của khách sạn
        </p>
      </div>
      <div className='space-y-1'>
        <Label className='font-bold'>Hotline</Label>
        <Input
          value={hotel?.Telephone}
          required
          type='number'
          minLength={11}
          maxLength={11}
          onChange={(e) =>
            setHotel((prev) => ({
              ...prev!,
              Telephone: e.target.valueAsNumber,
            }))
          }
        />
        <p className='text-muted-foreground text-xs'>Số điện của khách sạn</p>
      </div>
      <div className='space-y-1'>
        <div className='font-bold'>Địa chỉ</div>
        <Input
          required
          value={hotel?.Address}
          onChange={(e) =>
            setHotel((prev) => ({ ...prev!, Address: e.target.value }))
          }
        />
        <p className='text-muted text-xs'>Địa chỉ của khách sạn</p>
      </div>
      <div className='space-y-1'>
        <div className='font-bold'>Mô tả</div>
        <Textarea
          value={hotel?.Description}
          onChange={(e) =>
            setHotel((prev) => ({ ...prev!, Description: e.target.value }))
          }
        />
        <p className='text-xs text-muted'>
          Bạn có thể mô tả chút ít về khách sạn của mình
        </p>
      </div>
      <div className='space-y-1'>
        <div className='font-bold'>Mô tả về địa điểm</div>
        <Textarea
          value={hotel?.LocationDetail}
          onChange={(e) =>
            setHotel((prev) => ({ ...prev!, LocationDetail: e.target.value }))
          }
        />
        <p className='text-muted text-xs'>
          Hãy cho khách hàng biết thêm về vị trí xung quanh của bạn
        </p>
      </div>
      <div className='space-y-1'>
        <div className='font-bold'>Giờ bắt đầu làm việc</div>
        <Input
          onChange={(e) =>
            handleCheckInChange(e)
          }
          required
          type='time'
          value={hotel?.TimeCheckIn}
        />
      </div>
      <div className='space-y-1'>
        <div className='font-bold'>Giờ kết thúc làm việc</div>
        <Input
          onChange={(e) =>
            handleCheckOutChange(e)
          }
          required
          type='time'
          value={hotel?.TimeCheckOut}
        />
      </div>
      {error && <div className="text-red-500 font-bold text-sm">{error}</div>}

      <div className='flex items-end justify-end'>
        <Button
          disabled={isLoading}
          type='submit'
          className='bg-cyan-400 font-bold'>
          Cập nhật
        </Button>
      </div>

      <div>Ảnh bìa</div>
      <ImageUpLoader
        hanldUpload={handleUpLoading}
        defaultImageUrl={URL_Enum.BaseURL_Image + hotel?.hotel_image as string}
        setImageFile={setFile}
      />
    </form>
  );
}
