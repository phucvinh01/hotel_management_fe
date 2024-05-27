'use client';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import FormHotelInfo from './form-hotel-info';
import FormTypeRoom from './form-typeroom';
import FormAddNewForm from './form-add-room';
import { toast } from '@/components/ui/use-toast';
import ImageUploader, { FileData } from './upload-image';
import _ from 'lodash';
import Image from 'next/image';
import {
  insertHotel,
  InsertResult,
  uploadImage,
} from '@/service/hotel.service';
import { useAuth } from '@/hooks/useAuthContext';
import { insertStaffToList } from '@/service/staff.service';
import { useRouter } from 'next/navigation';
import Heading from '@/components/shared/Heading';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/formatCurrency';
import { StarIcon } from 'react-simple-star-rating/dist/components/StarIcon';
import {
  HomeIcon,
  Hotel,
  Loader2,
  MapPin,
  PhoneCallIcon,
  Timer,
  TimerOffIcon,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { insertTyperooms } from '@/service/typeroom.service';
import { insertRooms } from '@/service/room.service';

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

      const id_hotel = await insertHotel(dataHotel as Hotel);
     
      console.log(id_hotel);
      if (id_hotel && id_hotel?.status) {
        const res = await uploadImage(
          filesImageHotel[0].file,
          { id: 'None', hotel_id: id_hotel.hotel_id },
          'Ảnh bìa',
        );

        let id_typeroom: string | false | undefined = '';
        if (id_hotel) {
          for (const typeRoom of dataTypeRoom) {
            const typeId = await insertTyperooms(typeRoom, id_hotel.hotel_id);
            id_typeroom = typeId && typeId.id;

            if (typeId) {
              for (const fileImage of filesImageHotel) {
                if (fileImage.typeroom === typeRoom.Name) {
                  if (fileImage.regions === null) {
                    const res = await uploadImage(
                      fileImage.file,
                      typeId as InsertResult,
                      'None',
                    );
                    if (!res) {
                      toast({
                        variant: 'destructive',
                        title: `Thêm hình ảnh cho  ${typeRoom.Name} thất bại`,
                      });
                      setIsLoading(false);
                    }
                  } else {
                    const res = await uploadImage(
                      fileImage.file,
                      typeId as InsertResult,
                      fileImage.regions,
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
              }
              for (const room of dataRooms) {
                if (room.TypeRoomId === typeRoom.Name) {
                  if (room.quannity) {
                    for (let index = 0; index < room.quannity; index++) {
                      const res = await insertRooms(
                        room,
                        id_typeroom as string,
                        index + 1,
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

          const res = await insertStaffToList(
            id_hotel.hotel_id,
            admin?.id_staff as string,
          );

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
      } else {
        toast({
          title: 'Error',
          description: id_hotel?.message,
          variant: 'destructive',
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
            className='bg-cyan-500 text-white w-full'>
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
            className='bg-cyan-500 text-white w-full'>
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
            className='bg-cyan-500 text-white'>
            Lưu và tiếp tục bước tiếp theo
          </Button>
        </div>
      </TabsContent>
      <TabsContent
        value='image'
        className='flex flex-col gap-3'>
        <div className='bg-white px-4 rounded-3xl'>
          {/* <ImageUploaderSingle data={filesImageHotel} /> */}

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
            className='bg-cyan-500 text-white'>
            Xem lại khách sạn của bạn và đồng ý đăng ký
          </Button>
        </div>
      </TabsContent>
      <TabsContent
        value='review'
        className='flex flex-col gap-3'>
        <div className='bg-white p-4  shadow-md flex flex-col gap-4 rounded-3xl'>
          <Heading desc='Tuyệt vời, chúc mừng bạn đã hoàn thành việc niêm yết, đang chờ duyệt để xuất bản'>
            Xin chúc mừng 🎉
          </Heading>
          <Separator />

          <div className='grid grid-cols-2 p-4'>
            <div className=''>
              <p className='text-gray-500 mb-2 flex gap-4'>
                <HomeIcon />{' '}
                <span className='text-black text-end'>{dataHotel?.Name}</span>
              </p>
              <p className='text-gray-500 mb-2 flex gap-4'>
                <MapPin />
                <span className='text-black text-end'>
                  {dataHotel?.Address}
                </span>
              </p>
              <p className='text-gray-500 mb-2 flex gap-4'>
                <PhoneCallIcon />{' '}
                <span className='text-black text-end'>
                  {dataHotel?.Telephone}
                </span>
              </p>
              <p className='text-gray-500 mb-2 flex gap-4'>
                <Timer />
                <span className='text-black text-end'>
                  {dataHotel?.TimeCheckIn}
                </span>
              </p>
              <p className='text-gray-500 mb-2 flex gap-4'>
                <TimerOffIcon />
                <span className='text-black text-end'>
                  {dataHotel?.TimeCheckOut}
                </span>
              </p>
            </div>
            <Card className='border-none p-0 space-y-2'>
              <div className='relative'>
                {filesImageHotel[0] && (
                  <Image
                    className='rounded-3xl object-contain w-full'
                    src={URL.createObjectURL(
                      filesImageHotel[0] && filesImageHotel[0]?.file,
                    )}
                    alt={`http://localhost:8000/images/${filesImageHotel[0]?.file}`}
                    width={288}
                    height={264}
                  />
                )}
              </div>
              <CardContent className='flex flex-col gap-4 py-1 max-h-52 p-0'>
                <p className='font-bold text-sm text-black line-clamp-2'>
                  {dataHotel?.Name}
                </p>
                <p className='text-gray-400 text-sm flex gap-3 items-center'>
                  <MapPin size={18} /> <span>{dataHotel?.Address}</span>
                </p>
                {/* <p className='text-xs text-gray-500 font-bold line-through'>{formatCurrency(item.minPrice)}</p> */}
                <div className='flex flex-row justify-between items-center text-sm'></div>
              </CardContent>
            </Card>
          </div>

          <Heading desc='Yên tâm bạn có thể thay đổi lại khi đăng ký thành công với chúng tôi'>
            Khách sạn có bạn đã có 🎉
          </Heading>
          <Separator />

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2'>
            {dataTypeRoom?.map((roomType, index) => (
              <Card
                className='flex flex-col justify-center items-center gap-4'
                key={index}>
                <CardContent className='text-gray-600 space-y-6 mt-5'>
                  <CardTitle className='flex gap-2'>
                    <Hotel /> {roomType.Name}
                  </CardTitle>
                  <p>
                    Số lượng phòng:
                    <strong>
                      {' '}
                      {
                        dataRooms?.find(
                          (room) => room.TypeRoomId === roomType.Name,
                        )?.quannity
                      }
                    </strong>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Heading desc='Yên tâm bạn có thể thay đổi lại khi đăng ký thành công với chúng tôi'>
            Danh sách hình ảnh 🎉
          </Heading>
          <div className='grid grid-cols-4 gap-4'>
            {filesImageHotel.slice(1).map((imageUrl, index) => (
              <Card
                className='border-none p-0 space-y-2'
                key={index}>
                <div className='relative'>
                  <Image
                    className='rounded-3xl object-contain w-full'
                    src={URL.createObjectURL(imageUrl.file)}
                    alt={`http://localhost:8000/images/$imageUrl`}
                    width={288}
                    height={264}
                  />
                </div>
                <CardContent className='flex flex-col gap-4 py-1 max-h-52 p-0'>
                  <p className='font-bold text-sm text-black line-clamp-2'>
                    {imageUrl.typeroom} - {imageUrl.regions}
                  </p>

                  {/* <p className='text-xs text-gray-500 font-bold line-through'>{formatCurrency(item.minPrice)}</p> */}
                  <div className='flex flex-row justify-between items-center text-sm'></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className='flex justify-end items-end'>
          <Button
            disabled={isLoading}
            className='bg-cyan-500 text-white'
            onClick={() => handleSubmit()}>
            {isLoading ? <Loader2 /> : 'Xác nhận đăng ký'}
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
}
