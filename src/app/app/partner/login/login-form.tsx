'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { GitGraphIcon, Loader } from 'lucide-react';
import Link from 'next/link';
import { loginWithAdministrator } from '@/service/auth.service';
import { useAuth } from '@/hooks/useAuthContext';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginFormPartnert({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const {loginAdministrator} = useAuth()


  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    loginAdministrator(email,password)
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div
      className={cn('flex flex-col gap-6', className)}
      {...props}>
      <h2 className='text-center'>Partner</h2>
      <p className='text-xl font-extrabold'>Chào mừng trở lại!</p>
      <p className='line-clamp-2 text-gray-400'>
        Đăng nhập để quản lý chỗ ở của bạn từ kiểm tra đặt phòng đến quản lý
        phòng trống!
      </p>
      <form onSubmit={onSubmit}>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <Label htmlFor='email'>Địa chỉ email của bạn</Label>
            <Input
              id='email'
              placeholder='name@example.com'
              type='email'
              autoCapitalize='none'
              autoComplete='email'
              autoCorrect='off'
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className='flex flex-col gap-1'>
            <Label htmlFor='email'>Mật khẩu</Label>
            <Input
              id='password'
              type='password'
              autoCorrect='off'
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link
            href={'/app/partner/forgotpassword'}
            className='text-cyan-500 font-bold'>
            Quên mật khẩu?
          </Link>
          <Button
            disabled={isLoading}
            className='bg-orange-500 text-white'>
            {isLoading && <Loader />}Đăng nhập
          </Button>

          <div className='h-[1px] border border-dashed'>
        </div>
        </div>
        <p>
          Bạn chưa là partner?{' '}
          <Link
            href={'/app/partner/register'}
            className='text-cyan-500 font-bold'>
            Đăng Ký ngay
          </Link>
        </p>
      </form>
    </div>
  );
}
