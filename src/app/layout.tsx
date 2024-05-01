import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/useAuthContext';

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
      <body>

        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
        </body>
    </html>
  );
}
