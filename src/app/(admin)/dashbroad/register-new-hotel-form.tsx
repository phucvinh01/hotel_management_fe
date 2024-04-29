'use client';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import FormHotelInfo from './form-hotel-info';
import FormTypeRoom from './form-typeroom';
import FormAddNewForm from './form-add-room';

export function RegisterNewHotelForm() {
  const [currentStep, setCurrentStep] = useState<string>('main');
  const [timeCheckIn, setTimeCheckIn] = useState('');

  return (
    <Tabs
      defaultValue='main'
      value={currentStep}
      className='w-[70%]'
      orientation='vertical'>
      <TabsList className='grid w-full grid-cols-4'>
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
        disabled
          onClick={() => setCurrentStep('review')}
          value='review'>
          Tổng quan
        </TabsTrigger>
      </TabsList>

       <TabsContent value='main' className='flex flex-col gap-3'>
        <FormHotelInfo />
        <div className='flex justify-end items-end'>
          <Button
            onClick={() => setCurrentStep('typeroom')}
            className='bg-orange-500 text-white w-full'>
            Lưu và tiếp tục bước tiếp theo
          </Button>
        </div>
      </TabsContent>
      <TabsContent value='typeroom' className='flex flex-col gap-3'>
        <FormTypeRoom />

        <div className='flex justify-end items-end'>
          <Button
            onClick={() => setCurrentStep('room')}
            className='bg-orange-500 text-white w-full'>
            Lưu và tiếp tục bước tiếp theo
          </Button>
        </div>
      </TabsContent>

      <TabsContent
        value='room'
        className='flex flex-col gap-3'>
        <FormAddNewForm />
        <div className='flex justify-end items-end'>
          <Button
            onClick={() => setCurrentStep('review')}
            className='bg-orange-500 text-white'>
            Xem lại khách sạn của bạn và đồng ý đăng ký
          </Button>
        </div>
      </TabsContent>
       <TabsContent
        value='review'
        className='flex flex-col gap-3'>
        <FormAddNewForm />
        <div className='flex justify-end items-end'>
          <Button
            className='bg-orange-500 text-white'>
              Xác nhận đăng ký
          </Button>
        </div>
      </TabsContent>

    </Tabs>
  );
}
