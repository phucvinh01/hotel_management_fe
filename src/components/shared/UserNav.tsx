'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import Link from 'next/link';
import { GUEST } from '@/constant';


type UserNavProps = {
  user: any,
  logout: () => void;
}

export function UserNav({ user, logout }: UserNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage
              src='https://github.com/shadcn.png'
              alt='@shadcn'
            />
            <AvatarFallback>{user && user.name}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      {
        user && user?.Type === GUEST &&  <DropdownMenuContent
        className='w-56 dark:bg-black dark:text-white text-black bg-white z-[9999999]'
        align='end'
        forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>
              {user && user.name}
            </p>
            <p className='text-xs leading-none text-muted-foreground'>
              {user && user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href={'/app/hotel/lichsu?page=account'}>Trang cá nhân</Link>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={'/app/hotel/lichsu?page=history'}>Lịch sử đặt phòng</Link>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={'/app/hotel/lichsu?page=account'}>Cài đặt</Link>

            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          {/* <DropdownMenuItem>New Team</DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()}>
          Đăng xuất
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
      }
     
    </DropdownMenu>
  );
}
