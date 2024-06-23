'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import SidebarLinkGroup from './SidebarLinkGroup';
import { Button } from '@/components/ui/button';
import { CalendarDaysIcon, ChevronDown, ClipboardMinusIcon, HomeIcon, LayoutDashboardIcon, LogOutIcon, MenuSquareIcon, MessageCircleIcon, SettingsIcon, Users2Icon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuthContext';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const [showTitle, setShowTitel] = useState<boolean>(true);
  const pathname = usePathname();

  const {logout}= useAuth()
  const router = useRouter()

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = 'true';

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );


  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== 'Escape') return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  const handleShowTile = (): void => {
    setShowTitel(!showTitle);
  };


  const getHotelId = () => {
  try {
    return window.localStorage.getItem('Hotel');
  } catch (error) {
    console.error('Error retrieving hotel ID:', error);
    return null; 
  }
};

const id = getHotelId();

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-30 flex h-screen flex-col overflow-y-hidden
       bg-white duration-300 ease-linear dark:bg-black lg:static lg:translate-x-0 
       ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
       ${showTitle ? 'w-72.5' : 'w-24'}`}>
      <div className='flex items-center justify-between gap-2 px-3 py-5.5 lg:py-6.5 overflow-hidden  '>
        <Button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls='sidebar'
          aria-expanded={sidebarOpen}
          className='block lg:hidden'>
          <svg
            className='fill-current'
            width='20'
            height='18'
            viewBox='0 0 20 18'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z'
              fill=''
            />
          </svg>
        </Button>
      </div>

      <div className=' flex flex-col   duration-300 ease-linear'>
        <nav className='mt-2 px-4 py-4 lg:mt-5 lg:px-3'>
          <div>
            {/* <div
              className='flex hover:cursor-pointer mb-6'
              onClick={() => handleShowTile()}>
              <h3
                className='w-full mb-4 ml-4 text-sm font-semibold text-bodydark2
            justify-end text-left'>
                 <MenuSquareIcon className=''/>
              </h3>
             
            </div> */}

            <ul className='mb-6 mt-6 flex flex-col gap-4'>
              <li                >
               <Link
                        href='/dashbroad'
                        className={`group relative text-sm flex items-center gap-2.5 rounded-3xl px-4 py-2 
                        font-medium text-black duration-300 ease-in-out hover:bg-cyan-400 dark:text-white
                         dark:hover:bg-gray-900 hover:rounded-xl ${
                           (pathname === '/' ||
                             pathname=== 'dashbroad') &&
                           'bg-cyan-400 dark:bg-cyan-700'
                         }`}>
                       
                       <LayoutDashboardIcon />
                        <span className={`${showTitle ? 'block' : 'hidden'}`}>
                          Dashboard
                        </span>
                        
                      </Link>                
              </li>
              <li>
                <Link
                  href='/dashbroad/booking'
                  className={`group relative text-sm flex items-center gap-2.5 rounded-3xl px-4 py-2 font-medium text-black duration-300 ease-in-out hover:bg-cyan-400 dark:text-white dark:hover:bg-gray-900 hover:rounded-xl ${
                    pathname.includes('booking') &&
                    'bg-cyan-400 dark:bg-cyan-700'
                  }`}>
                 <CalendarDaysIcon />
                  <span className={`${showTitle ? 'block' : 'hidden'}`}>
                    Booking
                  </span>
                </Link>
              </li>
             

              <SidebarLinkGroup
                activeCondition={
                  pathname === '/rooms' || pathname.includes('room')
                }>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href='/dashbroad#'
                        className={`group relative text-sm flex items-center gap-2.5 rounded-3xl px-4 py-2 font-medium text-black duration-300 ease-in-out hover:bg-cyan-400 dark:text-white dark:hover:bg-gray-900 hover:rounded-xl ${
                          (pathname === '/rooms' ||
                            pathname.includes('room')) &&
                          'bg-cyan-400 dark:bg-cyan-700'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}>
                        <HomeIcon />
                        <span className={`${showTitle ? 'block' : 'hidden'}`}>
                          Room
                        </span>
                       <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current
                          w-5 min-w-5
                           ${open && 'rotate-180'}
                           ${showTitle ? 'block' : 'hidden'}`}/>
                      </Link>
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}>
                        <ul className='mb-5.5 mt-4 flex flex-col gap-2.5 pl-6'>
                          <li>
                            <Link
                              href={`/dashbroad/rooms/calendar-availability`}
                              className={`group relative text-sm flex items-center gap-2.5 rounded-3xl px-4 font-medium text-bodydark2 duration-300 ease-in-out ${
                                pathname === '/rooms' &&
                                'text-white'
                              }`}>
                              Calendar
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={`/dashbroad/rooms/${id}`}
                              className={`group relative text-sm flex items-center gap-2.5 rounded-3xl px-4 font-medium text-bodydark2 duration-300 ease-in-out ${
                                pathname === '/rooms' &&
                                'text-white'
                              }`}>
                              All Room
                            </Link>
                          </li>
                          <li>
                            <Link
                              href={`/dashbroad/rooms/typeroom/${id}`}
                              className={`group relative text-sm flex items-center gap-2.5 rounded-3xl px-4 font-medium text-bodydark2 duration-300 ease-in-out ${
                                pathname === '/rooms/type-rooms' &&
                                'text-white'
                              } `}>
                              Typerooms
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <li>
                <Link
                  href='/dashbroad/report'
                  className={`group relative text-sm flex items-center gap-2.5 rounded-3xl px-4 py-2 font-medium text-black duration-300 ease-in-out hover:bg-cyan-400 dark:text-white dark:hover:bg-gray-900 hover:rounded-xl ${
                    pathname.includes('tables') && 'bg-cyan-400 dark:bg-cyan-700'
                  }`}>
                 <ClipboardMinusIcon />
                  <span className={`${showTitle ? 'block' : 'hidden'}`}>
                    Report
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href='/dashbroad/customer'
                  className={`group relative text-sm flex items-center gap-2.5 rounded-3xl px-4 py-2 font-medium text-black duration-300 ease-in-out hover:bg-cyan-400 dark:text-white dark:hover:bg-gray-900 hover:rounded-xl ${
                    pathname.includes('customer') &&
                    'bg-cyan-400 dark:bg-cyan-700'
                  }`}>
                <Users2Icon />
                  <span className={`${showTitle ? 'block' : 'hidden'}`}>
                    Customer
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href='/dashbroad/comments'
                  className={`group relative text-sm flex items-center gap-2.5 rounded-3xl px-4 py-2 font-medium text-black duration-300 ease-in-out hover:bg-cyan-400 dark:text-white dark:hover:bg-gray-900 hover:rounded-xl ${
                    pathname.includes('comments') && 'bg-cyan-400 dark:bg-cyan-700'
                  }`}>
                 <MessageCircleIcon />
                  <span className={`${showTitle ? 'block' : 'hidden'}`}>
                    Comments
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href='/dashbroad/settings'
                  className={`group relative text-sm flex items-center gap-2.5 rounded-3xl px-4 py-2 font-medium text-black duration-300 ease-in-out hover:bg-cyan-400 dark:text-white dark:hover:bg-gray-900 hover:rounded-xl ${
                    pathname.includes('settings') && 'bg-cyan-400 dark:bg-cyan-700'
                  }`}>
                 <SettingsIcon />
                  <span className={`${showTitle ? 'block' : 'hidden'}`}>
                    Setting
                  </span>
                </Link>
              </li>
                <li>
                <Link
                href={"#"}
                onClick={() => {logout() , router.push("/app")}}
                  className={`group relative text-sm flex items-center gap-2.5 rounded-3xl px-4 py-2 font-medium text-black duration-300 ease-in-out hover:bg-cyan-400 dark:text-white dark:hover:bg-gray-900 hover:rounded-xl 
                  }`}>
                 <LogOutIcon />
                  <span className={`${showTitle ? 'block' : 'hidden'}`}>
                    Log Out
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
