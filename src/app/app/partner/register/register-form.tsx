'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { GitGraphIcon, Loader } from 'lucide-react';
import Link from 'next/link';
import { checkExistEmail, register } from '@/service/auth.service';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RegisterFormPartnert({
  className,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState("")
  const [name, setName] = React.useState("")
  const [password, setPassword]= React.useState("")
  const [comfrim, setComfrim]= React.useState("")
  const [phone, setPhone]= React.useState("")

  const {toast} = useToast()
  const router = useRouter()
  const [isRegister, setIsRegister]= React.useState(false)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const res = await checkExistEmail(email)
    if(res && res.exists) {
        toast({
          title:"Bạn đã có tài khoản, xin hãy đăng nhập"
        })
        router.replace("/app/partner/login")
    }
    else {
      setIsRegister(true)
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  const hanldeRegister = async () => {
    setIsLoading(true)
    if (!email) {
      toast({
        variant: 'destructive',
        title: 'Thiếu thông tin',
        description: 'Vui lòng nhập email',
      });
      return;
    }
    if (!name) {
      toast({
        variant: 'destructive',
        title: 'Thiếu thông tin',
        description: 'Vui lòng nhập tên của bạn',
      });
      return;
    }
    if (!phone || phone.length < 10) {
      toast({
        variant: 'destructive',
        title: 'Thiếu thông tin',
        description: 'Vui lòng nhập số điện thoại',
      });
      return;
    }
    if (!password) {
      toast({
        variant: 'destructive',
        title: 'Thiếu thông tin',
        description: 'Vui lòng nhập password',
      });
      return;
    }
    if (password.trim != comfrim.trim) {
      toast({
        variant: 'destructive',
        title: 'Mật khẩu không chính xác',
        description: 'Vui lòng nhập mật khẩu',
      });
      return;
    }

    const formData: IRegister = {
      email: email,
      name: name,
      password: password,
      Type: 'Staff',
      Telephone: phone,
    };

    const respone = await register(formData);

    if (respone && respone) {
      toast({
        title: 'Đăng ký thành công',
        description: 'Hãy đăng nhập tài khoản của bạn',
      });
      router.replace("/app/partner/login")
      setIsRegister(false);
    }
    setIsLoading(false)
  };

  

  return (
    <div
      className={cn('flex flex-col gap-6', className)}
      {...props}>
        
           <h2 className='text-center'>Partner</h2>
           <p className='text-xl font-extrabold'>Tạo tài khoản Partner mới</p>
        <p className='line-clamp-2 text-gray-400'>Đăng chỗ nghỉ của bạn lên Traveloka và để chúng tôi giúp bạn kết nối với hàng triệu khách!</p>
      <form onSubmit={onSubmit}>
        <div className='grid gap-2'>
          <div className='flex flex-col gap-1'>
            <Label
              htmlFor='email'>
              Địa chỉ email của bạn
            </Label>
            <Input
            onChange={(e) => setEmail(e.target.value)}
              id='email'
              placeholder='name@example.com'
              type='email'
              autoCapitalize='none'
              autoComplete='email'
              autoCorrect='off'
              disabled={isLoading}
            />
          </div>
          {
            isRegister && <div>
                  <span className='grid w-full items-center gap-1.5'>
                    <Label htmlFor='text'>Tên của bạn là ?</Label>
                    <Input
                      onChange={(e) => setName(e.target.value)}
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
          }
          {
            isRegister ? 
          <Button type='submit' disabled={isLoading} onClick={() => hanldeRegister()} className='bg-orange-500 text-white'>
            {isLoading && <Loader />}
            Đăng ký tài khoản partner
          </Button> : 
          <Button type='submit' disabled={isLoading} className='bg-orange-500 text-white'>
            {isLoading && <Loader />}
            Next
          </Button>
          }
        </div>
      </form>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <p className='bg-background px-2 text-muted-foreground'>
            Bạn đã có tài khoản ?  

          <Link href={'/app/partner/login'} className='text-cyan-500 cursor-pointer'>Đăng nhập</Link>
          </p>
        </div>
      </div>{' '}
    </div>
  );
}
