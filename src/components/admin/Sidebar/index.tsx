'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import SidebarLinkGroup from './SidebarLinkGroup';
import { Button } from '@/components/ui/button';
import { CalendarDaysIcon, ChevronDown, ClipboardMinusIcon, HomeIcon, LayoutDashboardIcon, MenuSquareIcon, MessageCircleIcon, SettingsIcon, Users2Icon } from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const [showTitle, setShowTitel] = useState<boolean>(true);
  const pathname = usePathname();

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

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen flex-col overflow-y-hidden
       bg-white duration-300 ease-linear dark:bg-black lg:static lg:translate-x-0 
       ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
       ${showTitle ? 'w-72.5' : 'w-24'}`}>
      {/* <!-- SIDEBAR HEADER --> */}
      <div className='flex items-center justify-between gap-2 px-3 py-5.5 lg:py-6.5'>
        <Link href='/dashbroad/'>
          <Image
            width={176}
            height={32}
            src={'/images/logo/logo.svg'}
            alt='Logo'
            priority
          />
        </Link>

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
      {/* <!-- SIDEBAR HEADER --> */}

      <div className='no-scrollbar flex flex-col  overflow-y-auto duration-300 ease-linear'>
        {/* <!-- Sidebar Menu --> */}
        <nav className='mt-5 px-4 py-4 lg:mt-9 lg:px-3'>
          {/* <!-- Menu Group --> */}
          <div>
            <div
              className='flex hover:cursor-pointer'
              onClick={() => handleShowTile()}>
              <h3
                className='w-full mb-4 ml-4 text-sm font-semibold text-bodydark2
            justify-end text-left'>
                 <MenuSquareIcon className=''/>
              </h3>
             
            </div>

            <ul className='mb-6 flex flex-col gap-8'>
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/' || pathname.includes('dashboard')
                }>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href='/dashbroad#'
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 
                        font-medium text-black duration-300 ease-in-out hover:bg-graydark dark:text-white
                         dark:hover:bg-gray-900 hover:rounded-xl ${
                           (pathname === '/' ||
                             pathname.includes('dashboard')) &&
                           'bg-graydark dark:bg-meta-4'
                         }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}>
                       <LayoutDashboardIcon />
                        <span className={`${showTitle ? 'block' : 'hidden'}`}>
                          Dashboard
                        </span>
                        
                      </Link>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              <li>
                <Link
                  href='/dashbroad/booking'
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black duration-300 ease-in-out hover:bg-graydark dark:text-white dark:hover:bg-gray-900 hover:rounded-xl ${
                    pathname.includes('Booking') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}>
                 <CalendarDaysIcon />
                  <span className={`${showTitle ? 'block' : 'hidden'}`}>
                    Booking
                  </span>
                </Link>
              </li>
             

              {/* Room*/}
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/rooms' || pathname.includes('room')
                }>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <Link
                        href='/dashbroad#'
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black duration-300 ease-in-out hover:bg-graydark dark:text-white dark:hover:bg-gray-900 hover:rounded-xl ${
                          (pathname === '/rooms' ||
                            pathname.includes('room')) &&
                          'bg-graydark dark:bg-meta-4'
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
                              href='/dashbroad/rooms'
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === '/rooms' &&
                                'text-white'
                              }`}>
                              All Room
                            </Link>
                          </li>
                          <li>
                            <Link
                              href='/dashbroad/rooms/type-rooms'
                              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
                                pathname === '/rooms/type-rooms' &&
                                'text-white'
                              } `}>
                              Typerooms
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <li>
                <Link
                  href='/dashbroad/report'
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black duration-300 ease-in-out hover:bg-graydark dark:text-white dark:hover:bg-gray-900 hover:rounded-xl ${
                    pathname.includes('tables') && 'bg-graydark dark:bg-meta-4'
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
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black duration-300 ease-in-out hover:bg-graydark dark:text-white dark:hover:bg-gray-900 hover:rounded-xl ${
                    pathname.includes('settings') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}>
                <Users2Icon />
                  <span className={`${showTitle ? 'block' : 'hidden'}`}>
                    Customer
                  </span>
                </Link>
              </li>


              <li>
                <Link
                  href='/dashbroad/support'
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black duration-300 ease-in-out hover:bg-graydark dark:text-white dark:hover:bg-gray-900 hover:rounded-xl ${
                    pathname.includes('support') && 'bg-graydark dark:bg-meta-4'
                  }`}>
                 <MessageCircleIcon />
                  <span className={`${showTitle ? 'block' : 'hidden'}`}>
                    Support
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href='/dashbroad/setting'
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black duration-300 ease-in-out hover:bg-graydark dark:text-white dark:hover:bg-gray-900 hover:rounded-xl ${
                    pathname.includes('setting') && 'bg-graydark dark:bg-meta-4'
                  }`}>
                 <SettingsIcon />
                  <span className={`${showTitle ? 'block' : 'hidden'}`}>
                    Setting
                  </span>
                </Link>
              </li>
              {/* <!-- Menu Item Settings --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
