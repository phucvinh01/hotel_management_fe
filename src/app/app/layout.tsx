import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Footer from '@/components/shared/Layout/Footer';
import Header from '@/components/shared/Layout/Header';
import { AuthProvider } from '@/hooks/useAuthContext';
import Background from '@/components/shared/Background';

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
    <html
      lang='en'
      suppressHydrationWarning={true}>
      <Background>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
          <Toaster />
        </AuthProvider>
      </Background>
    </html>
  );
}
