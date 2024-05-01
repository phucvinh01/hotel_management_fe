'use client';

import { Button } from '@/components/ui/button';
import LangAndCur from '../LangAndCur';
import Logo from '../Logo';
import { User } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import DialogSignIn from '../DialogSignIn';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuthContext';
import { UserNav } from '../UserNav';

const Header = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  const [scroll, setScroll] = useState<boolean>(false);
  const pathname = usePathname();
  //neu usingScrollEvent=true thi moi co su dung event sroll
  //de check sroll y de set background
  //neu usingScrollEvent=flase thi mac dinh background=mau trang

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    if (pathname === '/app') {
      window.addEventListener('scroll', handleScroll);
      if (scrollY > 20) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    } else {
      setScroll(true);
    }
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY, pathname]);


  const { user } = useAuth();

  console.log(pathname);



  return pathname !== '/app/partner' ? (
    <header
      className={`container sticky flex gap-3 flex-col py-2 top-0 left-0 w-full z-50 h-32
       ${
         pathname !== '/app'
           ? 'bg-white text-gray-900'
           : scrollY > 20
           ? 'bg-slate-100'
           : 'bg-transparent border-gray-200 '
       } transition-all duration-300 ease-in-out ${pathname.includes("/register") && 'hidden'} ${pathname.includes("/login") && 'hidden'} ${pathname.includes("/forgotpassword")  && 'hidden' } ${pathname.includes("/dashbroad") && 'hidden'}`} >
      <div className='w-full flex-center '>
        <div className='flex flex-1'>
          <Logo />
        </div>
        <div className='flex-center gap-3'>
          <LangAndCur scroll={scroll} />
          <Button
            variant={'ghost'}
            className={`${
              scroll ? 'text-black' : 'text-white'
            } transition-colors hover:bg-[rgba(0,0,0,0.25)]  hover:text-white`}>
            Hỗ trợ
          </Button>
          <Button
            variant={'ghost'}
            className={`${
              scroll ? 'text-black' : 'text-white'
            } transition-colors hover:bg-[rgba(0,0,0,0.25)] hover:text-white`}>
            <Link href={'/app/partner'}>Hợp tác với chúng tôi</Link>
          </Button>
          {user ? (
            <UserNav />
          ) : (
            <div className='flex gap-1'>
              <DialogSignIn
                scroll={scroll}
                title='Đăng nhập'
              />
              <DialogSignIn
                scroll={scroll}
                title='Đăng ký'
              />
            </div>
          )}
        </div>
      </div>

      <div className='flex gap-1'>
        <Button
          variant={'ghost'}
          className={`transition-colors ${
            scroll ? 'text-black' : 'text-white'
          }`}>
          <Link href={'/app/hotel'}>Khách sạn</Link>
        </Button>
        <Button
          variant={'ghost'}
          className={`transition-colors ${
            scroll ? 'text-black' : 'text-white'
          }`}>
          Vé máy bay
        </Button>
        <Button
          variant={'ghost'}
          className={`transition-colors ${
            scroll ? 'text-black' : 'text-white'
          }`}>
          Vé xe khách
        </Button>
        <Button
          variant={'ghost'}
          className={`transition-colors ${
            scroll ? 'text-black' : 'text-white'
          }`}>
          Đưa đón sân bay
        </Button>
        <Button
          variant={'ghost'}
          className={`transition-colors ${
            scroll ? 'text-black' : 'text-white'
          }`}>
          Cho thuê xe
        </Button>
        <Button
          variant={'ghost'}
          className={`transition-colors ${
            scroll ? 'text-black' : 'text-white'
          }`}>
          Hoạt động vui chơi
        </Button>
        <Button
          variant={'ghost'}
          className={`transition-colors ${
            scroll ? 'text-black' : 'text-white'
          }`}>
          More
        </Button>
      </div>
    </header>
  ) : (
    <header  className='container sticky flex  gap-3 flex-col justify-center  py-2 top-0 left-0 w-full z-50 h-21 bg-white'>
      <div className='flex justify-between'>
        <h1>Partner</h1>
        <div className='flex gap-4'>
          <Button className='button-outline text-cyan-500'><Link href={'/app/partner/login'}>Đăng nhập</Link> </Button>
          <Button className='bg-orange-500 text-white'>
            Đăng ký hợp tác với chúng tôi
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
