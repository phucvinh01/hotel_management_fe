import type { Metadata } from 'next';
import '../globals.css';
import Footer from '@/components/shared/Layout/Footer';
import Header from '@/components/shared/Layout/Header';

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
      >
        <Header />
        {children}
        <Footer />
    </main>
  );
}
