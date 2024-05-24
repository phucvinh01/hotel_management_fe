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
import Logo from '@/components/shared/Logo';
import validateEmail from '@/lib/validateEmail';
import validatePhoneNumberVN from '@/lib/validatePhoneNumberVN';

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
    setIsLoading(true);
    if (!email || !validateEmail(email)) {
      toast({
        variant: 'destructive',
        title: email ? 'Sai định dạng' : 'Thiếu thông tin',
        description: email
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
      email: email,
      name: name,
      password: password,
      Type: 'Staff',
      Telephone: phone,
    };

    const respone = await register(formData);

    if (respone && respone.success) {
      toast({
        title: respone.message,
      });
      setIsRegister(false);
      setIsLoading(false);
      router.replace("/app/partner/login")

    }
    else {
       toast({
        variant: "destructive",
        title:  "Erorr",
        description: respone?.message,
      });
      setIsLoading(false);
    }
  };

  

  return (
    <div
      className={cn('flex flex-col gap-6', className)}
      {...props}>
        
           <Logo/>
           <p className='text-xl font-extrabold'>Tạo tài khoản Partner mới</p>
        <p className='line-clamp-3 text-gray-400'>Đăng chỗ nghỉ của bạn lên VietNam Venture và để chúng tôi giúp bạn kết nối với hàng triệu khách!</p>
      <form onSubmit={onSubmit}>
        <div className='grid gap-4'>
          <div className='flex flex-col gap-2'>
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
            isRegister && <div className='grid gap-4'>
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
                     min={0}
                      maxLength={10}
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
          <Button type='submit' disabled={isLoading} onClick={() => hanldeRegister()} className='bg-cyan-500 text-white'>
            {isLoading && <Loader />}
            Đăng ký tài khoản partner
          </Button> : 
          <Button type='submit' disabled={isLoading} className='bg-cyan-500 text-white'>
            {isLoading && <Loader />}
            Tiếp tục
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
