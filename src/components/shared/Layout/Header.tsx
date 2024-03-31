'use client';

import { Button } from '@/components/ui/button';
import LangAndCur from '../LangAndCur';
import Logo from '../Logo';
import { User } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  const [scroll, setScroll] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    if (scrollY > 20) {
      setScroll(true);
    } else {
      setScroll(false);
    }
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY]);
  return (
    <header
      className={`container sticky flex gap-3 flex-col py-2 top-0 left-0 w-full z-50 ${
        scrollY > 20 ? 'bg-slate-100' : 'bg-transparent border-gray-200 '
      } transition-all duration-300 ease-in-out`}>

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
            Hợp tác với chúng tôi
          </Button>

          <div className='flex gap-1'>
            <Button
              variant={'ghost'}
              className={`button-outline ${
                scroll ? 'text-black' : 'text-white'
              } `}>
              <User className='mr-2 h-4 w-4' />
              Đăng nhập
            </Button>
            <Button
              variant={'ghost'}
              className='button-primary text-white'>
              Đăng Ký
            </Button>
          </div>
        </div>
      </div>

      <div className='flex gap-1'>
            <Button variant={'ghost'} className={`transition-colors ${scroll ?  'text-black' : 'text-white'}`}><Link href={'/hotel'}>Khách sạn</Link></Button>
            <Button variant={'ghost'} className={`transition-colors ${scroll ?  'text-black' : 'text-white'}`}>Vé máy bay</Button>
            <Button variant={'ghost'} className={`transition-colors ${scroll ?  'text-black' : 'text-white'}`}>Vé xe khách</Button>
            <Button variant={'ghost'} className={`transition-colors ${scroll ?  'text-black' : 'text-white'}`}>Đưa đón sân bay</Button>
            <Button variant={'ghost'} className={`transition-colors ${scroll ?  'text-black' : 'text-white'}`}>Cho thuê xe</Button>
            <Button variant={'ghost'} className={`transition-colors ${scroll ?  'text-black' : 'text-white'}`}>Hoạt động vui chơi</Button>
            <Button variant={'ghost'} className={`transition-colors ${scroll ?  'text-black' : 'text-white'}`}>More</Button>
      </div>

    </header>
  );
};

export default Header;
