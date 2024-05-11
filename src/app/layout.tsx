import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/useAuthContext';
import "../css/__dates_picker.scss";
export const metadata: Metadata = {
  title: 'Vietnam Venture',
  description: 'Vietnam Venture',
};
import ReactQueryProvider from '../hooks/useQuery';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
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
    </ReactQueryProvider>
  );
}
