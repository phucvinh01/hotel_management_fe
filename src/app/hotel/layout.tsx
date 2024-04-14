
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";
import React from "react";
import Footer from '@/components/shared/Layout/Footer';
import Header from '@/components/shared/Layout/Header';
import { cn } from '@/lib/utils';
import { Inter as FontSans } from 'next/font/google';
//import './../globals.css';
//import './style.css';
const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
});
const bgHero = {
    backgroundColor: 'bg-slate-100',
    backgroundSize: 'contain',

};
export const metadata: Metadata = {
    title: 'Đặt phòng khách sạn giá rẻ - giá tốt nhất tại Traveloka',
    description: 'Traveloka',
}
export default function RootHotel({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html
            lang='en'
            suppressHydrationWarning={true}
        >
            <body
                style={bgHero}
                className={cn(
                    ' bg-background font-sans antialiased',
                    fontSans.variable
                )}>
                <Header usingScrollEvent={false} />
                {children}
                <Footer />
                <Toaster />
            </body>
        </html>

    );
}
