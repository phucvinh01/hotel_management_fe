'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { GitGraphIcon, Loader } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ForgotPasswordPartnerForm({
  className,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [sent, setSent] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div
      className={cn('flex flex-col gap-6', className)}
      {...props}>
      {!sent ? (
        <div>
          <h2 className='text-center'>Partner</h2>
          <p className='text-xl font-extrabold'>Bạn quên mật khẩu?</p>
          <p className='line-clamp-2 text-gray-400'>
            Không sao đâu. Đó là một trong những ngày đó. Chỉ cần nhập email của
            bạn bên dưới và bạn sẽ nhận được hướng dẫn đặt lại mật khẩu của
            mình.
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
                  disabled={isLoading}
                />
              </div>

              <Button
                onClick={() => setSent(true)}
                disabled={isLoading}
                className='bg-orange-500 text-white'>
                {isLoading && <Loader />}
                Gữi
              </Button>

              <div className='h-[1px] border border-dashed'></div>
            </div>

            <p>
              Bạn chưa là partner?{' '}
              <Link
                href={'/partner/register'}
                className='text-cyan-500 font-bold'>
                Đăng Ký ngay
              </Link>
            </p>
          </form>
        </div>
      ) : (
        <div>
          <p className='text-2xl font-bold'>Đã gữi!</p>
          <Image
            src={'/logo/sent-email.jpg'}
            alt='sent'
            width={200}
            height={200}
          />
          <p className='text-wrap'>
            Xong rôi! Chúng tôi đã gửi thành công hướng dẫn đến địa chỉ email
            của bạn. Bạn có thể nhận được hướng dẫn trong email để đặt lại mật
            khẩu của mình.
          </p>
          <p>
            Không nhận được bất kỳ email nào?{' '}
            <span className='text-cyan-500 font-bold'>Gữi lại</span>
          </p>
        </div>
      )}
    </div>
  );
}
