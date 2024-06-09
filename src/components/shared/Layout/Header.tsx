'use client';

import { Button } from '@/components/ui/button';
import Logo from '../Logo';
import { User } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import DialogSignIn from '../DialogSignIn';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuthContext';
import { UserNav } from '../UserNav';
import ModalNotify from '../ModalNotify';

const Header = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  const [scroll, setScroll] = useState<boolean>(false);
  const pathname = usePathname();
  const { user, logout } = useAuth()

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

  return pathname !== '/app/partner' ? (
    <header
      className={`container sticky flex gap-3 flex-col py-4 border-b top-0 left-0 w-full z-10 shadow-sm shadow-slate-300
       ${pathname !== '/app'
          ? 'bg-white text-gray-900'
          : scrollY > 20
            ? 'bg-white shadow-lg'
            : 'bg-transparent border-gray-200 '
        } transition-all duration-300 ease-in-out ${pathname.includes("/register") && 'hidden'} ${pathname.includes("/login") && 'hidden'} ${pathname.includes("/forgotpassword") && 'hidden'} ${pathname.includes("/dashbroad") && 'hidden'}`} >

      <div className='w-full flex-center '>
        <div className='flex flex-1'>
          <Logo />
        </div>
        <div className='flex-center gap-3'>
          <Button
            className={`
              transition-colors rounded-3xl hover:bg-cyan-400`}>
            <Link href={'/app/partner'}>Hợp tác với chúng tôi</Link>
          </Button>
          {user ? (
            <>
              {/* <Link href={'/app/hotel/lichsu?page=notify'} className='relative rounded-full p-1 border border-r-blue-500 hover:bg-blue-500'>
                <div className={`w-[8px] h-[8px] text-sm bg-red-500 rounded-full
                absolute top-0 right-0`}></div>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-bell text-blue-500 hover:text-white" viewBox="0 0 16 16">
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                  </svg>
                </span>
              </Link> */}
              <ModalNotify />
              <UserNav user={user} logout={logout} />
            </>

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
    </header>
  ) : (
    <header className='container sticky flex  gap-3 flex-col justify-center  py-2 top-0 left-0 w-full z-50 h-21 bg-white'>
      <div className='flex justify-between'>
        <Logo />
        <div className='flex gap-4'>
          <Button variant={"secondary"}><Link href={'/app/partner/login'}>Đăng nhập</Link> </Button>
          <Button className='bg-cyan-500'>
            Đăng ký hợp tác với chúng tôi
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
