'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { FacebookIcon, LoaderIcon, User } from 'lucide-react';
import validateInputSignIn from '@/lib/validateInputSignIn';
import { checkExistEmail, checkExistPhone } from '@/service/auth.service';
import { useToast } from '../ui/use-toast';
import { register as Register, login as SignIn } from '@/service/auth.service';
import { useAuth } from '@/hooks/useAuthContext';
import validateEmail from '@/lib/validateEmail';
import validatePhoneNumberVN from '@/lib/validatePhoneNumberVN';

type DialogSignInProps = {
  scroll: boolean;
  title: 'Đăng nhập' | 'Đăng ký';
};

const DialogSignIn = ({ scroll, title }: DialogSignInProps) => {
  const [inputField, setInputField] = useState<string>('');
  const [register, setRegister] = useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { login: SignIn, user } = useAuth();

  const [open, setOpen] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [comfrim, setComfrim] = useState<string>('');

  const [method, setMethod] = useState<string>('');
  const { toast } = useToast();

  const handleClicked = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setIsLoading(true);
    const check = validateInputSignIn(inputField);
    if (check === 'Not') {
      toast({
        variant: 'destructive',
        title: 'Vui lòng nhập đúng email hoặc số điện thoại',
      });
      setIsLoading(false);
      return;
    }
    if (check === 'Email') {
      setMethod('Email');
      const checked = await checkExistEmail(inputField);
      if (!checked?.exists) {
        setRegister(true);
      } else {
        setLogin(true);
      }
      setIsLoading(false);
    }
    if (check === 'Phone') {
      setMethod('Phone');
      const checked = await checkExistPhone(inputField);
      if (!checked?.exists) {
        setPhone(inputField);
        setInputField('');
        setRegister(true);
      } else {
        setLogin(true);
      }
      setIsLoading(false);
    }
  };

  const hanldeRegister = async () => {
    setIsLoading(true);
    if (!inputField || !validateEmail(inputField)) {
      toast({
        variant: 'destructive',
        title: inputField ? 'Sai định dạng' : 'Thiếu thông tin',
        description: inputField
          ? 'Vui lòng nhập email hợp lệ'
          : 'Vui lòng nhập email',
      });
      setIsLoading(false);
      return;
    }

    if (!name) {
      toast({
        variant: 'destructive',
        title: 'Vui lòng nhập tên của bạn!',
      });
      setIsLoading(false);
      return;
    }
    if (!phone || !validatePhoneNumberVN(phone)) {
      toast({
        variant: 'destructive',
        title: phone ? 'Sai định dạng' : 'Thiếu thông tin',
        description: phone
          ? 'Vui lòng nhập số điện thoại hợp lệ'
          : 'Vui lòng nhập số điện thoại',
      });
      setIsLoading(false);
      return;
    }
    if (!password) {
      toast({
        variant: 'destructive',
        title: 'Mật khẩu là không thể thiếu',
        description: 'Vui lòng nhập mật khẩu',
      });
      setIsLoading(false);
      return;
    }
    if (password.trim != comfrim.trim || !comfrim) {
      toast({
        variant: 'destructive',
        title: 'Mật khẩu không chính xác',
        description: 'Vui lòng xác nhận lại mật khẩu',
      });
      setIsLoading(false);
      return;
    }

    const formData: IRegister = {
      email: inputField,
      name: name,
      password: password,
      Type: 'Guest',
      Telephone: phone,
    };

    const respone = await Register(formData);

    if (respone && respone.success) {
      toast({
        title: respone.message,
      });
      setRegister(false);
      setIsLoading(false);
    }
    else {
       toast({
        variant: "destructive",
        title: respone?.message,
        description: respone?.message,
      });
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    let respone = null;
    setIsLoading(true);
    if (!inputField || !password) {
      toast({
        title: 'Bạn cần nhập đủ thông tin đăng nhập',
      });
      setIsLoading(false);
    }
    if (method === 'Email') {
      SignIn(inputField, password, method);
      setIsLoading(false);
    }

    if (method === 'Phone') {
      SignIn(inputField, password, method);
      setIsLoading(false);
    }
  };

  const setClosed = () => {
    setRegister(false);
    setLogin(false);
    setInputField('');
    setIsLoading(false);
  };

  return (
    <Dialog onOpenChange={setClosed}>
      <DialogTrigger onClick={() => setOpen(true)}>
        <div
          className={`text-black h-10 px-4  py-2 inline-flex items-center justify-center whitespace-nowrap rounded-3xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 button-outline 
           ${title === 'Đăng ký' && 'button-primary'}`}>
          {title === 'Đăng nhập' && <User className='mr-2 h-4 w-4' />}
          {title}
        </div>
      </DialogTrigger>
      <DialogContent className='w-[400px] bg-white'>
        <DialogHeader>
          <DialogTitle>Đăng nhập / Đăng ký</DialogTitle>
          <DialogDescription className='flex flex-col gap-4 py-4 px-1 justify-center'>
            <span className='w-full flex gap-3 flex-col'>
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
              {register && (
                <div className='space-y-3'>
                  <span className='grid w-full items-center gap-1.5'>
                    <Label htmlFor='text'>Tên của bạn là ?</Label>
                    <Input
                      onChange={(e) => setName(e.target.value as string)}
                      className='w-full'
                      type='text'
                      id='text'
                    />
                  </span>
                  <span className='grid w-full items-center gap-1.5'>
                    <Label htmlFor='setPhone'>Số điện thoại của bạn ?</Label>
                    <Input
                      onChange={(e) => setPhone(e.target.value as string)}
                      className='w-full'
                      type='tel'
                      id='setPhone'
                    />
                  </span>
                  <span className='grid w-full items-center gap-1.5'>
                    <Label htmlFor='setPassword'>Hãy đặt mật khẩu</Label>
                    <Input
                      onChange={(e) => setPassword(e.target.value as string)}
                      className='w-full'
                      type='password'
                      id='setPassword'
                    />
                  </span>
                  <span className='grid w-full items-center gap-1.5'>
                    <Label htmlFor='setComfrim'>Nhập lại mật khẩu</Label>
                    <Input
                      onChange={(e) => setComfrim(e.target.value as string)}
                      className='w-full'
                      type='password'
                      id='setComfrim'
                    />
                  </span>
                </div>
              )}
              {login && (
                <span className='grid w-full items-center gap-1.5'>
                  <Label htmlFor='setPassword'>Mật khẩu</Label>
                  <Input
                    onChange={(e) => setPassword(e.target.value as string)}
                    className='w-full'
                    type='password'
                    id='setPassword'
                  />
                </span>
              )}
              {!login && !register && (
                <Button
                  onClick={(e) => handleClicked(e)}
                  disabled={!Boolean(inputField) ? true : false}
                  className='w-full bg-cyan-500 text-white'>
                  {isLoading ? <LoaderIcon /> : 'Tiếp tục'}
                </Button>
              )}

              {login && (
                <Button
                  className='w-full bg-cyan-500 text-white'
                  onClick={() => handleLogin()}>
                  {isLoading ? <LoaderIcon /> : 'Đăng nhập'}
                </Button>
              )}

              {register && (
                <Button
                  onClick={() => hanldeRegister()}
                  className='w-full bg-cyan-500 text-white'>
                  {isLoading ? <LoaderIcon /> : 'Đăng ký'}
                </Button>
              )}
            </span>
            {/* <Separator

              className='my-4'
              content='hoặc đăng nhập/đăng ký với'
            /> */}

            {/* <Button
              variant={'outline'}
              className='w-full border-cyan-500 text-cyan-500'>
              Đăng ký/ Đăng nhập với Facebook
            </Button>
            <Button
              variant={'outline'}
              className='w-full border-cyan-500 text-cyan-500'>
              Đăng ký/ Đăng nhập với Google
            </Button> */}
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
