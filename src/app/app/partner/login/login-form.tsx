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
import Logo from '@/components/shared/Logo';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function LoginFormPartnert({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const { loginAdministrator } = useAuth();
  const [guest, setGuest] = React.useState<IGuest>();


  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    loginAdministrator(email, password);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div
      className={cn('flex flex-col gap-6', className)}
      {...props}>
      <Logo />
      <p className='text-xl font-extrabold'>Chào mừng trở lại!</p>
      <p className='line-clamp-2 text-gray-400'>
        Đăng nhập để quản lý chỗ ở của bạn từ kiểm tra đặt phòng đến quản lý
        phòng trống!
      </p>
      <form onSubmit={onSubmit}>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
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
          <div className='flex flex-col gap-2'>
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
            className='text-cyan-700 font-semibold text-sm'>
            Quên mật khẩu?
          </Link>
          <Button
            disabled={isLoading}
            className='bg-cyan-500 text-white'>
            {isLoading && <Loader />}Đăng nhập
          </Button>

          <div className='h-[1px] border border-dashed'>
          </div>
        </div>
        <p className='text-sm text-gray-700'>
          Bạn chưa là partner?{' '}
          <Link
            href={'/app/partner/register'}
            className='text-cyan-700 font-semibold'>
            Đăng Ký ngay
          </Link>
        </p>
      </form>
    </div>
  );
}
