
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import ReactQueryProvider from "@/hooks/useQuery";
import { Metadata } from "next";
import { UserNav } from "./_components/user-nav";
import { MainNav } from "./_components/main-nav";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
}
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <main suppressHydrationWarning={true} className='font-sans' style={{ fontFamily: 'sans-serif' }}>
        <div className="dark:bg-black dark:text-gray-300 rounded-3xl bg-slate-100">
          {children}
        </div>
      </main>
    </ReactQueryProvider>
  );
}
