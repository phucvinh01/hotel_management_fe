'use client';

import { z } from 'zod';
import { toast, useToast } from '@/components/ui/use-toast';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';

import {
  BabyIcon,
  HomeIcon,
  MinusIcon,
  PersonStandingIcon,
  PlusIcon,
} from 'lucide-react';
import { useState } from 'react';

const AmountPeopleForm = () => {
  const [amountOfAdult, setAmountOfAdult] = useState(1);
  const [amountOfRoom, setAmountOfRoom] = useState(1);
  const [amountOfChildren, setAmountOfChildren] = useState(0);
  const handleClickMinus = () => {
    setAmountOfAdult(amountOfAdult - 1);
  };
  const handleClickPlus = () => {
    setAmountOfAdult(amountOfAdult + 1);
  };

  return (
    <div className='container flex gap-4 flex-col py-4 w-[330px]'>
      <div className='flex justify-between items-center '>
        <div className='flex gap-3'>
          <HomeIcon className='text-cyan-500'/>
          <p>Số phòng</p>
        </div>
        <div className='flex gap-3 justify-center items-center'>
          <Button
            className={`${amountOfRoom <= 1 ? 'hover:cursor-alias' : ''}`}
            disabled={amountOfRoom <= 1}
            onClick={() => setAmountOfRoom(amountOfRoom - 1)}
            variant={'ghost'}>
            <MinusIcon className='text-cyan-500'/>
          </Button>
          <p className='px-1 border-b border-[#333]'>{amountOfRoom}</p>
          <Button
            onClick={() => {
              if (amountOfRoom >= amountOfAdult) {
                toast({
                  variant: 'destructive',
                  title: 'Uh oh! Something went wrong.',
                });
                setAmountOfRoom(amountOfAdult);
              }else 
              setAmountOfRoom(amountOfRoom + 1);
            }}
            variant={'ghost'}>
            <PlusIcon className='text-cyan-500'/>
          </Button>
        </div>
      </div>
      <div className='flex justify-between items-center '>
        <div className='flex gap-3'>
          <PersonStandingIcon className='text-cyan-500'/>
          <p>Người lớn</p>
        </div>
        <div className='flex gap-3 justify-center items-center'>
          <Button
            className={`${amountOfAdult <= 1 ? 'cursor-not-allowed' : ''}`}
            disabled={amountOfAdult <= 1}
            onClick={handleClickMinus}
            variant={'ghost'}>
            <MinusIcon className='text-cyan-500'/>
          </Button>
          <p className='px-1 border-b border-[#333]'>{amountOfAdult}</p>
          <Button
            onClick={handleClickPlus}
            variant={'ghost'}>
            <PlusIcon className='text-cyan-500'/>
          </Button>
        </div>
      </div>
      <div className='flex justify-between items-center '>
        <div className='flex gap-3'>
          <BabyIcon className='text-cyan-500'/>
          <p>Trẻ em</p>
        </div>
        <div className='flex gap-3 justify-center items-center'>
          <Button
            className={`${amountOfChildren <= 0 ? 'cursor-not-allowed' : ''}`}
            disabled={amountOfChildren <= 0}
            onClick={() => setAmountOfChildren(amountOfChildren - 1)}
            variant={'ghost'}>
            <MinusIcon className='text-cyan-500'/>
          </Button>
          <p className='px-1 border-b border-[#333]'>{amountOfChildren}</p>
          <Button
            onClick={() => setAmountOfChildren(amountOfChildren + 1)}
            variant={'ghost'}>
            <PlusIcon className='text-cyan-500'/>
          </Button>
        </div>
      </div>
      <Button className='button-primary'>Xác Nhận</Button>
    </div>
  );
};

export default AmountPeopleForm;
