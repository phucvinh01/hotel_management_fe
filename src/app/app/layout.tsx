import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Footer from '@/components/shared/Layout/Footer';
import Header from '@/components/shared/Layout/Header';
import { AuthProvider } from '@/hooks/useAuthContext';

import { usePathname } from 'next/navigation';
import Background from '@/components/shared/Background';

export const metadata: Metadata = {
  title: 'VietNam Venture',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <main
      lang='en'
      suppressHydrationWarning={true}>
        <AuthProvider>
          <Header />
          {children}
          <Toaster />
        </AuthProvider>
    </main>
  );
}
