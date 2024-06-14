import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/useAuthContext';
import "../css/__dates_picker.scss";
import 'react-tooltip/dist/react-tooltip.css'
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
        <body className='font-sans' style={{ fontFamily: 'Tahoma, sans-serif' }}>

          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>

        </body>
      </html>
    </ReactQueryProvider>
  );
}
