'use client';
import { Separator } from '@/components/ui/separator';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { FacebookIcon, User } from 'lucide-react';
import validateInputSignIn from '@/lib/validateInputSignIn';
import { checkExistEmail } from '@/service/auth.service';

type DialogSignInProps = {
  scroll: boolean;
  title: 'Đăng nhập' | 'Đăng ký';
};

const DialogSignIn = ({ scroll, title }: DialogSignInProps) => {
  const [inputField, setInputField] = useState<string>('');
  const [register,setRegister]= useState<boolean>(false)
  const [name, setName] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [comfrim, setComfrim] = useState<string>("")
  const handleClicked = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const check = validateInputSignIn(inputField);
    if(check === 'Email') {
      const checked = await checkExistEmail(inputField)
      if(!checked?.exists) {
          setRegister(true)
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger >
        <div
          className={`h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 button-outline ${
            scroll ? 'text-black' : 'text-white'
          } ${title === 'Đăng ký' && 'button-primary'}`}>
          {title === 'Đăng nhập' && <User className='mr-2 h-4 w-4' />}
          {title}
        </div>
      </DialogTrigger>
      <DialogContent className='w-[400px]'>
        <DialogHeader>
          <DialogTitle>Đăng nhập / Đăng ký</DialogTitle>
          <DialogDescription className='flex flex-col gap-4 py-4 px-1 justify-center'>
            <span
              className='w-full flex gap-3 flex-col'>
              <span className='grid w-full items-center gap-1.5'>
                <Label htmlFor='email'>Email/Số điện thoại di động</Label>
                <Input
                  onChange={(e) => setInputField(e.target.value as string)}
                  autoFocus={true}
                  className='w-full'
                  type='text'
                  id='email'
                />
              </span>
              {
                register &&   <>
                <span className='grid w-full items-center gap-1.5'>
                <Label htmlFor='email'>Tên của bạn là ?</Label>
                <Input
                  onChange={(e) => setName(e.target.value as string)}
                  autoFocus={true}
                  className='w-full'
                  type='text'
                  id='email'
                />
              </span>
              <span className='grid w-full items-center gap-1.5'>
                <Label htmlFor='email'>Hãy đặt mật khẩu</Label>
                <Input
                  onChange={(e) => setPassword(e.target.value as string)}
                  autoFocus={true}
                  className='w-full'
                  type='password'
                  id='email'
                />
              </span>
               <span className='grid w-full items-center gap-1.5'>
                <Label htmlFor='email'>Nhập lại mật khẩu</Label>
                <Input
                  onChange={(e) => setPassword(e.target.value as string)}
                  autoFocus={true}
                  className='w-full'
                  type='password'
                  id='email'
                />
              </span>
                </>
              }
              <Button
                onClick={(e) => handleClicked(e)}
                disabled={!Boolean(inputField) ? true : false}
                className='w-full bg-cyan-500 text-white'>
                Tiếp tục
              </Button>
            </span>
            {/* <Separator

              className='my-4'
              content='hoặc đăng nhập/đăng ký với'
            /> */}

            <Button
              variant={'outline'}
              className='w-full border-cyan-500 text-cyan-500'>
              Đăng ký/ Đăng nhập với Facebook
            </Button>
            <Button
              variant={'outline'}
              className='w-full border-cyan-500 text-cyan-500'>
              Đăng ký/ Đăng nhập với Google
            </Button>
            <span className='text-black text-balance text-center  mx-auto'>
              Bằng cách đăng ký, bạn đồng ý với Điều khoản & Điều kiện của chúng
              tôi và bạn đã đọc Chính Sách Quyền Riêng Tư Của của chúng tôi.
            </span>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogSignIn;
