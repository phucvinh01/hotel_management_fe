import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import Header from '@/components/shared/Layout/Header';
import { cn } from '@/lib/utils';
import Hero from '@/components/shared/BgHero';
import TabHero from '@/components/shared/TabHero';
import { Toaster } from "@/components/ui/toaster"
import { CarouselTrustBy } from '@/components/shared/CarouselTrustBy';
import BannerSection from '@/components/shared/BannerSection';
const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Traveloka - Nền tảng du lịch hàng đầu Đông Nam Á',
  description: 'Traveloka',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning={true}>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}>

        <Hero>
          <Header />
          <h2 className='text-center text-4xl font-bold text-white  py-3'>Từ Đông Nam Á Đến Thế Giới, Trong Tầm Tay Bạn</h2>

          <TabHero />
          <CarouselTrustBy />

          <BannerSection />

        </Hero>
        {children}
<Toaster />
      </body>
    </html>
  );
}
