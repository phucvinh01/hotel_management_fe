'use client';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import FormHotelInfo from './form-hotel-info';
import FormTypeRoom from './form-typeroom';
import FormAddNewForm from './form-add-room';
import { toast } from '@/components/ui/use-toast';
import ImageUploader, { FileData } from './upload-image';
import ImageUploaderSingle from './upload-single';
import Image from 'next/image';
import {
  insertHotel,
  InsertResult,
  insertRoom,
  insertTyperoom,
  uploadImage,
} from '@/service/hotel.service';
import { useAuth } from '@/hooks/useAuthContext';
import { insertStaffToList } from '@/service/staff.service';
import { useRouter } from 'next/navigation';

export function RegisterNewHotelForm() {
  const [currentStep, setCurrentStep] = useState<string>('main');
  const [dataHotel, setDataHotel] = useState<Hotel>();
  const [filesImageHotel, setfilesImageHotel] = useState<FileData[]>([]);
  const [filesImageTyperoom, setfilesImageTyperoom] = useState<FileData[]>([]);
  const [dataTypeRoom, setDataTypeRoom] = useState<TypeRoom[]>([]);
  const [dataRooms, setDataRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { admin } = useAuth();

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const id_hotel = await insertHotel(dataHotel);
      let id_typeroom: string | false | undefined = '';
      if (id_hotel) {
        for (const typeRoom of dataTypeRoom) {
          const typeId = await insertTyperoom(typeRoom, id_hotel);
          id_typeroom = typeId && typeId.id;
          if (typeId) {
            for (const fileImage of filesImageHotel) {
              if (fileImage.typeroom === typeRoom.Name) {
                const res = await uploadImage(
                  fileImage.file,
                  typeId as InsertResult,
                  fileImage.regions
                );
                if (!res) {
                  toast({
                    variant: 'destructive',
                    title: `Thêm hình ảnh cho  ${typeRoom.Name} thất bại`,
                  });
                  setIsLoading(false);
                }
              }
            }
            for (const room of dataRooms) {
              if (room.TypeRoomId === typeRoom.Name) {
                if (room.quannity) {
                  for (let index = 0; index < room.quannity; index++) {
                    const res = await insertRoom(
                      room,
                      id_typeroom as string,
                      index + 1
                    );
                    if (!res) {
                      toast({
                        variant: 'destructive',
                        title: `Thêm phòng cho  ${typeRoom.Name} thất bại`,
                      });
                      setIsLoading(false);
                    }
                  }
                }
              }
            }
          } else {
            toast({
              variant: 'destructive',
              title: 'Thêm loại phòng thất bại',
            });
          }
        }

        const res = await insertStaffToList(id_hotel, admin?.id_staff as string);

        if (res) {
          toast({
            title: 'Đăng ký thành công vui lòng đăng nhập lại',
          });
          router.replace('/app/partner/login');
        } else {
          toast({
            variant: 'destructive',
          });
          setIsLoading(false);
        }
        setIsLoading(false);
      } else {
        toast({
          variant: 'destructive',
          title: 'Thêm khách sạn thất bại',
        });
        setIsLoading(false);
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <Tabs
      defaultValue='main'
      value={currentStep}
      className='w-[70%]'
      orientation='vertical'>
      <TabsList className='grid w-full grid-cols-5'>
        <TabsTrigger
          onClick={() => setCurrentStep('main')}
          value='main'>
          Thông tin chung
        </TabsTrigger>
        <TabsTrigger
          onClick={() => setCurrentStep('typeroom')}
          value='typeroom'>
          Thêm loại phòng
        </TabsTrigger>
        <TabsTrigger
          onClick={() => setCurrentStep('room')}
          value='room'>
          Thêm phòng
        </TabsTrigger>

        <TabsTrigger
          onClick={() => setCurrentStep('image')}
          value='image'>
          Hình ảnh
        </TabsTrigger>
        <TabsTrigger
          disabled
          onClick={() => setCurrentStep('review')}
          value='review'>
          Tổng quan
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value='main'
        className='flex flex-col gap-3'>
        <FormHotelInfo
          setFormData={setDataHotel}
          data={dataHotel}
          files={filesImageHotel}
          setFiles={setfilesImageHotel}
        />
        <div className='flex justify-end items-end'>
          <Button
            onClick={() => {
              setCurrentStep('typeroom'),
                toast({
                  title: 'You submitted the following values:',
                  description: (
                    <pre className='mt-2 w-[340px] rounded-3xl bg-slate-950 p-4'>
                      <code className='text-white'>
                        {JSON.stringify(dataHotel, null, 2)}
                      </code>
                      <code className='text-white'>
                        {JSON.stringify(filesImageHotel, null, 2)}
                      </code>
                    </pre>
                  ),
                });
            }}
            className='bg-orange-500 text-white w-full'>
            Lưu và tiếp tục bước tiếp theo
          </Button>
        </div>
      </TabsContent>
      <TabsContent
        value='typeroom'
        className='flex flex-col gap-3'>
        <FormTypeRoom
          setFormData={setDataTypeRoom}
          data={dataTypeRoom}
          files={filesImageTyperoom}
          setFiles={setfilesImageTyperoom}
        />

        <div className='flex justify-end items-end'>
          <Button
            onClick={() => {
              setCurrentStep('room'),
                toast({
                  title: 'You submitted the following values:',
                  description: (
                    <pre className='mt-2 w-[340px] rounded-3xl bg-slate-950 p-4'>
                      <code className='text-white'>
                        {JSON.stringify(dataTypeRoom, null, 2)}
                      </code>
                      <code className='text-white'>
                        {JSON.stringify(filesImageTyperoom, null, 2)}
                      </code>
                    </pre>
                  ),
                });
            }}
            className='bg-orange-500 text-white w-full'>
            Lưu và tiếp tục bước tiếp theo
          </Button>
        </div>
      </TabsContent>

      <TabsContent
        value='room'
        className='flex flex-col gap-3'>
        <FormAddNewForm
          dataRender={dataTypeRoom}
          dataRooms={dataRooms}
          setDataRooms={setDataRooms}
        />
        <div className='flex justify-end items-end'>
          <Button
            onClick={() => {
              setCurrentStep('image'),
                toast({
                  title: 'You submitted the following values:',
                  description: (
                    <pre className='mt-2 w-[340px] rounded-3xl bg-slate-950 p-4'>
                      <code className='text-white'>
                        {JSON.stringify(dataRooms, null, 2)}
                      </code>
                    </pre>
                  ),
                });
            }}
            className='bg-orange-500 text-white'>
            Xem lại khách sạn của bạn và đồng ý đăng ký
          </Button>
        </div>
      </TabsContent>
      <TabsContent
        value='image'
        className='flex flex-col gap-3'>
        <div className='bg-white px-4 rounded-3xl'>
          <div className='w-full bg-slate-200 mt-3 rounded-3xl px-5'>
            <ImageUploaderSingle data={filesImageHotel} />
          </div>

          <ImageUploader
            files={filesImageHotel}
            setFiles={setfilesImageHotel}
            dataRender={dataTypeRoom}
          />
        </div>

        <div className='flex justify-end items-end'>
          <Button
            onClick={() => {
              setCurrentStep('review'),
                toast({
                  title: 'You submitted the following values:',
                  description: (
                    <pre className='mt-2 w-[340px] rounded-3xl bg-slate-950 p-4'>
                      <code className='text-white'>
                        {JSON.stringify(filesImageHotel, null, 2)}
                      </code>
                    </pre>
                  ),
                });
            }}
            className='bg-orange-500 text-white'>
            Xem lại khách sạn của bạn và đồng ý đăng ký
          </Button>
        </div>
      </TabsContent>
      <TabsContent
        value='review'
        className='flex flex-col gap-3'>
        <div className='bg-white p-4 rounded-3xl shadow-md flex flex-col gap-4'>
          <p className='text-3xl font-semibold'>Thông tin khách sạn</p>
          <div className='grid grid-cols-2 p-3 border rounded-3xl'>
            <div>
              <h2 className='text-2xl font-semibold mb-2'>{dataHotel?.Name}</h2>
              <p className='text-gray-600 mb-2'>{dataHotel?.Address}</p>
              <p className='text-gray-600 mb-4'>{dataHotel?.Telephone}</p>
            </div>

            {filesImageHotel && filesImageHotel[0]?.file && (
              <Image
                loading='lazy'
                width={200}
                height={200}
                className='object-cover rounded-3xl min-h-[70px]'
                src={URL.createObjectURL(filesImageHotel[0]?.file)}
                alt={filesImageHotel[0].filename}
              />
            )}
          </div>
          <p className='text-3xl font-semibold'>
            {' '}
            Các loại phòng của khách sạn
          </p>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border rounded-xl p-2'>
            {dataTypeRoom?.map((roomType, index) => (
              <div
                key={index}
                className='bg-gray-100 p-4 rounded-3xl shadow-md'>
                <h3 className='text-lg font-semibold mb-2'>{roomType.Name}</h3>
                <p className='text-gray-600 mb-2'>
                  Số lượng phòng:{' '}
                  {
                    dataRooms?.find((room) => room.TypeRoomId === roomType.Name)
                      ?.quannity
                  }
                </p>
              </div>
            ))}
          </div>

          <p className='text-3xl font-semibold'> Hình ảnh</p>

          <div className='mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {filesImageHotel.slice(1).map((imageUrl, index) => (
              <div
                key={index}
                className='rounded-3xl overflow-hidden shadow-md'>
                <Image
                  width={70}
                  height={70}
                  src={URL.createObjectURL(imageUrl.file)}
                  alt={`Image ${index}`}
                  className='w-full min-h-17'
                />
                <p>Loại phòng: {imageUrl.typeroom}</p>
                <p>Khu vực: {imageUrl.regions}</p>
              </div>
            ))}
          </div>
        </div>
        <div className='flex justify-end items-end'>
          <Button
            disabled={isLoading}
            className='bg-orange-500 text-white'
            onClick={() => handleSubmit()}>
            Xác nhận đăng ký
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
}
