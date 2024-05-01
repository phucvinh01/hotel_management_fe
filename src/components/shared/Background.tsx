'use client'

import React from 'react';
import { cn } from '@/lib/utils';
import { Inter as FontSans } from 'next/font/google';
import { usePathname } from 'next/navigation';
const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const Background = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const bgNotImage = {
    backgroundColor: 'bg-slate-100',
    backgroundSize: 'contain',
  };
  const bgImage = {
    backgroundImage: "url('/background/image.png')",
    backgroundSize: 'contain',
  };
   const pathname = usePathname()
  return (

   


    <body
      style={pathname === '/app' ? bgImage : bgNotImage}
      className={cn(' bg-background font-sans antialiased', fontSans.variable)}>
      {children}
    </body>
  );
};

export default Background;
