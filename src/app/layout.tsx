import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Footer from '@/components/shared/Layout/Footer';
import Header from '@/components/shared/Layout/Header';
import Hero from '@/components/shared/BgHero';
const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Traveloka - Nền tảng du lịch hàng đầu Đông Nam Á',
  description: 'Traveloka',
};

 const bgHero = {
    backgroundImage: "url('/background/image.png')",
    backgroundSize: 'contain',

  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning={true}>
      <body
        style={bgHero}
        className={cn(
          ' bg-background font-sans antialiased',
          fontSans.variable
        )}>
          <Header />
          {children}
          <Footer />
        <Toaster />
      </body>
    </html>
  );
}
