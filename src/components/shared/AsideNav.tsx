'use client';

import React from 'react';
import { SidebarNav } from './SideBarNav';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useAuth } from '@/hooks/useAuthContext';
const sidebarNavItems = [
  {
    title: 'Thông tin cá nhân',
    href: '/me',
  },
  {
    title: 'Lịch sử đặt chổ',
    href: '/me/history',
  },

];

const AsideNav = () => {
  const { user } = useAuth();
  return (
    <aside className='-mx-4 lg:w-1/5'>
        <div className='flex gap-4 px-4 py-3 border rounded-3xl justify-center items-center'>
<Avatar className='h-12 w-12'>
        <AvatarImage
          src='https://github.com/shadcn.png'
          alt='@shadcn'
        />
        <AvatarFallback>{user && user.name}</AvatarFallback>
      </Avatar>
      <div className='flex flex-col '>
        <p className='text-md font-bold'>{user?.name}</p>
        <p className='text-sm break-words'>{user?.email}</p>
      </div>
        </div>
      
      <SidebarNav items={sidebarNavItems} />
    </aside>
  );
};

export default AsideNav;
